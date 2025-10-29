// EventPage.jsx (API-integrated, UI untouched)
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Badge,
  Offcanvas,
  Dropdown,
} from "react-bootstrap";
import {
  FaBars,
  FaSearch,
  FaPlus,
  FaHome,
  FaTimes,
  FaTicketAlt,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ---------------------- API Helper (replaces mock data) ----------------------
const API_BASE = (
  import.meta?.env?.VITE_YSTUDIO_URL || "http://127.0.0.1:3106"
).replace(/\/+$/, "");
// Add this helper above the API functions
function authHeaders() {
  const token = localStorage.getItem("bbsneo_token"); // or sessionStorage if you use that
  return token ? { Authorization: `Bearer ${token}` } : {};
}
function getThumbnail(input) {
  // 1) No input
  if (!input) return "";

  // 2) If a string is passed (direct image URL or a video URL)
  if (typeof input === "string") {
    const direct = input.trim();
    // if it's a direct URL and not a placeholder, use it
    if (direct && !/VIDEO_ID/.test(direct) && /^https?:\/\//i.test(direct)) {
      return direct;
    }
    // otherwise try to extract YouTube ID from the string
    const m =
      direct.match(/[?&]v=([^&]+)/) ||
      direct.match(/youtu\.be\/([^?&/]+)/) ||
      direct.match(/youtube\.com\/embed\/([^?&/]+)/);
    const id = m && m[1] ? m[1] : null;
    return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "";
  }

  // 3) Original object behavior
  const { coverImageUrl, image, videoUrl, video } = input || {};
  const direct = coverImageUrl || image || "";
  if (direct && !/VIDEO_ID/.test(direct)) return direct;

  const v = videoUrl || video || "";
  const m =
    v.match(/[?&]v=([^&]+)/) ||
    v.match(/youtu\.be\/([^?&/]+)/) ||
    v.match(/youtube\.com\/embed\/([^?&/]+)/);
  const id = m && m[1] ? m[1] : null;
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : direct;
}

const eventsApi = {
  async list(params = {}) {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/events${qs ? `?${qs}` : ""}`, {
      headers: { ...authHeaders() }, // add headers here
    });
    if (!res.ok) throw new Error("Failed to load events");
    const json = await res.json();
    return Array.isArray(json) ? json : json.items || [];
  },

  async create(payload) {
    const res = await fetch(`${API_BASE}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Create failed");
    return res.json();
  },

  async update(id, payload) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error("Update failed");
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${API_BASE}/events/${id}`, {
      method: "DELETE",
      headers: { ...authHeaders() },
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
  },

  async rsvp(id, userId) {
    const res = await fetch(`${API_BASE}/events/${id}/rsvp`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ userId }),
    });
    if (!res.ok) throw new Error("RSVP failed");
    return res.json();
  },
};

// ---------- helpers to map API <-> UI without changing UI fields ----------
const toUiShape = (doc) => {
  const id =
    typeof doc._id === "string" ? doc._id : doc._id?.$oid || doc.id || doc._id;
  const dt = doc.startDateTime ? new Date(doc.startDateTime) : null;
  const date = dt ? dt.toISOString().slice(0, 10) : doc.date || "";
  const time = dt
    ? new Intl.DateTimeFormat("en-IN", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(dt)
    : doc.time || "";

  return {
    id,
    title: doc.title,
    host: doc.organizerName || doc.host || "—",
    date,
    time,
    location: doc.location || "Online",
    category: doc.category || "Tech",
    description: doc.description || "",
    attendees: Array.isArray(doc.attendees) ? doc.attendees : [],
    image: getThumbnail({
      coverImageUrl: doc.coverImageUrl,
      image: doc.image,
      videoUrl: doc.videoUrl,
      video: doc.video,
    }),
    thumbnail: doc.coverImageUrl || doc.image || "",
    videoUrl: doc.videoUrl || doc.video || "",
    video: doc.videoUrl || doc.video || "",
    online: doc.locationType === "Online" || doc.online === true,
    ticketPrice: doc.ticketPrice ?? 0,
    maxAttendees: doc.attendeeLimit ?? doc.maxAttendees ?? 100,
  };
};

const toApiShape = (ui) => {
  let startDateTime;
  if (ui.date) {
    const t = new Date(`${ui.date} ${ui.time?.trim() || "00:00"}`);
    if (!isNaN(t.getTime())) startDateTime = t.toISOString();
  }

  // Prefer explicit image; otherwise derive from video if YouTube; avoid VIDEO_ID placeholder
  let coverImageUrl = ui.image?.trim() || "";
  if (!coverImageUrl || /VIDEO_ID/.test(coverImageUrl)) {
    coverImageUrl = getThumbnail({ videoUrl: ui.video });
  }

  return {
    title: ui.title,
    description: ui.description,
    category: ui.category,
    organizerName: ui.host,
    locationType:
      ui.online || ui.location?.toLowerCase() === "online"
        ? "Online"
        : "Offline",
    location: ui.location,
    startDateTime,
    coverImageUrl, // <- normalized
    videoUrl: ui.video, // <- pass through
    ticketPrice: Number(ui.ticketPrice) || 0,
    attendeeLimit: Number(ui.maxAttendees) || 100,
  };
};

// ---------------------- Event Page Component ----------------------
export default function EventPage() {
  const [events, setEvents] = useState([]); // removed mock data
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [showDetail, setShowDetail] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOffcanvasOpen, setMobileOffcanvasOpen] = useState(false);

  const allCategories = [
    "All",
    "Tech",
    "Music",
    "Health",
    "Sports",
    "Business",
    "Community",
    "Education",
  ];
  const defaultLocations = [
    "All",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Online",
  ];

  const [newEvent, setNewEvent] = useState({
    title: "",
    host: "",
    date: "",
    time: "",
    location: "",
    category: "Tech",
    description: "",
    image: "",
    video: "",
    online: false,
    ticketPrice: 0,
    maxAttendees: 100,
  });

  const [filtered, setFiltered] = useState([]);

  // Initial load from API
  useEffect(() => {
    (async () => {
      try {
        const docs = await eventsApi.list();
        const mapped = docs.map(toUiShape);
        setEvents(mapped);
      } catch (e) {
        console.error("Failed to fetch events", e);
        setEvents([]);
      }
    })();
  }, []);

  // Filter events (unchanged UI logic)
  useEffect(() => {
    let res = events.filter((e) => {
      const matchesQuery =
        !query ||
        e.title?.toLowerCase().includes(query.toLowerCase()) ||
        e.description?.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === "All" || e.category === category;
      const matchesLocation = location === "All" || e.location === location;
      return matchesQuery && matchesCategory && matchesLocation;
    });
    res.sort((a, b) => new Date(a.date) - new Date(b.date));
    setFiltered(res);
  }, [events, query, category, location]);

  // Sidebar responsive
  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= 992);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openDetail = (event) => {
    setActiveEvent(event);
    setShowDetail(true);
  };

  const handleDelete = async (event) => {
    const ok = await Swal.fire({
      title: `Delete "${event.title}"?`,
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    }).then((r) => r.isConfirmed);
    if (!ok) return;
    try {
      await eventsApi.remove(event.id);
      setEvents((prev) => prev.filter((e) => e.id !== event.id));
      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({ icon: "error", title: "Delete failed" });
    }
  };

  const handleRSVP = async (event) => {
    const result = await Swal.fire({
      title: `RSVP for ${event.title}`,
      html: `<strong>Date:</strong> ${event.date} ${event.time}<br/><strong>Host:</strong> ${event.host}`,
      showCancelButton: true,
      confirmButtonText: "Going",
      cancelButtonText: "Not Going",
    });
    if (!result.isConfirmed) return;
    try {
      await eventsApi.rsvp(event.id, "000000000000000000000001"); // TODO: replace with real user id from auth
      Swal.fire({
        icon: "success",
        title: "RSVP Confirmed",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch {
      Swal.fire({ icon: "error", title: "RSVP failed" });
    }
  };

  const handlePublish = async () => {
    const required = [
      "title",
      "host",
      "date",
      "time",
      "location",
      "category",
      "description",
      "image",
    ];
    for (const k of required) {
      if (!newEvent[k]) {
        Swal.fire({
          icon: "error",
          title: "Missing field",
          text: `Please fill ${k}`,
        });
        return;
      }
    }
    try {
      const payload = toApiShape(newEvent);
      const saved = await eventsApi.create(payload);
      const ui = toUiShape(saved);
      setEvents((prev) => [ui, ...prev]);
      setShowCreate(false);
      setNewEvent({
        title: "",
        host: "",
        date: "",
        time: "",
        location: "",
        category: "Tech",
        description: "",
        image: "",
        video: "",
        online: false,
        ticketPrice: 0,
        maxAttendees: 100,
      });
      Swal.fire({
        icon: "success",
        title: "Published",
        text: "Your event is live.",
        timer: 1300,
        showConfirmButton: false,
      });
    } catch (e) {
      Swal.fire({ icon: "error", title: "Publish failed" });
    }
  };

  // ---------------------- UI (unchanged) ----------------------
  const allCategoriesUI = [
    "All",
    "Tech",
    "Music",
    "Health",
    "Sports",
    "Business",
    "Community",
    "Education",
  ];
  const defaultLocationsUI = [
    "All",
    "Bangalore",
    "Mumbai",
    "Delhi",
    "Chennai",
    "Online",
  ];

  return (
    <Container fluid className="bg-light min-vh-100 p-3">
      {/* HEADER */}
      <Row className="mb-3 align-items-center">
        <Col xs="auto">
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => {
              if (window.innerWidth < 992) setMobileOffcanvasOpen(true);
              else setSidebarOpen((s) => !s);
            }}
          >
            <FaBars />
          </Button>
        </Col>
        <Col>
          <h4 className="mb-0">Events</h4>
          <small className="text-muted">Discover, Attend & Create Events</small>
        </Col>
        <Col md={5} lg={4} className="d-flex gap-2">
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search events..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
          <Button
            className="flex-shrink-0"
            size="sm"
            variant="success"
            onClick={() => setShowCreate(true)}
          >
            <FaPlus /> Create Event
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {/* SIDEBAR */}
        {sidebarOpen && (
          <Col xs={12} md={4} lg={3}>
            <div
              style={{
                padding: "12px",
                borderRight: "1px solid #e9ecef",
                minHeight: "80vh",
                background: "#fff",
              }}
              className="rounded shadow-sm"
            >
              <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Filters</strong>
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                >
                  <FaTimes />
                </Button>
              </div>

              <ListGroup variant="flush">
                <ListGroup.Item
                  action
                  onClick={() => {
                    setCategory("All");
                    setQuery("");
                  }}
                >
                  <FaHome className="me-2 text-primary" /> All Events
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={() => setShowCreate(true)}
                  className="fw-bold text-primary"
                >
                  <FaPlus className="me-2" /> Create Event
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <div className="small text-muted mb-1">Location</div>
                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary" size="sm">
                      {location}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[
                        "All",
                        "Bangalore",
                        "Mumbai",
                        "Delhi",
                        "Chennai",
                        "Online",
                      ].map((loc) => (
                        <Dropdown.Item
                          key={loc}
                          onClick={() => setLocation(loc)}
                        >
                          {loc}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <div className="small text-muted mb-1">Categories</div>
                  <div className="d-flex flex-column gap-1">
                    {[
                      "All",
                      "Tech",
                      "Music",
                      "Health",
                      "Sports",
                      "Business",
                      "Community",
                      "Education",
                    ].map((c) => (
                      <Button
                        key={c}
                        variant={c === category ? "primary" : "light"}
                        size="sm"
                        className="text-start"
                        onClick={() => setCategory(c)}
                      >
                        {c}
                      </Button>
                    ))}
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
        )}

        {/* MOBILE OFFCANVAS */}
        <Offcanvas
          show={mobileOffcanvasOpen}
          onHide={() => setMobileOffcanvasOpen(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ListGroup variant="flush">
              <ListGroup.Item
                action
                onClick={() => {
                  setCategory("All");
                  setQuery("");
                  setMobileOffcanvasOpen(false);
                }}
              >
                <FaHome className="me-2 text-primary" /> All Events
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  setShowCreate(true);
                  setMobileOffcanvasOpen(false);
                }}
                className="fw-bold text-primary"
              >
                <FaPlus className="me-2" /> Create Event
              </ListGroup.Item>

              <ListGroup.Item className="mt-3">
                <div className="small text-muted mb-1">Location</div>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    {location}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {[
                      "All",
                      "Bangalore",
                      "Mumbai",
                      "Delhi",
                      "Chennai",
                      "Online",
                    ].map((loc) => (
                      <Dropdown.Item
                        key={loc}
                        onClick={() => {
                          setLocation(loc);
                          setMobileOffcanvasOpen(false);
                        }}
                      >
                        {loc}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>

              <ListGroup.Item className="mt-3">
                <div className="small text-muted mb-1">Categories</div>
                <div className="d-flex flex-column gap-1">
                  {[
                    "All",
                    "Tech",
                    "Music",
                    "Health",
                    "Sports",
                    "Business",
                    "Community",
                    "Education",
                  ].map((c) => (
                    <Button
                      key={c}
                      variant={c === category ? "primary" : "light"}
                      size="sm"
                      className="text-start"
                      onClick={() => {
                        setCategory(c);
                        setMobileOffcanvasOpen(false);
                      }}
                    >
                      {c}
                    </Button>
                  ))}
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Offcanvas.Body>
        </Offcanvas>

        {/* MAIN CONTENT */}
        <Col xs={12} md={sidebarOpen ? 8 : 12} lg={sidebarOpen ? 9 : 12}>
          <Row xs={1} sm={2} md={2} lg={3} className="g-3">
            {filtered.map((event) => (
              <Col key={event.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => openDetail(event)}
                >
                  <div
                    className="ratio ratio-16x9 overflow-hidden"
                    style={{
                      borderTopLeftRadius: ".25rem",
                      borderTopRightRadius: ".25rem",
                    }}
                  >
                    <img
                      src={getThumbnail(event.thumbnail || event.videoUrl)}
                      alt={event.title}
                      className="w-100 h-100 d-block"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="mb-1" style={{ fontSize: "1rem" }}>
                      {event.title}
                    </Card.Title>
                    <div className="small text-muted">
                      {event.host} • {event.date} {event.time}
                    </div>
                    <div className="mt-auto d-flex justify-content-between align-items-center">
                      <Badge bg="info">{event.category}</Badge>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRSVP(event);
                        }}
                      >
                        RSVP
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* EVENT DETAIL MODAL */}
      <Modal
        show={showDetail}
        onHide={() => setShowDetail(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{activeEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeEvent && (
            <>
              <p>
                <strong>Host:</strong> {activeEvent.host}
              </p>
              <p>
                <strong>Date & Time:</strong> {activeEvent.date}{" "}
                {activeEvent.time}
              </p>
              <p>
                <strong>Location:</strong> {activeEvent.location}{" "}
                {activeEvent.online && "(Online)"}
              </p>
              <p>
                <strong>Description:</strong> {activeEvent.description}
              </p>
              <div className="mb-2">
                <strong>Attendees ({activeEvent.attendees.length}):</strong>{" "}
                {activeEvent.attendees.join(", ")}
              </div>
              {activeEvent.ticketPrice > 0 && (
                <p>
                  <FaTicketAlt /> Ticket Price: ₹{activeEvent.ticketPrice}
                </p>
              )}
              {activeEvent.video && (
                <video
                  src={activeEvent.video}
                  controls
                  style={{ width: "100%", borderRadius: ".25rem" }}
                />
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleRSVP(activeEvent)}>
            RSVP
          </Button>
          <Button variant="danger" onClick={() => handleDelete(activeEvent)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* CREATE EVENT MODAL */}
      <Modal
        show={showCreate}
        onHide={() => setShowCreate(false)}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Control
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) =>
                setNewEvent({ ...newEvent, title: e.target.value })
              }
            />
            <Form.Control
              placeholder="Host Name"
              value={newEvent.host}
              onChange={(e) =>
                setNewEvent({ ...newEvent, host: e.target.value })
              }
            />
            <Form.Control
              type="date"
              value={newEvent.date}
              onChange={(e) =>
                setNewEvent({ ...newEvent, date: e.target.value })
              }
            />
            <Form.Control
              type="time"
              value={newEvent.time}
              onChange={(e) =>
                setNewEvent({ ...newEvent, time: e.target.value })
              }
            />
            <Form.Control
              placeholder="Location or Link"
              value={newEvent.location}
              onChange={(e) =>
                setNewEvent({ ...newEvent, location: e.target.value })
              }
            />
            <Form.Select
              value={newEvent.category}
              onChange={(e) =>
                setNewEvent({ ...newEvent, category: e.target.value })
              }
            >
              {[
                "Tech",
                "Music",
                "Health",
                "Sports",
                "Business",
                "Community",
                "Education",
              ].map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Form.Select>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <Form.Control
              placeholder="Image URL"
              value={newEvent.image}
              onChange={(e) =>
                setNewEvent({ ...newEvent, image: e.target.value })
              }
            />
            <Form.Control
              placeholder="Video URL (optional)"
              value={newEvent.video}
              onChange={(e) =>
                setNewEvent({ ...newEvent, video: e.target.value })
              }
            />
            <Form.Control
              type="number"
              placeholder="Ticket Price (₹)"
              value={newEvent.ticketPrice}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  ticketPrice: parseInt(e.target.value || "0", 10),
                })
              }
            />
            <Form.Control
              type="number"
              placeholder="Max Attendees"
              value={newEvent.maxAttendees}
              onChange={(e) =>
                setNewEvent({
                  ...newEvent,
                  maxAttendees: parseInt(e.target.value || "0", 10),
                })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handlePublish}>
            Publish Event
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

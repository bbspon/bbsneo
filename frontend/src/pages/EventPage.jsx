// EventPage.jsx
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

// ---------------------- Mock Data ----------------------
const initialEvents = [
  {
    id: 1,
    title: "React Conference 2025",
    host: "DevCommunity",
    date: "2025-10-20",
    time: "10:00 AM",
    location: "Bangalore",
    category: "Tech",
    description: "Join top developers for workshops, talks, and networking.",
    attendees: ["Alice", "Bob", "Charlie"],
    image:
      "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgEZWMe3q5b-os9q4IIf36XCjs6RTlteejCWJYkYJouinSt1o1FnOZGm36OrQ50c3zr7Kl8wVsDk5txZ7bJBtCW12-rEEqms2IJ9Riztforo39x6MlrKyvAYnN3bFxgqB-jVnKUZIBvbdml1pn6zBB94AOg6_x5-yQJUpygD7Kh-1vQ7r2YLUZqTN8TR7I/s3000/what-is-javascript.jpg",
    video:
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    online: false,
    ticketPrice: 1500,
    maxAttendees: 200,
  },
  {
    id: 2,
    title: "Yoga & Wellness Live Stream",
    host: "FitLife",
    date: "2025-10-12",
    time: "06:00 PM",
    location: "Online",
    category: "Health",
    description: "Participate from home in this guided yoga session.",
    attendees: ["David", "Eva"],
    image:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1200&auto=format&fit=crop",
    video: "https://sample-videos.com/video123/mp4/720/sample-5s.mp4",
    online: true,
    ticketPrice: 0,
    maxAttendees: 1000,
  },
];

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
const defaultLocations = ["All", "Bangalore", "Mumbai", "Delhi", "Chennai", "Online"];

// ---------------------- Helper Utils ----------------------
const confirmAction = async (title, action = "delete") => {
  const result = await Swal.fire({
    title: `${action.charAt(0).toUpperCase() + action.slice(1)} "${title}"?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: `Yes, ${action}`,
    cancelButtonText: "Cancel",
  });
  return result.isConfirmed;
};

const notifySuccess = (title, text) => {
  Swal.fire({
    icon: "success",
    title,
    text,
    timer: 1500,
    showConfirmButton: false,
  });
};

// ---------------------- Event Page Component ----------------------
export default function EventPage() {
  const [events, setEvents] = useState(initialEvents);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [showDetail, setShowDetail] = useState(false);
  const [activeEvent, setActiveEvent] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOffcanvasOpen, setMobileOffcanvasOpen] = useState(false);

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

  const [filtered, setFiltered] = useState(events);

  // Filter events
  useEffect(() => {
    let res = events.filter((e) => {
      const matchesQuery =
        !query ||
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.description.toLowerCase().includes(query.toLowerCase());
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
    const ok = await confirmAction(event.title, "delete");
    if (!ok) return;
    setEvents((prev) => prev.filter((e) => e.id !== event.id));
    notifySuccess("Deleted", `${event.title} removed.`);
  };

  const handleRSVP = async (event) => {
    const result = await Swal.fire({
      title: `RSVP for ${event.title}`,
      html: `<strong>Date:</strong> ${event.date} ${event.time}<br/><strong>Host:</strong> ${event.host}`,
      showCancelButton: true,
      confirmButtonText: "Going",
      cancelButtonText: "Not Going",
    });
    if (result.isConfirmed) {
      notifySuccess("RSVP Confirmed", "You are going to this event!");
    }
  };

  const handlePublish = () => {
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
        Swal.fire({ icon: "error", title: "Missing field", text: `Please fill ${k}` });
        return;
      }
    }
    const id = Math.max(0, ...events.map((e) => e.id)) + 1;
    const payload = { ...newEvent, id, attendees: [] };
    setEvents((prev) => [payload, ...prev]);
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
    notifySuccess("Published", "Your event is live.");
  };

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
          <Button className="flex-shrink-0" size="sm" variant="success" onClick={() => setShowCreate(true)}>
            <FaPlus/> Create Event
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
                <Button variant="link" size="sm" onClick={() => setSidebarOpen(false)}>
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
                      {defaultLocations.map((loc) => (
                        <Dropdown.Item key={loc} onClick={() => setLocation(loc)}>
                          {loc}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </ListGroup.Item>

                <ListGroup.Item className="mt-3">
                  <div className="small text-muted mb-1">Categories</div>
                  <div className="d-flex flex-column gap-1">
                    {allCategories.map((c) => (
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
        <Offcanvas show={mobileOffcanvasOpen} onHide={() => setMobileOffcanvasOpen(false)}>
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
                    {defaultLocations.map((loc) => (
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
                  {allCategories.map((c) => (
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
                    style={{
                      height: 160,
                      overflow: "hidden",
                      borderTopLeftRadius: ".25rem",
                      borderTopRightRadius: ".25rem",
                    }}
                  >
                    <img
                      src={event.image}
                      alt={event.title}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
      <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg" centered>
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
                <strong>Date & Time:</strong> {activeEvent.date} {activeEvent.time}
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
      <Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Control
              placeholder="Event Title"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            <Form.Control
              placeholder="Host Name"
              value={newEvent.host}
              onChange={(e) => setNewEvent({ ...newEvent, host: e.target.value })}
            />
            <Form.Control
              type="date"
              value={newEvent.date}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
            <Form.Control
              type="time"
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
            <Form.Control
              placeholder="Location or Link"
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            <Form.Select
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
            >
              {allCategories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </Form.Select>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
            <Form.Control
              placeholder="Image URL"
              value={newEvent.image}
              onChange={(e) => setNewEvent({ ...newEvent, image: e.target.value })}
            />
            <Form.Control
              placeholder="Video URL (optional)"
              value={newEvent.video}
              onChange={(e) => setNewEvent({ ...newEvent, video: e.target.value })}
            />
            <Form.Control
              type="number"
              placeholder="Ticket Price (₹)"
              value={newEvent.ticketPrice}
              onChange={(e) =>
                setNewEvent({ ...newEvent, ticketPrice: parseInt(e.target.value) })
              }
            />
            <Form.Control
              type="number"
              placeholder="Max Attendees"
              value={newEvent.maxAttendees}
              onChange={(e) =>
                setNewEvent({ ...newEvent, maxAttendees: parseInt(e.target.value) })
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

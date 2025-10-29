// MarketplacePage.jsx
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
  FaEllipsisV,
  FaHeart,
} from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

// ---------------------- ENV + Auth ----------------------
const API = (
  import.meta?.env?.VITE_YSTUDIO_URL || "http://127.0.0.1:3106"
).replace(/\/+$/, "");
function authHeaders() {
  const token = localStorage.getItem("bbsneo_token"); // or sessionStorage if you use that
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ---------------------- Static lookups ----------------------
const allCategories = [
  "All",
  "Electronics",
  "Vehicles",
  "Furniture",
  "Fashion",
  "Books",
  "Toys",
  "Services",
];
const defaultLocations = [
  "All India",
  "Bangalore",
  "Mumbai",
  "Delhi",
  "Chennai",
];

// ---------------------- Helper utils ----------------------
const formatINR = (n) =>
  n != null ? `₹${Number(n).toLocaleString("en-IN")}` : "₹0";

const confirmDelete = async (title) => {
  const result = await Swal.fire({
    title: `Delete "${title}"?`,
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete",
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

// ---------------------- Stars Component ----------------------
const Stars = ({ value = 0 }) => {
  const rounded = Math.round(value);
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rounded ? "text-warning" : "text-muted"}>
          ★
        </span>
      ))}
    </>
  );
};

// ---------------------- Marketplace Component ----------------------
export default function MarketplacePage() {
  // data
  const [listings, setListings] = useState([]); // will be filled from API
  const [filtered, setFiltered] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // filters
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All India");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [minPrice] = useState(0);

  // ui state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOffcanvasOpen, setMobileOffcanvasOpen] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [loading, setLoading] = useState(false);

  // create form
  const [newListing, setNewListing] = useState({
    title: "",
    price: "",
    category: "Electronics",
    seller: "",
    location: "",
    verified: false,
    rating: 4.5,
    image: "",
    video: "",
    description: "",
  });

  // favourites (client-side mirror)
  const [favorites, setFavorites] = useState([]);

  // ---------------------- Fetch from API ----------------------
  const fetchListings = async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({
        q: query || "",
        category,
        location,
        verified: String(verifiedOnly),
        minPrice: String(minPrice),
        maxPrice: String(maxPrice),
        page: "1",
        limit: "24",
      });
      const res = await fetch(`${API}/listings?${qs.toString()}`);
      const json = await res.json();
      const items = Array.isArray(json?.items)
        ? json.items
        : Array.isArray(json)
        ? json
        : [];
      setListings(items);
    } catch (e) {
      console.error("[Marketplace] list error:", e);
    } finally {
      setLoading(false);
    }
  };

  // initial + whenever filters change
  useEffect(() => {
    fetchListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, category, location, verifiedOnly, maxPrice]);

  // ---------------------- Local filtering (kept for UI parity) ----------------------
  useEffect(() => {
    let res = listings.filter((l) => {
      const matchesQuery =
        !query ||
        l.title?.toLowerCase?.().includes(query.toLowerCase()) ||
        (l.description &&
          l.description.toLowerCase().includes(query.toLowerCase()));
      const matchesCategory = category === "All" || l.category === category;
      const matchesLocation =
        location === "All India" || l.location === location;
      const matchesVerified = !verifiedOnly || l.verified;
      const matchesPrice =
        (l.price ?? 0) >= minPrice && (l.price ?? 0) <= maxPrice;
      return (
        matchesQuery &&
        matchesCategory &&
        matchesLocation &&
        matchesVerified &&
        matchesPrice
      );
    });
    res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setFiltered(res);

    const recs = listings
      .filter(
        (i) =>
          i.category === category &&
          i.location === location &&
          i.id !== res[0]?.id
      )
      .slice(0, 4);
    setRecommendations(recs);
  }, [listings, query, category, location, verifiedOnly, minPrice, maxPrice]);

  // ---------------------- Responsive sidebar ----------------------
  useEffect(() => {
    const onResize = () => setSidebarOpen(window.innerWidth >= 992);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const openDetail = (item) => {
    setActiveItem(item);
    setShowDetail(true);
  };

  // ---------------------- Actions (API) ----------------------
  const handleDelete = async (item) => {
    const ok = await confirmDelete(item.title);
    if (!ok) return;
    try {
      const res = await fetch(`${API}/listings/${item.id}`, {
        method: "DELETE",
        headers: { ...authHeaders() },
      });
      if (!res.ok) {
        const msg = (await res.json())?.message || "Delete failed";
        Swal.fire({ icon: "error", title: "Error", text: msg });
        return;
      }
      setListings((prev) => prev.filter((p) => p.id !== item.id));
      notifySuccess("Deleted", `${item.title} removed.`);
    } catch (e) {
      console.error("[Marketplace] delete error:", e);
      Swal.fire({ icon: "error", title: "Error", text: "Delete failed" });
    }
  };

  const handlePublish = async () => {
    const required = ["title", "price", "category", "seller", "image"];
    for (const k of required) {
      if (!newListing[k]) {
        Swal.fire({
          icon: "error",
          title: "Missing field",
          text: `Please fill ${k}`,
        });
        return;
      }
    }
    const body = {
      title: newListing.title,
      price: Number(newListing.price),
      category: newListing.category,
      sellerName: newListing.seller,
      location: newListing.location || "All India",
      verifiedSeller: !!newListing.verified,
      images: [newListing.image],
      description: newListing.description || "",
      rating: Number(newListing.rating || 0),
      condition: "Used",
      status: "Active",
    };
    try {
      const res = await fetch(`${API}/listings`, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok || !json?.id) {
        Swal.fire({
          icon: "error",
          title: "Create failed",
          text: json?.message || "Unknown error",
        });
        return;
      }
      // Prepend new item
      setListings((prev) => [json, ...prev]);
      setShowCreate(false);
      setNewListing({
        title: "",
        price: "",
        category: "Electronics",
        seller: "",
        location: "",
        verified: false,
        rating: 4.5,
        image: "",
        video: "",
        description: "",
      });
      notifySuccess("Published", "Your listing is live.");
    } catch (e) {
      console.error("[Marketplace] create error:", e);
      Swal.fire({ icon: "error", title: "Error", text: "Create failed" });
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await fetch(`${API}/listings/${id}/favourite`, {
        method: "POST",
        headers: { ...authHeaders() },
      });
      setFavorites((favs) =>
        favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]
      );
    } catch (e) {
      console.error("[Marketplace] favourite error:", e);
    }
  };

  // ---------------------- JSX ----------------------
  return (
    <Container fluid className="bg-light min-vh-100 p-3">
      {/* HEADER */}
      <Row className="mb-3 align-items-center">
        <Col xs="auto">
          <Button
            variant=""
            size="sm"
            onClick={() => {
              if (window.innerWidth < 992) setMobileOffcanvasOpen(true);
              else setSidebarOpen((s) => !s);
            }}
          >
            <FaBars size={25} />
          </Button>
        </Col>
        <Col>
          <h4 className="mb-0">Marketplace</h4>
          <small className="text-muted">Buy & Sell near you</small>
        </Col>
        <Col md={5} lg={4}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search items..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row className="g-3">
        {/* DESKTOP / TABLET SIDEBAR */}
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
                <strong>Marketplace</strong>
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
                  <FaHome className="me-2 text-primary" /> Browse All
                </ListGroup.Item>
                <ListGroup.Item
                  action
                  onClick={() => setShowCreate(true)}
                  className="fw-bold text-primary"
                >
                  <FaPlus className="me-2" /> Create Listing
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

                <ListGroup.Item className="mt-3">
                  <Form.Check
                    type="switch"
                    id="verified-switch"
                    label="Verified sellers only"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                  />
                  <div className="mt-2">
                    <div className="small text-muted">
                      Max price: {formatINR(maxPrice)}
                    </div>
                    <Form.Range
                      min={0}
                      max={2000000}
                      step={5000}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                    />
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
            <Offcanvas.Title>Marketplace</Offcanvas.Title>
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
                <FaHome className="me-2 text-primary" /> Browse All
              </ListGroup.Item>
              <ListGroup.Item
                action
                onClick={() => {
                  setShowCreate(true);
                  setMobileOffcanvasOpen(false);
                }}
                className="fw-bold text-primary"
              >
                <FaPlus className="me-2" /> Create Listing
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
          <Row className="mb-3">
            <Col>
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <strong>
                    {category === "All" ? "All Listings" : category}
                  </strong>
                  <div className="small text-muted">
                    {loading ? "Loading..." : `${filtered.length} items`}
                  </div>
                </div>
                <div className="d-flex gap-2">
                  <Button variant="primary" onClick={() => setShowCreate(true)}>
                    <FaPlus /> Create
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* LISTINGS */}
          <Row xs={1} sm={2} md={2} lg={3} className="g-3">
            {filtered.map((item) => (
              <Col key={item.id}>
                <Card
                  className="h-100 shadow-sm"
                  style={{
                    cursor: "pointer",
                    transition: "transform .12s ease",
                  }}
                  onClick={() => openDetail(item)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-4px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
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
  src={item.image || (Array.isArray(item.images) && item.images[0]) || ""}
  alt={item.title}
  style={{ width: "100%", height: "100%", objectFit: "cover" }}
/>

                  </div>
                  <Card.Body className="d-flex flex-column">
                    <div className="d-flex justify-content-between">
                      <div style={{ minWidth: 0 }}>
                        <Card.Title
                          className="mb-1"
                          style={{
                            fontSize: "1rem",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {item.title}
                        </Card.Title>
                        <div className="small text-muted">
                          {item.seller} • {item.location}
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-bold text-success">
                          {formatINR(item.price)}
                        </div>
                        <div className="small">
                          <Badge bg="info">{item.category}</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="mt-auto d-flex justify-content-between align-items-center pt-2">
                      <div>
                        <Stars value={item.rating} />
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant={
                            favorites.includes(item.id)
                              ? "danger"
                              : "outline-danger"
                          }
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(item.id);
                          }}
                        >
                          <FaHeart />
                        </Button>
                        <Dropdown
                          align="end"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Dropdown.Toggle variant="light" size="sm">
                            <FaEllipsisV />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                            <Dropdown.Item onClick={() => openDetail(item)}>
                              View
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                e.stopPropagation();
                                Swal.fire({
                                  icon: "info",
                                  title: "Buy flow",
                                  text: "Hook to your checkout/payment here.",
                                });
                              }}
                            >
                              Buy
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item);
                              }}
                            >
                              Delete
                            </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* AI RECOMMENDATIONS */}
          {recommendations.length > 0 && (
            <div className="mt-4">
              <h5>Recommended for You</h5>
              <Row xs={1} sm={2} md={4} className="g-3">
                {recommendations.map((item) => (
                  <Col key={item.id}>
                    <Card
                      className="h-100 shadow-sm"
                      onClick={() => openDetail(item)}
                    >
                      <img
                        src={item.image}
                        className="card-img-top"
                        style={{ height: 120, objectFit: "cover" }}
                      />
                      <Card.Body className="p-2">
                        <div className="small text-truncate">{item.title}</div>
                        <div className="small text-muted">{item.seller}</div>
                        <div className="fw-bold text-success">
                          {formatINR(item.price)}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}
        </Col>
      </Row>

      {/* ---------------------- MODALS ---------------------- */}

      {/* Listing Detail */}
      <Modal show={showDetail} onHide={() => setShowDetail(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{activeItem?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeItem?.video && (
            <video
              src={activeItem.video}
              controls
              style={{ width: "100%", maxHeight: 360, objectFit: "cover" }}
            />
          )}
          <p className="mt-2">{activeItem?.description}</p>
          <p>
            <strong>Seller:</strong> {activeItem?.seller}
          </p>
          <p>
            <strong>Location:</strong> {activeItem?.location}
          </p>
          <p>
            <strong>Price:</strong> {formatINR(activeItem?.price)}
          </p>
          <Stars value={activeItem?.rating} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetail(false)}>
            Close
          </Button>
          <Button
            variant="success"
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "Buy flow",
                text: "Hook to your checkout/payment here.",
              })
            }
          >
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Create Listing */}
      <Modal show={showCreate} onHide={() => setShowCreate(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create New Listing</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="d-flex flex-column gap-2">
            <Form.Control
              placeholder="Title"
              value={newListing.title}
              onChange={(e) =>
                setNewListing({ ...newListing, title: e.target.value })
              }
            />
            <Form.Control
              placeholder="Price"
              type="number"
              value={newListing.price}
              onChange={(e) =>
                setNewListing({ ...newListing, price: e.target.value })
              }
            />
            <Form.Select
              value={newListing.category}
              onChange={(e) =>
                setNewListing({ ...newListing, category: e.target.value })
              }
            >
              {allCategories
                .filter((c) => c !== "All")
                .map((c) => (
                  <option key={c}>{c}</option>
                ))}
            </Form.Select>
            <Form.Control
              placeholder="Seller Name"
              value={newListing.seller}
              onChange={(e) =>
                setNewListing({ ...newListing, seller: e.target.value })
              }
            />
            <Form.Control
              placeholder="Location"
              value={newListing.location}
              onChange={(e) =>
                setNewListing({ ...newListing, location: e.target.value })
              }
            />
            <Form.Control
              placeholder="Image URL"
              value={newListing.image}
              onChange={(e) =>
                setNewListing({ ...newListing, image: e.target.value })
              }
            />
            <Form.Control
              placeholder="Video URL (optional)"
              value={newListing.video}
              onChange={(e) =>
                setNewListing({ ...newListing, video: e.target.value })
              }
            />
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Description"
              value={newListing.description}
              onChange={(e) =>
                setNewListing({ ...newListing, description: e.target.value })
              }
            />
            <Form.Check
              type="switch"
              label="Verified Seller"
              checked={newListing.verified}
              onChange={(e) =>
                setNewListing({ ...newListing, verified: e.target.checked })
              }
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreate(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handlePublish}>
            Publish
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

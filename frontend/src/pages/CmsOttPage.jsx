// CmsOttDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Badge,
  InputGroup,
  FormControl,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

const initialPackages = [
  {
    id: 1,
    name: "Premium Movies Pack",
    type: "Movies",
    genres: ["Action", "Drama"],
    priceTiers: { Basic: 199, Premium: 499, VIP: 799 },
    status: true,
    thumbnail: "https://via.placeholder.com/300x180",
    trailerList: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4",
    ],
  },
  {
    id: 2,
    name: "Sports Live Pack",
    type: "Live",
    genres: ["Sports"],
    priceTiers: { Basic: 99, Premium: 299 },
    status: false,
    thumbnail: "https://via.placeholder.com/300x180",
    trailerList: [],
  },
];

function CmsOttDashboard() {
  const [packages, setPackages] = useState(initialPackages);
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const handleClose = () => {
    setShowModal(false);
    setEditingPackage(null);
  };

  const handleShow = (pkg = null) => {
    setEditingPackage(pkg);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the package permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setPackages(packages.filter((pkg) => pkg.id !== id));
        Swal.fire("Deleted!", "Package removed.", "success");
      }
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;

    // Dynamic price tiers
    const tiers = {};
    Array.from(form.elements)
      .filter((el) => el.name.startsWith("tierName"))
      .forEach((el, i) => {
        const priceInput = form.elements[`tierPrice${i}`];
        if (el.value && priceInput) tiers[el.value] = parseFloat(priceInput.value) || 0;
      });

    // Collect trailer URLs
    const trailerList = [];
    Array.from(form.elements)
      .filter((el) => el.name.startsWith("trailerUrl"))
      .forEach((el) => {
        if (el.value) trailerList.push(el.value);
      });

    const newPackage = {
      id: editingPackage?.id || Date.now(),
      name: form.name.value,
      type: form.type.value,
      genres: form.genres.value.split(",").map((g) => g.trim()),
      priceTiers: tiers,
      status: form.status.checked,
      thumbnail: form.thumbnail.value || "https://via.placeholder.com/300x180",
      trailerList,
    };

    if (editingPackage) {
      setPackages(packages.map((pkg) => (pkg.id === editingPackage.id ? newPackage : pkg)));
      Swal.fire("Updated!", "Package updated successfully.", "success");
    } else {
      setPackages([...packages, newPackage]);
      Swal.fire("Added!", "Package added successfully.", "success");
    }

    handleClose();
  };

  const filteredPackages = packages.filter((pkg) => {
    const searchMatch =
      pkg.name.toLowerCase().includes(search.toLowerCase()) ||
      pkg.type.toLowerCase().includes(search.toLowerCase()) ||
      pkg.genres.join(",").toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter ? pkg.type === typeFilter : true;
    const statusMatch =
      statusFilter === "Active"
        ? pkg.status
        : statusFilter === "Inactive"
        ? !pkg.status
        : true;
    return searchMatch && typeMatch && statusMatch;
  });

  return (
    <Container className="m-4 h-100">
      <Row className="align-items-center mb-3">
        <Col>
          <h2>OTT Packages Dashboard</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => handleShow()} variant="primary">
            + Add New Package
          </Button>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col md={4}>
          <InputGroup>
            <FormControl
              placeholder="Search by name, type, genre..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={() => setSearch("")}>
              Clear
            </Button>
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option>
            <option value="Movies">Movies</option>
            <option value="Series">Series</option>
            <option value="Live">Live</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </Form.Select>
        </Col>
      </Row>

      <Row className="g-4">
        {filteredPackages.map((pkg) => (
          <Col key={pkg.id} xs={12} sm={6} md={4} lg={3}>
            <div className="card-hover-container position-relative">
              <Card className="shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={pkg.thumbnail}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{pkg.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{pkg.type}</Card.Subtitle>
                  <div className="mb-2">
                    {pkg.genres.map((g, i) => (
                      <Badge key={i} bg="info" className="me-1">
                        {g}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-2">
                    {Object.entries(pkg.priceTiers).map(([tier, price]) => (
                      <Badge key={tier} bg="success" className="me-1">
                        {tier}: ₹{price}
                      </Badge>
                    ))}
                  </div>
                  <Badge
                    bg={pkg.status ? "success" : "secondary"}
                    className="mb-2"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setPackages(
                        packages.map((p) =>
                          p.id === pkg.id ? { ...p, status: !p.status } : p
                        )
                      )
                    }
                  >
                    {pkg.status ? "Active" : "Inactive"}
                  </Badge>
                </Card.Body>
              </Card>
              <div className="card-hover-overlay text-center">
                <h5>{pkg.name}</h5>
                <div className="mb-2">
                  {pkg.genres.map((g, i) => (
                    <Badge key={i} bg="info" className="me-1">
                      {g}
                    </Badge>
                  ))}
                </div>
                <div className="mb-2">
                  {Object.entries(pkg.priceTiers).map(([tier, price]) => (
                    <Badge key={tier} bg="success" className="me-1">
                      {tier}: ₹{price}
                    </Badge>
                  ))}
                </div>
                <div>
                  <Button size="sm" variant="info" onClick={() => handleShow(pkg)}>
                    Edit
                  </Button>{" "}
                  {pkg.trailerList?.length > 0 && (
                    <Button
                      size="sm"
                      variant="warning"
                      onClick={() => {
                        setEditingPackage(pkg);
                        setShowTrailer(true);
                      }}
                    >
                      Preview
                    </Button>
                  )}{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(pkg.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleClose} size="lg" centered className="custom-modal">
        <Form onSubmit={handleSave}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingPackage ? "Edit Package" : "Add New Package"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-2">
              <Form.Label>Package Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                defaultValue={editingPackage?.name || ""}
                required
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Type</Form.Label>
              <Form.Select
                name="type"
                defaultValue={editingPackage?.type || ""}
                required
              >
                <option value="">Select Type</option>
                <option value="Movies">Movies</option>
                <option value="Series">Series</option>
                <option value="Live">Live</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Genres (comma separated)</Form.Label>
              <Form.Control
                type="text"
                name="genres"
                defaultValue={editingPackage?.genres.join(",") || ""}
              />
            </Form.Group>

            {/* Dynamic price tiers */}
            {editingPackage
              ? Object.entries(editingPackage.priceTiers).map(([tier, price], i) => (
                  <Row key={i} className="mb-2">
                    <Col>
                      <Form.Control type="text" name={`tierName${i}`} defaultValue={tier} />
                    </Col>
                    <Col>
                      <Form.Control type="number" name={`tierPrice${i}`} defaultValue={price} />
                    </Col>
                  </Row>
                ))
              : (
                <Row className="mb-2">
                  <Col>
                    <Form.Control type="text" name="tierName0" placeholder="Tier Name" />
                  </Col>
                  <Col>
                    <Form.Control type="number" name="tierPrice0" placeholder="Price" />
                  </Col>
                </Row>
              )}

            <Form.Group className="mb-2">
              <Form.Label>Thumbnail URL</Form.Label>
              <Form.Control
                type="text"
                name="thumbnail"
                defaultValue={editingPackage?.thumbnail || ""}
              />
            </Form.Group>

            {/* Dynamic Trailer URLs */}
            <Form.Label>Trailer URLs</Form.Label>
            {(editingPackage?.trailerList || [""]).map((url, idx) => (
              <Row key={idx} className="mb-2">
                <Col>
                  <Form.Control
                    type="text"
                    name={`trailerUrl${idx}`}
                    defaultValue={url}
                    placeholder="Trailer URL"
                  />
                </Col>
              </Row>
            ))}

            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Active"
                name="status"
                defaultChecked={editingPackage?.status || false}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingPackage ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Trailer Modal with Carousel */}
      <Modal
        show={showTrailer}
        onHide={() => {
          setShowTrailer(false);
          setEditingPackage(null);
        }}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Trailer Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingPackage?.trailerList && editingPackage.trailerList.length > 0 ? (
            <Carousel variant="dark" interval={null}>
              {editingPackage.trailerList.map((trailerUrl, idx) => (
                <Carousel.Item key={idx}>
                  <video
                    src={trailerUrl}
                    controls
                    autoPlay={idx === 0}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-muted">No trailer available</p>
          )}
        </Modal.Body>
      </Modal>

      {/* Styles */}
      <style>{`
        .custom-modal .modal-content {
          border-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
          background-color: #fcf3f3ff;
          color: #1f1c1cff;
        }
        .custom-modal .modal-header, .custom-modal .modal-footer {
          border-color: #444;
        }
        .custom-modal .form-control {
          background-color: #d3c7c7ff;
          color: #1f1c1cff;
          border: 1px solid #555;
        }
        .custom-modal .form-control:focus {
          border-color: #ff3d00;
          box-shadow: none;
        }

        .card-hover-container {
          position: relative;
        }
        .card-hover-overlay {
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          background: rgba(28,28,28,0.85);
          color: #fff;
          opacity:0;
          transition: opacity 0.3s;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          border-radius:6px;
          padding:10px;
        }
        .card-hover-container:hover .card-hover-overlay {
          opacity:1;
        }
      `}</style>
    </Container>
  );
}

export default CmsOttDashboard;

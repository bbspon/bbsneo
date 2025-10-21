import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
  Carousel,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample XR Events
const xrEvents = [
  {
    id: 1,
    type: "Holographic Premiere",
    title: "Avatar 3 Premiere",
    date: "2025-11-01",
    time: "18:00",
    venue: "XR Holo Hall",
    access: "Ticketed",
    rating: 4.9,
    poster: "https://images.thedirect.com/media/article_full/avatar-3-release.jpg",
    description: "Experience Avatar 3 in holographic XR premiere.",
    device: ["XR Headset", "Mobile"],
  },
  {
    id: 2,
    type: "3D Fan Meet",
    title: "Celebrity Fan Meet: John Doe",
    date: "2025-11-05",
    time: "20:00",
    venue: "XR Arena",
    access: "Subscription",
    rating: 4.8,
    poster: "https://tse3.mm.bing.net/th/id/OIP.CH6L-vuSCM967kdmHSvOuQHaE8?rs=1&pid=ImgDetMain&o=7&rm=3",
    description: "Interact with John Doe in a 3D XR environment.",
    device: ["XR Headset", "Mobile"],
  },
  {
    id: 3,
    type: "Special XR Event",
    title: "AR Music Concert: The Beats",
    date: "2025-11-10",
    time: "19:30",
    venue: "Virtual Stage",
    access: "Ticketed",
    rating: 4.7,
    poster: "https://media.insider.in/image/upload/c_crop,g_custom/v1673065185/rxj4gti5sbb7lciqu5nb.jpg",
    description: "Join an immersive AR music concert with The Beats.",
    device: ["XR Headset", "Mobile", "Tablet"],
  },
];

// Filters
const eventTypes = ["Holographic Premiere", "3D Fan Meet", "Special XR Event"];
const ratings = [5, 4, 3, 2, 1];

const XREventsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [filterType, setFilterType] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const handleShowModal = (event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const filteredEvents = xrEvents.filter((item) => {
    return (
      (filterType === "" || item.type === filterType) &&
      (filterRating === "" || Math.floor(item.rating) === parseInt(filterRating))
    );
  });

  return (
    <Container fluid className="my-4">
      {/* Hero Carousel */}
      <Row>
        <Col>
          <Carousel>
            {xrEvents.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.poster}
                  alt={item.title}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Button
                    variant="primary"
                    onClick={() => handleShowModal(item)}
                  >
                    Attend Event
                  </Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      <Row className="mt-4">
        {/* Sidebar Filters */}
        <Col md={3}>
          <h5>Filters</h5>
          <Form.Group className="mb-3">
            <Form.Label>Event Type</Form.Label>
            <Form.Select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="">All</option>
              {eventTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <Form.Select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="">All</option>
              {ratings.map((r, i) => (
                <option key={i} value={r}>
                  {r} Stars
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Button
            variant="secondary"
            onClick={() => {
              setFilterType("");
              setFilterRating("");
            }}
          >
            Clear All
          </Button>
        </Col>

        {/* XR Event Cards */}
        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredEvents.map((item) => (
              <Col key={item.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.poster}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.type} | {item.venue}
                    </Card.Subtitle>
                    <Card.Text>
                      {item.date} | {item.time}
                    </Card.Text>
                    <Badge bg="success" className="mb-2">
                      {item.access}
                    </Badge>{" "}
                    <Badge bg="info" className="mb-2">
                      {item.rating} ⭐
                    </Badge>
                    <br />
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(item)}
                      className="mt-2 me-2"
                    >
                      Attend Event
                    </Button>
                    <Button variant="outline-secondary" className="mt-2">
                      Add to Calendar
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for XR Event Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedEvent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvent && (
            <>
              <img
                src={selectedEvent.poster}
                alt={selectedEvent.title}
                className="img-fluid mb-3"
              />
              <p>{selectedEvent.description}</p>
              <p>
                <strong>Date:</strong> {selectedEvent.date}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.time}
              </p>
              <p>
                <strong>Venue:</strong> {selectedEvent.venue}
              </p>
              <p>
                <strong>Access:</strong> {selectedEvent.access}
              </p>
              <p>
                <strong>Rating:</strong> {selectedEvent.rating} ⭐
              </p>
              <p>
                <strong>Supported Devices:</strong>{" "}
                {selectedEvent.device.join(", ")}
              </p>
              <Button variant="success" className="me-2">
                Attend Event
              </Button>
              <Button variant="outline-primary" className="me-2">
                Add to Calendar
              </Button>
              <Button variant="outline-secondary">Share</Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <Row className="mt-5">
        <Col className="text-center text-muted">
          <p>&copy; 2025 XR Events. All rights reserved.</p>
          <p>
            <a href="#">About</a> | <a href="#">Help / FAQ</a> |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default XREventsPage;

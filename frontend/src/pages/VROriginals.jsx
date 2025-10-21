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

// Sample Data
const vrContent = [
  {
    id: 1,
    type: "Interactive Show",
    title: "Mystery VR Chronicles",
    description: "Choose your own path in this immersive thriller.",
    duration: "3 Episodes",
    rating: 4.5,
    poster: "https://cdnb.artstation.com/p/assets/covers/images/005/968/663/large/grzegorz-baran-com-title.jpg?1495062191",
    device: ["Meta Quest", "Pico", "HTC Vive"],
  },
  {
    id: 2,
    type: "VR Concert",
    title: "Live VR Concert: DJ Pulse",
    description: "Feel the music live in 360° VR experience.",
    duration: "2 Hours",
    rating: 4.7,
    poster: "https://img.freepik.com/premium-photo/photo-dj-performing-live-highenergy-concert-captivating-crowd-with-their-music_964444-732.jpg",
    device: ["Meta Quest", "HTC Vive"],
  },
  {
    id: 3,
    type: "VR Film",
    title: "The Lost Planet VR",
    description: "Explore a new world in this VR-first sci-fi film.",
    duration: "90 mins",
    rating: 4.8,
    poster: "https://static1.howtogeekimages.com/wordpress/wp-content/uploads/2024/03/quest-1.jpg",
    device: ["Meta Quest", "Pico", "HTC Vive", "WebVR"],
  },
];

// Filters Data
const genres = ["Action", "Adventure", "Music", "Horror", "Sci-Fi"];
const ratings = [5, 4, 3, 2, 1];

const VROriginalsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const handleShowModal = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const filteredContent = vrContent.filter((item) => {
    return (
      (filterGenre === "" || item.type === filterGenre) &&
      (filterRating === "" || Math.floor(item.rating) === parseInt(filterRating))
    );
  });

  return (
    <Container fluid className="my-4">
      {/* Hero Carousel */}
      <Row>
        <Col>
          <Carousel>
            {vrContent.map((item) => (
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
                    Watch in VR
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
            <Form.Label>Genre / Type</Form.Label>
            <Form.Select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
            >
              <option value="">All</option>
              {genres.map((genre, i) => (
                <option key={i} value={genre}>
                  {genre}
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
              setFilterGenre("");
              setFilterRating("");
            }}
          >
            Clear All
          </Button>
        </Col>

        {/* VR Content Cards */}
        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredContent.map((item) => (
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
                      {item.type} | {item.duration}
                    </Card.Subtitle>
                    <Card.Text>{item.description}</Card.Text>
                    <Badge bg="info" className="mb-2">
                      {item.rating} ⭐
                    </Badge>
                    <br />
                    <Button
                      variant="primary"
                      onClick={() => handleShowModal(item)}
                      className="mt-2"
                    >
                      Watch in VR
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for Content Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContent && (
            <>
              <img
                src={selectedContent.poster}
                alt={selectedContent.title}
                className="img-fluid mb-3"
              />
              <p>{selectedContent.description}</p>
              <p>
                <strong>Duration:</strong> {selectedContent.duration}
              </p>
              <p>
                <strong>Rating:</strong> {selectedContent.rating} ⭐
              </p>
              <p>
                <strong>Supported Devices:</strong>{" "}
                {selectedContent.device.join(", ")}
              </p>
              <Button variant="success" className="me-2">
                Watch in VR
              </Button>
              <Button variant="outline-primary">Add to Watchlist</Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <Row className="mt-5">
        <Col className="text-center text-muted">
          <p>&copy; 2025 VR Originals. All rights reserved.</p>
          <p>
            <a href="#">About</a> | <a href="#">Help / FAQ</a> |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default VROriginalsPage;

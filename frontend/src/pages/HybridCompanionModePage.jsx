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

// Sample Shows / Events
const shows = [
  {
    id: 1,
    title: "Game Show Live",
    type: "AR Trivia",
    genre: "Entertainment",
    time: "20:00",
    channel: "Channel A",
    access: "Free",
    rating: 4.8,
    thumbnail: "https://static.wixstatic.com/media/f6e7ef_bb4459822c8e4f2793de1ac91d1378ad~mv2.jpg/v1/fill/w_1149,h_647,q_90/f6e7ef_bb4459822c8e4f2793de1ac91d1378ad~mv2.jpg",
    description: "Test your knowledge in AR Trivia synced with TV.",
    features: ["AR Trivia", "Polls", "Mini-Games"],
  },
  {
    id: 2,
    title: "Fashion Live: AR Shopping",
    type: "AR Shopping",
    genre: "Lifestyle",
    time: "21:00",
    channel: "Channel B",
    access: "Premium",
    rating: 4.7,
    thumbnail: "https://smarttek.solutions/wp-content/uploads/ar-in-fashion.jpg",
    description: "Explore fashion products in AR while watching on TV.",
    features: ["AR Shopping", "Polls", "Rewards"],
  },
  {
    id: 3,
    title: "Music Concert Companion",
    type: "Interactive Polls",
    genre: "Music",
    time: "19:30",
    channel: "Channel C",
    access: "Ticketed",
    rating: 4.9,
    thumbnail: "https://m.media-amazon.com/images/I/71Ie9deFB+L._SL1276_.jpg",
    description:
      "Participate in polls and mini-games while watching live concert.",
    features: ["Polls", "Mini-Games", "Rewards"],
  },
];

const genres = ["Entertainment", "Lifestyle", "Music"];
const ratings = [5, 4, 3, 2, 1];

const HybridCompanionModePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedShow, setSelectedShow] = useState(null);
  const [filterGenre, setFilterGenre] = useState("");
  const [filterRating, setFilterRating] = useState("");

  const handleShowModal = (show) => {
    setSelectedShow(show);
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const filteredShows = shows.filter((item) => {
    return (
      (filterGenre === "" || item.genre === filterGenre) &&
      (filterRating === "" || Math.floor(item.rating) === parseInt(filterRating))
    );
  });

  return (
    <Container fluid className="my-4">
      {/* Hero Carousel */}
      <Row>
        <Col>
          <Carousel>
            {shows.map((item) => (
              <Carousel.Item key={item.id}>
                <img
                  className="d-block w-100"
                  src={item.thumbnail}
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
                    Start Companion Mode
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
            <Form.Label>Genre</Form.Label>
            <Form.Select
              value={filterGenre}
              onChange={(e) => setFilterGenre(e.target.value)}
            >
              <option value="">All</option>
              {genres.map((g, i) => (
                <option key={i} value={g}>
                  {g}
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

        {/* Show/Event Cards */}
        <Col md={9}>
          <Row xs={1} md={2} lg={3} className="g-4">
            {filteredShows.map((item) => (
              <Col key={item.id}>
                <Card className="h-100">
                  <Card.Img
                    variant="top"
                    src={item.thumbnail}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {item.genre} | {item.channel}
                    </Card.Subtitle>
                    <Card.Text>Time: {item.time}</Card.Text>
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
                      Start Companion Mode
                    </Button>
                    <Button variant="outline-secondary" className="mt-2">
                      Add to Watchlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Modal for Show/Event Details */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{selectedShow?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedShow && (
            <>
              <img
                src={selectedShow.thumbnail}
                alt={selectedShow.title}
                className="img-fluid mb-3"
              />
              <p>{selectedShow.description}</p>
              <p>
                <strong>Time:</strong> {selectedShow.time}
              </p>
              <p>
                <strong>Channel:</strong> {selectedShow.channel}
              </p>
              <p>
                <strong>Genre:</strong> {selectedShow.genre}
              </p>
              <p>
                <strong>Access:</strong> {selectedShow.access}
              </p>
              <p>
                <strong>Rating:</strong> {selectedShow.rating} ⭐
              </p>
              <p>
                <strong>Features:</strong> {selectedShow.features.join(", ")}
              </p>

              {/* Placeholder Buttons for Companion Features */}
              <Button variant="success" className="me-2">
                Start AR Trivia
              </Button>
              <Button variant="info" className="me-2">
                Start AR Shopping
              </Button>
              <Button variant="warning" className="me-2">
                Participate in Poll
              </Button>
              <Button variant="outline-secondary">Share</Button>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* Footer */}
      <Row className="mt-5">
        <Col className="text-center text-muted">
          <p>&copy; 2025 Hybrid Companion Mode. All rights reserved.</p>
          <p>
            <a href="#">About</a> | <a href="#">Help / FAQ</a> |{" "}
            <a href="#">Privacy Policy</a> | <a href="#">Terms</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default HybridCompanionModePage;

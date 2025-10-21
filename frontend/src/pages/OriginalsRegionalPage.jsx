import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Carousel,
  Modal,
  Form,
} from "react-bootstrap";
import ReactPlayer from "react-player";


// Sample Data (same as before)
const flagshipOriginals = [
  {
    id: 1,
    title: "Global Original 1",
    genre: "Drama",
    rating: 4.5,
    trailer: "https://blog.mystart.com/wp-content/uploads/taken.jpg",
    poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg",
  },
  {
    id: 2,
    title: "Global Original 2",
    genre: "Action",
    rating: 4.7,
    trailer: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg",
  },
];

const regionalSeries = [
  { id: 1, title: "Tamil Mini-Series", language: "Tamil", poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg" },
  { id: 2, title: "Telugu Mini-Series", language: "Telugu", poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg" },
  { id: 3, title: "Hindi Mini-Series", language: "Hindi", poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg" },
];

const interactiveOriginals = [
  { id: 1, title: "Branching Story 1", poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg" },
];

const vrConcerts = [
  { id: 1, title: "VR Concert India", poster: "https://blog.mystart.com/wp-content/uploads/taken.jpg", video: "https://www.youtube.com/watch?v=ysz5S6PUM-U" },
];

export default function OriginalsRegionalPageStyled() {
  const [showTrailer, setShowTrailer] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [filterLanguage, setFilterLanguage] = useState("All");

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const filteredRegionalSeries =
    filterLanguage === "All"
      ? regionalSeries
      : regionalSeries.filter((s) => s.language === filterLanguage);

  return (
  <>
    <Container fluid className="originals-page bg-dark text-white py-5">
      {/* Flagship Originals */}
      <h2 className="mb-4 section-title">Flagship Originals</h2>
      <Carousel className="mb-5 flagship-carousel">
        {flagshipOriginals.map((show) => (
          <Carousel.Item key={show.id}>
            <Row className="align-items-center">
              <Col md={5}>
                <div className="poster-container">
                  <img className="d-block w-100 rounded-lg shadow-lg poster-img" src={show.poster} alt={show.title} />
                  <Badge className="position-absolute rating-badge" bg="warning">{show.rating} ⭐</Badge>
                </div>
              </Col>
              <Col md={7}>
                <h3 className="show-title">{show.title}</h3>
                <p className="genre-text">{show.genre}</p>
                <div className="d-flex gap-3 mt-3">
                  <Button
                    variant="danger"
                    onClick={() => { setCurrentTrailer(show.trailer); setShowTrailer(true); }}
                  >
                    Watch Trailer
                  </Button>
                  <Button
                    variant={watchlist.includes(show.id) ? "success" : "outline-light"}
                    onClick={() => toggleWatchlist(show.id)}
                  >
                    {watchlist.includes(show.id) ? "In Watchlist" : "Add to Watchlist"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Regional Mini-Series */}
      <h2 className="mb-3 section-title">Regional Mini-Series</h2>
      <Form.Select
        value={filterLanguage}
        onChange={(e) => setFilterLanguage(e.target.value)}
        className="mb-3 w-25 filter-select bg-dark text-white border-secondary"
      >
        <option>All</option>
        <option>Tamil</option>
        <option>Telugu</option>
        <option>Hindi</option>
        <option>Malayalam</option>
        <option>Bengali</option>
        <option>Marathi</option>
        <option>Arabic</option>
      </Form.Select>
      <Row className="mb-5">
        {filteredRegionalSeries.map((series) => (
          <Col md={3} className="mb-4" key={series.id}>
            <Card className="bg-dark text-white series-card shadow-lg hover-scale">
              <Card.Img src={series.poster} className="rounded-lg" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end p-2 overlay-gradient">
                <Card.Title>{series.title}</Card.Title>
                <Badge bg="info">{series.language}</Badge>
                <Button
                  variant={watchlist.includes(series.id) ? "success" : "outline-light"}
                  onClick={() => toggleWatchlist(series.id)}
                  className="mt-2"
                >
                  {watchlist.includes(series.id) ? "In Watchlist" : "Add to Watchlist"}
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Interactive Originals */}
      <h2 className="mb-3 section-title">Interactive Originals</h2>
      <Row className="mb-5">
        {interactiveOriginals.map((io) => (
          <Col md={3} className="mb-4" key={io.id}>
            <Card className="bg-dark text-white interactive-card shadow-lg hover-scale">
              <Card.Img src={io.poster} className="rounded-lg" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end p-2 overlay-gradient">
                <Card.Title>{io.title}</Card.Title>
                <Button variant="danger" className="mt-2">Start Experience</Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      {/* 360° VR Concerts */}
      <h2 className="mb-3 section-title">360° VR Concerts</h2>
      <Row className="mb-5">
        {vrConcerts.map((concert) => (
          <Col md={4} className="mb-4" key={concert.id}>
            <Card className="bg-dark text-white vr-card shadow-lg hover-scale">
              <Card.Img src={concert.poster} className="rounded-lg" />
              <Card.ImgOverlay className="d-flex flex-column justify-content-end p-2 overlay-gradient">
                <Card.Title>{concert.title}</Card.Title>
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={() => { setCurrentTrailer(concert.video); setShowTrailer(true); }}
                >
                  Watch Concert
                </Button>
              </Card.ImgOverlay>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Trailer Modal */}
      <Modal show={showTrailer} onHide={() => setShowTrailer(false)} size="lg" centered className="modal-dark">
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Trailer / Video</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <ReactPlayer url={currentTrailer} width="100%" height="500px" controls className="rounded" />
        </Modal.Body>
      </Modal>
    </Container>
    <style>
        {`
        .originals-page {
  background-color: #121212;
  color: #fff;
  font-family: 'Helvetica Neue', sans-serif;
}

.section-title {
  font-weight: 700;
  margin-bottom: 1rem;
  border-left: 5px solid #e50914;
  padding-left: 10px;
}

.poster-container {
  position: relative;
}

.poster-img {
  transition: transform 0.3s ease;
}

.poster-img:hover {
  transform: scale(1.05);
}

.rating-badge {
  top: 10px;
  right: 10px;
  font-weight: 700;
}

.hover-scale:hover {
  transform: scale(1.05);
  transition: transform 0.3s ease;
}

.overlay-gradient {
  background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0));
  border-radius: 8px;
}

.filter-select {
  max-width: 200px;
}

.modal-dark .modal-content {
  background-color: #181818;
  color: #fff;
}
`}
    </style>
  </>
  );
}

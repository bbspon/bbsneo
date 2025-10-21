// MoviePlayScreen.jsx
import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlay,
  FaPause,
  FaHeart,
  FaShareAlt,
  FaVolumeUp,
  FaVolumeMute,
  FaExpand,
} from "react-icons/fa";

// Mock Movie Data
const movieData = {
  title: "Epic Adventure: Rise of Legends",
  year: 2025,
  duration: "2h 15m",
  genre: ["Action", "Adventure", "Fantasy"],
  rating: "PG-13",
  synopsis:
    "A hero embarks on an epic journey to save the kingdom from an ancient evil threatening all lands.",
  cast: ["John Doe", "Jane Smith", "Alex Johnson"],
  trailerUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
  recommendations: [
    { title: "Epic Adventure 2", thumbnail: "https://th.bing.com/th/id/OIP.geZ8Bk8rtvwneC1dhdxg9QHaK4?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Legendary Quest", thumbnail: "https://th.bing.com/th/id/OIP.geZ8Bk8rtvwneC1dhdxg9QHaK4?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
    { title: "Fantasy Realm", thumbnail: "https://th.bing.com/th/id/OIP.geZ8Bk8rtvwneC1dhdxg9QHaK4?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3" },
  ],
  audioTracks: ["English", "Spanish", "French"],
  subtitles: ["Off", "English", "Spanish", "French"],
};

function MoviePlayScreen() {
  const videoRef = useRef(null);
  const videoContainerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showAudioModal, setShowAudioModal] = useState(false);
  const [showSubtitleModal, setShowSubtitleModal] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState("English");
  const [selectedSubtitle, setSelectedSubtitle] = useState("Off");

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const toggleFullScreen = () => {
    if (!videoContainerRef.current) return;
    if (!isFullScreen) {
      if (videoContainerRef.current.requestFullscreen) {
        videoContainerRef.current.requestFullscreen();
      } else if (videoContainerRef.current.webkitRequestFullscreen) {
        videoContainerRef.current.webkitRequestFullscreen();
      } else if (videoContainerRef.current.msRequestFullscreen) {
        videoContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Container fluid className="p-0 movie-play-screen" style={{ backgroundColor: "#000", color: "#fff" }}>
        {/* Video Player */}
        <div className={`video-container position-relative ${isFullScreen ? "fullscreen-video" : ""}`} ref={videoContainerRef}>
          <video
            ref={videoRef}
            src={movieData.trailerUrl}
            style={{ width: "100%", height: "100%" }}
            controls={false}
          />
          {/* Controls Overlay */}
          <div
            className="controls-overlay position-absolute w-100 h-100 top-0 d-flex flex-column justify-content-end p-3"
            style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.7))" }}
          >
            <Row className="align-items-center">
              <Col md="auto">
                <Button variant="light" onClick={togglePlay} className="me-2">
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </Button>
                <Button variant="light" onClick={toggleMute} className="me-2">
                  {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </Button>
                <Button variant="light" onClick={toggleFullScreen}>
                  <FaExpand />
                </Button>
              </Col>
              <Col md="auto">
                <Button variant="outline-light" className="me-2" onClick={() => setShowAudioModal(true)}>
                  Audio: {selectedAudio}
                </Button>
                <Button variant="outline-light" onClick={() => setShowSubtitleModal(true)}>
                  Subtitles: {selectedSubtitle}
                </Button>
              </Col>
              <Col className="text-end">
                <Button variant="outline-light" className="me-2">
                  <FaHeart /> Watchlist
                </Button>
                <Button variant="outline-light">
                  <FaShareAlt /> Share
                </Button>
              </Col>
            </Row>
          </div>
        </div>

        {/* Movie Info */}
        <Container className="my-3">
          <h2>
            {movieData.title} <Badge bg="secondary">{movieData.year}</Badge>
          </h2>
          <p>
            {movieData.duration} | {movieData.genre.join(", ")} | Rating: {movieData.rating}
          </p>
          <p>{movieData.synopsis}</p>
          <p><strong>Cast:</strong> {movieData.cast.join(", ")}</p>
        </Container>

        {/* Recommendations */}
        <Container className="my-4">
          <h4>More Like This</h4>
          <Row>
            {movieData.recommendations.map((rec, idx) => (
              <Col md={3} sm={6} xs={6} key={idx} className="mb-3">
                <Card style={{ backgroundColor: "#111", border: "none" }}>
                  <Card.Img variant="top" src={rec.thumbnail} />
                  <Card.Body>
                    <Card.Title style={{ fontSize: "1rem" }}>{rec.title}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        {/* Audio Modal */}
        <Modal show={showAudioModal} onHide={() => setShowAudioModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: "#222", color: "#fff" }}>
            <Modal.Title>Select Audio Track</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#111" }}>
            <ListGroup variant="flush">
              {movieData.audioTracks.map((track, idx) => (
                <ListGroup.Item
                  key={idx}
                  active={track === selectedAudio}
                  action
                  onClick={() => { setSelectedAudio(track); setShowAudioModal(false); }}
                  style={{ backgroundColor: track === selectedAudio ? "#444" : "#111", color: "#fff", cursor: "pointer" }}
                >
                  {track}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>

        {/* Subtitle Modal */}
        <Modal show={showSubtitleModal} onHide={() => setShowSubtitleModal(false)} centered>
          <Modal.Header closeButton style={{ backgroundColor: "#222", color: "#fff" }}>
            <Modal.Title>Select Subtitle</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#111" }}>
            <ListGroup variant="flush">
              {movieData.subtitles.map((sub, idx) => (
                <ListGroup.Item
                  key={idx}
                  active={sub === selectedSubtitle}
                  action
                  onClick={() => { setSelectedSubtitle(sub); setShowSubtitleModal(false); }}
                  style={{ backgroundColor: sub === selectedSubtitle ? "#444" : "#111", color: "#fff", cursor: "pointer" }}
                >
                  {sub}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
        </Modal>

        {/* Advanced Feature Placeholder */}
        <Container className="my-5 text-center">
          <h5>Advanced Features Coming Soon:</h5>
          <p>AI Highlights, Multi-view Commentary, Interactive Quizzes, Co-watch, VR Mode, Gamification.</p>
        </Container>
      </Container>

      <style>
        {`
          .video-container {
            width: 100%;
            height: 70vh;
            background-color: #000;
          }

          .video-container.fullscreen-video {
            width: 100%;
            height: 100vh;
          }

          .video-container video {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          .controls-overlay button {
            min-width: 40px;
          }
        `}
      </style>
    </>
  );
}

export default MoviePlayScreen;

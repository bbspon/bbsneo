// PlayerSDKPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  Modal,
  Form,
  ListGroup,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand } from "react-icons/fa";
import { AiOutlineGift, AiOutlineBranches } from "react-icons/ai";

// Mock data for interactive choices & rewards
const MOCK_CHOICES = [
  { id: 1, text: "Take the left path" },
  { id: 2, text: "Take the right path" },
];

const MOCK_REWARDS = [
  { id: 1, description: "10 credits for watching ad" },
  { id: 2, description: "5 bonus points for interaction" },
];

function PlayerSDKPage() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [fullscreen, setFullscreen] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [showRewards, setShowRewards] = useState(false);
  const [beacons, setBeacons] = useState({
    startup: null,
    rebuffer: 0,
    bitrate: "auto",
  });

  // Playback event tracking (QoE beacons)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setBeacons((prev) => ({ ...prev, startup: Date.now() }));
    const handleWaiting = () => setBeacons((prev) => ({ ...prev, rebuffer: prev.rebuffer + 1 }));
    video.addEventListener("play", handlePlay);
    video.addEventListener("waiting", handleWaiting);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("waiting", handleWaiting);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    if (volume > 0) {
      video.volume = 0;
      setVolume(0);
    } else {
      video.volume = 1;
      setVolume(1);
    }
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!fullscreen) {
      video.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setFullscreen(!fullscreen);
  };

  const handleChoiceSelect = (choiceId) => {
    setSelectedChoice(choiceId);
    setShowChoices(false);
    // Log analytics event for user choice
    console.log("Choice selected:", choiceId);
    setShowRewards(true); // show reward for interaction
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={8}>
          <Card>
            <video
              ref={videoRef}
              src="https://www.w3schools.com/html/mov_bbb.mp4"
              controls={false}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <Card.Body className="d-flex justify-content-between align-items-center mt-2">
              <Button onClick={togglePlay}>{isPlaying ? <FaPause /> : <FaPlay />}</Button>
              <Button onClick={toggleMute}>{volume > 0 ? <FaVolumeUp /> : <FaVolumeMute />}</Button>
              <Button onClick={toggleFullscreen}>
                <FaExpand />
              </Button>
              <Badge bg="info">ABR: {beacons.bitrate}</Badge>
              <Badge bg="warning">Rebuffers: {beacons.rebuffer}</Badge>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Interactive choices */}
          <Card className="mb-3">
            <Card.Header>
              <AiOutlineBranches /> Interactive Choices
            </Card.Header>
            <ListGroup variant="flush">
              {MOCK_CHOICES.map((choice) => (
                <ListGroup.Item
                  key={choice.id}
                  action
                  active={selectedChoice === choice.id}
                  onClick={() => handleChoiceSelect(choice.id)}
                >
                  {choice.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* Rewards */}
          <Card>
            <Card.Header>
              <AiOutlineGift /> Rewards
            </Card.Header>
            <ListGroup variant="flush">
              {showRewards
                ? MOCK_REWARDS.map((reward) => (
                    <ListGroup.Item key={reward.id}>{reward.description}</ListGroup.Item>
                  ))
                : <ListGroup.Item>No rewards yet. Interact with content!</ListGroup.Item>}
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Modals for advanced features */}
      <Modal show={showChoices} onHide={() => setShowChoices(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make a Choice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {MOCK_CHOICES.map((choice) => (
            <Button
              key={choice.id}
              className="m-1"
              onClick={() => handleChoiceSelect(choice.id)}
            >
              {choice.text}
            </Button>
          ))}
        </Modal.Body>
      </Modal>

      {/* Alerts for QoE / analytics */}
      <Alert variant="info" className="mt-3">
        Startup Time: {beacons.startup ? `${(Date.now() - beacons.startup) / 1000}s` : "Pending"}
      </Alert>
    </Container>
  );
}

export default PlayerSDKPage;

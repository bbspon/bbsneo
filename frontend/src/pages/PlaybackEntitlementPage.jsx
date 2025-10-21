import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Modal,
  Badge,
  ListGroup,
  Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause, FaVolumeUp, FaVolumeMute, FaExpand, FaDownload } from "react-icons/fa";

// Mock Data for content
const CONTENT = {
  title: "Sample Video Content",
  description: "Secure DRM-protected video with offline support, ads, and entitlement checks.",
  url: "https://example.com/video/secure.mpd", // Tokenized URL placeholder
  subtitles: [
    { lang: "en", label: "English", url: "/subs/en.vtt" },
    { lang: "es", label: "Spanish", url: "/subs/es.vtt" },
  ],
  audioTracks: [
    { lang: "en", label: "English" },
    { lang: "es", label: "Spanish" },
  ],
};

export default function PlaybackEntitlementPage() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState(CONTENT.subtitles[0].lang);
  const [selectedAudio, setSelectedAudio] = useState(CONTENT.audioTracks[0].lang);

  // Play / Pause toggle
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPlaying(true);
    } else {
      videoRef.current.pause();
      setPlaying(false);
    }
  };

  // Mute / Unmute toggle
  const toggleMute = () => {
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  // Mock download simulation
  const handleDownload = () => {
    setShowDownloadModal(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setDownloadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 300);
  };

  // Handle subtitle change
  const handleSubtitleChange = (e) => {
    setSelectedSubtitle(e.target.value);
    // Placeholder for loading subtitle track
  };

  // Handle audio change
  const handleAudioChange = (e) => {
    setSelectedAudio(e.target.value);
    // Placeholder for changing audio track
  };

  useEffect(() => {
    // Placeholder: Fetch entitlement & DRM license before playback
    console.log("Fetching DRM license and signed URL...");
  }, []);

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <h4>{CONTENT.title}</h4>
              <p>{CONTENT.description}</p>
              <div className="video-wrapper position-relative">
                <video
                  ref={videoRef}
                  src={CONTENT.url}
                  controls={false}
                  width="100%"
                  style={{ backgroundColor: "#000" }}
                >
                  {CONTENT.subtitles.map((sub) => (
                    <track
                      key={sub.lang}
                      label={sub.label}
                      kind="subtitles"
                      srcLang={sub.lang}
                      src={sub.url}
                      default={sub.lang === selectedSubtitle}
                    />
                  ))}
                </video>
                <div className="video-controls mt-2 d-flex justify-content-between align-items-center flex-wrap">
                  <Button variant="light" onClick={togglePlay}>
                    {playing ? <FaPause /> : <FaPlay />}
                  </Button>
                  <Button variant="light" onClick={toggleMute}>
                    {muted ? <FaVolumeMute /> : <FaVolumeUp />}
                  </Button>
                  <Button variant="light" onClick={toggleFullscreen}>
                    <FaExpand />
                  </Button>
                  <Form.Select
                    value={selectedSubtitle}
                    onChange={handleSubtitleChange}
                    style={{ width: "auto" }}
                  >
                    {CONTENT.subtitles.map((sub) => (
                      <option key={sub.lang} value={sub.lang}>
                        {sub.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Select
                    value={selectedAudio}
                    onChange={handleAudioChange}
                    style={{ width: "auto" }}
                  >
                    {CONTENT.audioTracks.map((audio) => (
                      <option key={audio.lang} value={audio.lang}>
                        {audio.label}
                      </option>
                    ))}
                  </Form.Select>
                  <Button variant="primary" onClick={handleDownload}>
                    <FaDownload /> Download
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* Placeholder for SSAI ads */}
          <Card className="mb-3 bg-light">
            <Card.Body>
              <h5>Ad Placeholder (SSAI)</h5>
              <p>Server-side ads will play here during video playback.</p>
            </Card.Body>
          </Card>

          {/* Additional Usage Section */}
          <Card className="mb-3">
            <Card.Body>
              <h5>Additional Usage / Features</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>Marketing Promotions / Offers during Playback</ListGroup.Item>
                <ListGroup.Item>Proof of Viewing / Audit Logs</ListGroup.Item>
                <ListGroup.Item>Parental Control / Age Gating</ListGroup.Item>
                <ListGroup.Item>Geo-Fencing & Location-based Restrictions</ListGroup.Item>
                <ListGroup.Item>Family / Group Profile Management</ListGroup.Item>
                <ListGroup.Item>Dispute-proof DRM & License Records</ListGroup.Item>
                <ListGroup.Item>Usage Analytics / Device Stats</ListGroup.Item>
                <ListGroup.Item>Dynamic Ad Personalization</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          {/* Playback / License Info */}
          <Card className="mb-3">
            <Card.Body>
              <h5>Playback & Entitlement Info</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Tokenized URL:</strong> {CONTENT.url}
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>DRM License:</strong> Fetched / Pending
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Device Restriction:</strong> Max 3 devices
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>License Expiry:</strong> 7 days from download
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>

          {/* Advanced Features */}
          <Card className="mb-3">
            <Card.Body>
              <h5>Advanced Features</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>Resume Playback from Last Position</ListGroup.Item>
                <ListGroup.Item>Multi-camera / Angle Support</ListGroup.Item>
                <ListGroup.Item>Offline Playback Management</ListGroup.Item>
                <ListGroup.Item>Analytics Hooks (Buffering, Watch Time, Errors)</ListGroup.Item>
                <ListGroup.Item>Dynamic Ad Personalization (SSAI)</ListGroup.Item>
                <ListGroup.Item>Low-latency Live Streaming</ListGroup.Item>
                <ListGroup.Item>Voice Control / Remote Commands</ListGroup.Item>
                <ListGroup.Item>Custom Player UI & Branding</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Download Modal */}
      <Modal show={showDownloadModal} onHide={() => setShowDownloadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Downloading Content</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProgressBar now={downloadProgress} label={`${downloadProgress}%`} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDownloadModal(false)}>
            Close
          </Button>
          <Button variant="primary" disabled={downloadProgress < 100}>
            Open Offline Content
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

// MediaPipelinePage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  ListGroup,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUpload,
  FaSync,
  FaClosedCaptioning,
  FaLanguage,
  FaImage,
  FaTasks,
  FaShieldAlt,
  FaMagic,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function MediaPipelinePage() {
  const [progress, setProgress] = useState(45);
  const navigate = useNavigate();

  const sections = [
    {
      id: "ingest",
      title: "Ingest",
      icon: <FaUpload className="me-2"  />,
      features: [
        "Upload via pre-signed URLs",
        "Antivirus / Malware scan",
        "Retry/Resume support",
      ],
      link: "/ingest",
    },
    {
      id: "transcode",
      title: "Transcode",
      icon: <FaSync className="me-2" />,
      features: [
        "ABR ladders (AVC/HEVC/AV1)",
        "HDR10 / Dolby Vision",
        "Audio normalization & multi-track",
        "HLS/DASH/CMAF packaging",
        "AI content-aware encoding",
      ],
      link: "/transcode",
    },
    {
      id: "subtitles",
      title: "Subtitles",
      icon: <FaClosedCaptioning className="me-2" />,
      features: [
        "AI ASR draft generation",
        "Subtitle editor with waveform view",
        "Auto-translate subtitles",
        "Export VTT, SRT, IMSC, TTML",
        "Forced / Burned-in subs",
      ],
      link: "/subtitles",
    },
    {
      id: "dubbing",
      title: "Dubbing",
      icon: <FaLanguage className="me-2" />,
      features: [
        "AI voice dubbing (EN/TA/TE/HI)",
        "Glossary + Human review",
        "Natural voice cloning",
        "Lip-sync alignment",
      ],
      link: "/dubbing",
    },
    {
      id: "thumbnails",
      title: "Thumbnails & Trailers",
      icon: <FaImage className="me-2" />,
      features: [
        "Auto-thumbnail generator",
        "AI highlight detection (trailers)",
        "Poster & Preview GIF generation",
        "Hover-preview support",
      ],
      link: "/thumbnails",
    },
  ];

  return (
    <div className="d-flex">
      {/* Sidebar Navigation */}
      <Navbar
        bg="dark"
        variant="dark"
        className="flex-column p-3"
        style={{ minHeight: "100vh", width: "220px" }}
      >
        <Navbar.Brand className="mb-4">🎬 Media Pipeline</Navbar.Brand>
        <Nav className="flex-column">
          {sections.map((sec) => (
            <Nav.Link key={sec.id} href={`#${sec.id}`} className="text-light">
              {sec.icon} {sec.title}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="p-4 bg-light flex-grow-1">
        <h2 className="mb-4">Media Pipeline Dashboard</h2>

        <ProgressBar
          animated
          striped
          variant="info"
          now={progress}
          label={`${progress}%`}
          className="mb-4"
        />

        <Row xs={1} md={2} lg={2} className="g-4">
          {sections.map((sec, idx) => (
            <Col key={idx} id={sec.id}>
              <Card className="h-100 shadow border-0">
                <Card.Body>
                  <h5 className="mb-3 d-flex align-items-center">
                    {sec.icon} {sec.title}
                  </h5>
                  <ListGroup variant="flush">
                    {sec.features.map((f, i) => (
                      <ListGroup.Item key={i}>{f}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </Card.Body>
                <Card.Footer className="bg-white text-center">
                  {sec.link ? (
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(sec.link)}
                    >
                      Manage {sec.title}
                    </Button>
                  ) : (
                    <Button variant="secondary" size="sm" disabled>
                      Manage {sec.title}
                    </Button>
                  )}
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MediaPipelinePage;

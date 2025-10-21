// src/pages/PlatformExpansionPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";
import {
  Tv,
  Cast,
  Gamepad,
  Box,
  CarFront,
  Watch,
  Glasses,
  Sparkles
} from "lucide-react"; // Updated: replaced Vr with Glasses

const devices = [
  {
    title: "Smart TVs",
    icon: <Tv size={40} />,
    platforms: "Tizen (Samsung), WebOS (LG), Android TV, Roku, Fire TV, Apple TV",
    details:
      "Install the YourBrand app from your TV’s store and log in using remote or QR pairing. Supports 4K HDR and Dolby Atmos."
  },
  {
    title: "Casting",
    icon: <Cast size={40} />,
    platforms: "Chromecast, AirPlay, Miracast",
    details:
      "Cast instantly from mobile or desktop browsers. Supports multi-room audio and adaptive streaming."
  },
  {
    title: "Gaming Consoles",
    icon: <Gamepad size={40} />,
    platforms: "PlayStation, Xbox, Nintendo Switch (coming soon)",
    details:
      "Get the console app for cinematic gaming sessions with controller-friendly UI."
  },
  {
    title: "Set-Top Boxes",
    icon: <Box size={40} />,
    platforms: "Tata Play, Airtel Xstream, Dish, Google TV",
    details:
      "Download directly from the respective app stores or auto-update from your provider."
  },
  {
    title: "In-Car Infotainment",
    icon: <CarFront size={40} />,
    platforms: "Android Auto, Apple CarPlay, next-gen EV dashboards",
    details:
      "Stream music, podcasts, or live sports with voice control for safe driving."
  },
  {
    title: "Wearables",
    icon: <Watch size={40} />,
    platforms: "Apple Watch, WearOS, Fitbit",
    details:
      "Get notifications, quick controls, and haptic alerts for live events."
  },
  {
    title: "VR / AR",
    icon: <Glasses size={40} />, // Fixed icon
    platforms: "Oculus/Meta Quest, Apple Vision Pro, HTC Vive, PS VR2",
    details:
      "Immerse yourself in 360° cinema and interactive co-watch experiences."
  },
  {
    title: "Future Devices",
    icon: <Sparkles size={40} />,
    platforms: "Holographic displays, Smart glasses, foldable/dual-screen, IoT hubs",
    details:
      "We’re building for the next frontier—sign up to get notified when these launch."
  }
];

export default function PlatformExpansionPage() {
  const [selected, setSelected] = useState(null);

  return (
    <Container className="py-5">
      {/* Hero Section */}
      <Row className="text-center mb-5">
        <Col>
          <h1 className="display-5 fw-bold">Watch Anywhere</h1>
          <p className="lead">
            YourBrand is ready on every screen you own—now and in the future.
          </p>
          <Button variant="primary" size="lg" className="mt-3">
            Start Watching
          </Button>
        </Col>
      </Row>

      {/* Device Grid */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {devices.map((d, idx) => (
          <Col key={idx}>
            <Card
              className="h-100 shadow-sm border-0 hover-shadow cursor-pointer"
              onClick={() => setSelected(d)}
            >
              <Card.Body className="text-center">
                <div className="mb-3 text-primary">{d.icon}</div>
                <Card.Title>{d.title}</Card.Title>
                <Card.Text className="small text-muted">{d.platforms}</Card.Text>
                <Button variant="outline-primary" size="sm" className="mt-2">
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Future/Advanced Section */}
      <Row className="mt-5">
        <Col className="text-center">
          <h2 className="fw-semibold">Future-Ready Features</h2>
          <p className="text-muted">
            QR code pairing, cross-device resume, AI personalization,
            AR previews, multi-device co-watch, and more.
          </p>
        </Col>
      </Row>

      {/* Modal for Details */}
      <Modal
        show={!!selected}
        onHide={() => setSelected(null)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{selected?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fw-bold">Platforms: {selected?.platforms}</p>
          <p>{selected?.details}</p>
          <p className="text-muted small">
            Coming soon: AI-driven personalization, device analytics,
            push-to-device links, and more.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSelected(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

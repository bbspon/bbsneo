// AdditionalLayersPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Navbar,
  Nav,
  Badge,
} from "react-bootstrap";

// Sample data for each section
const sections = [
  {
    title: "Hyper-Personalized Viewing",
    features: [
      "Mood-based UI: UI adapts to user emotion, time of day, or context",
      "Adaptive Storytelling: Variable pacing, branching narratives, alternate endings",
      "AI Scene Summaries: Auto-generated 'Previously On...' recaps or chapter highlights",
      "Smart Recommendations based on micro-behaviors",
      "Future: Emotion-detection via camera or wearable",
      "Future: Personalized trailer generation",
      "Future: Cross-device continuation of mood/storyline",
    ],
  },
  {
    title: "Education & Knowledge",
    features: [
      "Edutainment: Documentaries, interactive learning videos",
      "Skill Tie-ins: Suggest courses, books, podcasts",
      "AI Mentor Mode: Quizzes & gamified learning",
      "Future: Collaborative learning groups",
      "Future: AR/VR learning extensions",
      "Future: AI tutor for real-time explanations",
    ],
  },
  {
    title: "Hybrid Offline + Online",
    features: [
      "Offline Edge Pods for ultra-fast downloads",
      "Community Theatres for small group screenings",
      "Device-as-Server caching content for others",
      "Future: Peer-to-peer content sharing",
      "Future: Edge AI recommendations",
      "Future: Offline-first AR/VR experiences",
    ],
  },
  {
    title: "Creator Boosters",
    features: [
      "Talent Discovery AI: Auto-identify rising stars",
      "Creator Collaboration Studio: In-app collab tools",
      "Licensing Exchange: Marketplace for music, clips, IP",
      "Future: AI-assisted content co-creation",
      "Future: Dynamic revenue-sharing models",
      "Future: Blockchain-powered IP tracking",
    ],
  },
  {
    title: "Finance & Economy",
    features: [
      "Micro-Sponsorships: Fans sponsor episodes for shoutouts",
      "Dynamic Pricing: Adaptive to region, usage, income",
      "Loyalty Collectibles: NFTs, badges, event passes",
      "Future: In-stream purchase of props or character skins",
      "Future: AI-driven dynamic discounts or rewards",
      "Future: Tokenization for cross-platform content ownership",
    ],
  },
  {
    title: "Health & Wellbeing",
    features: [
      "Digital Wellbeing Mode: Binge reminders, eye-strain alerts",
      "Fitness Crossover: Workout videos synced with entertainment",
      "Mental Health Layer: Calming playlists, guided sessions",
      "Future: Wearable integration for health tracking",
      "Future: AI emotional coach",
      "Future: VR/AR immersive meditation or fitness sessions",
    ],
  },
  {
    title: "Futuristic R&D",
    features: [
      "Multi-Sensory Streaming: Haptic feedback, scent, temperature",
      "Voice-Clone Dubbing: Choose celebrity/influencer voices",
      "AI 'Second Screen Director': Alternate edits, kid-friendly, short-form",
      "BCI R&D: Early mind-control/gesture interfaces",
      "Sustainability: Energy-aware streaming modes",
      "Future: Full BCI integration for hands-free navigation",
      "Future: AI-generated content personalized to neurological patterns",
      "Future: Predictive energy optimization per device/network",
    ],
  },
];

const AdditionalLayersPage = () => {
  const [modalShow, setModalShow] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState("");

  const handleFeatureClick = (feature) => {
    setSelectedFeature(feature);
    setModalShow(true);
  };

  return (
    <div style={{ backgroundColor: "#0f0f0f", color: "#fff"}}>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <Nav className="ms-auto text-white">
            <Nav.Link href="/home" className="text-white">Home</Nav.Link>
            <Nav.Link href="/Originals" className="text-white">Originals</Nav.Link>
            <Nav.Link href="/live" className="text-white">Live TV</Nav.Link>
            <Nav.Link href="/vr" className="text-white">VR</Nav.Link>
            <Nav.Link href="/community" className="text-white">Community</Nav.Link>
            <Nav.Link href="/user-profile" className="text-white">Profile</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="text-center my-5">
        <h1>Additional Layers</h1>
        <p className="lead">
          Explore hyper-personalized, futuristic, and immersive OTT experiences.
        </p>
      </Container>

      {/* Sections */}
      <Container>
        {sections.map((section, idx) => (
          <div key={idx} className="my-4">
            <h3 className="mb-3">{section.title}</h3>
            <Row xs={1} md={2} lg={3} className="g-4 my-3 ">
              {section.features.map((feature, i) => (
                <Col key={i}>
                  <Card
                    className="h-100 border border-secondary shadow-sm py-3 px-2"
                    style={{ backgroundColor: "#0f0f0f", cursor: "pointer" }}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <Card.Body>
                      <Card.Text className="text-white">{feature}</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        ))}
      </Container>

      {/* Modal for Feature Details */}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        centered
        size="lg"
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Feature Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedFeature}</p>
          <p className="text-muted">
            Additional info and future enhancement placeholders for this feature.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="text-center mt-5 p-4" style={{ backgroundColor: "#111" }}>
        <p>&copy; 2025 OTT Hub. All Rights Reserved.</p>
        <Nav className="justify-content-center">
          <Nav.Link href="#" className="text-light">
            Privacy
          </Nav.Link>
          <Nav.Link href="#" className="text-light">
            Terms
          </Nav.Link>
          <Nav.Link href="#" className="text-light">
            Support
          </Nav.Link>
        </Nav>
      </footer>
    </div>
  );
};

export default AdditionalLayersPage;

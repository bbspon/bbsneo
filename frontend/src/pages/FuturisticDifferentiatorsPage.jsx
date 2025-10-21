import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Accordion,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaVrCardboard,
  FaUsers,
  FaBrain,
  FaGlobe,
  FaBookOpen,
  FaHeartbeat,
  FaDumbbell,
  FaStar,
} from "react-icons/fa"; // All valid icons

// Core features data
const featuresData = [
  {
    id: 1,
    title: "Metaverse Integration",
    icon: <FaVrCardboard size={30} />,
    description:
      "Create avatars usable across VR worlds and interact in immersive environments.",
    cta: "Explore Metaverse",
  },
  {
    id: 2,
    title: "Holographic Social",
    icon: <FaUsers size={30} />,
    description:
      "Project friends/characters into your room with AR/VR holograms.",
    cta: "Try Holograms",
  },
  {
    id: 3,
    title: "Multi-Sensory Streams",
    icon: <FaStar size={30} />,
    description:
      "Engage touch, smell, and environment sync for fully immersive content.",
    cta: "Experience Multi-Sensory",
  },
  {
    id: 4,
    title: "Mind-to-Story (BCI)",
    icon: <FaBrain size={30} />,
    description:
      "Create shows directly from your imagination using brain-computer interface.",
    cta: "Start Mind-to-Story",
  },
  {
    id: 5,
    title: "Global Civic Channels",
    icon: <FaGlobe size={30} />,
    description:
      "Access verified government, NGO, education, and healthcare feeds.",
    cta: "Explore Civic Channels",
  },
  {
    id: 6,
    title: "OTT for Education",
    icon: <FaBookOpen size={30} />,
    description:
      "Turn documentaries into interactive VR classrooms with gamified learning.",
    cta: "Start Learning",
  },
  {
    id: 7,
    title: "OTT for Health",
    icon: <FaHeartbeat size={30} />,
    description:
      "Stress relief videos synced with wearables for personalized wellness.",
    cta: "Check Health Videos",
  },
  {
    id: 8,
    title: "OTT for Fitness",
    icon: <FaDumbbell size={30} />,
    description:
      "Gamified workouts integrated into shows/music with live leaderboards.",
    cta: "Join Fitness Challenges",
  },
];

// Futuristic extensions data
const futuristicExtensions = [
  {
    id: 1,
    title: "OTT as a Digital Nation",
    description:
      "Civic, cultural, entertainment, and commerce all integrated into a single ecosystem.",
  },
  {
    id: 2,
    title: "Dynamic AI Assistance",
    description:
      "AI guides for content discovery, fitness coaching, and civic participation.",
  },
  {
    id: 3,
    title: "Cross-Platform Interoperability",
    description:
      "Avatars, assets, and digital identities work across multiple VR/AR/OTT platforms.",
  },
  {
    id: 4,
    title: "Real-Time Environment Sync",
    description:
      "Adaptive content based on location, weather, environment, or wearable inputs.",
  },
  {
    id: 5,
    title: "Immersive Gamification",
    description:
      "Rewards across education, fitness, and entertainment for user engagement.",
  },
  {
    id: 6,
    title: "Cultural & Civic Analytics",
    description:
      "Track user participation and engagement in civic, cultural, and educational events.",
  },
];

const FuturisticDifferentiatorsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [activeFeature, setActiveFeature] = useState(null);

  // Open modal
  const handleShowModal = (feature) => {
    setActiveFeature(feature);
    setShowModal(true);
  };

  // Close modal
  const handleCloseModal = () => {
    setActiveFeature(null);
    setShowModal(false);
  };

  // Simulate using a feature
  const handleLaunchFeature = (feature) => {
    switch (feature.id) {
      case 1:
        alert("Launching Metaverse VR Demo...");
        break;
      case 2:
        alert("Opening Holographic Social Simulation...");
        break;
      case 3:
        alert("Starting Multi-Sensory Experience...");
        break;
      case 4:
        alert("Opening Mind-to-Story Creator...");
        break;
      case 5:
        alert("Opening Verified Civic Feeds...");
        break;
      case 6:
        alert("Launching Interactive VR Classroom...");
        break;
      case 7:
        alert("Starting Wellness / Stress-Relief Video...");
        break;
      case 8:
        alert("Starting Gamified Fitness Session...");
        break;
      default:
        alert("Feature coming soon!");
    }
    handleCloseModal(); // Close modal after action
  };

  return (
    <Container fluid className="py-5" style={{ backgroundColor: "#f5f7fa" }}>
      <h1 className="text-center mb-4">Futuristic Differentiators</h1>
      <p className="text-center mb-5">
        Explore next-gen features in entertainment, social, education, health, and civic engagement.
      </p>

      {/* Core Features Section */}
      <Row className="mb-5">
        {featuresData.map((feature) => (
          <Col md={6} lg={4} key={feature.id} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center text-center">
                <div className="mb-3">{feature.icon}</div>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleShowModal(feature)}
                >
                  {feature.cta}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Futuristic Extensions Section */}
      <h2 className="mb-4">Futuristic Extensions</h2>
      <Accordion defaultActiveKey="0" className="mb-5">
        {futuristicExtensions.map((extension, index) => (
          <Accordion.Item eventKey={index.toString()} key={extension.id}>
            <Accordion.Header>{extension.title}</Accordion.Header>
            <Accordion.Body>{extension.description}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      {/* Modal for Feature CTA */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{activeFeature?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{activeFeature?.description}</p>
          <ProgressBar
            now={Math.floor(Math.random() * 100)}
            label="Feature Demo"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => handleLaunchFeature(activeFeature)}
          >
            Launch Feature
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FuturisticDifferentiatorsPage;

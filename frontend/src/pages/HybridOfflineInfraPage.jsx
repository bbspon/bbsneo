// HybridOfflineInfraPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  ListGroup,
  ProgressBar,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaServer,
  FaSatellite,
  FaSolarPanel,
  FaUserShield,
  FaCloudDownloadAlt,
  FaNetworkWired,
} from "react-icons/fa";

const HybridOfflineInfraPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});
  const [greenStreaming, setGreenStreaming] = useState(false);
  const [deviceContribution, setDeviceContribution] = useState(false);
  const [edgePodLoad, setEdgePodLoad] = useState(20); // percentage
  const [offlineKitStatus, setOfflineKitStatus] = useState(false);
  const [spaceHubStatus, setSpaceHubStatus] = useState(false);

  const features = [
    {
      title: "Edge Pods",
      icon: <FaServer />,
      description:
        "Mini-servers deployed locally in malls, villages, schools, offices for fast content caching and offline access.",
      additionalUsage: [
        "Local content analytics",
        "Seasonal promotions",
        "Offline event streaming",
        "Educational micro-content delivery",
      ],
    },
    {
      title: "Device-as-Server",
      icon: <FaNetworkWired />,
      description:
        "TVs, mobiles, consoles contribute storage and bandwidth to P2P mesh for self-distributing content.",
      additionalUsage: [
        "Gamified rewards for device contribution",
        "Community-driven content propagation",
        "Low-cost load balancing",
      ],
    },
    {
      title: "Mesh OTT",
      icon: <FaCloudDownloadAlt />,
      description:
        "CDN becomes optional; content is self-balanced through P2P mesh networks.",
      additionalUsage: [
        "Automatic failover during outages",
        "Intelligent local content routing",
        "Load prediction via AI",
      ],
    },
    {
      title: "Green Streaming",
      icon: <FaSolarPanel />,
      description:
        "Adaptive streaming quality tuned for energy efficiency to reduce carbon footprint.",
      additionalUsage: [
        "Carbon footprint tracking",
        "Sustainable streaming badges",
        "Green energy credits",
      ],
    },
    {
      title: "Space Ready",
      icon: <FaSatellite />,
      description:
        "Optimized compression & protocols for satellite or Starlink streaming.",
      additionalUsage: [
        "Remote education",
        "Disaster-relief live streams",
        "Space mission media delivery",
      ],
    },
    {
      title: "Offline OTT Kits",
      icon: <FaServer />,
      description:
        "Portable OTT servers deployable in disaster zones or remote regions.",
      additionalUsage: [
        "Emergency education content",
        "Remote field training",
        "Humanitarian media distribution",
      ],
    },
    {
      title: "Space OTT Hubs",
      icon: <FaSatellite />,
      description:
        "Future infrastructure for streaming to Moon/Mars missions.",
      additionalUsage: [
        "Astronaut entertainment",
        "Remote education",
        "Earth-to-space live events",
      ],
    },
  ];

  const handleModalOpen = (feature) => {
    setModalContent(feature);
    setShowModal(true);
  };

  const handleModalClose = () => setShowModal(false);

  const toggleGreenStreaming = () => {
    setGreenStreaming(!greenStreaming);
  };

  const toggleDeviceContribution = () => {
    setDeviceContribution(!deviceContribution);
    // Simulate P2P load balancing
    setEdgePodLoad(deviceContribution ? 20 : 70);
  };

  const toggleOfflineKit = () => setOfflineKitStatus(!offlineKitStatus);

  const toggleSpaceHub = () => setSpaceHubStatus(!spaceHubStatus);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">Hybrid Offline + Infrastructure</h2>
      <p className="text-center text-muted">
        Futuristic hybrid OTT content delivery combining offline caching, edge
        pods, P2P mesh, green streaming, and space-ready infrastructure.
      </p>

      {/* Feature Cards */}
      <Row className="g-4">
        {features.map((feature, idx) => (
          <Col md={6} lg={4} key={idx}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3 fs-3 text-primary">{feature.icon}</div>
                  <Card.Title>{feature.title}</Card.Title>
                </div>
                <Card.Text>{feature.description}</Card.Text>
                <Button
                  variant="outline-primary"
                  onClick={() => handleModalOpen(feature)}
                >
                  More Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Advanced Feature Controls */}
      <Row className="mt-5 g-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Green Streaming</h5>
              <Button
                variant={greenStreaming ? "success" : "secondary"}
                onClick={toggleGreenStreaming}
              >
                {greenStreaming ? "ON" : "OFF"}
              </Button>
            </div>
            <ProgressBar
              now={greenStreaming ? 80 : 20}
              label={greenStreaming ? "Energy Optimized" : "Normal"}
            />
            <p className="text-muted mt-2">
              Adaptive quality tuned for energy-saving and efficiency.
            </p>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Device Contribution (P2P)</h5>
              <Button
                variant={deviceContribution ? "success" : "secondary"}
                onClick={toggleDeviceContribution}
              >
                {deviceContribution ? "Active" : "Inactive"}
              </Button>
            </div>
            <ProgressBar
              now={deviceContribution ? 70 : 20}
              label={deviceContribution ? "Contributing" : "Idle"}
            />
            <p className="text-muted mt-2">
              Participate in mesh network by sharing device storage and bandwidth.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Edge Pod Load */}
      <Row className="mt-4 g-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <h5>Edge Pod Load Simulation</h5>
            <ProgressBar now={edgePodLoad} label={`${edgePodLoad}% Load`} />
            <p className="text-muted mt-2">
              Shows current cached content and load balancing between edge pods
              and P2P devices.
            </p>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Offline OTT Kit</h5>
              <Button
                variant={offlineKitStatus ? "success" : "secondary"}
                onClick={toggleOfflineKit}
              >
                {offlineKitStatus ? "Available" : "Unavailable"}
              </Button>
            </div>
            <p className="text-muted">
              Toggle to simulate offline kit deployment for disaster zones or
              remote areas.
            </p>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 g-4">
        <Col md={6}>
          <Card className="p-3 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5>Space OTT Hub</h5>
              <Button
                variant={spaceHubStatus ? "success" : "secondary"}
                onClick={toggleSpaceHub}
              >
                {spaceHubStatus ? "Active" : "Inactive"}
              </Button>
            </div>
            <p className="text-muted">
              Simulate streaming readiness for Moon/Mars missions.
            </p>
          </Card>
        </Col>
      </Row>

      {/* Modal for Feature Details */}
      <Modal show={showModal} onHide={handleModalClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{modalContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalContent.description}</p>
          {modalContent.additionalUsage && (
            <>
              <h6>Additional Usage:</h6>
              <ListGroup>
                {modalContent.additionalUsage.map((item, idx) => (
                  <ListGroup.Item key={idx}>
                    <Badge bg="info" className="me-2">
                      Usage
                    </Badge>
                    {item}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HybridOfflineInfraPage;

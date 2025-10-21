// TechnicalAIBackbone.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Accordion,
  Tooltip,
  OverlayTrigger,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock Data: Core Features
const coreFeatures = [
  {
    id: 1,
    title: "Device Mesh OTT",
    description:
      "Decentralized device-to-device streaming, CDN-free content delivery, offline-friendly, resilient to network failures.",
    details:
      "Device Mesh OTT enables peer-to-peer streaming, reducing dependency on centralized servers. Perfect for low-bandwidth regions and offline-friendly playback.",
    icon: "📡",
  },
  {
    id: 2,
    title: "AI Cloud Director",
    description:
      "AI-controlled infrastructure scaling, personalized content, dynamic pricing, and automated show commissioning.",
    details:
      "AI Cloud Director manages auto-scaling, resource allocation, content personalization, pricing adjustments, and automated show commissioning using predictive analytics.",
    icon: "☁️",
  },
  {
    id: 3,
    title: "Global Trust Engine",
    description:
      "Integrates OTT reputation with fintech, government, employment, and TRUENET. Provides anti-fraud verification and compliance.",
    details:
      "Global Trust Engine ensures credibility by linking user/device reputation to external verifications (TRUENET, fintech, government), enhancing trust and security.",
    icon: "🌐",
  },
  {
    id: 4,
    title: "Zero-Piracy AI",
    description:
      "AI scans the internet continuously to detect pirated content and auto-removes illegal copies instantly.",
    details:
      "Zero-Piracy AI monitors the web and streaming networks, identifies pirated copies, and automatically removes them in real-time, protecting copyright and revenue.",
    icon: "🛡️",
  },
  {
    id: 5,
    title: "Adaptive Subscription",
    description:
      "AI dynamically sets subscription pricing based on loyalty, economy, and behavior. Personalized bundles & trial periods supported.",
    details:
      "Adaptive Subscription dynamically adjusts prices and bundles using AI, taking into account user loyalty, engagement, and market conditions for personalized offers.",
    icon: "💳",
  },
];

const advancedFeatures = [
  "Predictive Content Deployment – AI pre-loads high-demand content.",
  "Cross-Device Synchronization – seamless bookmarks & playback.",
  "AI-Driven Analytics Dashboard – real-time insights for admins.",
  "Dynamic Content Licensing – AI negotiates content pricing in real-time.",
  "Automated Customer Support AI – handles queries instantly.",
  "Energy-Efficient Streaming – AI optimizes resources for cost & sustainability.",
];

const additionalUsages = [
  "Marketing & Promotions – identify premium users for offers.",
  "Regulatory Reporting – automated compliance logs.",
  "Partnership Integrations – share trust scores with partners.",
  "Gamification – reward loyal users dynamically.",
  "Cross-Sell Opportunities – recommend add-ons & upgrades.",
  "Dispute Proof – log AI decisions for transparency.",
];

const futureEnhancements = [
  "AI Explainability Layer – shows users why decisions were made.",
  "Voice-Controlled AI Monitoring – admins query infrastructure via voice.",
  "Global Reputation Marketplace – tradeable trust tokens for users/devices.",
  "AI-Powered Content Moderation – detect objectionable content in real-time.",
  "Predictive Piracy Prevention – pre-emptively secure content.",
  "Blockchain Integration – immutable logs for trust & subscription adjustments.",
  "Hyper-Personalized Bundles – unique plans per user/device.",
  "IoT & Edge AI Integration – Smart TVs, wearables, and AR/VR devices as nodes.",
];

const TechnicalAIBackbone = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleLearnMore = (feature) => {
    setSelectedFeature(feature);
    setShowModal(true);
  };

  return (
    <Container className="my-5 text-center">
      <h1 className="mb-3">Technical & AI Backbone</h1>
      <p className="text-muted mb-5">
        Explore the advanced AI and technical infrastructure powering our next-gen OTT platform.
      </p>

      {/* Core Features */}
      <Row className="justify-content-center mb-5">
        {coreFeatures.map((feature) => (
          <Col md={6} lg={4} className="d-flex align-items-stretch mb-4" key={feature.id}>
            <Card className="h-100 shadow-lg text-center p-3 border-0" style={{ borderRadius: "1rem" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{feature.icon}</div>
              <Card.Body>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Text>{feature.description}</Card.Text>
              </Card.Body>
              <Card.Footer className="bg-white border-0">
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Learn more about {feature.title}</Tooltip>}
                >
                  <Button
                    variant="primary"
                    onClick={() => handleLearnMore(feature)}
                  >
                    Learn More
                  </Button>
                </OverlayTrigger>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Accordions */}
      <Accordion defaultActiveKey="0" className="mb-4 shadow-sm">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Advanced Features</Accordion.Header>
          <Accordion.Body>
            <ul className="text-start">
              {advancedFeatures.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Additional Usages</Accordion.Header>
          <Accordion.Body>
            <ul className="text-start">
              {additionalUsages.map((usage, index) => (
                <li key={index}>{usage}</li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Future Enhancements</Accordion.Header>
          <Accordion.Body>
            <ul className="text-start">
              {futureEnhancements.map((enhancement, index) => (
                <li key={index}>{enhancement}</li>
              ))}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Call to Action */}
      <div className="mt-5">
        <Button variant="success" size="lg">
          Explore AI & Technical Infrastructure
        </Button>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFeature?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedFeature?.description}</p>
          <p>{selectedFeature?.details}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TechnicalAIBackbone;

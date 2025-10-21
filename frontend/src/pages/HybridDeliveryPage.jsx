// HybridDeliveryPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ProgressBar,
  Badge,
  ListGroup,
  Table,
  Modal,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineCloud, AiOutlineThunderbolt, AiOutlineGift } from "react-icons/ai";

// Mock Data
const MOCK_CONTENT = [
  { id: 1, title: "Trending Movie", tier: "HOT", aiScore: 95 },
  { id: 2, title: "Popular Series", tier: "WARM", aiScore: 80 },
  { id: 3, title: "Old Classics", tier: "LONG-TAIL", aiScore: 50 },
];

const MOCK_PEERS = [
  { id: 1, name: "Device A", trustScore: 98, status: "Active", cachedContent: 3 },
  { id: 2, name: "Device B", trustScore: 87, status: "Idle", cachedContent: 1 },
  { id: 3, name: "Device C", trustScore: 92, status: "Active", cachedContent: 2 },
];

function HybridDeliveryPage() {
  const [selectedContent, setSelectedContent] = useState(null);
  const [aiMore, setAiMore] = useState(false);
  const [peerMore, setPeerMore] = useState(false);
  const [showRewardsModal, setShowRewardsModal] = useState(false);
  const [rewards, setRewards] = useState([
    { id: 1, description: "5 credits for opt-in P2P" },
    { id: 2, description: "Bonus for caching content" },
  ]);
  const [cdnFallback, setCdnFallback] = useState(false);

  // Simulate QoE Metrics updates
  const [qoeMetrics, setQoeMetrics] = useState({
    startupTime: "1.2s",
    rebufferCount: 0,
    avgBitrate: "Auto",
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setQoeMetrics((prev) => ({
        ...prev,
        rebufferCount: prev.rebufferCount + Math.floor(Math.random() * 2),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleContentSelect = (content) => {
    setSelectedContent(content);
    setAiMore(false);
    setPeerMore(false);
  };

  const toggleCdnFallback = () => setCdnFallback(!cdnFallback);

  return (
    <Container fluid className="p-3">
      <Row className="mb-3">
        <Col>
          <h3>Hybrid Delivery Dashboard (AI + P2P)</h3>
        </Col>
      </Row>

      <Row>
        {/* Content Tiering & AI Score */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>
              <AiOutlineThunderbolt /> Content Placement & AI Scoring
            </Card.Header>
            <ListGroup variant="flush">
              {MOCK_CONTENT.map((content) => (
                <ListGroup.Item
                  key={content.id}
                  action
                  active={selectedContent?.id === content.id}
                  onClick={() => handleContentSelect(content)}
                >
                  {content.title} - Tier: <Badge bg="info">{content.tier}</Badge> - AI Score:{" "}
                  <Badge bg="success">{content.aiScore}</Badge>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>

          {/* AI Placement Details */}
          {selectedContent && (
            <Card className="mb-3">
              <Card.Body>
                <h6>AI Placement Details:</h6>
                <p>
                  Content: <strong>{selectedContent.title}</strong>
                </p>
                <p>Tier: {selectedContent.tier}</p>
                <p>AI Score: {selectedContent.aiScore}</p>
                <ProgressBar now={selectedContent.aiScore} label={`${selectedContent.aiScore}%`} />

                <Button
                  variant="link"
                  size="sm"
                  onClick={() => setAiMore((prev) => !prev)}
                >
                  {aiMore ? "Show Less" : "Show More"}
                </Button>
                {aiMore && (
                  <div className="mt-2">
                    <p>Predicted Demand Velocity: High</p>
                    <p>Geo Spread Priority: Top 3 regions</p>
                    <p>Prewarm Status: Edges prewarmed successfully</p>
                    <p>CDN Steering: Multi-CDN optimal routing applied</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>

        {/* P2P Peer Tracker */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>
              <AiOutlineCloud /> P2P Tracker & Peer Metrics
            </Card.Header>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Peer</th>
                  <th>Trust Score</th>
                  <th>Status</th>
                  <th>Cached Content</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_PEERS.map((peer) => (
                  <tr key={peer.id}>
                    <td>{peer.name}</td>
                    <td>{peer.trustScore}%</td>
                    <td>{peer.status}</td>
                    <td>{peer.cachedContent}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="link" size="sm" onClick={() => setPeerMore((prev) => !prev)}>
              {peerMore ? "Show Less Details" : "Show More Details"}
            </Button>
            {peerMore && (
              <ListGroup variant="flush" className="mt-2">
                {MOCK_PEERS.map((peer) => (
                  <ListGroup.Item key={peer.id}>
                    Bandwidth: {Math.floor(Math.random() * 50 + 50)} Mbps | Latency:{" "}
                    {Math.floor(Math.random() * 100 + 20)} ms
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}

            <Button variant="primary" onClick={() => setShowRewardsModal(true)} className="mt-2">
              View Rewards <AiOutlineGift />
            </Button>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* QoE Metrics */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>QoE Metrics</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Startup Time: {qoeMetrics.startupTime}</ListGroup.Item>
              <ListGroup.Item>Rebuffer Count: {qoeMetrics.rebufferCount}</ListGroup.Item>
              <ListGroup.Item>Average Bitrate: {qoeMetrics.avgBitrate}</ListGroup.Item>
              <ListGroup.Item>
                CDN Fallback:{" "}
                <Badge bg={cdnFallback ? "danger" : "success"}>
                  {cdnFallback ? "Active" : "Inactive"}
                </Badge>{" "}
                <Button size="sm" onClick={toggleCdnFallback} className="ms-2">
                  Toggle
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Advanced / Future Features */}
        <Col md={6}>
          <Card className="mb-3">
            <Card.Header>Advanced Features & Future Enhancements</Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>Dynamic AI Re-scoring of content</ListGroup.Item>
              <ListGroup.Item>Machine Learning predictions for viral content</ListGroup.Item>
              <ListGroup.Item>Blockchain-based P2P reward verification</ListGroup.Item>
              <ListGroup.Item>Cross-device / household caching</ListGroup.Item>
              <ListGroup.Item>Edge computing pre-processing & pre-transcoding</ListGroup.Item>
              <ListGroup.Item>Smart failover between P2P and CDN</ListGroup.Item>
              <ListGroup.Item>Enhanced real-time analytics dashboards</ListGroup.Item>
              <ListGroup.Item>Reward & incentive gamification for participants</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>

      {/* Rewards Modal */}
      <Modal show={showRewardsModal} onHide={() => setShowRewardsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>P2P Rewards</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {rewards.map((reward) => (
              <ListGroup.Item key={reward.id}>{reward.description}</ListGroup.Item>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRewardsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Dashboard Info */}
      <Alert variant="info" className="mt-3">
        Hybrid Delivery dashboard shows live AI + P2P orchestration, QoE metrics, rewards, and
        advanced feature insights.
      </Alert>
    </Container>
  );
}

export default HybridDeliveryPage;

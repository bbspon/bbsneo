// GovernanceSecurityTrustPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Badge,
  ListGroup,
  Accordion,
  ProgressBar,
  Alert,
  Table,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const GovernanceSecurityTrustPage = () => {
  // States
  const [showEthicsModal, setShowEthicsModal] = useState(false);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [showBlockchainModal, setShowBlockchainModal] = useState(false);
  const [userAge, setUserAge] = useState(18);
  const [flaggedContentCount, setFlaggedContentCount] = useState(0);
  const [auditLogs, setAuditLogs] = useState([]);
  const [predictiveAlerts, setPredictiveAlerts] = useState([]);

  // Leaderboard simulation
  const [leaderboard, setLeaderboard] = useState([
    { name: "Alice", points: 50 },
    { name: "Bob", points: 35 },
    { name: "You", points: flaggedContentCount },
  ]);

  // Simulate predictive AI moderation
  useEffect(() => {
    const interval = setInterval(() => {
      const flagged = Math.random() > 0.7;
      if (flagged) {
        const contentId = Math.floor(Math.random() * 1000);
        setPredictiveAlerts((prev) => [
          ...prev,
          `Content #${contentId} flagged for potential abuse`,
        ]);
      }
    }, 8000); // every 8 seconds
    return () => clearInterval(interval);
  }, []);

  // Handlers
  const handleEthicsAlert = () => setShowEthicsModal(true);
  const handleReward = () => {
    const newCount = flaggedContentCount + 1;
    setFlaggedContentCount(newCount);
    setLeaderboard((prev) => {
      const updated = [...prev];
      const userIndex = updated.findIndex((u) => u.name === "You");
      if (userIndex >= 0) updated[userIndex].points = newCount * 10;
      return updated.sort((a, b) => b.points - a.points);
    });
    setAuditLogs((prev) => [
      ...prev,
      { action: "Flagged Content", timestamp: new Date().toLocaleString() },
    ]);
    setShowRewardModal(true);
  };
  const handleBlockchainLog = () => setShowBlockchainModal(true);

  const isContentRestricted = (minAge) => userAge < minAge;

  return (
    <Container className="my-4">
      <h1 className="mb-4 text-primary">Governance, Security & Trust</h1>

      {/* Overview / Hero */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Our Commitment to Security & Fairness</Card.Title>
          <Card.Text>
            End-to-end encryption, AI ethics monitoring, blockchain audit trails, and community-driven moderation ensure a safe and transparent platform.
          </Card.Text>
        </Card.Body>
      </Card>

      {/* Core Features */}
      <Accordion defaultActiveKey="0" className="mb-4">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Zero-Trust Infrastructure</Accordion.Header>
          <Accordion.Body>
            All modules encrypted end-to-end with least-privilege access. Continuous monitoring for unauthorized access.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Forensic Watermarking</Accordion.Header>
          <Accordion.Body>
            Unique watermark per user/session. Tracks piracy and provides ownership verification.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Global Trust Engine (TRUENET)</Accordion.Header>
          <Accordion.Body>
            Reputation scores for users, content, and creators. Trust badges displayed prominently.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Parental & Civic Controls</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              <ListGroup.Item>
                Age-based restriction:{" "}
                {isContentRestricted(21) ? (
                  <Badge bg="danger" className="ms-2">Restricted</Badge>
                ) : (
                  <Badge bg="success" className="ms-2">Allowed</Badge>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                Government-verified civic content feed.
              </ListGroup.Item>
              <ListGroup.Item>
                Parental dashboard for content approval.
              </ListGroup.Item>
              <ListGroup.Item>
                Predictive Abuse Alerts:
                <ul>
                  {predictiveAlerts.slice(-5).map((alert, idx) => (
                    <li key={idx}>{alert}</li>
                  ))}
                </ul>
              </ListGroup.Item>
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Self-Moderation Economy</Accordion.Header>
          <Accordion.Body>
            Users are rewarded for flagging/reporting harmful content.
            <div className="mt-2">
              <Button variant="warning" onClick={handleReward}>
                Flag Content
              </Button>
              <span className="ms-3">Total Flagged: {flaggedContentCount}</span>
            </div>

            <h5 className="mt-3">Leaderboard</h5>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, idx) => (
                  <tr key={idx}>
                    <td>{user.name}</td>
                    <td>{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      {/* Futuristic Extensions */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <Card.Title>Futuristic Extensions</Card.Title>
          <ListGroup>
            <ListGroup.Item>
              <Button variant="info" size="sm" onClick={handleEthicsAlert}>
                AI Ethics Guardian Alert
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button variant="secondary" size="sm" onClick={handleBlockchainLog}>
                View Blockchain Audit Trail
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              Predictive Moderation: AI flags potential harmful content before publishing.
            </ListGroup.Item>
            <ListGroup.Item>
              Adaptive Trust Algorithms dynamically adjust content privileges.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Modals */}
      <Modal show={showEthicsModal} onHide={() => setShowEthicsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>AI Ethics Guardian</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Potential biased or harmful content detected. Child safety enforced. Moderation recommended.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEthicsModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRewardModal} onHide={() => setShowRewardModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Self-Moderation Reward</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Thank you for flagging harmful content! You earned 10 points towards your moderation score.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRewardModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBlockchainModal} onHide={() => setShowBlockchainModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Blockchain Audit Trail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log, idx) => (
                <tr key={idx}>
                  <td>{log.action}</td>
                  <td>{log.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBlockchainModal(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default GovernanceSecurityTrustPage;

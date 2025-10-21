import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Table,
  ProgressBar,
  Modal,
  Form,
} from "react-bootstrap";
import {
  ShieldLock,
  EyeSlash,
  Globe,
  FileEarmarkLock,
  CloudDownload,
  Gear,
} from "react-bootstrap-icons";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SecuritySafetyPage() {
  // Demo state
  const [showModal, setShowModal] = useState(false);
  const [appealText, setAppealText] = useState("");

  const handleSubmitAppeal = () => {
    alert(`Appeal submitted:\n${appealText}`);
    setShowModal(false);
    setAppealText("");
  };

  return (
    <Container fluid className="p-4 bg-light min-vh-100">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <h1 className="fw-bold text-primary text-center">
            <ShieldLock className="me-2 " />
            Security & Safety 
          </h1>
          <p className="text-muted text-center">
            Zero-trust security, piracy protection, and trust & safety controls
            for the entire OTT platform.
          </p>
        </Col>
      </Row>

      {/* KPI Cards */}
      <Row xs={1} md={2} lg={4} className="g-4 mb-4">
        <Col>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>Zero-Trust Mesh</Card.Title>
              <ProgressBar now={95} label="95% Nodes Secured" />
              <small className="text-muted">mTLS active on all services</small>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>JWT Rotation</Card.Title>
              <h4 className="fw-bold text-success">Every 15 min</h4>
              <small className="text-muted">Automatic key cycling enabled</small>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>Piracy Alerts</Card.Title>
              <h4 className="fw-bold text-danger">3 Active</h4>
              <small className="text-muted">
                Latest: Telegram scraper detected
              </small>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="shadow-sm h-100 border-0">
            <Card.Body>
              <Card.Title>Appeals Pending</Card.Title>
              <h4 className="fw-bold text-warning">5</h4>
              <small className="text-muted">Average SLA: 24h</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sections */}
      <Row className="g-4">
        {/* Security Infrastructure */}
        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Header className="bg-primary text-white">
              <Gear className="me-2" />
              Platform Security
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Zero-trust mesh with service authentication</li>
                <li>mTLS certificates rotated automatically</li>
                <li>Rate limiting & WAF for DDoS mitigation</li>
                <li>Threat-intelligence feeds for compromised IPs</li>
                <li>Quantum-resistant key exchange (future-ready)</li>
              </ul>
              <Button variant="outline-primary" size="sm">
                Rotate Keys Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Piracy Protection */}
        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Header className="bg-danger text-white">
              <EyeSlash className="me-2" />
              Piracy Protection
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Forensic watermarking & dynamic DRM license</li>
                <li>VPN / Proxy detection & dynamic geo-blocking</li>
                <li>Scraper monitoring (Telegram, TikTok, Discord)</li>
                <li>Automated evidence kit for legal action</li>
                <li>Real-time content fingerprinting</li>
              </ul>
              <Button variant="outline-danger" size="sm">
                View Active Incidents
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Trust & Safety */}
        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Header className="bg-success text-white">
              <Globe className="me-2" />
              Trust & Safety
            </Card.Header>
            <Card.Body>
              <ul>
                <li>Strict no-go categories & AI moderation</li>
                <li>Age-gating with KYC verification</li>
                <li>Appeals workflow with SLA tracking</li>
                <li>Transparency reports with privacy guarantees</li>
                <li>Policy as code for automated enforcement</li>
              </ul>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => setShowModal(true)}
              >
                Submit Policy Appeal
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* APIs */}
        <Col lg={6}>
          <Card className="shadow-sm h-100 border-0">
            <Card.Header className="bg-secondary text-white">
              <FileEarmarkLock className="me-2" />
              Security APIs
            </Card.Header>
            <Card.Body>
              <Table bordered size="sm" responsive>
                <thead>
                  <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>POST</td>
                    <td>/security/check</td>
                    <td>Validate uploads or user actions</td>
                  </tr>
                  <tr>
                    <td>POST</td>
                    <td>/policy/appeal</td>
                    <td>Submit an appeal for content takedown</td>
                  </tr>
                  <tr>
                    <td>GET</td>
                    <td>/security/reports</td>
                    <td>Fetch transparency & audit reports</td>
                  </tr>
                </tbody>
              </Table>
              <Button variant="outline-secondary" size="sm">
                <CloudDownload className="me-1" />
                Download API Docs
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Appeals Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submit Policy Appeal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Appeal Details</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={appealText}
              onChange={(e) => setAppealText(e.target.value)}
              placeholder="Describe why the content removal should be reviewed..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitAppeal}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

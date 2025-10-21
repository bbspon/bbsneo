// RevenueModelsPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  ListGroup,
  Modal,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { FaInfoCircle, FaCogs } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// Default revenue splits data
const defaultSplits = [
  {
    stream: "Ads (Ad_Net)",
    roles: [
      { role: "Creator", default: 45, tier: "40–50%", advanced: ["AI targeting bonus", "Top 10 bonus pools weekly/monthly"] },
      { role: "Ambassador", default: 8, tier: "up to 12%", advanced: ["Milestone bonuses", "Regional overrides"] },
      { role: "Agent", default: 12, tier: null, advanced: ["Campaign-based commission", "Max cap options"] },
      { role: "Viewer Pool", default: 2, tier: null, advanced: ["Referral rewards", "Redemption options"] },
    ],
  },
  {
    stream: "Top 10 Bonus Pools",
    roles: [
      { role: "Weekly", default: 2, tier: null, advanced: ["Auto allocation", "Leaderboard impact"] },
      { role: "Monthly", default: 3, tier: null, advanced: ["Milestone based", "Adjustable via CMS"] },
    ],
  },
  {
    stream: "Merch / Commerce",
    roles: [
      { role: "Creator", default: 85, tier: null, advanced: ["Co-branded collabs", "Limited edition drops"] },
      { role: "Ambassador", default: 5, tier: null, advanced: ["Regional promotion", "Performance tiers"] },
      { role: "Platform", default: 10, tier: null, advanced: ["Processing fees", "Marketplace support"] },
    ],
  },
  {
    stream: "Tips",
    roles: [
      { role: "Creator", default: 92, tier: null, advanced: ["Tokenized tips", "Fan tier rewards"] },
      { role: "Platform", default: 8, tier: null, advanced: ["Processing fees", "Analytics tracking"] },
    ],
  },
  {
    stream: "Subscriptions (Subs)",
    roles: [
      { role: "Creator", default: 70, tier: null, advanced: ["Family plans", "Exclusive perks"] },
      { role: "Platform", default: 28, tier: null, advanced: ["Payment processing", "Promo management"] },
      { role: "Referral", default: 2, tier: null, advanced: ["Referral bonuses", "Gamified rewards"] },
    ],
  },
];

export default function RevenueModelsPage() {
  const [showModal, setShowModal] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  // Open the advanced features modal for a role
  const openAdvanced = (role) => {
    setCurrentRole(role);
    setShowModal(true);
  };

  // Simulated save action with SweetAlert2
  const saveSettings = () => {
    Swal.fire({
      title: "✅ Saved!",
      text: "Revenue model settings saved (simulated).",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2 className="mb-0">Revenue Models & Splits (Defaults)</h2>
          <small className="text-muted d-block">
            All percentages are defaults; tunable via CMS. Regional overrides and milestones possible.
          </small>
        </Col>
        <Col xs="auto">
          <Button variant="outline-primary" onClick={saveSettings}>
            Save Defaults <FaCogs className="ms-2" />
          </Button>
        </Col>
      </Row>

      {/* Revenue Streams Table */}
      {defaultSplits.map((stream, idx) => (
        <Card className="mb-3" key={idx}>
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">{stream.stream}</h5>
            <Button
              variant="link"
              size="sm"
              onClick={() =>
                Swal.fire({
                  title: `${stream.stream} Info`,
                  html: `<p>Advanced and future features are available via CMS configuration.</p>`,
                  icon: "info",
                })
              }
            >
              <FaInfoCircle /> Info
            </Button>
          </Card.Header>
          <Card.Body>
            <Table responsive bordered hover>
              <thead>
                <tr>
                  <th>Role / Pool</th>
                  <th>Default %</th>
                  <th>Tierable Range</th>
                  <th>Advanced Features</th>
                </tr>
              </thead>
              <tbody>
                {stream.roles.map((role, rIdx) => (
                  <tr key={rIdx}>
                    <td>{role.role}</td>
                    <td>{role.default}%</td>
                    <td>{role.tier || "-"}</td>
                    <td>
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => openAdvanced(role)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      ))}

      {/* Future Enhancements & Notes */}
      <Row className="mb-3">
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <h6>Future Enhancements / Advanced Features</h6>
              <ListGroup variant="flush" className="small">
                <ListGroup.Item>Dynamic charts & visualization</ListGroup.Item>
                <ListGroup.Item>Tier simulations with sliders</ListGroup.Item>
                <ListGroup.Item>Regional overrides & language-based splits</ListGroup.Item>
                <ListGroup.Item>Historical version comparison</ListGroup.Item>
                <ListGroup.Item>PDF / CSV export</ListGroup.Item>
                <ListGroup.Item>Interactive tooltips & gamified dashboards</ListGroup.Item>
                <ListGroup.Item>AI-driven split recommendations</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6>Notes</h6>
              <small className="text-muted d-block">
                All splits shown are defaults and subject to CMS-controlled adjustments.  
                Settlements and payouts will reflect CMS configurations and regional overrides.
              </small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Advanced Features Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Advanced Features: {currentRole?.role}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRole?.advanced?.length > 0 ? (
            <ListGroup>
              {currentRole.advanced.map((feature, idx) => (
                <ListGroup.Item key={idx}>{feature}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-muted">No advanced features available for this role.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

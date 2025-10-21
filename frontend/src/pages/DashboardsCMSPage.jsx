// DashboardsCMSAdvancedPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  ProgressBar,
  Badge,
  Modal,
  Form,
  Accordion,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Supported roles
const roles = ["admin", "creator", "ambassador", "agent", "viewer"];

// Dummy data placeholders
const dummyData = {
  admin: {
    revenue: 250000,
    profit: 80000,
    payouts: { creator: 12000, ambassador: 5000, agent: 3000 },
    adInventory: [
      { campaign: "Promo A", status: "Active" },
      { campaign: "Promo B", status: "Pending" },
    ],
    fraudLogs: ["Fake account detected", "Invalid transaction"],
  },
  creator: {
    earnings: { ads: 500, subs: 300, ppv: 150, merch: 200, tips: 50 },
    leaderboard: [
      { name: "Creator 1", earnings: 1200, rank: 1 },
      { name: "Creator 2", earnings: 950, rank: 2 },
    ],
    contentMetrics: [
      { title: "Video A", views: 5000, engagement: 80, retention: 75 },
      { title: "Video B", views: 3500, engagement: 70, retention: 65 },
    ],
  },
  ambassador: {
    regions: [
      { name: "Region A", revenue: 5000, expenses: 2500, profitShare: "15%" },
    ],
    team: [{ name: "Sub-Ambassador 1", performance: "Good" }],
  },
  agent: {
    deals: [
      { client: "Advertiser X", dealsClosed: 12, commission: 1200 },
    ],
    tiers: { current: 2, progress: 60 },
  },
  viewer: {
    watchHistory: ["Movie A", "Show B", "Movie C"],
    engagementScore: 85,
    rewards: 300,
    leaderboardRank: 4,
    redemptionOptions: ["Subs", "Merch", "Wallet"],
  },
};

// Main Page Component
const DashboardsCMSAdvancedPage = () => {
  const [role, setRole] = useState("admin");
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Future: fetch data dynamically based on role
    // Example: fetch alerts from API
    setAlerts([
      { type: "info", message: "CMS rule updated: Creator payout % changed." },
      { type: "warning", message: "Ad campaign Promo B pending approval." },
    ]);
  }, [role]);

  const handleModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <Container fluid className="py-4">
      <Row className="mb-3">
        <Col>
          <h2>Dashboards + CMS Tie-In (Advanced)</h2>
          <Form.Select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

      {/* Alerts Section */}
      {alerts.map((alert, idx) => (
        <Alert key={idx} variant={alert.type}>
          {alert.message}
        </Alert>
      ))}

      {/* Role-Based Dashboards */}
      {role === "admin" && (
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Global Revenue & Profit</Card.Title>
                <p>Revenue: ${dummyData.admin.revenue}</p>
                <p>Profit: ${dummyData.admin.profit}</p>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>CMS Revenue Rules</Card.Title>
                <Button onClick={() => handleModal("Open CMS Revenue Control")}>
                  Edit Rules
                </Button>
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Role-Based Payout Status</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Role</th>
                      <th>Payout</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(dummyData.admin.payouts).map(
                      ([role, payout]) => (
                        <tr key={role}>
                          <td>{role}</td>
                          <td>${payout}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Ad Inventory & Campaign Manager</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Campaign</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.admin.adInventory.map((ad, idx) => (
                      <tr key={idx}>
                        <td>{ad.campaign}</td>
                        <td>{ad.status}</td>
                        <td>
                          <Button
                            size="sm"
                            onClick={() =>
                              handleModal(`Manage Campaign: ${ad.campaign}`)
                            }
                          >
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Fraud & Compliance Logs</Card.Title>
                <Accordion>
                  {dummyData.admin.fraudLogs.map((log, idx) => (
                    <Accordion.Item key={idx} eventKey={idx.toString()}>
                      <Accordion.Header>Log {idx + 1}</Accordion.Header>
                      <Accordion.Body>{log}</Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Creator Dashboard */}
      {role === "creator" && (
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Earnings Overview</Card.Title>
                {Object.entries(dummyData.creator.earnings).map(
                  ([type, value]) => (
                    <p key={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}: ${value}
                    </p>
                  )
                )}
              </Card.Body>
            </Card>

            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Leaderboard & Projected Bonus</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Earnings</th>
                      <th>Rank</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.creator.leaderboard.map((c) => (
                      <tr key={c.name}>
                        <td>{c.name}</td>
                        <td>${c.earnings}</td>
                        <td>{c.rank}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <ProgressBar now={70} label="Projected Bonus" />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Content Performance</Card.Title>
                <Accordion>
                  {dummyData.creator.contentMetrics.map((c, idx) => (
                    <Accordion.Item key={idx} eventKey={idx.toString()}>
                      <Accordion.Header>{c.title}</Accordion.Header>
                      <Accordion.Body>
                        Views: {c.views} <br />
                        Engagement: {c.engagement}% <br />
                        Retention: {c.retention}%
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>CMS Revenue Rules Transparency</Card.Title>
                <Button onClick={() => handleModal("View CMS Rules")}>
                  View Rules
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Ambassador Dashboard */}
      {role === "ambassador" && (
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Regional Revenue vs Expenses</Card.Title>
                {dummyData.ambassador.regions.map((region, idx) => (
                  <div key={idx} className="mb-2">
                    <h6>{region.name}</h6>
                    Revenue: ${region.revenue} <br />
                    Expenses: ${region.expenses} <br />
                    Profit Share: {region.profitShare}
                    <ProgressBar now={65} label="Bonus Progress" />
                  </div>
                ))}
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Team / Sub-Ambassador Management</Card.Title>
                <Button
                  onClick={() => handleModal("Manage Team & Sub-Ambassadors")}
                >
                  Open Team Panel
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Regional Content Performance</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Content</th>
                      <th>Views</th>
                      <th>Engagement</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Video A</td>
                      <td>1500</td>
                      <td>80%</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Agent Dashboard */}
      {role === "agent" && (
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Ad Deals & Commissions</Card.Title>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Client</th>
                      <th>Deals Closed</th>
                      <th>Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyData.agent.deals.map((deal, idx) => (
                      <tr key={idx}>
                        <td>{deal.client}</td>
                        <td>{deal.dealsClosed}</td>
                        <td>${deal.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Tier Progress</Card.Title>
                <p>Current Tier: {dummyData.agent.tiers.current}</p>
                <ProgressBar
                  now={dummyData.agent.tiers.progress}
                  label={`${dummyData.agent.tiers.progress}%`}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Viewer Dashboard */}
      {role === "viewer" && (
        <Row>
          <Col md={6}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>Watch History & Engagement</Card.Title>
                <ul>
                  {dummyData.viewer.watchHistory.map((v, idx) => (
                    <li key={idx}>{v}</li>
                  ))}
                </ul>
                <ProgressBar
                  now={dummyData.viewer.engagementScore}
                  label={`${dummyData.viewer.engagementScore}%`}
                />
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>Rewards & Redemption Options</Card.Title>
                <p>Rewards: {dummyData.viewer.rewards}</p>
                <ul>
                  {dummyData.viewer.redemptionOptions.map((opt, idx) => (
                    <li key={idx}>{opt}</li>
                  ))}
                </ul>
                <Button onClick={() => handleModal("Redeem Rewards")}>
                  Redeem
                </Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title>Leaderboard & Gamification</Card.Title>
                <p>Rank: {dummyData.viewer.leaderboardRank}</p>
                <ProgressBar now={75} label="Gamified Progress" />
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Card.Title>CMS Reward Transparency</Card.Title>
                <Button onClick={() => handleModal("View Reward Rules")}>
                  View CMS Rules
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>CMS / Action Panel</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalContent}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DashboardsCMSAdvancedPage;

// SettlementFinanceDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Form,
  Modal,
  Badge,
  ProgressBar,
  Tab,
  Nav,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaDownload, FaWallet, FaCheck, FaTimes, FaChartLine } from "react-icons/fa";

// Dummy Data
const dummyCreators = [
  { id: 1, name: "Creator A", revenue: 45000, payoutPending: 5000, holdback: 2000 },
  { id: 2, name: "Creator B", revenue: 30000, payoutPending: 1500, holdback: 1000 },
];

const dummyViewers = [
  { id: 1, name: "Viewer A", reward: 250 },
  { id: 2, name: "Viewer B", reward: 150 },
];

const dummySales = [
  { id: 1, name: "Sales Partner A", revenue: 10000 },
];

const dummyDisputes = [
  { id: 1, stakeholder: "Creator B", issue: "Mismatch in payout", status: "Pending" },
];

const SettlementFinanceDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleOpenModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  const handleApiPost = (endpoint, payload) => {
    console.log(`POST to ${endpoint}`, payload);
    alert(`API call to ${endpoint} executed successfully!`);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Settlement & Finance</h2>

      <Tab.Container defaultActiveKey="splits">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="splits">Revenue Splits</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="payouts">Payout Rules</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="wallet">Wallet</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="statements">Statements</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="disputes">Disputes</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="analytics">Analytics</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>

              {/* Revenue Splits */}
              <Tab.Pane eventKey="splits">
                <Row>
                  <Col>
                    <Card className="mb-3">
                      <Card.Header>Creators</Card.Header>
                      <Card.Body>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Revenue (₹)</th>
                              <th>Pending Payout (₹)</th>
                              <th>Holdback (₹)</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dummyCreators.map((c) => (
                              <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.revenue}</td>
                                <td>{c.payoutPending}</td>
                                <td>{c.holdback}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleApiPost("/wallet/payout", { id: c.id })}
                                  >
                                    <FaWallet /> Payout
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Header>Sales Partners</Card.Header>
                      <Card.Body>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Revenue (₹)</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dummySales.map((s) => (
                              <tr key={s.id}>
                                <td>{s.id}</td>
                                <td>{s.name}</td>
                                <td>{s.revenue}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>

                    <Card className="mb-3">
                      <Card.Header>Viewer Pool Rewards</Card.Header>
                      <Card.Body>
                        <Table striped bordered hover responsive>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Reward (₹)</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dummyViewers.map((v) => (
                              <tr key={v.id}>
                                <td>{v.id}</td>
                                <td>{v.name}</td>
                                <td>{v.reward}</td>
                                <td>
                                  <Button
                                    size="sm"
                                    variant="success"
                                    onClick={() => handleApiPost("/wallet/payout", { id: v.id })}
                                  >
                                    <FaWallet /> Payout
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Payout Rules */}
              <Tab.Pane eventKey="payouts">
                <Card>
                  <Card.Header>Payout Rules</Card.Header>
                  <Card.Body>
                    <Alert variant="info">
                      <strong>Holdback:</strong> 5–10% reserved for refunds and disputes.<br />
                      <strong>Thresholds:</strong> Creators ₹1,000, Viewers ₹200.<br />
                      Partial payouts allowed if balance exceeds threshold.<br />
                      Automatic payout scheduling is enabled.
                    </Alert>
                    <Button variant="primary" onClick={() => handleOpenModal("Edit Payout Rules")}>
                      Edit Rules
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Wallet */}
              <Tab.Pane eventKey="wallet">
                <Card>
                  <Card.Header>Wallet Management</Card.Header>
                  <Card.Body>
                    <p>Balance tracking, withdrawal requests, and transaction history.</p>
                    <Button variant="success" onClick={() => handleOpenModal("Request Wallet Withdrawal")}>
                      Request Withdrawal
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Statements */}
              <Tab.Pane eventKey="statements">
                <Card>
                  <Card.Header>Statements</Card.Header>
                  <Card.Body>
                    <Alert variant="info">
                      Download monthly/weekly statements including GST/TDS and holdbacks.
                    </Alert>
                    <Button variant="primary" className="me-2" onClick={() => handleApiPost("/settlement/monthly", {})}>
                      <FaDownload /> PDF
                    </Button>
                    <Button variant="secondary" onClick={() => handleApiPost("/settlement/monthly", {})}>
                      <FaDownload /> CSV
                    </Button>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Disputes */}
              <Tab.Pane eventKey="disputes">
                <Card>
                  <Card.Header>Dispute Management</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Stakeholder</th>
                          <th>Issue</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyDisputes.map((d) => (
                          <tr key={d.id}>
                            <td>{d.id}</td>
                            <td>{d.stakeholder}</td>
                            <td>{d.issue}</td>
                            <td>
                              <Badge bg={d.status === "Pending" ? "warning" : "success"}>{d.status}</Badge>
                            </td>
                            <td>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() => handleApiPost("/dispute", { id: d.id, action: "resolve" })}
                              >
                                <FaCheck /> Resolve
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleApiPost("/dispute", { id: d.id, action: "reject" })}
                              >
                                <FaTimes /> Reject
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Analytics */}
              <Tab.Pane eventKey="analytics">
                <Card>
                  <Card.Header>
                    <FaChartLine /> Settlement Analytics
                  </Card.Header>
                  <Card.Body>
                    <p>Predictive dashboards and charts showing splits, payouts, holdbacks, and thresholds.</p>
                    <ProgressBar now={70} label="Platform Remainder 70%" className="mb-2" />
                    <ProgressBar now={50} variant="success" label="Creator Payouts 50%" className="mb-2" />
                    <ProgressBar now={20} variant="warning" label="Viewer Rewards 20%" />
                  </Card.Body>
                </Card>
              </Tab.Pane>

            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalContent}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name / Stakeholder</Form.Label>
              <Form.Control type="text" placeholder="Enter Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes / Reason</Form.Label>
              <Form.Control type="text" placeholder="Optional notes" />
            </Form.Group>
            <Button variant="success" onClick={() => handleApiPost("/wallet/payout", { modalContent })}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default SettlementFinanceDashboard;

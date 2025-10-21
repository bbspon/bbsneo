// AdminComplianceDashboard.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
  Badge,
  ProgressBar,
  Tab,
  Nav,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
  FaSync,
  FaChartLine,
} from "react-icons/fa";

// Dummy Data
const dummyTitles = [
  { id: 1, name: "Movie A", type: "Movie", status: "Published", platform: "Web", region: "India" },
  { id: 2, name: "Show B", type: "Show", status: "Scheduled", platform: "All Platforms", region: "US" },
];

const dummyUploads = [
  { id: 1, name: "User Upload 1", flagged: false },
  { id: 2, name: "User Upload 2", flagged: true },
];

const dummyComments = [
  { id: 1, user: "User1", comment: "Great!", flagged: false },
  { id: 2, user: "User2", comment: "Spam", flagged: true },
];

const dummyAds = [
  { id: 1, name: "Ad 1", budget: 5000, status: "Pending Approval" },
  { id: 2, name: "Ad 2", budget: 10000, status: "Approved" },
];

const AdminComplianceDashboard = () => {
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
    // Placeholder for API calls
    console.log(`POST to ${endpoint}`, payload);
    alert(`API call to ${endpoint} successful!`);
  };

  return (
    <Container fluid className="p-4">
      <h2 className="mb-4">Admin & Compliance</h2>

      <Tab.Container defaultActiveKey="cms">
        <Row>
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="cms">CMS Management</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="moderation">Moderation Queues</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="ads">Ad Campaigns</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reports">Reports & Analytics</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col md={9}>
            <Tab.Content>
              {/* CMS Management */}
              <Tab.Pane eventKey="cms">
                <Row className="mb-3">
                  <Col>
                    <Button onClick={() => handleOpenModal("Add Title")} variant="success">
                      <FaPlus /> Add Title
                    </Button>{" "}
                    <Button onClick={() => handleOpenModal("Add Promo")} variant="primary">
                      <FaPlus /> Add Promo
                    </Button>
                  </Col>
                </Row>
                <Card className="mb-3">
                  <Card.Header>Titles</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Type</th>
                          <th>Status</th>
                          <th>Platform</th>
                          <th>Region</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyTitles.map((title) => (
                          <tr key={title.id}>
                            <td>{title.id}</td>
                            <td>{title.name}</td>
                            <td>{title.type}</td>
                            <td>
                              <Badge
                                bg={
                                  title.status === "Published"
                                    ? "success"
                                    : title.status.includes("Pending")
                                    ? "warning"
                                    : "secondary"
                                }
                              >
                                {title.status}
                              </Badge>
                            </td>
                            <td>{title.platform}</td>
                            <td>{title.region}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="info"
                                onClick={() => handleOpenModal(`Edit ${title.name}`)}
                              >
                                <FaEdit />
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleApiPost("/admin/catalog", { id: title.id, action: "delete" })}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Moderation Queues */}
              <Tab.Pane eventKey="moderation">
                <Row>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header>Uploads Queue</Card.Header>
                      <Card.Body>
                        {dummyUploads.map((upload) => (
                          <div
                            key={upload.id}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <div>
                              {upload.name}{" "}
                              {upload.flagged && <Badge bg="danger">Flagged by AI</Badge>}
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() =>
                                  handleApiPost("/admin/moderation", { id: upload.id, action: "approve" })
                                }
                              >
                                <FaCheck />
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() =>
                                  handleApiPost("/admin/moderation", { id: upload.id, action: "reject" })
                                }
                              >
                                <FaTimes />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3">
                      <Card.Header>Comments Queue</Card.Header>
                      <Card.Body>
                        {dummyComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="d-flex justify-content-between align-items-center mb-2"
                          >
                            <div>
                              <strong>{comment.user}:</strong> {comment.comment}{" "}
                              {comment.flagged && <Badge bg="danger">Flagged by AI</Badge>}
                            </div>
                            <div>
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() =>
                                  handleApiPost("/admin/moderation", { id: comment.id, action: "approve" })
                                }
                              >
                                <FaCheck />
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() =>
                                  handleApiPost("/admin/moderation", { id: comment.id, action: "reject" })
                                }
                              >
                                <FaTimes />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Tab.Pane>

              {/* Ad Campaigns */}
              <Tab.Pane eventKey="ads">
                <Row className="mb-3">
                  <Col>
                    <Button onClick={() => handleOpenModal("Add Ad Campaign")} variant="success">
                      <FaPlus /> Add Ad Campaign
                    </Button>
                  </Col>
                </Row>
                <Card>
                  <Card.Header>Ad Campaigns</Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Budget</th>
                          <th>Status</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dummyAds.map((ad) => (
                          <tr key={ad.id}>
                            <td>{ad.id}</td>
                            <td>{ad.name}</td>
                            <td>
                              <ProgressBar now={(ad.budget / 10000) * 100} label={`₹${ad.budget}`} />
                            </td>
                            <td>{ad.status}</td>
                            <td>
                              <Button
                                size="sm"
                                variant="info"
                                onClick={() => handleOpenModal(`Edit ${ad.name}`)}
                              >
                                <FaEdit />
                              </Button>{" "}
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleApiPost("/admin/ads", { id: ad.id, action: "delete" })}
                              >
                                <FaTrash />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Reports & Analytics */}
              <Tab.Pane eventKey="reports">
                <Row>
                  <Col>
                    <Card>
                      <Card.Header>
                        <FaChartLine /> Compliance Reports
                      </Card.Header>
                      <Card.Body>
                        <Alert variant="info">
                          Takedown Reports: 12 <br />
                          Avg Moderation Response: 2h 15m <br />
                          Flagged Content: 5 Uploads, 3 Comments <br />
                          Pending AI Flags: 2
                        </Alert>
                        <Button variant="primary" onClick={() => handleApiPost("/admin/reports", {})}>
                          Refresh Reports
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
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
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Movie / Show / Promo / Ad" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select>
                <option>Published</option>
                <option>Scheduled</option>
                <option>Pending Approval</option>
                <option>Flagged by AI</option>
                <option>Under Review</option>
                <option>Embargoed</option>
                <option>Rejected</option>
                <option>Pending Regional Approval</option>
                <option>Bulk Update Pending</option>
                <option>Archived</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Platform</Form.Label>
              <Form.Select>
                <option>Web</option>
                <option>iOS App</option>
                <option>Android App</option>
                <option>Smart TV</option>
                <option>All Platforms</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Target Region</Form.Label>
              <Form.Control type="text" placeholder="e.g., India, US, EU" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>AI Flags / Notes</Form.Label>
              <Form.Control type="text" placeholder="Auto-flag reasons or manual notes" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Schedule / Release Date</Form.Label>
              <Form.Control type="datetime-local" />
            </Form.Group>

            <Button variant="success" onClick={() => handleApiPost("/admin/catalog", { modalContent })}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminComplianceDashboard;

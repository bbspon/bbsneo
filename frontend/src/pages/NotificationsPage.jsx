// NotificationsPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  ListGroup,
  Badge,
  Nav,
  Modal,
  Form,
  InputGroup,
  Image,
  Card,
} from "react-bootstrap";
import {
  FaBell,
  FaEnvelopeOpen,
  FaEnvelope,
  FaTrash,
  FaSearch,
  FaBars,
  FaCog,
} from "react-icons/fa";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Mock data simulating API fetch
    const mockData = [
      {
        id: 1,
        type: "mention",
        title: "You were mentioned in a comment",
        message: "@you was tagged by Jane in a post.",
        time: "2m ago",
        unread: true,
        icon: <FaBell className="text-primary me-2" />,
      },
      {
        id: 2,
        type: "like",
        title: "New like on your post",
        message: "Mike liked your photo.",
        time: "5m ago",
        unread: false,
        icon: <FaBell className="text-success me-2" />,
      },
      {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      },
       {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      },
       {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      },
       {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      },
       {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      }, {
        id: 3,
        type: "comment",
        title: "New comment received",
        message: "Anna commented on your video.",
        time: "10m ago",
        unread: true,
        icon: <FaBell className="text-info me-2" />,
      },
    ];
    setNotifications(mockData);
  }, []);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleMarkRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  const filtered = notifications.filter((n) => {
    if (filter === "Unread") return n.unread;
    if (filter === "Mentions") return n.type === "mention";
    return true;
  }).filter((n) => n.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <Container fluid className="d-flex flex-column min-vh-100 p-0">
      {/* Header */}
      <Row className="bg-light border-bottom align-items-center p-2">
        <Col xs="auto">
          <Button variant="outline-secondary" onClick={() => setShowSidebar(!showSidebar)}>
            <FaBars />
          </Button>
        </Col>
        <Col>
          <h5 className="mb-0 fw-bold">Notifications</h5>
        </Col>
        <Col xs="auto">
          <InputGroup size="sm">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search notifications..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs="auto">
          <Button variant="outline-dark" onClick={handleMarkAllRead}>
            Mark all as read
          </Button>
        </Col>
        <Col xs="auto">
          <FaCog size={18} className="text-secondary" />
        </Col>
      </Row>

      <Row className="flex-grow-1 m-0 flex-nowrap" style={{ flex: "1 1 auto", overflowY: "auto" }}>
        {/* Sidebar */}
        {showSidebar && (
          <Col xs={12} md={3} lg={2} className="border-end bg-white p-3">
            <Nav variant="pills" className="flex-column gap-2">
              {['All', 'Unread', 'Mentions'].map((key) => (
                <Nav.Item key={key}>
                  <Nav.Link
                    active={filter === key}
                    onClick={() => setFilter(key)}
                    className="text-start fw-semibold"
                  >
                    {key}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </Col>
        )}

        {/* Notification Feed */}
        <Col xs={12} md={showSidebar ? 9 : 12} lg={showSidebar ? 10 : 12} className="p-3">
          <Card className="shadow-sm">
            <Card.Body>
              <div style={{ maxHeight: "calc(100vh - 160px)", overflowY: "auto" }}>
                <ListGroup variant="flush">
                  {filtered.map((n) => (
                    <ListGroup.Item
                      key={n.id}
                      action
                      onClick={() => setSelectedNotification(n)}
                      className="d-flex justify-content-between align-items-start border-bottom"
                    >
                      <div className="d-flex align-items-start">
                        {n.icon}
                        <div>
                          <div className="fw-semibold">{n.title}</div>
                          <div className="text-muted small">{n.message}</div>
                          <small className="text-secondary">{n.time}</small>
                        </div>
                      </div>
                      <div className="d-flex align-items-center gap-2">
                        <Button
                          variant={n.unread ? "outline-primary" : "outline-success"}
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleMarkRead(n.id);
                          }}
                        >
                          {n.unread ? <FaEnvelope /> : <FaEnvelopeOpen />}
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(n.id);
                          }}
                        >
                          <FaTrash />
                        </Button>
                        {n.unread && <Badge bg="primary" pill>New</Badge>}
                      </div>
                    </ListGroup.Item>
                  ))}
                  {filtered.length === 0 && (
                    <div className="text-center text-muted py-5">No notifications found</div>
                  )}
                </ListGroup>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Modal for notification details */}
      <Modal show={!!selectedNotification} onHide={() => setSelectedNotification(null)} centered>
        {selectedNotification && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedNotification.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{selectedNotification.message}</p>
              <small className="text-muted">{selectedNotification.time}</small>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default NotificationsPage;
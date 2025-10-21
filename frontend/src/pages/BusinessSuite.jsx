import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  ProgressBar,
  Offcanvas,
  Nav,
  ListGroup,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import {
  FaHome,
  FaBell,
  FaAd,
  FaInbox,
  FaRegFileAlt,
  FaCalendarAlt,
  FaChartLine,
  FaCog,
  FaBars,
  FaPlus,
  FaFacebookF,
  FaInstagram,
  FaEdit,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
export default function MetaBusinessDashboard() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState("post");
  const [followers, setFollowers] = useState({ facebook: 2, instagram: 22 });
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const initialTasks = [
    { id: 1, title: "Publish one ad", completed: false },
    { id: 2, title: "Publish one story on Instagram", completed: false },
    { id: 3, title: "Publish 10 posts on Facebook", completed: false },
    { id: 4, title: "Respond to unread messages", completed: false },
    { id: 5, title: "Set up automated replies", completed: false },
    { id: 6, title: "Complete business profile", completed: true },
    { id: 7, title: "Link Instagram account", completed: false },
  ];
  const [coverImage, setCoverImage] = useState(
    "https://via.placeholder.com/80"
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [tempImage, setTempImage] = useState("");

  const handleCoverSave = () => {
    if (tempImage) {
      setCoverImage(tempImage);
      setTempImage("");
      setShowEditModal(false);
    }
  };
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem("mbs_tasks_v1");
      return raw ? JSON.parse(raw) : initialTasks;
    } catch (e) {
      return initialTasks;
    }
  });
    const navItems = [
    { icon: <FaHome />, label: "Home", path: "/home" },
    { icon: <FaBell />, label: "Notifications", path: "/notifications" },
    { icon: <FaAd />, label: "Ads Manager", path: "/ads-manager" },
    { icon: <FaRegFileAlt />, label: "Content", path: "/content" },
    { icon: <FaCalendarAlt />, label: "Planner", path: "/planner" },
    { icon: <FaChartLine />, label: "Insights", path: "/insights" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

const menuItems = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaBell />, label: "Notifications", path: "/notifications" },
    { icon: <FaAd />, label: "Ads Manager", path: "/ads-manager" },
    { icon: <FaRegFileAlt />, label: "Content", path: "/content" },
    { icon: <FaCalendarAlt />, label: "Planner", path: "/planner" },
    { icon: <FaChartLine />, label: "Insights", path: "/insights" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  const weeklyGoal = 5;

  useEffect(() => {
    localStorage.setItem("mbs_tasks_v1", JSON.stringify(tasks));
  }, [tasks]);

  const completedCount = tasks.filter((t) => t.completed).length;
  const progressPercent = Math.min(
    100,
    Math.round((completedCount / weeklyGoal) * 100)
  );

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function addTask(title) {
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: title || "New task", completed: false },
    ]);
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .app-cover { background: linear-gradient(180deg,#e9f3fb, #f6eef6 40%); border-radius:8px; padding: 20px; }
      .cover-img { width:100%; height:160px; object-fit:cover; border-radius:6px; background:linear-gradient(90deg,#f0f6fa,#ffffff); }
      .profile-avatar { width:50px; height:50px; border-radius:50%; border:4px solid #fff; box-shadow:0 2px 6px rgba(0,0,0,0.08); }
      .sidebar-link { display:flex; align-items:center; gap:12px; padding:12px 14px; border-radius:8px; color: #1b1b1b; }
      .sidebar-link:hover { background: rgba(0,0,0,0.03); text-decoration:none; }
      @media (max-width: 992px) {
        .cover-img { height:120px; }
        .profile-avatar { width:56px; height:56px; }
      }
      @media (max-width: 576px) {
        .cover-img { height:100px; }
        .profile-avatar { width:48px; height:48px; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col
          xs={12}
          md={isOpen ? 3 : 1}
          lg={isOpen ? 2 : 1}
          className="bg-white border-end d-none d-md-flex flex-column"
          style={{
            transition: "width 0.3s",
            height: "100vh",
            overflow: "hidden",
            position: "sticky",
            top: 0,
          }}
        >
          <div className="d-flex flex-column align-items-center p-2 h-100">
            <div className="d-flex flex-row align-items-center gap-2 w-100 justify-content-between mt-2">
              <Image
                src="https://img.freepik.com/premium-vector/s-single-logo-design-colorful_733947-5291.jpg?w=2000"
                roundedCircle
                className="profile-avatar cursor-pointer mx-2"
                onClick={toggleSidebar}
              />
              <h4 className="text-center">{isOpen && "BBSNEO BUZZ"}</h4>
            </div>

     <Nav className="flex-column w-100 mt-2 px-2">
      {navItems.map((item, idx) => (
        <Nav.Link
          key={idx}
          as={Link}
          to={item.path}
          className="sidebar-link d-flex align-items-center gap-2 py-2"
          style={{ color: "#333", textDecoration: "none" }}
        >
          {item.icon}
          {isOpen && <span className="ms-2">{item.label}</span>}
        </Nav.Link>
      ))}
    </Nav>
          </div>
        </Col>

        {/* Main content */}
        <Col xs={12} md={isOpen ? 9 : 11} lg={isOpen ? 10 : 11}>
          {/* Mobile top bar */}
          <div className="d-flex d-md-none justify-content-between align-items-center p-2 border-bottom">
            <Button variant="light" onClick={() => setShowSidebar(true)}>
              <FaBars />
            </Button>
            <strong>BBS NEO Business Suite</strong>
            <div></div>
          </div>

          {/* Cover */}
          <div
            className="app-cover m-2 shadow-sm position-relative d-flex flex-column justify-content-end "
            style={{
              backgroundImage: `url(${coverImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "8px",
              padding: "20px",
              color: "#fff",
              height: "360px",
            }}
          >
            <Button
              variant="light"
              className="position-absolute top-2 end-2 z-index-1"
              style={{
                background: "transparent", // fully transparent
                border: "none", // remove border
                padding: "0", // optional: remove extra padding
                color: "#6d4b4bff", // icon color (white for contrast)
                fontSize: "1.2rem", // adjust icon size
              }}
              onClick={() => setShowEditModal(true)}
            >
              <FaEdit />
            </Button>

            <Row className="align-items-center">
              <Col xs={12} md={8} className="d-flex gap-3 align-items-center">
                <div>
                  <h4 className="fw-bold text-white bg-danger px-3 py-1 rounded-3">
                    BBSNEO Business Suite
                  </h4>
                  <div className="d-flex gap-3 align-items-center ">
                    <div className="px-3 py-1 rounded-3 bg-primary">
                      <FaFacebookF /> <strong>{followers.facebook}</strong>{" "}
                      <small className="text-light ">Facebook</small>
                    </div>
                    <div className="px-3 py-1 rounded-3 bg-danger">
                      <FaInstagram /> <strong>{followers.instagram}</strong>{" "}
                      <small className="text-light">Instagram</small>
                    </div>
                  </div>
                </div>
              </Col>
              <Col
                xs={12}
                md={4}
                className="d-flex flex-wrap flex-row w-100 justify-content-md-end mt-2 mt-md-0 gap-3"
              >
                {[
                  {
                    type: "post",
                    color: "primary",
                    icon: <FaPlus />,
                    path: "/create-post",
                  },
                  {
                    type: "ad",
                    color: "warning",
                    path: "/create-ad",
                  },
                  {
                    type: "reel",
                    color: "success",
                    path: "/create-reel",
                  },
                  {
                    type: "story",
                    color: "info",
                    path: "/create-story",
                  },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    className="text-decoration-none"
                    style={{ flex: "1 1 130px", maxWidth: "150px" }}
                  >
                    <div
                      className={`border border-${item.color} rounded-3 text-center py-2 px-3 shadow-sm`}
                      style={{
                        cursor: "pointer",
                        transition: "all 0.2s ease-in-out",
                        background: item.type === "post" ? "#0d6efd" : "white",
                        color: item.type === "post" ? "white" : "inherit",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      <div
                        className="d-flex align-items-center justify-content-center gap-2"
                        style={{ height: "100%" }}
                      >
                        {/* show icon for post only */}
                        {item.icon && <div>{item.icon}</div>}
                        <strong>Create {item.type}</strong>
                      </div>
                    </div>
                  </Link>
                ))}
              </Col>
            </Row>

            {/* Edit Cover Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Cover Image</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3">
                  <Form.Label>Upload Cover Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setTempImage(URL.createObjectURL(file)); // temporary preview
                      }
                    }}
                  />
                </Form.Group>
                {tempImage && (
                  <div className="text-center mt-2">
                    <p>Preview:</p>
                    <Image
                      src={tempImage}
                      fluid
                      rounded
                      style={{ maxHeight: "200px", objectFit: "cover" }}
                    />
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    if (tempImage) {
                      setCoverImage(tempImage); // update actual cover
                      setTempImage("");
                      setShowEditModal(false);
                    }
                  }}
                >
                  Save
                </Button>
              </Modal.Footer>
            </Modal>
          </div>

          {/* To-do list */}
          <div className="bg-white m-2 p-3 rounded shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap">
              <div>
                <h5>To-do list</h5>
                <small className="text-muted">
                  Check unread messages, comments and other things that may
                  require your attention.
                </small>
              </div>
              <Button variant="light" size="sm">
                See full plan
              </Button>
            </div>

            <div className="p-2 border rounded">
              <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
                <div>
                  <strong>Weekly plan</strong>{" "}
                  <Badge bg="secondary">3 days left</Badge>
                  <div className="text-muted mt-1">
                    Complete at least {weeklyGoal} tasks.
                  </div>
                </div>
                <div className="text-end" style={{ minWidth: 180 }}>
                  <div className="text-muted small">
                    {completedCount} of {tasks.length} tasks done
                  </div>
                  <ProgressBar
                    now={progressPercent}
                    label={`${progressPercent}%`}
                  />
                </div>
              </div>

              <ListGroup className="mt-2">
                {tasks.map((t) => (
                  <ListGroup.Item
                    key={t.id}
                    className="d-flex justify-content-between align-items-center flex-wrap"
                  >
                    <Form.Check
                      type="checkbox"
                      id={`task-${t.id}`}
                      checked={t.completed}
                      onChange={() => toggleTask(t.id)}
                      label={t.title}
                    />
                    <div className="d-flex gap-2 align-items-center">
                      <small className="text-muted">
                        {t.completed ? "Done" : "Pending"}
                      </small>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => removeTask(t.id)}
                      >
                        Remove
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex gap-2 mt-2 flex-wrap">
                <AddTaskInput onAdd={addTask} />
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setCreateType("task");
                    setShowCreateModal(true);
                  }}
                >
                  Add via modal
                </Button>
              </div>
            </div>
          </div>

          {/* Dashboard widgets */}
          <Row className="m-2 g-2">
            <Col xs={12} md={6}>
              <Widget title="Recent Activity">
                <small className="text-muted">
                  No recent activity in the last 7 days.
                </small>
              </Widget>
            </Col>
            <Col xs={12} md={6}>
              <Widget title="Insights">
                <div className="d-flex justify-content-between">
                  <div>
                    <strong>Week</strong>
                    <div className="text-muted">Reach up 4%</div>
                  </div>
                  <div>
                    <strong>Followers</strong>
                    <div className="text-muted">
                      +{Math.max(0, followers.instagram - 20)}
                    </div>
                  </div>
                </div>
              </Widget>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Offcanvas for mobile */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
              <ListGroup variant="flush">
      {menuItems.map((item, idx) => (
        <ListGroup.Item
          key={idx}
          as={Link}
          to={item.path}
          action
          className="d-flex align-items-center gap-2"
        >
          {item.icon}
          <span>{item.label}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>

        </Offcanvas.Body>
      </Offcanvas>

      {/* Create modal */}
      <CreateModal
        show={showCreateModal}
        type={createType}
        onClose={() => setShowCreateModal(false)}
        onCreate={(payload) => {
          if (createType === "task") addTask(payload.title || "New task");
          else alert(`${createType} created: ${JSON.stringify(payload)}`);
          setShowCreateModal(false);
        }}
      />
    </Container>
  );
}

function Widget({ title, children }) {
  return (
    <div className="bg-white p-3 rounded shadow-sm h-100">
      <h6>{title}</h6>
      {children}
    </div>
  );
}

function AddTaskInput({ onAdd }) {
  const [val, setVal] = useState("");
  return (
    <div className="d-flex gap-2 flex-grow-1 flex-wrap">
      <Form.Control
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder="Add a task"
      />
      <Button
        onClick={() => {
          if (val.trim()) {
            onAdd(val.trim());
            setVal("");
          }
        }}
      >
        Add
      </Button>
    </div>
  );
}

function CreateModal({ show, onClose, type, onCreate }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle("");
    setContent("");
  }, [show, type]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create {type}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-2">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          {(type === "post" ||
            type === "ad" ||
            type === "reel" ||
            type === "story") && (
            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onCreate({ title, content })}>Create</Button>
      </Modal.Footer>
    </Modal>
  );
}

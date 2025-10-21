// YStudioNotificationPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  FaBell,
  FaTrash,
  FaCheckDouble,
  FaSearch,
  FaUserCircle,
  FaThumbsUp,
  FaComment,
  FaVideo,
  FaUserPlus,
  FaSun,
  FaMoon,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "sweetalert2/dist/sweetalert2.min.css";
import Logo from "../assets/logo.png";

const MySwal = withReactContent(Swal);

const sampleNotifications = [
  {
    id: 1,
    type: "like",
    user: "Alex Johnson",
    text: "liked your video “React Hooks Explained”",
    time: "5m ago",
    details: "Great job explaining hooks!",
  },
  {
    id: 2,
    type: "comment",
    user: "Priya Sharma",
    text: "commented: 'This was really helpful, thanks!'",
    time: "20m ago",
    details: "I tried this example and it worked perfectly.",
  },
  {
    id: 3,
    type: "upload",
    user: "Your Channel",
    text: "Your video “Building UI in React” has been uploaded successfully",
    time: "1h ago",
    details: "Video ready to view on your channel.",
  },
  {
    id: 4,
    type: "subscribe",
    user: "Ravi Kumar",
    text: "subscribed to your channel",
    time: "3h ago",
    details: "",
  },
  {
    id: 5,
    type: "comment",
    user: "Emily Watson",
    text: "replied to your comment on “Node.js Basics”",
    time: "6h ago",
    details: "Thanks for the explanation!",
  },
];

const YStudioNotificationPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [search, setSearch] = useState("");
  const [openIds, setOpenIds] = useState([]);

  const markAllRead = () => {
    MySwal.fire({
      title: "Mark all notifications as read?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, mark all",
      cancelButtonText: "Cancel",
      background: darkMode ? "#181818" : "#fff",
      color: darkMode ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: "All notifications marked as read!",
          icon: "success",
          background: darkMode ? "#181818" : "#fff",
          color: darkMode ? "#fff" : "#000",
        });
      }
    });
  };

  const clearAll = () => {
    MySwal.fire({
      title: "Clear all notifications?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear all",
      cancelButtonText: "Cancel",
      background: darkMode ? "#181818" : "#fff",
      color: darkMode ? "#fff" : "#000",
    }).then((result) => {
      if (result.isConfirmed) {
        setNotifications([]);
        MySwal.fire({
          title: "Notifications cleared!",
          icon: "success",
          background: darkMode ? "#181818" : "#fff",
          color: darkMode ? "#fff" : "#000",
        });
      }
    });
  };

  const filtered = notifications.filter((n) =>
    n.text.toLowerCase().includes(search.toLowerCase())
  );

  const toggleDetails = (id) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const iconMap = {
    like: <FaThumbsUp color="#ff3f3f" />,
    comment: <FaComment color="#ffa500" />,
    upload: <FaVideo color="#1e90ff" />,
    subscribe: <FaUserPlus color="#28a745" />,
  };

  return (
    <div className={`ystudio-page ${darkMode ? "dark" : "light"}`}>
      {/* ---------- Navbar ---------- */}
      <div className="ystudio-navbar d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-3">
          <img src={Logo} alt="Logo" className="nav-logo" />
          <h5 className="m-0">Y-Studio Notifications</h5>
        </div>

        <Form className="search-bar d-flex">
          <Form.Control
            type="text"
            placeholder="Search notifications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <Button variant="danger">
            <FaSearch />
          </Button>
        </Form>

        <div className="nav-right d-flex align-items-center gap-3">
          <Button variant="outline-danger" onClick={markAllRead}>
            <FaCheckDouble /> Mark all
          </Button>
          <Button variant="outline-secondary" onClick={clearAll}>
            <FaTrash /> Clear
          </Button>
          <Button
            variant="link"
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
            <span className="ms-1">{darkMode ? "Light Mode" : "Dark Mode"}</span>
          </Button>
        </div>
      </div>

      {/* ---------- Main Content ---------- */}
      <main className="ystudio-main">
        <Container fluid>
          <Row>
            <Col>
              {filtered.length === 0 ? (
                <div className="text-center py-5">
                  <FaBell size={60} color="#999" />
                  <h5 className="mt-3">No new notifications</h5>
                </div>
              ) : (
                filtered.map((n) => {
                  const isOpen = openIds.includes(n.id);
                  return (
                    <Card key={n.id} className="notification-card mb-3">
                      <Card.Body
                        className="d-flex align-items-start"
                        style={{ cursor: "pointer" }}
                        onClick={() => toggleDetails(n.id)}
                      >
                        <div className="icon me-3">{iconMap[n.type]}</div>
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between align-items-center">
                            <strong>{n.user}</strong>
                            <small className="text-muted">{n.time}</small>
                          </div>
                          <div>{n.text}</div>
                          {isOpen && n.details && (
                            <div className="mt-2 p-2 bg-light dark:bg-dark rounded">
                              {n.details}
                            </div>
                          )}
                        </div>
                        <div className="ms-3">
                          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </div>
                        <FaUserCircle
                          size={28}
                          className="ms-3 text-secondary"
                        />
                      </Card.Body>
                    </Card>
                  );
                })
              )}
            </Col>
          </Row>
        </Container>
      </main>

      {/* ---------- Styles ---------- */}
      <style>{`
        body { margin:0; }
        .ystudio-page { min-height:100vh; background:#f9f9f9; color:#000; }
        .ystudio-page.dark { background:#0f0f0f; color:#fff; }
        .ystudio-navbar {
          height:60px;
          background:#fff;
          border-bottom:1px solid #ddd;
          position:sticky;
          top:0;
          z-index:100;
        }
        .ystudio-page.dark .ystudio-navbar { background:#181818; border-color:#000;text-color:#000; }
        .nav-logo { width:35px; }
        .search-bar { flex:1; max-width:400px; }
        .search-input { border-top-right-radius:0; border-bottom-right-radius:0; }
        .ystudio-main { padding:30px; }
        .notification-card {
          border:none;
          border-radius:12px;
          background:#fff;
          box-shadow:0 2px 8px rgba(0,0,0,0.08);
        }
        .ystudio-page.dark .notification-card {
          background:#1b1b1b;
          box-shadow:0 2px 8px rgba(255,255,255,0.05);
        }
        .notification-card:hover { transform:scale(1.01); transition:0.2s; }
        .icon { width:35px; height:35px; display:flex; align-items:center; justify-content:center; font-size:20px; }
        .theme-toggle { cursor:pointer; display:flex; align-items:center; color:inherit; }
        .theme-toggle span { color:inherit; }
        .bg-light { background:#f1f1f1; }
        .ystudio-page.dark .bg-dark { background:#222; }
      `}</style>
    </div>
  );
};

export default YStudioNotificationPage;

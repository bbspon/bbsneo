// YStudioPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Nav,
  Form,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaBell,
  FaMoon,
  FaSun,
  FaUpload,
  FaChartLine,
  FaVideo,
  FaComments,
  FaCogs,
  FaHome,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";

const YStudioPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploadData, setUploadData] = useState({
    title: "",
    thumbnail: "",
    videoFile: null,
  });

  const handleUpload = () => {
    if (!uploadData.title) {
      alert("Please enter a video title");
      return;
    }
    const newVideo = {
      id: videos.length + 1,
      title: uploadData.title,
      thumbnail: uploadData.thumbnail,
      videoUrl: uploadData.videoFile
        ? URL.createObjectURL(uploadData.videoFile)
        : null,
      uploaded: "Just now",
      views: 0,
      likes: 0,
      comments: 0,
    };
    setVideos([newVideo, ...videos]);
    setUploadData({ title: "", thumbnail: "", videoFile: null });
    setShowModal(false);
  };

  return (
    <div className={`ystudio-page ${darkMode ? "dark" : "light"}`}>
      {/* ---------- Top Navbar ---------- */}
      <div className="ystudio-navbar d-flex align-items-center justify-content-between px-3">
        <div className="d-flex align-items-center gap-3">
          <FaBars
            className="menu-icon"
            onClick={() => setCollapsed(!collapsed)}
          />
          <img src={Logo} alt="Logo" className="nav-logo" />
          <h5 className="m-0">Y-Studio</h5>
        </div>

        <Form className="search-bar d-flex">
          <Form.Control
            type="text"
            placeholder="Search videos..."
            className="search-input"
          />
          <Button variant="danger">Search</Button>
        </Form>

        <div className="nav-right d-flex align-items-center gap-2">
          <Button
            variant="outline-danger"
            className="upload-btn"
            onClick={() => setShowModal(true)}
          >
            <FaUpload className="me-2" /> Upload
          </Button>
          <Link to="/ystudio-notification">
            <FaBell className="notif-icon" size={19} color="gray" />
          </Link>
          <Button
            variant="link"
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? <FaSun color="yellow" /> : <FaMoon color="gray" />}
          </Button>
        </div>
      </div>

      {/* ---------- Sidebar ---------- */}
      <aside className={`ystudio-sidebar ${collapsed ? "collapsed" : ""}`}>
        <Nav className="d-flex flex-column align-items-start justify-content-center vh-100 px-2 bg-dark text-white">
          <Nav.Link className="text-white mb-3">
            <FaHome className="me-2" /> <span>Dashboard</span>
          </Nav.Link>
          <Nav.Link className="text-white mb-3">
            <FaVideo className="me-2" /> <span>Content</span>
          </Nav.Link>
          <Nav.Link className="text-white mb-3">
            <FaChartLine className="me-2" /> <span>Analytics</span>
          </Nav.Link>
          <Nav.Link className="text-white mb-3">
            <FaComments className="me-2" /> <span>Comments</span>
          </Nav.Link>
          <Nav.Link className="text-white">
            <FaCogs className="me-2" /> <span>Settings</span>
          </Nav.Link>
        </Nav>
      </aside>

      {/* ---------- Main Content ---------- */}
      <main className={`ystudio-main ${collapsed ? "collapsed" : ""}`}>
        <Container fluid>
          <h4 className="section-title">Your Uploaded Videos</h4>
          <Row>
            {videos.map((v) => (
              <Col key={v.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="video-card">
                  <div className="thumbnail-wrapper">
                    {v.videoUrl ? (
                      <video
                        src={v.videoUrl}
                        controls
                        className="video-preview"
                      />
                    ) : (
                      <Card.Img variant="top" src={v.thumbnail} />
                    )}
                  </div>
                  <Card.Body>
                    <Card.Title>{v.title}</Card.Title>
                    <Card.Text className="video-meta">
                      {v.views} views • {v.uploaded}
                    </Card.Text>
                    <div className="video-stats d-flex justify-content-between">
                      <span>👍 {v.likes}</span>
                      <span>💬 {v.comments}</span>
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      className="mt-2 w-100"
                    >
                      Manage
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      {/* ---------- Upload Modal ---------- */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Upload New Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Video Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video title"
                value={uploadData.title}
                onChange={(e) =>
                  setUploadData({ ...uploadData, title: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Thumbnail URL (optional)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter thumbnail image URL"
                value={uploadData.thumbnail}
                onChange={(e) =>
                  setUploadData({ ...uploadData, thumbnail: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Upload Video File (mp4, webm, etc.)</Form.Label>
              <Form.Control
                type="file"
                accept="video/*"
                onChange={(e) =>
                  setUploadData({
                    ...uploadData,
                    videoFile: e.target.files[0],
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>

      {/* ---------- Styles ---------- */}
      <style>{`
        body { margin:0; }
        .ystudio-page { min-height:100vh; display:flex; flex-direction:column; background:#f9f9f9; color:#000; }
        .ystudio-page.dark { background:#0f0f0f; color:#fff; }
        .ystudio-navbar { height:60px; background:#fff; border-bottom:1px solid #ddd; position:sticky; top:0; z-index:100; }
        .ystudio-page.dark .ystudio-navbar { background:#181818; border-color:#333; }
        .nav-logo { width:35px; height:auto; }
        .search-bar { flex:1; max-width:500px; }
        .search-input { border-top-right-radius:0; border-bottom-right-radius:0; }
        .upload-btn { font-weight:600; }
        .notif-icon { cursor:pointer; }
        .ystudio-sidebar { position:fixed; top:60px; left:0; height:calc(100vh - 60px); width:200px; background:#fff; border-right:1px solid #ddd; transition:width 0.3s ease; z-index:99; }
        .ystudio-page.dark .ystudio-sidebar { background:#181818; border-color:#333; }
        .ystudio-sidebar.collapsed { width:70px; }
        .ystudio-sidebar .nav-link { color:#bbb; font-weight:500; padding:12px 15px; border-radius:6px; display:flex; align-items:center; }
        .ystudio-sidebar .nav-link:hover { background:#222; color:#ff3f3f; }
        .ystudio-sidebar.collapsed span { display:none; }
        .ystudio-main { margin-left:200px; padding:30px; transition:margin-left 0.3s ease; }
        .ystudio-main.collapsed { margin-left:70px; }
        .section-title { font-weight:700; margin-bottom:20px; color:#ff3f3f; }
        .video-card { border:none; border-radius:12px; overflow:hidden; background:#fff; box-shadow:0 2px 8px rgba(0,0,0,0.1); transition:transform 0.3s ease; }
        .ystudio-page.dark .video-card { background:#1b1b1b; }
        .video-card:hover { transform:translateY(-5px); }
        .thumbnail-wrapper { width:100%; height:180px; background:#000; display:flex; justify-content:center; align-items:center; overflow:hidden; }
        .thumbnail-wrapper img, .thumbnail-wrapper video { width:100%; height:100%; object-fit:cover; }
        .video-meta { font-size:0.9rem; color:#777; }
        .ystudio-page.dark .video-meta { color:#aaa; }
        .video-stats span { font-size:0.85rem; color:#666; }
        .ystudio-page.dark .video-stats span { color:#ccc; }
      `}</style>
    </div>
  );
};

export default YStudioPage;

// TrendingPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Nav,
  Form,
  Offcanvas,
} from "react-bootstrap";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaFire,
  FaBars,
  FaBookmark,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


const API_BASE = "http://127.0.0.1:3104";


const TrendingPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // Desktop toggle
  const [showMobileSidebar, setShowMobileSidebar] = useState(false); // Mobile
const [trending, setTrending] = useState([]);

  const videoRefs = useRef([]);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setShowModal(false);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);
  const toggleMobileSidebar = () => setShowMobileSidebar(!showMobileSidebar);
useEffect(() => {
const fetchTrending = async () => {
  try {
    const res = await axios.get(`${API_BASE}/trending`);
    const isVideoLike = (u) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(u || "");
    const isImageLike = (u) =>
      /\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i.test(u || "");

    const data = res.data.map((item) => {
      // Prefer mediaUrl if present, else fall back to thumbnailUrl
      const media = item.mediaUrl || item.thumbnailUrl || "";

      const type = isVideoLike(media) ? "video" : "image"; // default to image if not a known video type

      return {
        id: item._id,
        type,
        title: item.title,
        user: item.creatorName || item.user,
        views: item.viewsCount,
        likes: item.likesCount,
        comments: String(item.commentsCount || 0),
        media, // what we actually render
        thumb: item.thumbnailUrl || "", // used as poster/fallback
      };
    });

    setTrending(data);
  } catch (err) {
    console.error("Failed to fetch trending:", err);
  }
};

  fetchTrending();
}, []);

  // Auto-play videos on hover
  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.addEventListener("mouseover", () => video.play());
        video.addEventListener("mouseout", () => video.pause());
      }
    });
    return () => {
      videoRefs.current.forEach((video) => {
        if (video) {
          video.removeEventListener("mouseover", () => video.play());
          video.removeEventListener("mouseout", () => video.pause());
        }
      });
    };
  }, [trending]);

  return (
    <Container fluid className="mt-3">
      {/* Mobile Menu Button */}
      <Button
        variant="primary"
        className="mb-3 d-md-none"
        onClick={toggleMobileSidebar}
      >
        <FaBars /> Menu
      </Button>

      {/* Mobile Offcanvas Sidebar */}
      <Offcanvas
        show={showMobileSidebar}
        onHide={toggleMobileSidebar}
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Trending Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={toggleMobileSidebar}>#Travel</Nav.Link>
            <Nav.Link onClick={toggleMobileSidebar}>#Tech</Nav.Link>
            <Nav.Link onClick={toggleMobileSidebar}>#Music</Nav.Link>
            <Nav.Link onClick={toggleMobileSidebar}>#Gaming</Nav.Link>
            <Nav.Link onClick={toggleMobileSidebar}>#Education</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Row>
        {/* Desktop Sidebar */}
        <Col md={showSidebar ? 3 : 1} className={`d-none d-md-block sidebar`}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>
                <FaFire className="text-danger" />{" "}
                {showSidebar && "Trending Categories"}
              </Card.Title>
              {showSidebar && (
                <Nav className="flex-column">
                  <Nav.Link>#Travel</Nav.Link>
                  <Nav.Link>#Tech</Nav.Link>
                  <Nav.Link>#Music</Nav.Link>
                  <Nav.Link>#Gaming</Nav.Link>
                  <Nav.Link>#Education</Nav.Link>
                </Nav>
              )}
              <Button
                variant="light"
                size="sm"
                onClick={toggleSidebar}
                className="mt-2"
              >
                {showSidebar ? "<" : ">"}
              </Button>
            </Card.Body>
          </Card>
        </Col>

        {/* Main Content */}
        <Col md={showSidebar ? 9 : 11}>
          {/* Desktop toggle button */}

          {/* Search Bar */}
          <Row className="mb-3">
            <Col>
              <Form>
                <Form.Control type="text" placeholder="Search trending..." />
              </Form>
            </Col>
          </Row>

          {/* Trending Cards */}
          <Row>
            {trending.map((post, index) => (
              <Col key={post.id} md={6} lg={4} className="mb-4">
                <Card className="h-100">
                  {post.type === "video" && (
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={post.media}
                      poster={post.thumb || "/thumbnails/placeholder.jpg"}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      muted
                      loop
                      playsInline
                    />
                  )}

                  {post.type === "image" && (
                    <Card.Img
                      variant="top"
                      src={post.media}
                      onError={(e) => {
                        e.currentTarget.src = "/thumbnails/placeholder.jpg";
                      }}
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                  )}

                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {post.user} • {post.views} views
                    </Card.Subtitle>
                    <div className="mt-auto d-flex justify-content-between">
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleOpenModal(post)}
                      >
                        <FaHeart /> {post.likes}
                      </Button>
                      <Button variant="outline-secondary" size="sm">
                        <FaComment /> {post.comments}
                      </Button>
                      <Button variant="outline-primary" size="sm">
                        <FaShare />
                      </Button>
                      <Button variant="outline-success" size="sm">
                        <FaBookmark />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Post Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedPost?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPost?.type === "video" && (
            <video
              src={selectedPost.media}
              controls
              autoPlay
              style={{ width: "100%" }}
            />
          )}
          {selectedPost?.type === "image" && (
            <img
              src={selectedPost.media}
              alt={selectedPost.title}
              style={{ width: "100%" }}
            />
          )}
          {selectedPost?.type === "post" && <p>{selectedPost.title}</p>}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default TrendingPage;

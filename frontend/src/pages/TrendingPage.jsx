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

const sampleTrending = [
  {
    id: 1,
    type: "video",
    title: "Top 10 Travel Destinations",
    user: "TravelGuru",
    views: "1.2M",
    likes: "50K",
    comments: "1.2K",
    media: "https://www.w3schools.com/html/mov_bbb.mp4",
  },
  {
    id: 2,
    type: "image",
    title: "Amazing Sunset",
    user: "NatureLover",
    views: "500K",
    likes: "20K",
    comments: "500",
    media: "https://www.w3schools.com/w3images/lights.jpg",
  },
  {
    id: 3,
    type: "post",
    title: "Tips for Productivity",
    user: "LifeCoach",
    views: "300K",
    likes: "15K",
    comments: "200",
    media: null,
  },
  {
    id: 4,
    type: "video",
    title: "Reel: Coding in 60 Seconds",
    user: "CodeMaster",
    views: "800K",
    likes: "30K",
    comments: "800",
    media: "https://www.w3schools.com/html/movie.mp4",
  },
];

const TrendingPage = () => {
  const [trending, setTrending] = useState(sampleTrending);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showSidebar, setShowSidebar] = useState(true); // Desktop toggle
  const [showMobileSidebar, setShowMobileSidebar] = useState(false); // Mobile

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
        <Col
          md={showSidebar ? 3 : 1}
          className={`d-none d-md-block sidebar`}
        >
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
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                      }}
                      muted
                      loop
                    />
                  )}
                  {post.type === "image" && (
                    <Card.Img
                      variant="top"
                      src={post.media}
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

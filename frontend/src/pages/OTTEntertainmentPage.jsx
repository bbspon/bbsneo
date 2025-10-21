// OTTPackPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Accordion,
  ListGroup,
  ProgressBar,
  Tabs,
  Tab,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  FaHeart,
  FaComment,
  FaShare,
  FaMusic,
  FaGamepad,
  FaGlobe,
  FaFilm,
  FaRobot,
  FaWhatsapp,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const OTTPackPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [likedContent, setLikedContent] = useState([]);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState("");

  const contentList = [
    { id: 1, type: "Movie", title: "AI Sci-Fi Adventure", description: "An AI-crafted sci-fi VR adventure.", icon: <FaFilm />, progress: 40 },
    { id: 2, type: "VR/AR", title: "VR Cinema: Space Odyssey", description: "360° VR cinema experience.", icon: <FaGlobe />, progress: 10 },
    { id: 3, type: "Music", title: "Daily AI Playlist", description: "Curated AI music & podcasts.", icon: <FaMusic />, progress: 0 },
    { id: 4, type: "Interactive", title: "Bandersnatch AI Edition", description: "Choose your path; AI generates endings.", icon: <FaRobot />, progress: 75 },
    { id: 5, type: "Gaming", title: "Mini Game: OTT Quest", description: "Mini-games & e-sports hub.", icon: <FaGamepad />, progress: 20 },
  ];

  const handleOpenModal = (content) => {
    setSelectedContent(content);
    setShowModal(true);
    setCommentInput("");
  };

  const handleCloseModal = () => {
    setSelectedContent(null);
    setShowModal(false);
    setCommentInput("");
  };

  const handleLike = (id) => {
    if (likedContent.includes(id)) {
      setLikedContent(likedContent.filter((cid) => cid !== id));
    } else {
      setLikedContent([...likedContent, id]);
    }
  };

  const handleCommentSubmit = () => {
    if (!commentInput.trim()) return;
    setComments({
      ...comments,
      [selectedContent.id]: [...(comments[selectedContent.id] || []), commentInput],
    });
    setCommentInput("");
  };

  const handleShare = (content) => {
    const url = encodeURIComponent(`https://example.com/ott/${content.id}`);
    const title = encodeURIComponent(content.title);
    window.open(`https://wa.me/?text=${title}%20${url}`, "_blank");
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, "_blank");
    window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`, "_blank");
  };

  const handleEnterExperience = (content) => {
    alert(`Entering "${content.title}" experience!`);
    // Replace with route/navigation logic
    // e.g., router.push(`/experience/${content.id}`)
  };

  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">OTT Entertainment Hub</h2>

      <Tabs defaultActiveKey="all" className="mb-4 justify-content-center">
        <Tab eventKey="all" title="All Content" />
        <Tab eventKey="movies" title="Movies & Series" />
        <Tab eventKey="vrar" title="VR/AR/XR" />
        <Tab eventKey="music" title="Music & Podcasts" />
        <Tab eventKey="gaming" title="Gaming / E-Sports" />
      </Tabs>

      <Row>
        {contentList.map((content) => (
          <Col key={content.id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex align-items-center mb-2">
                  <span className="me-2 fs-3">{content.icon}</span>
                  <Card.Title className="mb-0">{content.title}</Card.Title>
                </div>
                <Card.Text>{content.description}</Card.Text>
                <ProgressBar now={content.progress} label={`${content.progress}% watched`} />
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button variant="primary" onClick={() => handleOpenModal(content)}>Explore</Button>
                <div>
                  <FaHeart
                    className={`me-2 cursor-pointer ${likedContent.includes(content.id) ? "text-danger" : ""}`}
                    onClick={() => handleLike(content.id)}
                  />
                  <FaComment
                    className="me-2 cursor-pointer"
                    onClick={() => handleOpenModal(content)}
                  />
                  <FaShare
                    className="cursor-pointer"
                    onClick={() => handleShare(content)}
                  />
                </div>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedContent?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedContent?.description}</p>
          <Accordion defaultActiveKey="0" className="mb-3">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Features & Experience</Accordion.Header>
              <Accordion.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>Immersive VR/AR/XR experience</ListGroup.Item>
                  <ListGroup.Item>AI-generated alternate endings</ListGroup.Item>
                  <ListGroup.Item>Interactive storytelling</ListGroup.Item>
                  <ListGroup.Item>Music/Podcast integration</ListGroup.Item>
                  <ListGroup.Item>Mini-games & e-sports hub</ListGroup.Item>
                  <ListGroup.Item>Social interactions: chat, watch parties</ListGroup.Item>
                  <ListGroup.Item>Accessibility: captions, audio description, multi-language</ListGroup.Item>
                  <ListGroup.Item>Monetization: subscription, micro-transactions, NFT collectibles</ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>User Engagement</Accordion.Header>
              <Accordion.Body>
                <ProgressBar now={selectedContent?.progress || 0} label={`${selectedContent?.progress || 0}% watched`} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/* Comment Section */}
          <h5>Comments</h5>
          <ListGroup variant="flush" className="mb-2">
            {(comments[selectedContent?.id] || []).map((cmt, idx) => (
              <ListGroup.Item key={idx}>{cmt}</ListGroup.Item>
            ))}
          </ListGroup>

          <InputGroup>
            <Form.Control
              placeholder="Write a comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
            />
            <Button variant="success" onClick={handleCommentSubmit}>Submit</Button>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="success" onClick={() => handleEnterExperience(selectedContent)}>Enter Experience</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OTTPackPage;

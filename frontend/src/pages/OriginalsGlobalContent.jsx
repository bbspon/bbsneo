// OriginalsGlobalContent.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel, Tooltip, OverlayTrigger, Dropdown, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// Mock Data
const aiOriginals = [
  {
    id: 1,
    title: "AI Thriller X",
    description: "100% AI-generated series with dynamic plot & cast.",
    image: "https://wallpaperaccess.com/full/4839516.jpg",
    badge: "AI Original",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Future Drama Y",
    description: "Adaptive storytelling powered by AI technology.",
    image: "https://wallpapercave.com/wp/wp1945939.jpg",
    badge: "Exclusive",
    trailer: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
];

const culturalVersions = [
  { id: 1, country: "India", title: "AI Thriller X - India", image: "https://i.pinimg.com/originals/e8/bf/4f/e8bf4fa644cde87ea50992a25d9d1a7a.png" },
  { id: 2, country: "Japan", title: "AI Thriller X - Japan", image: "https://i.pinimg.com/originals/e8/bf/4f/e8bf4fa644cde87ea50992a25d9d1a7a.png" },
  { id: 3, country: "USA", title: "AI Thriller X - USA", image: "https://i.pinimg.com/originals/e8/bf/4f/e8bf4fa644cde87ea50992a25d9d1a7a.png" },
];

const spaceOriginals = [
  { id: 1, title: "Lunar Chronicles", image: "https://th.bing.com/th/id/R.6a9f9e4ee7534abe7b24bd5a1b28e0f8?rik=IYU2cQqFw%2fA%2bTg&riu=http%3a%2f%2fwallup.net%2fwp-content%2fuploads%2f2016%2f03%2f09%2f191029-movies.jpg&ehk=qJb2jNibUbiomE6c7vbCYrpM%2f0guqV0uK8esjZ%2fLxVA%3d&risl=&pid=ImgRaw&r=0" },
  { id: 2, title: "Mars Odyssey", image: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2022/08/AVATAR_RERLS_1SHT_DIGITAL_sRGB_V7.jpg" },
];

const languages = ["English", "Hindi", "Spanish", "French", "Japanese", "Mandarin"];

const OriginalsGlobalContent = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [modalContent, setModalContent] = useState({ show: false, type: "", item: null });

  const renderTooltip = (props, text) => (
    <Tooltip {...props}>{text}</Tooltip>
  );

  const openModal = (type, item) => setModalContent({ show: true, type, item });
  const closeModal = () => setModalContent({ show: false, type: "", item: null });

  return (
    <Container fluid className="p-4">
      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <Card className="text-white">
            <Card.Img src="https://th.bing.com/th/id/R.667009e0b2d0878fed8c8a2b45af4376?rik=CTuVDirCs9KsrQ&riu=http%3a%2f%2fhdqwalls.com%2fwallpapers%2ftitanic-movie-full-hd.jpg&ehk=shuYoCshdWaPmf8iswXCLMCuKFbhdMKIwKhFoDL2slk%3d&risl=&pid=ImgRaw&r=0" alt="Hero Image" />
            <Card.ImgOverlay className="d-flex flex-column justify-content-center text-center bg-dark bg-opacity-50">
              <Card.Title className="display-4">AI Originals & Space Content</Card.Title>
              <Card.Text className="lead">Experience the future of entertainment with AI and space-filmed series.</Card.Text>
              <Button variant="primary" size="lg" onClick={() => navigate(`/series/${aiOriginals[0].id}`)}>Watch Now</Button>
            </Card.ImgOverlay>
          </Card>
        </Col>
      </Row>

      {/* AI Originals Section */}
      <Row className="mb-5">
        <Col>
          <h2>AI Originals</h2>
          <Carousel indicators={false}>
            {aiOriginals.map((item) => (
              <Carousel.Item key={item.id}>
                <Card className="text-center">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <OverlayTrigger
                      placement="top"
                      overlay={(props) => renderTooltip(props, "This content is 100% AI-generated!")}
                    >
                      <Card.Title>{item.title} <span className="badge bg-info">{item.badge}</span></Card.Title>
                    </OverlayTrigger>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="primary" className="me-2" onClick={() => openModal("trailer", item)}>Watch Trailer</Button>
                    <Button variant="success" onClick={() => navigate(`/series/${item.id}`)}>Start Series</Button>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Cultural Versions Section */}
      <Row className="mb-5">
        <Col>
          <h2>Dynamic Cultural Versions</h2>
          <Row>
            {culturalVersions.map((version) => (
              <Col md={4} className="mb-3" key={version.id}>
                <Card className="text-center">
                  <Card.Img variant="top" src={version.image} />
                  <Card.Body>
                    <Card.Title>{version.title}</Card.Title>
                    <Button variant="primary" onClick={() => navigate(`/player/${version.id}/${version.country}`)}>Watch Your Version</Button>
                    <Button variant="secondary" className="ms-2" onClick={() => openModal("compare", version)}>Compare Versions</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Universal Translator Section */}
      <Row className="mb-5">
        <Col md={6}>
          <h2>Universal Translator Mode</h2>
          <p>Watch AI Originals in your preferred language with real-time dubbing and custom voice cloning.</p>
          <Dropdown onSelect={(lang) => setSelectedLanguage(lang)}>
            <Dropdown.Toggle variant="primary" id="dropdown-language">
              {selectedLanguage}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {languages.map((lang, index) => (
                <Dropdown.Item eventKey={lang} key={index}>{lang}</Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="success" className="mt-3" onClick={() => alert(`Translation enabled: ${selectedLanguage}`)}>Enable Translation</Button>
        </Col>
        <Col md={6}>
          <img src="https://via.placeholder.com/500x300.png?text=Universal+Translator" className="img-fluid" alt="Translator Demo" />
        </Col>
      </Row>

      {/* Space Originals Section */}
      <Row className="mb-5">
        <Col>
          <h2>Space Originals</h2>
          <Row>
            {spaceOriginals.map((item) => (
              <Col md={6} className="mb-3" key={item.id}>
                <Card className="text-center">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Button variant="primary" className="me-2" onClick={() => navigate(`/space/${item.id}`)}>Watch in Space Mode</Button>
                    <Button variant="secondary" onClick={() => openModal("bts", item)}>Explore Behind the Scenes</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Recommended Section */}
      <Row className="mb-5">
        <Col>
          <h2>Recommended For You</h2>
          <Carousel indicators={false}>
            {aiOriginals.concat(spaceOriginals).map((item, idx) => (
              <Carousel.Item key={idx}>
                <Card className="text-center">
                  <Card.Img variant="top" src={item.image} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Button variant="success" onClick={() => navigate(`/series/${item.id}`)}>Watch Now</Button>
                  </Card.Body>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Footer CTA */}
      <Row className="text-center mt-5">
        <Col>
          <Button variant="warning" size="lg" className="me-3" onClick={() => navigate("/originals")}>Explore All Originals</Button>
          <Button variant="danger" size="lg" onClick={() => navigate("/subscribe")}>Subscribe Now</Button>
        </Col>
      </Row>

      {/* Modals */}
      <Modal show={modalContent.show} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {modalContent.type === "trailer" && `Trailer: ${modalContent.item?.title}`}
            {modalContent.type === "bts" && `Behind the Scenes: ${modalContent.item?.title}`}
            {modalContent.type === "compare" && `Compare Versions: ${modalContent.item?.title}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {modalContent.type === "trailer" && (
            <iframe width="100%" height="400" src={modalContent.item?.trailer} title="Trailer" frameBorder="0" allowFullScreen></iframe>
          )}
          {modalContent.type === "bts" && (
            <img src={modalContent.item?.image} alt="BTS" className="img-fluid" />
          )}
          {modalContent.type === "compare" && (
            <p>Comparison content for {modalContent.item?.title} (mock data)</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default OriginalsGlobalContent;

// ImmersiveMediaPage.jsx
import React from "react";
import { Container, Row, Col, Card, Button, Carousel, Nav } from "react-bootstrap";

// Sample placeholder data
const vrOriginals = [
  { title: "VR Adventure", description: "Interactive VR show.", 
    img: "https://5thscape.com/blog/wp-content/uploads/2024/07/person-with-vr-glasses-experiencing-metaverse-1-scaled.jpg", link: "/vr" },
  { title: "VR Concert", description: "Immersive live concert.",
     img: "https://www.gamersdecide.com/sites/default/files/2023-09/third_person_main_correct.jpeg", link: "/vr" },
];

const arShopping = [
  { title: "Jewelry Try-On", description: "Try jewelry in AR.",
     img: "https://static.stambol.com/wordpress/wp-content/uploads/2020/08/augmented-reality-shopping-woman-hologram-fashion.jpg", 
     tryLink: "/ar", buyLink: "/ar-jewelry-buy" },
  { title: "Furniture Room View", description: "Visualize furniture at home.",
     img: "https://tse4.mm.bing.net/th/id/OIP.BsHKULPkl26fciWZV6L8xQHaEU?rs=1&pid=ImgDetMain&o=7&rm=3", 
     tryLink: "/ar", buyLink: "/ar-furniture-buy" },
];

const xrEvents = [
  { title: "Holographic Premiere", description: "Exclusive movie premiere.",
     img: "https://i.ytimg.com/vi/ATtair9NF_I/maxresdefault.jpg", joinLink: "/xr", rsvpLink: "/xr-holo-rsvp" },
  { title: "3D Fan Meet", description: "Interact with celebrities in XR.",
     img: "https://i.ytimg.com/vi/KtdyefAGJLs/maxresdefault.jpg", joinLink: "/xr", rsvpLink: "/xr-fan-rsvp" },
];

const hybridCompanion = [
  { title: "Trivia Mode", description: "AR trivia synced with TV.",
     img: "https://triviamaker.com/wp-content/uploads/2025/05/Crowd-Mode-Of-TriviaMaker-scaled.jpg", link: "hybrid" },
  { title: "AR Shopping Companion", description: "Shop while watching content.", 
    img: "https://images.squarespace-cdn.com/content/v1/596ce3c8cd0f68df1fd7598e/1568734958293-M40M7HX7HFCHT1TC5IWD/retail+trends", link: "/hybrid" },
];

export default function ImmersiveMediaPage() {
  return (
    <Container fluid className="p-4">
      {/* Navigation Links */}
      <Row className="mb-4">
        <Col>
          <Nav className="justify-content-center" variant="pills">
            <Nav.Item><Nav.Link href="#vr-originals">VR Originals</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#ar-shopping">AR Shopping</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#xr-events">XR Events</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#hybrid-companion">Hybrid Companion</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#advanced-features">Advanced Features</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href="#future-enhancements">Future Enhancements</Nav.Link></Nav.Item>
          </Nav>
        </Col>
      </Row>

      {/* Hero Section */}
      <Row className="mb-5">
        <Col>
          <div className="p-5 text-center bg-dark text-white rounded">
            <h1>Immersive Media Experiences</h1>
            <p>VR, AR, and XR content for next-level engagement</p>
            <Button as="a" href="#vr-originals" variant="primary">Explore Experiences</Button>
          </div>
        </Col>
      </Row>

      {/* VR Originals Section */}
      <Row className="mb-5" id="vr-originals">
        <Col>
          <h2 className="mb-3">VR Originals</h2>
          <Carousel>
            {vrOriginals.map((item, idx) => (
              <Carousel.Item key={idx}>
                <img className="d-block w-100" src={item.img} alt={item.title} />
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <Button as="a" href={item.link} variant="light">Watch in VR</Button>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* AR Shopping Section */}
      <Row className="mb-5" id="ar-shopping">
        <Col>
          <h2 className="mb-3">AR Shopping</h2>
          <Row>
            {arShopping.map((item, idx) => (
              <Col md={6} key={idx} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button as="a" href={item.tryLink} variant="success" className="me-2">Try Now</Button>
                    <Button as="a" href={item.buyLink} variant="primary">Buy Now</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* XR Events Section */}
      <Row className="mb-5" id="xr-events">
        <Col>
          <h2 className="mb-3">XR Events</h2>
          <Row>
            {xrEvents.map((item, idx) => (
              <Col md={6} key={idx} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button as="a" href={item.joinLink} variant="info" className="me-2">Join Event</Button>
                    <Button as="a" href={item.rsvpLink} variant="secondary">RSVP</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Hybrid Companion Mode Section */}
      <Row className="mb-5" id="hybrid-companion">
        <Col>
          <h2 className="mb-3">Hybrid Companion Mode</h2>
          <Row>
            {hybridCompanion.map((item, idx) => (
              <Col md={6} key={idx} className="mb-3">
                <Card>
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button as="a" href={item.link} variant="primary">Enable Companion Mode</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      {/* Advanced Features / Personalized Section */}
      <Row className="mb-5" id="advanced-features">
        <Col>
          <h2 className="mb-3">Advanced Features</h2>
          <ul>
            <li>Personalized immersive recommendations</li>
            <li>Social sharing of AR/XR experiences</li>
            <li>Gamification & achievements</li>
            <li>Multi-device support (TV, Mobile, VR/AR Headsets)</li>
            <li>Notifications for VR/AR/XR events</li>
            <li>Offline mode for immersive content</li>
            <li>Accessibility options (subtitles, voice, color-blind modes)</li>
          </ul>
        </Col>
      </Row>

      {/* Future Enhancements Section */}
      <Row className="mb-5" id="future-enhancements">
        <Col>
          <h2 className="mb-3">Future Enhancements</h2>
          <ul>
            <li>AI-generated immersive content suggestions</li>
            <li>Voice-controlled VR/AR/XR navigation</li>
            <li>Collaborative multi-user VR/AR experiences</li>
            <li>Integration with metaverse platforms</li>
            <li>AR/XR interactive advertising and product placement</li>
            <li>Analytics dashboard for creators (heatmaps, interaction metrics)</li>
            <li>Multilingual immersive content and instructions</li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

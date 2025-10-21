// AboutUs.jsx
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const AboutUs = () => {
  return (
    <Container
      fluid
      className="bg-dark text-light py-5 min-vh-100 border-2 border-danger"
    >
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="bg-dark text-light border border-2 shadow-lg p-5">
            <Card.Body>
              {/* Header */}
              <h2 className="fw-bold mb-4 text-center text-warning">
                About Us
              </h2>

              {/* Welcome */}
              <h5 className="fw-bold">Welcome to BBS NEO</h5>
              <p className="text-muted">
                BBS NEO is your ultimate destination for movies, web series,
                live TV, and exclusive originals. We bring entertainment from
                around the world straight to your screen, anytime, anywhere.
              </p>

              {/* What We Offer */}
              <h6 className="mt-4 fw-bold text-info">What We Offer</h6>
              <ul>
                <li>Thousands of movies and shows across multiple languages</li>
                <li>Ad-free premium streaming with HD &amp; 4K quality</li>
                <li>Offline downloads and personalized recommendations</li>
                <li>Multi-device streaming: TV, mobile, and web</li>
                <li>
                  Exclusive original content created just for our audience
                </li>
                <li>Live TV channels and sports streaming</li>
              </ul>

              {/* Why Choose Us */}
              <h6 className="mt-4 fw-bold text-info">Why Choose Us</h6>
              <ul>
                <li>Affordable subscription plans for everyone</li>
                <li>Seamless user experience with modern UI/UX</li>
                <li>24/7 customer support with multilingual assistance</li>
                <li>Global access with regional content curation</li>
              </ul>

              {/* Our Mission */}
              <h6 className="mt-4 fw-bold text-info">Our Mission</h6>
              <p className="">
                To redefine the way the world experiences entertainment by
                delivering seamless, high-quality, and affordable streaming to
                every home. We aim to empower creators and bring diverse stories
                to the global stage.
              </p>

              {/* Our Vision */}
              <h6 className="mt-4 fw-bold text-info">Our Vision</h6>
              <p className="">
                To become the most-loved global streaming platform by combining
                technology, storytelling, and accessibility—entertainment for
                everyone, everywhere.
              </p>

              {/* Our Values */}
              <h6 className="mt-4 fw-bold text-info">Our Values</h6>
              <ul>
                <li>
                  <strong>Innovation:</strong> Constantly improving our platform
                  and features
                </li>
                <li>
                  <strong>Diversity:</strong> Celebrating stories from all
                  cultures
                </li>
                <li>
                  <strong>Accessibility:</strong> Making entertainment available
                  to all
                </li>
                <li>
                  <strong>Community:</strong> Building connections through
                  storytelling
                </li>
              </ul>

              {/* Contact */}
              <h6 className="mt-4 fw-bold text-info">Contact Us</h6>
              <p>
                📧 Email:{" "}
                <a
                  href="mailto:support@bbsneo.com"
                  className="text-info text-decoration-none"
                >
                  support@bbsneo.com
                </a>
                <br />
                📞 Phone: +91-98765-43210
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;

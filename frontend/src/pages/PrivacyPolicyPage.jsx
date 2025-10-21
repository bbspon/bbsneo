// PrivacyPolicyPage.jsx
import React from "react";
import { Container, Accordion, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const privacySections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly, such as when you sign up, subscribe, or contact support. This includes your name, email, payment info, and other details. We also collect usage data like viewing history, search queries, device info, and cookies.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use your information to provide and improve our services, personalize your experience, process payments, communicate updates, and comply with legal obligations.`,
  },
  {
    title: "Cookies and Tracking",
    content: `We use cookies and tracking technologies to enhance your experience, analyze usage, and serve personalized content and ads.`,
  },
  {
    title: "Data Sharing & Third Parties",
    content: `We may share your information with service providers to operate the platform, process payments, or analyze usage. We do not sell personal data. Sharing is subject to confidentiality agreements.`,
  },
  {
    title: "Data Security",
    content: `We implement technical and administrative safeguards to protect your information. No system is completely secure; users should protect their credentials.`,
  },
  {
    title: "Your Rights",
    content: `You can access, correct, or delete your personal information, opt-out of promotional communications, and withdraw consent where applicable.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this policy from time to time. Major changes will be communicated via the app or email.`,
  },
  {
    title: "Contact Us",
    content: `For questions or concerns, contact support@ottplatform.com or call +1 (800) 123-4567.`,
  },
];

const PrivacyPolicyPage = () => {
  return (
    <div style={{ backgroundColor: "#141414", color: "#fff", minHeight: "100vh", paddingTop: "50px", paddingBottom: "50px" }}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h1 className="text-center mb-3" style={{ fontWeight: "700" }}>Privacy Policy</h1>
            <p className="text-center text-muted" style={{ color: "#b3b3b3" }}>
              Learn how we collect, use, and protect your information while using our OTT platform.
            </p>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Accordion flush>
              {privacySections.map((section, idx) => (
                <Accordion.Item eventKey={idx.toString()} key={idx} style={{ backgroundColor: "#141414", border: "1px solid #333" }}>
                  <Accordion.Header style={{ color: "#fff", fontWeight: "500" }}>{section.title}</Accordion.Header>
                  <Accordion.Body style={{ color: "#b3b3b3", lineHeight: "1.6" }}>
                    {section.content}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;

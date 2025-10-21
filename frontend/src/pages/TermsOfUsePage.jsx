// TermsOfUsePage.jsx
import React from "react";
import { Container, Row, Col, Accordion } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TermsOfUsePage = () => {
  return (
    <Container fluid className="terms-page p-5" style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#fff" }}>
      <Row className="mb-4">
        <Col>
          <h1 className="mb-3" style={{ color: "#e50914" }}>Terms of Use</h1>
          <p>
            Welcome to our OTT platform. By accessing or using our services, you agree to comply with these Terms of Use. Please read them carefully.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>1. Acceptance of Terms</Accordion.Header>
              <Accordion.Body>
                By using this platform, you agree to these terms. If you do not agree, do not use our services. Terms may change periodically, and continued use constitutes acceptance.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1">
              <Accordion.Header>2. Account Registration</Accordion.Header>
              <Accordion.Body>
                Users may need to create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2">
              <Accordion.Header>3. Subscription & Payment</Accordion.Header>
              <Accordion.Body>
                Subscriptions are billed as per the plan selected. Payments are non-refundable except where required by law. We may offer free trials which are subject to separate terms.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="3">
              <Accordion.Header>4. Content Usage</Accordion.Header>
              <Accordion.Body>
                All content on the platform is for personal, non-commercial use only. You may not redistribute, copy, or exploit content in any unauthorized manner.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="4">
              <Accordion.Header>5. User Conduct</Accordion.Header>
              <Accordion.Body>
                Users must not engage in illegal activities, upload harmful content, or interfere with platform operations. Violations may lead to account suspension or termination.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="5">
              <Accordion.Header>6. Intellectual Property</Accordion.Header>
              <Accordion.Body>
                All content, trademarks, and logos are the property of the platform or its licensors. Unauthorized use is prohibited.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="6">
              <Accordion.Header>7. Limitation of Liability</Accordion.Header>
              <Accordion.Body>
                The platform is provided "as is". We are not liable for damages arising from the use or inability to use the services.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7">
              <Accordion.Header>8. Termination</Accordion.Header>
              <Accordion.Body>
                We reserve the right to suspend or terminate accounts violating these terms. Users may also cancel their subscription at any time following the cancellation process.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8">
              <Accordion.Header>9. Privacy Policy</Accordion.Header>
              <Accordion.Body>
                Your use of the platform is also governed by our Privacy Policy. Please review it to understand how we collect, use, and protect your data.
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9">
              <Accordion.Header>10. Governing Law</Accordion.Header>
              <Accordion.Body>
                These terms are governed by the laws of the country in which the platform operates. Disputes will be resolved in accordance with applicable laws.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>

      <Row className="mt-5">
        <Col>
          <p style={{ fontSize: "0.9rem", color: "#aaa" }}>
            © {new Date().getFullYear()} OTT Platform. All rights reserved.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default TermsOfUsePage;

// FAQPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Accordion, Form, InputGroup, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "How do I subscribe to the OTT platform?",
      answer:
        "You can subscribe by selecting a plan and completing the payment process using our secure payment gateway.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription anytime from your account settings. Cancellation will take effect at the end of your billing cycle.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Go to the login page, click on 'Forgot Password', and follow the instructions to reset your password.",
    },
    {
      question: "Can I watch content offline?",
      answer:
        "Yes, download content using our app to watch offline without internet connectivity.",
    },
    {
      question: "What devices are supported?",
      answer:
        "Our platform supports Smart TVs, smartphones, tablets, web browsers, and streaming devices like Firestick and Chromecast.",
    },
    {
      question: "How do I update my payment method?",
      answer:
        "Go to your account settings, select 'Payment Methods', and update your card or UPI details.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes, new users may be eligible for a free trial depending on the promotional offers available at the time of signup.",
    },
  ];

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="faq-page p-5" style={{ minHeight: "100vh", backgroundColor: "#141414", color: "#fff" }}>
      <Row className="mb-4">
        <Col>
          <h1 style={{ color: "#e50914" }}>Frequently Asked Questions</h1>
          <p>Find answers to the most commonly asked questions about our OTT platform.</p>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Accordion defaultActiveKey="0" flush>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, idx) => (
                <Accordion.Item key={idx} eventKey={idx.toString()}>
                  <Accordion.Header>{faq.question}</Accordion.Header>
                  <Accordion.Body>{faq.answer}</Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <p>No FAQs found for "{searchTerm}".</p>
            )}
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

export default FAQPage;

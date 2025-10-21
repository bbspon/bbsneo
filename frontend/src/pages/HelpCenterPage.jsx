// HelpCenterPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Accordion,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaQuestionCircle } from "react-icons/fa";

const faqData = [
  {
    category: "Account & Billing",
    faqs: [
      {
        question: "How do I reset my password?",
        answer:
          "Go to your profile, click on 'Change Password', and follow the instructions to reset your password.",
      },
      {
        question: "How can I update my payment method?",
        answer:
          "Navigate to Billing section in your profile, select 'Update Payment', and enter your new card details.",
      },
    ],
  },
  {
    category: "Streaming & Playback",
    faqs: [
      {
        question: "Why is my video not playing?",
        answer:
          "Ensure your internet connection is stable and try refreshing the page or clearing your browser cache.",
      },
      {
        question: "Can I download videos to watch offline?",
        answer:
          "Yes, use the 'Download' option available on the video player if your subscription plan allows offline viewing.",
      },
    ],
  },
  {
    category: "Subscription Plans",
    faqs: [
      {
        question: "How do I change my subscription plan?",
        answer:
          "Go to the Subscription section, choose a new plan, and confirm the change. It will take effect immediately.",
      },
    ],
  },
];

const HelpCenterPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqData.map((category) => {
    const filtered = category.faqs.filter((faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...category, faqs: filtered };
  });

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-3">
            <FaQuestionCircle /> Help Center
          </h1>
          <p className="text-center text-muted">
            Find answers to your questions about our streaming service.
          </p>
        </Col>
      </Row>

      <Row className="mb-5 justify-content-center">
        <Col md={8}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
      </Row>

      {filteredFaqs.map((category, idx) =>
        category.faqs.length > 0 ? (
          <Row key={idx} className="mb-4">
            <Col>
              <h4 className="mb-3">{category.category}</h4>
              <Accordion>
                {category.faqs.map((faq, faqIdx) => (
                  <Accordion.Item eventKey={faqIdx.toString()} key={faqIdx}>
                    <Accordion.Header>{faq.question}</Accordion.Header>
                    <Accordion.Body>{faq.answer}</Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        ) : null
      )}

      <Row className="mt-5">
        <Col className="text-center">
          <Card className="p-4 bg-light border-0">
            <h5>Need more help?</h5>
            <p className="text-muted">
              Contact our support team for further assistance.
            </p>
            <Button variant="primary" size="lg">
              Contact Support
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HelpCenterPage;

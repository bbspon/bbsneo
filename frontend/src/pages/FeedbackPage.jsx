// FeedbackPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaStar, FaRegStar, FaPaperclip } from "react-icons/fa";

const categories = [
  "App Issue",
  "Streaming Issue",
  "Content Suggestion",
  "Payment Issue",
  "Other",
];

const priorities = ["Low", "Medium", "High"];

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    categories: [],
    rating: 0,
    priority: "",
    message: "",
    attachment: null,
    anonymous: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [preview, setPreview] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox" && name === "anonymous") {
      setFormData({ ...formData, anonymous: checked });
    } else if (type === "file") {
      setFormData({ ...formData, attachment: files[0] });
    } else if (type === "select-multiple") {
      const selected = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, categories: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRating = (rate) => {
    setFormData({ ...formData, rating: rate });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can add API call to save feedback
    setSubmitted(true);
    setFormData({
      name: "",
      email: "",
      categories: [],
      rating: 0,
      priority: "",
      message: "",
      attachment: null,
      anonymous: false,
    });
    setPreview(false);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      categories: [],
      rating: 0,
      priority: "",
      message: "",
      attachment: null,
      anonymous: false,
    });
    setPreview(false);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-sm">
            <h2 className="mb-3 text-center">We Value Your Feedback</h2>
            <p className="text-center text-muted mb-4">
              Help us improve your OTT experience
            </p>

            {submitted && (
              <Alert
                variant="success"
                onClose={() => setSubmitted(false)}
                dismissible
              >
                Thank you for your feedback!
              </Alert>
            )}

            {!preview ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="feedbackName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={formData.anonymous}
                    required={!formData.anonymous}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={formData.anonymous}
                    required={!formData.anonymous}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackCategories">
                  <Form.Label>Category</Form.Label>
                  <Form.Select
                    name="categories"
                    multiple
                    value={formData.categories}
                    onChange={handleChange}
                    required
                  >
                    {categories.map((cat, idx) => (
                      <option key={idx} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Text className="text-muted">
                    Hold Ctrl (Cmd on Mac) to select multiple
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackRating">
                  <Form.Label>Rating</Form.Label>
                  <div>
                    {[1, 2, 3, 4, 5].map((i) =>
                      i <= formData.rating ? (
                        <FaStar
                          key={i}
                          color="gold"
                          size={24}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRating(i)}
                        />
                      ) : (
                        <FaRegStar
                          key={i}
                          color="gold"
                          size={24}
                          style={{ cursor: "pointer" }}
                          onClick={() => handleRating(i)}
                        />
                      )
                    )}
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackPriority">
                  <Form.Label>Priority</Form.Label>
                  <Form.Select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    {priorities.map((p, idx) => (
                      <option key={idx} value={p}>
                        {p}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackMessage">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Share your feedback..."
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    maxLength={500}
                    required
                  />
                  <Form.Text className="text-muted">
                    {formData.message.length}/500 characters
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackAttachment">
                  <Form.Label>Attachment</Form.Label>
                  <Form.Control
                    type="file"
                    name="attachment"
                    onChange={handleChange}
                    accept="image/*,application/pdf"
                  />
                  <Form.Text className="text-muted">
                    Upload screenshot or log (optional)
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="feedbackAnonymous">
                  <Form.Check
                    type="checkbox"
                    label="Submit anonymously"
                    name="anonymous"
                    checked={formData.anonymous}
                    onChange={handleChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                  <div>
                    <Button
                      variant="info"
                      type="button"
                      className="me-2"
                      onClick={() => setPreview(true)}
                    >
                      Preview
                    </Button>
                    <Button variant="primary" type="submit">
                      Submit Feedback
                    </Button>
                  </div>
                </div>
              </Form>
            ) : (
              <Card className="p-3 border-info">
                <h5>Feedback Preview</h5>
                <p>
                  <strong>Name:</strong>{" "}
                  {formData.anonymous ? "Anonymous" : formData.name}
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  {formData.anonymous ? "Anonymous" : formData.email}
                </p>
                <p>
                  <strong>Category:</strong>{" "}
                  {formData.categories.map((c, i) => (
                    <Badge key={i} bg="secondary" className="me-1">
                      {c}
                    </Badge>
                  ))}
                </p>
                <p>
                  <strong>Rating:</strong>{" "}
                  {[...Array(formData.rating)].map((_, i) => (
                    <FaStar key={i} color="gold" />
                  ))}
                  {[...Array(5 - formData.rating)].map((_, i) => (
                    <FaRegStar key={i} color="gold" />
                  ))}
                </p>
                <p>
                  <strong>Priority:</strong> {formData.priority}
                </p>
                <p>
                  <strong>Message:</strong> {formData.message}
                </p>
                <p>
                  <strong>Attachment:</strong>{" "}
                  {formData.attachment ? formData.attachment.name : "None"}
                </p>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => setPreview(false)}
                  >
                    Edit
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Confirm & Submit
                  </Button>
                </div>
              </Card>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FeedbackPage;

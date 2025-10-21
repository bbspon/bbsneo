// ChatHomePage.jsx
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const sidebarItems = ["Vibes", "Create", "Learn"];

const initialSuggestions = [
  "Create an image of a 90's robot",
  "Create an image of a cute world food map",
  "How did coffee conquer the world?",
  "Help me learn Python",
];

const ChatHomePage = () => {
  const [activeSidebar, setActiveSidebar] = useState("Vibes");
  const [query, setQuery] = useState("");
  const [suggestions] = useState(initialSuggestions);

  // Store chat history per category
  const [chatHistory, setChatHistory] = useState({
    Vibes: [],
    Create: [],
    Learn: [],
  });

  const messagesEndRef = useRef(null);

  const handleInputChange = (e) => setQuery(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() !== "") {
      const newMessage = { text: query, type: "user" };
      setChatHistory({
        ...chatHistory,
        [activeSidebar]: [newMessage, ...chatHistory[activeSidebar]],
      });
      setQuery("");
    }
  };

  const handleSuggestionClick = (text) => {
    const newMessage = { text, type: "user" };
    setChatHistory({
      ...chatHistory,
      [activeSidebar]: [newMessage, ...chatHistory[activeSidebar]],
    });
  };

  const handleNewChat = () => {
    setChatHistory({
      ...chatHistory,
      [activeSidebar]: [],
    });
    setQuery("");
  };

  const handleSidebarClick = (item) => setActiveSidebar(item);

  // Scroll to top whenever messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory, activeSidebar]);

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100">
        {/* Sidebar */}
        <Col xs={3} className="bg-light d-flex flex-column p-3">
          <Button
            variant="outline-primary"
            className="mb-3 w-100"
            onClick={handleNewChat}
          >
            New chat
          </Button>

          <ListGroup variant="flush" className="mb-3">
            {sidebarItems.map((item, index) => (
              <ListGroup.Item
                key={index}
                action
                active={activeSidebar === item}
                onClick={() => handleSidebarClick(item)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h6 className="mt-3">Recent chats</h6>
          <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
            {chatHistory[activeSidebar].map((msg, index) => (
              <ListGroup.Item key={index}>
                {msg.text.length > 30
                  ? msg.text.substring(0, 30) + "..."
                  : msg.text}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        {/* Main content */}
        <Col xs={9} className="d-flex flex-column">
          <h5 className="m-3">{activeSidebar} Chat</h5>

          {/* Messages */}
          <div
            className="flex-grow-1 overflow-auto px-3"
            style={{ display: "flex", flexDirection: "column-reverse" }}
            ref={messagesEndRef}
          >
            {chatHistory[activeSidebar].map((msg, index) => (
              <Card
                key={index}
                className={`my-2 p-2 w-50 ${
                  msg.type === "user" ? "ms-auto bg-primary text-white" : "bg-light"
                }`}
              >
                {msg.text}
              </Card>
            ))}
          </div>

          {/* Input form */}
          <Form onSubmit={handleSubmit} className="m-3">
            <Form.Group className="d-flex">
              <Form.Control
                type="text"
                placeholder="Ask anything..."
                value={query}
                onChange={handleInputChange}
              />
              <Button type="submit" variant="primary" className="ms-2">
                ↑
              </Button>
            </Form.Group>
          </Form>

          {/* Suggestions */}
          <ListGroup horizontal className="m-3">
            {suggestions.map((item, index) => (
              <ListGroup.Item
                key={index}
                action
                onClick={() => handleSuggestionClick(item)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatHomePage;

// File: AIPersonalizationPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Navbar,
  Nav,
  Modal,
  Form,
  Badge,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample Data
const aiFeedItems = [
  {
    id: 1,
    type: "OTT",
    title: "Epic Adventure Series",
    img: "https://pixlr.com/images/generator/photo-generator.webp",
    description: "Recommended based on your watch history and social likes.",
    trending: true,
  },
  {
    id: 2,
    type: "Social",
    title: "Trending Meme",
    img: "https://cdn.openart.ai/stable_diffusion/87b6cb53d5a77dd932de21ac63ee772000263dae_2000x2000.webp",
    description: "Auto-generated fan content and memes.",
    flagged: true,
  },
  {
    id: 3,
    type: "Commerce",
    title: "Limited Edition Merch",
    img: "https://static.vecteezy.com/system/resources/previews/023/184/448/large_2x/futuristic-portrait-of-a-futuristic-girl-3d-rendering-ai-generative-image-free-photo.jpg",
    description: "Suggested based on your previous purchases.",
  },
];

const aiChatThreads = [
  { id: 1, name: "Group Chat 1" },
  { id: 2, name: "Fan Messages" },
];

const fanCreatorTools = [
  { id: 1, title: "Generate Meme", description: "Auto-create memes with AI." },
  { id: 2, title: "Fan Trailer", description: "Auto-edit short trailers of your favorite shows." },
  { id: 3, title: "Short Video Edits", description: "Create TikTok-style clips with AI assistance." },
];

const futuristicFeatures = [
  { id: 1, title: "Personalized AI Co-Stars", description: "Your avatar appears in shows with creators and OTT content." },
  { id: 2, title: "Dream-to-Screen", description: "AI generates stories or shows based on your dreams and preferences." },
  { id: 3, title: "Predictive Mood Feed", description: "AI adapts feed content, speed, and layout based on your mood." },
];

const AIPersonalizationPage = () => {
  const [theme, setTheme] = useState("light");

  // AI Feed Logic
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [showFeedModal, setShowFeedModal] = useState(false);
  const handleFeedView = (item) => {
    setSelectedFeed(item);
    setShowFeedModal(true);
  };
  const handleCloseFeedModal = () => setShowFeedModal(false);

  const handleAIInsights = (item) => {
    alert(`AI Insights for "${item.title}": Personalized recommendation based on your activity.`);
  };

  // AI Chat Logic
  const [showChatModal, setShowChatModal] = useState(false);
  const [selectedThread, setSelectedThread] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState({
    1: ["Welcome to Group Chat 1!"],
    2: ["Welcome to Fan Messages!"],
  });

  const handleOpenChat = (thread) => {
    setSelectedThread(thread);
    setShowChatModal(true);
  };
  const handleCloseChat = () => {
    setShowChatModal(false);
    setSelectedThread(null);
    setChatInput("");
  };
  const handleSendChat = () => {
    if (!chatInput.trim()) return;
    setChatMessages({
      ...chatMessages,
      [selectedThread.id]: [
        ...chatMessages[selectedThread.id],
        `You: ${chatInput}`,
        `AI: Suggested reply to "${chatInput}"`,
      ],
    });
    setChatInput("");
  };

  // Fan-to-Creator Tool Logic
  const [showToolModal, setShowToolModal] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);
  const [toolInput, setToolInput] = useState("");

  const handleOpenTool = (tool) => {
    setSelectedTool(tool);
    setShowToolModal(true);
    setToolInput("");
  };
  const handleCloseTool = () => {
    setShowToolModal(false);
    setSelectedTool(null);
    setToolInput("");
  };
  const handleRunTool = () => {
    if (!toolInput.trim()) return alert("Please enter input for AI tool.");
    alert(`AI Tool "${selectedTool.title}" executed with input: "${toolInput}"`);
    setToolInput("");
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className={theme === "light" ? "bg-light text-dark" : "bg-dark text-white"}>
      {/* Navbar */}
      <Navbar bg={theme === "light" ? "light" : "dark"} variant={theme === "light" ? "light" : "dark"} expand="lg" sticky="top">
        <Container>
          <Navbar.Brand href="#">AI & Personalization</Navbar.Brand>
          <Navbar.Toggle aria-controls="ai-navbar-nav" />
          <Navbar.Collapse id="ai-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#ai-feed">AI Feed</Nav.Link>
              <Nav.Link href="#ai-chat">AI Chat</Nav.Link>
              <Nav.Link href="#ott-recs">OTT Recommendations</Nav.Link>
              <Nav.Link href="#fan-tools">Fan Tools</Nav.Link>
              <Nav.Link href="#futuristic">Futuristic</Nav.Link>
              <Button variant={theme === "light" ? "dark" : "light"} size="sm" onClick={toggleTheme} className="ms-2">Toggle Theme</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div
        className={`text-center py-5 ${theme === "light" ? "bg-info text-dark" : "bg-primary text-white"}`}
        style={{ backgroundImage: "url('https://via.placeholder.com/1200x400')", backgroundSize: 'cover' }}
      >
        <h1>AI & Personalization</h1>
        <p>Your App, Your AI, Your World – Hyper-personalized experiences await.</p>
        <Button variant={theme === "light" ? "dark" : "light"} size="lg">Explore AI Features</Button>
      </div>

      <Container className="py-5">

        {/* AI Feed */}
        <section id="ai-feed" className="mb-5">
          <h2 className="mb-4">AI Feed</h2>
          <Row>
            {aiFeedItems.map((item) => (
              <Col md={4} className="mb-4" key={item.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Img variant="top" src={item.img} />
                  <Card.Body>
                    <Card.Title>
                      {item.title}{" "}
                      {item.trending && <Badge bg="danger">Trending</Badge>}{" "}
                      {item.flagged && <Badge bg="warning">Flagged</Badge>}
                    </Card.Title>
                    <Card.Text>{item.description}</Card.Text>
                    <Button variant="success" className="me-2" onClick={() => handleFeedView(item)}>View Content</Button>
                    <Button variant="secondary" size="sm" onClick={() => handleAIInsights(item)}>AI Insights</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* AI Chat Assistant */}
        <section id="ai-chat" className="mb-5">
          <h2 className="mb-4">AI Chat Assistant</h2>
          <Row>
            {aiChatThreads.map((thread) => (
              <Col md={6} className="mb-4" key={thread.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{thread.name}</Card.Title>
                    <Button variant="primary" onClick={() => handleOpenChat(thread)}>Open AI Chat</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* OTT Recommendations */}
        <section id="ott-recs" className="mb-5">
          <h2 className="mb-4">AI OTT Recommendations</h2>
          <Card className="p-4 shadow-sm mb-3">
            <p>AI suggests shows and movies based on your social activity, likes, shopping habits, and watch history.</p>
            <Button variant="info" onClick={() => alert("Viewing AI-generated OTT recommendations!")}>View Recommendations</Button>
          </Card>
        </section>

        {/* Fan-to-Creator AI Tools */}
        <section id="fan-tools" className="mb-5">
          <h2 className="mb-4">Fan-to-Creator AI Tools</h2>
          <Row>
            {fanCreatorTools.map((tool) => (
              <Col md={4} className="mb-4" key={tool.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{tool.title}</Card.Title>
                    <Card.Text>{tool.description}</Card.Text>
                    <Button variant="warning" onClick={() => handleOpenTool(tool)}>Try Tool</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        {/* Futuristic AI Features */}
        <section id="futuristic" className="mb-5">
          <h2 className="mb-4">Futuristic AI Features</h2>
          <Row>
            {futuristicFeatures.map((feature) => (
              <Col md={4} className="mb-4" key={feature.id}>
                <Card className="h-100 shadow-sm">
                  <Card.Body>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.description}</Card.Text>
                    <Button variant="dark" onClick={() => alert(`Exploring: ${feature.title}`)}>Explore</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </section>
      </Container>

      {/* AI Feed Modal */}
      <Modal show={showFeedModal} onHide={handleCloseFeedModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedFeed?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedFeed?.description}</p>
          <p>Additional content and AI-generated suggestions will appear here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseFeedModal}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* AI Chat Modal */}
      <Modal show={showChatModal} onHide={handleCloseChat} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>AI Chat: {selectedThread?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "10px", border: "1px solid #ccc", padding: "10px" }}>
            {selectedThread && chatMessages[selectedThread.id].map((msg, idx) => (
              <p key={idx}>{msg}</p>
            ))}
          </div>
          <Form.Control
            as="textarea"
            rows={2}
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Type your message..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseChat}>Close</Button>
          <Button variant="success" onClick={handleSendChat}>Send</Button>
        </Modal.Footer>
      </Modal>

      {/* Fan Tool Modal */}
      <Modal show={showToolModal} onHide={handleCloseTool} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedTool?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedTool?.description}</p>
          <Form.Control
            as="textarea"
            rows={4}
            value={toolInput}
            onChange={(e) => setToolInput(e.target.value)}
            placeholder="Provide input for AI tool..."
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseTool}>Cancel</Button>
          <Button variant="warning" onClick={handleRunTool}>Run AI Tool</Button>
        </Modal.Footer>
      </Modal>

      {/* Footer */}
      <footer className="py-4 text-center" style={{ backgroundColor: theme === "light" ? "#f8f9fa" : "#212529", color: theme === "light" ? "#000" : "#fff" }}>
        <p>&copy; 2025 AI & Personalization Hub. All rights reserved.</p>
        <p>Powered by Adaptive AI, OTT Integration, Fan Tools, and Futuristic Experiences.</p>
      </footer>
    </div>
  );
};

export default AIPersonalizationPage;

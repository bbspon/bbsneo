// ImmersiveStorytellingUltimate.jsx
import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Carousel, Modal, Form, ProgressBar, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const aiActors = [
  { id: 1, name: "AI Actor 1", image: "https://tse1.mm.bing.net/th/id/OIP.b4v7cmaxzVMrCyMm8koRCgHaEK?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 2, name: "AI Actor 2", image: "https://tse3.mm.bing.net/th/id/OIP.k-ctIzhD0VzOWqQ74GP8yAAAAA?rs=1&pid=ImgDetMain&o=7&rm=3" },
  { id: 3, name: "AI Actor 3", image: "https://images.nightcafe.studio/jobs/EQWR5jyhhbNi1j8JCQz5/EQWR5jyhhbNi1j8JCQz5--1--m40uz.jpg?tr=w-1600,c-at_max" },
];

const immersiveStories = [
  {
    id: 1,
    title: "Adaptive Space Adventure",
    description: "Story changes based on your mood, imagination, and choices in real time.",
    image: "https://tse1.mm.bing.net/th/id/OIP.sFlfshITEUeSa7HG0ExrmgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
  {
    id: 2,
    title: "Mystery Mind Puzzle",
    description: "Solve the mystery while the story adapts to your emotional feedback.",
    image: "https://img.englishcinemakyiv.com/nlsJNKCWI-eoQHo4vetGyGaUqM7CnGPlsMsR1Vu-fe4/resize:fill:800:450:1:0/gravity:sm/aHR0cHM6Ly9leHBhdGNpbmVtYXByb2QuYmxvYi5jb3JlLndpbmRvd3MubmV0L2ltYWdlcy9kOGM0NzNmZi1jNDFmLTRiOTQtOGU4Ny04MThhNzQ1ZmU1ZmQuanBn.jpg",
  },
];

const ImmersiveStorytellingUltimate = () => {
  const [selectedStory, setSelectedStory] = useState(immersiveStories[0]);
  const [showModal, setShowModal] = useState(false);
  const [mood, setMood] = useState(50);
  const [actorCustomization, setActorCustomization] = useState({ hair: "Default", outfit: "Default" });
  const [rewardPoints, setRewardPoints] = useState(0);
  const [socialViewers, setSocialViewers] = useState(3);
  const [visualEffect, setVisualEffect] = useState("Normal");
  const [predictiveStory, setPredictiveStory] = useState("Coming up: Alternate Ending!");
  const [voiceActive, setVoiceActive] = useState(false);
  const [gestureActive, setGestureActive] = useState(false);
  const [premiumMode, setPremiumMode] = useState(false);

  const handleStartStory = (story) => {
    setSelectedStory(story);
    setRewardPoints((prev) => prev + 15); // enhanced points
    setPredictiveStory("Predictive path ready based on your past choices!");
    setShowModal(true);
  };

  return (
    <Container fluid className="p-4" style={{ background: "#0c0c0c", color: "white" }}>
      {/* Landing / Showcase */}
      <Row className="mb-5">
        <Col>
          <h1 className="display-4">Immersive Storytelling</h1>
          <p className="lead">
            Experience fully adaptive narratives, AI actors, holograms, and interactive immersive controls.
          </p>
          <Badge bg="info">Reward Points: {rewardPoints}</Badge>{" "}
          {premiumMode && <Badge bg="warning">Premium Mode Active</Badge>}
        </Col>
      </Row>

      {/* Adaptive Story Showcase */}
      <Row className="mb-5">
        {immersiveStories.map((story) => (
          <Col md={6} lg={4} key={story.id} className="mb-4">
            <Card bg="dark" text="white">
              <Card.Img src={story.image} alt={story.title} />
              <Card.Body>
                <Card.Title>{story.title}</Card.Title>
                <Card.Text>{story.description}</Card.Text>
                <Button variant="primary" onClick={() => handleStartStory(story)}>
                  Start Story
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* AI Actors Carousel with Customization */}
      <Row className="mb-5">
        <Col>
          <h2 className="mb-3">AI Actors</h2>
          <Carousel variant="dark">
            {aiActors.map((actor) => (
              <Carousel.Item key={actor.id}>
                <img
                  className="d-block w-100"
                  src={actor.image}
                  alt={actor.name}
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
                <Carousel.Caption>
                  <h5>{actor.name}</h5>
                  <Form.Select
                    size="sm"
                    value={actorCustomization.hair}
                    onChange={(e) => setActorCustomization({ ...actorCustomization, hair: e.target.value })}
                  >
                    <option value="Default">Hair: Default</option>
                    <option value="Short">Hair: Short</option>
                    <option value="Long">Hair: Long</option>
                  </Form.Select>
                  <Form.Select
                    size="sm"
                    className="mt-1"
                    value={actorCustomization.outfit}
                    onChange={(e) => setActorCustomization({ ...actorCustomization, outfit: e.target.value })}
                  >
                    <option value="Default">Outfit: Default</option>
                    <option value="Casual">Outfit: Casual</option>
                    <option value="Armor">Outfit: Armor</option>
                  </Form.Select>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>

      {/* Mind-to-Story / Reality Merge / Advanced Controls */}
      <Row className="mb-5">
        <Col md={6}>
          <Card bg="dark" text="white" className="h-100">
            <Card.Body>
              <Card.Title>Mind-to-Story Simulation</Card.Title>
              <Card.Text>
                Imagine a story and watch it unfold. AI interprets your mood and predicts story paths.
              </Card.Text>
              <ProgressBar now={mood} label={`Mood: ${mood}%`} />
              <Form.Range min={0} max={100} value={mood} onChange={(e) => setMood(e.target.value)} className="mt-3" />
              <Form.Select
                className="mt-2"
                value={visualEffect}
                onChange={(e) => setVisualEffect(e.target.value)}
              >
                <option value="Normal">Visual Effect: Normal</option>
                <option value="Cinematic">Visual Effect: Cinematic</option>
                <option value="Surreal">Visual Effect: Surreal</option>
              </Form.Select>
              <div className="mt-3">
                <Form.Check
                  type="switch"
                  id="voiceControl"
                  label="Enable Voice Control"
                  checked={voiceActive}
                  onChange={() => setVoiceActive(!voiceActive)}
                />
                <Form.Check
                  type="switch"
                  id="gestureControl"
                  label="Enable Gesture Control"
                  checked={gestureActive}
                  onChange={() => setGestureActive(!gestureActive)}
                />
              </div>
              <Button variant="success" className="mt-3">
                Generate Story
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card bg="dark" text="white" className="h-100 text-center d-flex align-items-center justify-content-center">
            <Card.Body>
              <Card.Title>Reality Merge Mode & Social Co-Watch</Card.Title>
              <Card.Text>
                Characters appear in your environment via holograms or AR/VR. Social co-watching supports {socialViewers} viewers.
              </Card.Text>
              <Button variant="warning" className="mb-2">
                Activate Hologram
              </Button>
              <Button variant="info" className="mb-2">
                Start Social Co-Watch
              </Button>
              <Button variant="secondary" onClick={() => setPremiumMode(!premiumMode)}>
                Toggle Premium / Offline Mode
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Post-Story Summary / AI Director / Predictive */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedStory.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Story is running with full adaptive narrative, AI actors, and immersive controls...</p>
          <ProgressBar now={mood} label={`Mood Influence: ${mood}%`} />
          <p className="mt-2">Visual Effect: {visualEffect}</p>
          <p>Reward Points Earned: {rewardPoints}</p>
          <p>{predictiveStory}</p>
          <p>
            You can save your story, share it, remix scenes, explore alternate paths, or collaborate in world-building.
          </p>
          <p>Accessibility features, offline mode, and multi-device sync are supported.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary">Save Story</Button>
          <Button variant="success">Share Story</Button>
          <Button variant="warning">Remix Scene</Button>
          <Button variant="info">World-Building</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ImmersiveStorytellingUltimate;

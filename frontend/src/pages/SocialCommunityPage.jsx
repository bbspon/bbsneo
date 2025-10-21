// SocialCommunityPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHeart,
  FaShareAlt,
  FaComment,
  FaMedal,
  FaUsers,
  FaTrophy,
  FaStar,
} from "react-icons/fa";

// Dummy Data
const postsData = [
  { id: 1, user: "John Doe", content: "Loved the latest episode!", likes: 12, comments: 4 },
  { id: 2, user: "Jane Smith", content: "Trivia time! What's your answer?", likes: 8, comments: 2 },
];

const leaderboardsData = [
  { id: 1, user: "TopUser1", points: 120 },
  { id: 2, user: "TopUser2", points: 100 },
];

const questsData = [
  { id: 1, title: "Comment on 5 posts", completed: false },
  { id: 2, title: "Join a watch party", completed: true },
];

const pollsData = [
  { id: 1, question: "Who is your favorite character?", options: ["Iron Man", "Thor", "Captain America"], votes: [5, 2, 3] },
];

const curatorChannelsData = [
  { id: 1, name: "Top Picks", description: "Curated by platform editors" },
  { id: 2, name: "Fan Favorites", description: "Most liked posts" },
];

const badgesData = [
  { id: 1, name: "Commenter", icon: <FaComment /> },
  { id: 2, name: "Top Fan", icon: <FaStar /> },
];

const SocialCommunityPage = () => {
  // State
  const [commentText, setCommentText] = useState({});
  const [showPartyModal, setShowPartyModal] = useState(false);
  const [partyForm, setPartyForm] = useState({ title: "", participants: "", arEnabled: false });
  const [watchParties, setWatchParties] = useState([
    { id: 1, title: "Marvel Movie Night", participants: 5 },
    { id: 2, title: "Comedy Special Party", participants: 3 },
  ]);

  // Handlers
  const handleCommentSubmit = (postId) => {
    console.log("Comment on post", postId, commentText[postId] || "");
    setCommentText((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleJoinParty = (partyId) => {
    console.log("Joined Party", partyId);
  };

  const handleCreateParty = () => {
    if (!partyForm.title || !partyForm.participants) return;

    const newParty = {
      id: Date.now(),
      title: partyForm.title,
      participants: parseInt(partyForm.participants),
    };

    setWatchParties((prev) => [...prev, newParty]);
    setPartyForm({ title: "", participants: "", arEnabled: false });
    setShowPartyModal(false);
  };

  const handleVote = (pollId, optionIndex) => {
    console.log("Voted on poll", pollId, optionIndex);
  };

  return (
    <Container className="my-4">
      <Row>
        {/* Left Column: Community Feed */}
        <Col md={6}>
          <h4>Community Feed</h4>
          {postsData.map((post) => (
            <Card key={post.id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{post.user}</Card.Title>
                <Card.Text>{post.content}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <Button variant="outline-danger" size="sm" className="me-2">
                      <FaHeart /> {post.likes}
                    </Button>
                    <Button variant="outline-primary" size="sm" className="me-2">
                      <FaComment /> {post.comments}
                    </Button>
                    <Button variant="outline-success" size="sm">
                      <FaShareAlt /> Share
                    </Button>
                  </div>
                </div>
                <Form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleCommentSubmit(post.id);
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Add a comment..."
                    value={commentText[post.id] || ""}
                    onChange={(e) =>
                      setCommentText((prev) => ({ ...prev, [post.id]: e.target.value }))
                    }
                  />
                </Form>
              </Card.Body>
            </Card>
          ))}

          {/* Polls */}
          <h4 className="mt-4">Polls</h4>
          {pollsData.map((poll) => (
            <Card key={poll.id} className="mb-3 shadow-sm">
              <Card.Body>
                <Card.Title>{poll.question}</Card.Title>
                {poll.options.map((option, idx) => {
                  const totalVotes = poll.votes.reduce((a, b) => a + b, 0);
                  const percent = totalVotes ? (poll.votes[idx] / totalVotes) * 100 : 0;
                  return (
                    <div key={idx} className="mb-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleVote(poll.id, idx)}
                      >
                        {option}
                      </Button>
                      <ProgressBar now={percent} label={`${Math.round(percent)}%`} />
                    </div>
                  );
                })}
              </Card.Body>
            </Card>
          ))}
        </Col>

        {/* Right Column: Watch Parties, Leaderboards, Quests, Curators, Badges */}
        <Col md={6}>
          {/* Watch Parties */}
          <h4>Watch Parties</h4>
          {watchParties.map((party) => (
            <Card key={party.id} className="mb-2 shadow-sm">
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <Card.Title>{party.title}</Card.Title>
                  <Card.Text>{party.participants} participants</Card.Text>
                </div>
                <Button variant="primary" onClick={() => handleJoinParty(party.id)}>
                  Join Party
                </Button>
              </Card.Body>
            </Card>
          ))}
          <Button variant="success" className="my-2" onClick={() => setShowPartyModal(true)}>
            Create Watch Party
          </Button>

          {/* Leaderboards */}
          <h4 className="mt-4">Leaderboards</h4>
          <ListGroup className="mb-3">
            {leaderboardsData.map((user) => (
              <ListGroup.Item key={user.id} className="d-flex justify-content-between align-items-center">
                <div>
                  <FaTrophy className="me-2 text-warning" /> {user.user}
                </div>
                <Badge bg="primary">{user.points} pts</Badge>
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Quests */}
          <h4>Quests</h4>
          <ListGroup>
            {questsData.map((quest) => (
              <ListGroup.Item key={quest.id} className={quest.completed ? "bg-light text-success" : ""}>
                {quest.title} {quest.completed && <Badge bg="success">Completed</Badge>}
              </ListGroup.Item>
            ))}
          </ListGroup>

          {/* Curator Channels */}
          <h4 className="mt-4">Curator Channels</h4>
          {curatorChannelsData.map((channel) => (
            <Card key={channel.id} className="mb-2 shadow-sm">
              <Card.Body>
                <Card.Title>{channel.name}</Card.Title>
                <Card.Text>{channel.description}</Card.Text>
              </Card.Body>
            </Card>
          ))}

          {/* Badges */}
          <h4 className="mt-4">Your Badges</h4>
          <div className="d-flex flex-wrap">
            {badgesData.map((badge) => (
              <Card key={badge.id} className="me-2 mb-2 p-2 text-center">
                <div style={{ fontSize: "24px" }}>{badge.icon}</div>
                <div>{badge.name}</div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>

      {/* Watch Party Modal */}
      <Modal show={showPartyModal} onHide={() => setShowPartyModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Watch Party</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Party Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter party name"
                value={partyForm.title}
                onChange={(e) => setPartyForm({ ...partyForm, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Number of Participants</Form.Label>
              <Form.Control
                type="number"
                placeholder="Max participants"
                value={partyForm.participants}
                onChange={(e) => setPartyForm({ ...partyForm, participants: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Enable AR / Voice features"
                checked={partyForm.arEnabled}
                onChange={(e) => setPartyForm({ ...partyForm, arEnabled: e.target.checked })}
              />
            </Form.Group>
            <Button variant="success" onClick={handleCreateParty}>
              Create Party
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SocialCommunityPage;

// GroupsPage.jsx
import React, { useState, useRef, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Button,
  Card,
  Form,
  Image,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Sidebar & Category setup
const sidebarItems = ["Your Groups", "Discover", "Trending"];
const groupCategories = ["Tech", "Sports", "Education", "Gaming", "Music"];

// Dummy data for groups
const dummyGroups = {
  "Your Groups": [
    { id: 101, name: "Meta AI Enthusiasts", members: 150, joined: true },
    { id: 102, name: "Frontend Devs", members: 250, joined: true },
  ],
  Discover: [
    { id: 201, name: "React Developers", members: 1200, joined: false },
    { id: 202, name: "Football Fans", members: 800, joined: false },
    { id: 203, name: "Photography Lovers", members: 500, joined: false },
  ],
  Trending: [
    { id: 301, name: "Gaming Central", members: 900, joined: false },
    { id: 302, name: "Music Lovers", members: 700, joined: false },
  ],
};

// Dummy posts with media
const initialPosts = {
  101: [
    { id: 1, type: "system", text: "Welcome to the Meta AI Enthusiasts group!" },
    { id: 2, type: "user", text: "Hi everyone, excited to learn!" },
    {
      id: 3,
      type: "media",
      mediaType: "image",
      src: "https://via.placeholder.com/400x200",
      text: "Check out this AI diagram!",
    },
    {
      id: 4,
      type: "media",
      mediaType: "video",
      src: "https://www.w3schools.com/html/mov_bbb.mp4",
      text: "Watch this cool AI demo",
    },
  ],
  102: [],
  201: [],
  202: [],
  203: [],
  301: [],
  302: [],
};

const GroupsPage = () => {
  const [activeSidebar, setActiveSidebar] = useState("Your Groups");
  const [activeCategory, setActiveCategory] = useState(null);
  const [groups, setGroups] = useState(dummyGroups);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupPosts, setGroupPosts] = useState(initialPosts);
  const [newPostText, setNewPostText] = useState("");
  const [newPostMedia, setNewPostMedia] = useState(null);
  const [newPostMediaType, setNewPostMediaType] = useState(null);

  const messagesEndRef = useRef(null);

  const handleSidebarClick = (item) => {
    setActiveSidebar(item);
    setSelectedGroup(null);
    setActiveCategory(null);
  };

  const handleCategoryClick = (cat) => setActiveCategory(cat);

  const handleJoinLeave = (groupId) => {
    const updated = groups[activeSidebar].map((g) =>
      g.id === groupId ? { ...g, joined: !g.joined } : g
    );
    setGroups({ ...groups, [activeSidebar]: updated });
  };

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setActiveCategory(null);
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!selectedGroup) return;

    const newPost = {
      id: Date.now(),
      type: newPostMedia ? "media" : "user",
      text: newPostText,
      mediaType: newPostMediaType,
      src: newPostMedia,
    };

    setGroupPosts({
      ...groupPosts,
      [selectedGroup.id]: [newPost, ...(groupPosts[selectedGroup.id] || [])],
    });

    setNewPostText("");
    setNewPostMedia(null);
    setNewPostMediaType(null);
  };

  const handleMediaUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setNewPostMedia(url);
    setNewPostMediaType(file.type.startsWith("video") ? "video" : "image");
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [groupPosts, selectedGroup]);

  const filteredGroups =
    activeCategory && groups[activeSidebar]
      ? groups[activeSidebar].filter((g) =>
          g.name.toLowerCase().includes(activeCategory.toLowerCase())
        )
      : groups[activeSidebar] || [];

  return (
    <Container fluid className="vh-100 p-0">
      <Row className="h-100">
        {/* Sidebar */}
        <Col xs={3} className="bg-light d-flex flex-column p-3">
          <h5 className="mb-3">Groups</h5>
          <ListGroup variant="flush" className="mb-3">
            {sidebarItems.map((item) => (
              <ListGroup.Item
                key={item}
                action
                active={activeSidebar === item}
                onClick={() => handleSidebarClick(item)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h6>Categories</h6>
          <ListGroup variant="flush" className="mb-3 flex-grow-1 overflow-auto">
            {groupCategories.map((cat) => (
              <ListGroup.Item
                key={cat}
                action
                active={activeCategory === cat}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <h6>Recent Activity</h6>
          <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
            {(selectedGroup
              ? groupPosts[selectedGroup.id] || []
              : []
            )
              .slice(0, 5)
              .map((post) => (
                <ListGroup.Item key={post.id}>
                  {post.text.length > 30
                    ? post.text.substring(0, 30) + "..."
                    : post.text}
                </ListGroup.Item>
              ))}
          </ListGroup>
        </Col>

        {/* Main Content */}
        <Col xs={9} className="d-flex flex-column">
          {!selectedGroup ? (
            <>
              <h5 className="m-3">{activeSidebar}</h5>
              <div className="px-3 overflow-auto flex-grow-1">
                {filteredGroups.length > 0 ? (
                  filteredGroups.map((group) => (
                    <Card
                      key={group.id}
                      className="my-2 p-2 d-flex flex-row justify-content-between align-items-center"
                    >
                      <div>
                        <h6>{group.name}</h6>
                        <small>{group.members} members</small>
                      </div>
                      <div>
                        <Button
                          variant={group.joined ? "secondary" : "primary"}
                          onClick={() => handleJoinLeave(group.id)}
                          className="me-2"
                        >
                          {group.joined ? "Joined" : "Join"}
                        </Button>
                        <Button
                          variant="outline-primary"
                          onClick={() => handleGroupClick(group)}
                        >
                          Open
                        </Button>
                      </div>
                    </Card>
                  ))
                ) : (
                  <p className="text-center mt-5 text-muted">No groups available.</p>
                )}
              </div>
            </>
          ) : (
            <>
              <h5 className="m-3">{selectedGroup.name}</h5>

              {/* Posts */}
              <div
                className="px-3 overflow-auto flex-grow-1"
                style={{ display: "flex", flexDirection: "column-reverse" }}
                ref={messagesEndRef}
              >
                {(groupPosts[selectedGroup.id] || []).length > 0 ? (
                  groupPosts[selectedGroup.id].map((post) => (
                    <Card
                      key={post.id}
                      className={`my-2 p-2 w-75 ${
                        post.type === "user"
                          ? "ms-auto bg-primary text-white"
                          : "bg-light"
                      }`}
                    >
                      <p>{post.text}</p>
                      {post.type === "media" && post.mediaType === "image" && (
                        <Image src={post.src} fluid rounded className="mt-2" />
                      )}
                      {post.type === "media" && post.mediaType === "video" && (
                        <video
                          controls
                          src={post.src}
                          className="mt-2 w-100"
                        ></video>
                      )}
                    </Card>
                  ))
                ) : (
                  <p className="text-center mt-3 text-muted">No posts yet.</p>
                )}
              </div>

              {/* New Post Input */}
              <Form onSubmit={handlePostSubmit} className="m-3">
                <Form.Group className="d-flex mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Write a post..."
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                  />
                  <Button type="submit" variant="primary" className="ms-2">
                    Post
                  </Button>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Attach Image/Video</Form.Label>
                  <Form.Control type="file" accept="image/*,video/*" onChange={handleMediaUpload} />
                </Form.Group>
              </Form>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default GroupsPage;

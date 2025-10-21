import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
  InputGroup,
  Badge,
  Dropdown,
  Modal,
  Image,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  FaSearch,
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaEllipsisV,
  FaUserPlus,
  FaChevronLeft,
  FaCog,
  FaFacebookMessenger,
  FaBroadcastTower,
  FaVideo,
  FaPhone,
  FaGlobe,
} from "react-icons/fa";
import { MdLinkedCamera } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";

// -------------------- Helpers --------------------
const STORAGE_KEY = "messenger_demo_conversations_v2";

// Sample demo data including channels
const demoConversations = [
  {
    id: "c1",
    type: "individual",
    title: "Alice",
    members: ["me", "u1"],
    avatar: null,
    color: "#143a58ff",
    messages: [
      { id: "m1", sender: "u1", text: "Hi! 👋", ts: Date.now() - 60000 },
      { id: "m2", sender: "me", text: "Hello Alice!", ts: Date.now() - 30000 },
    ],
    unread: 1,
    lastMessageAt: Date.now() - 30000,
  },
  {
    id: "c2",
    type: "group",
    title: "Team Chat",
    members: ["me", "u1", "u2", "u3"],
    avatar: null,
    color: "#FF9800",
    messages: [{ id: "m3", sender: "u2", text: "Hello team!", ts: Date.now() - 50000 }],
    unread: 2,
    lastMessageAt: Date.now() - 50000,
  },
  {
    id: "ch1",
    type: "channel",
    title: "News Updates",
    members: ["me"],
    avatar: null,
    color: "#4CAF50",
    messages: [{ id: "m4", sender: "channel", text: "Daily news briefing 🌐", ts: Date.now() - 40000 }],
    unread: 3,
    lastMessageAt: Date.now() - 40000,
  },
];

function loadConversations() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return demoConversations;
}

function saveConversations(convs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(convs));
}

function timeShort(ts) {
  if (!ts) return "";
  return new Date(ts).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function Avatar({ name, avatar, color = "#90CAF9", size = 40, online = false }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        background: avatar ? "transparent" : color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        color: "white",
        position: "relative",
      }}
    >
      {avatar ? (
        <img
          src={avatar}
          alt={name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        (name || "?")
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
      )}
      {online && (
        <span
          style={{
            position: "absolute",
            bottom: 2,
            right: 2,
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "limegreen",
            border: "2px solid white",
          }}
        ></span>
      )}
    </div>
  );
}

// -------------------- Messenger Page --------------------
export default function MessengerPage() {
  const [conversations, setConversations] = useState(() => loadConversations());
  const [activeConvId, setActiveConvId] = useState(conversations[0]?.id || null);
  const [search, setSearch] = useState("");
  const [composerText, setComposerText] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newMembers, setNewMembers] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);
  const [newColor, setNewColor] = useState("#90CAF9");
  const [showSettings, setShowSettings] = useState(false);
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [chatType, setChatType] = useState("individual"); // individual/group/channel
  const [callModal, setCallModal] = useState({ show: false, type: null }); // voice/video calls

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  const getBoxStyle = () => {
    if (windowWidth < 576) {
      return { width: "75%", height: "75vh", bottom: "10px", right: "5%",top: "16%", borderRadius: "10px" };
    } else if (windowWidth < 992) {
      return { width: "75%", height: "70vh", bottom: "50px", right: "12.5%", borderRadius: "10px" };
    } else {
      return { width: "700px", height: "68vh", bottom: "90px", right: "20px" };
    }
  };

  const activeConv = useMemo(
    () => conversations.find((c) => c.id === activeConvId) || null,
    [conversations, activeConvId]
  );

  useEffect(() => {
    saveConversations(conversations);
  }, [conversations]);

  // -------------------- Message & Media --------------------
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!composerText.trim() || !activeConv) return;

    const newMsg = { id: uuidv4(), sender: "me", text: composerText, ts: Date.now() };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id ? { ...c, messages: [...c.messages, newMsg], lastMessageAt: Date.now() } : c
      )
    );

    setComposerText("");
    setShowEmojiPicker(false);
  };

  const handleAttachFile = (file) => {
    if (!file || !activeConv) return;

    const newMsg = file.type.startsWith("image/")
      ? { id: uuidv4(), sender: "me", image: URL.createObjectURL(file), ts: Date.now() }
      : { id: uuidv4(), sender: "me", text: `📎 Attached: ${file.name}`, ts: Date.now() };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );
  };

  const onEmojiClick = (emojiData) => setComposerText((prev) => prev + emojiData.emoji);

  // -------------------- Create Chat --------------------
  const handleCreateChat = () => {
    if ((chatType === "individual" && newMembers.length !== 1) || ((chatType === "group" || chatType==="channel") && !newTitle.trim())) return;

    const newChat = {
      id: uuidv4(),
      type: chatType,
      title: chatType === "individual"
        ? ["Alice", "Bob", "Charlie", "David"].find((_, idx) => newMembers[0] === `u${idx + 1}`)
        : newTitle,
      members: chatType === "individual" ? ["me", ...newMembers] : ["me", ...newMembers],
      avatar: newAvatar ? URL.createObjectURL(newAvatar) : null,
      color: newColor,
      messages: [],
      unread: 0,
      lastMessageAt: Date.now(),
    };

    setConversations((prev) => [newChat, ...prev]);
    setActiveConvId(newChat.id);
    setShowNewChat(false);
    setNewTitle("");
    setNewMembers([]);
    setNewAvatar(null);
  };

  const unreadCount = conversations.reduce((acc, c) => acc + (c.unread || 0), 0);

  // -------------------- Call Modal --------------------
  const startCall = (type) => setCallModal({ show: true, type });
  const endCall = () => setCallModal({ show: false, type: null });

  return (
    <>
      {isMessengerOpen && (
        <Container
          fluid
          className="p-3"
          style={{
            position: "fixed",
            zIndex: 999,
            background: "white",
            borderRadius: "10px",
            overflow: "hidden",
            ...getBoxStyle(),
          }}
        >
          <Row className="h-100 shadow rounded overflow-hidden">
            {/* Sidebar */}
            <Col
              md={4}
              className="border-end p-0 h-100 bg-white d-flex flex-column"
              style={isMobile ? { width: "35%", position: "absolute", left: 0, top: 0, bottom: 0, zIndex: 200 } : {}}
            >
              <div className="d-flex flex-wrap justify-content-between align-items-center p-3 border-bottom bg-light">
                <h6 className="mb-0 me-auto fw-bold text-muted">Chats & Channels</h6>
                <Button size="sm" variant="outline-secondary" className="me-2" onClick={() => setShowNewChat(true)}>
                  <FaUserPlus />
                </Button>
                <Dropdown>
                  <Dropdown.Toggle variant="outline-secondary" size="sm">
                    <FaEllipsisV />
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item onClick={() => setShowSettings(true)}>
                      <FaCog className="me-2" /> Settings
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        localStorage.removeItem(STORAGE_KEY);
                        window.location.reload();
                      }}
                    >
                      Reset Demo
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="p-2 border-bottom">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </InputGroup>
              </div>

              <div style={{ overflowY: "auto" }} className="flex-grow-1">
                <ListGroup variant="flush">
                  {conversations
                    .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
                    .map((c) => (
                      <ListGroup.Item
                        key={c.id}
                        action
                        active={c.id === activeConvId}
                        onClick={() => {
                          setActiveConvId(c.id);
                          setConversations((prev) =>
                            prev.map((x) => (x.id === c.id ? { ...x, unread: 0 } : x))
                          );
                        }}
                        className="d-flex align-items-center"
                      >
                        <Avatar name={c.title} avatar={c.avatar} color={c.color} size={42} online={c.type!=="channel"} />
                        <div className="ms-3 flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <div className="fw-semibold">{c.title}</div>
                            <small className="text-muted">{timeShort(c.lastMessageAt)}</small>
                          </div>
                          <div className="text-truncate text-muted small">
                            {c.messages[c.messages.length - 1]?.text ||
                              (c.messages[c.messages.length - 1]?.image && "📷 Image") ||
                              "No messages yet"}
                          </div>
                        </div>
                        {c.unread > 0 && <Badge bg="danger">{c.unread}</Badge>}
                      </ListGroup.Item>
                    ))}
                </ListGroup>
              </div>
            </Col>

            {/* Chat Window */}
            <Col
              md={8}
              className="p-0 h-100 d-flex flex-column bg-light"
              style={isMobile ? { width: "65%", position: "absolute", top: 0, right: 0, bottom: 0 } : {}}
            >
              {isMobile && (
                <Button
                  variant="light"
                  className="m-2"
                  onClick={() => setActiveConvId(null)}
                >
                  <FaChevronLeft /> Back
                </Button>
              )}

              <div className="d-flex align-items-center border-bottom p-3 bg-white">
                {activeConv && (
                  <>
                    <Avatar
                      name={activeConv.title}
                      avatar={activeConv.avatar}
                      color={activeConv.color}
                      size={44}
                      online={activeConv.type !== "channel"}
                    />
                    <div className="ms-3 flex-grow-1">
                      <div className="fw-bold">{activeConv.title}</div>
                      <div className="small text-muted">
                        {activeConv.type === "channel"
                          ? "Channel"
                          : "Active now"}
                      </div>
                    </div>

                    {/* Call Buttons */}
                    {activeConv.type !== "channel" && (
                      <div className="d-flex gap-2">
                        <Button size="sm" variant="outline-success" onClick={() => startCall("voice")}>
                          <FaPhone />
                        </Button>
                        <Button size="sm" variant="outline-primary" onClick={() => startCall("video")}>
                          <FaVideo />
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Message List */}
              <div className="flex-grow-1 p-3" style={{ overflowY: "auto", background: "#f9f9f9" }}>
                {activeConv ? (
                  activeConv.messages.map((m) => (
                    <div
                      key={m.id}
                      className={`mb-2 d-flex ${m.sender === "me" ? "justify-content-end" : "justify-content-start"}`}
                    >
                      <div
                        className={`p-2 rounded ${m.sender === "me" ? "bg-primary text-white" : "bg-white border"}`}
                        style={{ maxWidth: "70%" }}
                      >
                        {m.image ? (
                          <Image
                            src={m.image}
                            thumbnail
                            fluid
                            style={{ maxHeight: "200px", objectFit: "contain" }}
                          />
                        ) : (
                          m.text
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted text-center mt-5">Select a conversation to start chatting</div>
                )}
              </div>

              {/* Composer */}
              {activeConv && (
                <div className="p-3 border-top bg-white position-relative">
                  <Form onSubmit={handleSendMessage}>
                    <InputGroup>
                      <Button variant="outline-secondary" onClick={() => document.getElementById("file-input").click()}>
                        <FaPaperclip />
                      </Button>
                      <Form.Control
                        placeholder="Type a message"
                        value={composerText}
                        onChange={(e) => setComposerText(e.target.value)}
                      />
                      <Button variant="outline-secondary" onClick={() => setShowEmojiPicker((s) => !s)}>
                        <FaSmile />
                      </Button>
                      <Button variant="outline-secondary" onClick={() => document.getElementById("camera-input").click()}>
                        <MdLinkedCamera size={20} />
                      </Button>
                      <Button variant="primary" type="submit">
                        <FaPaperPlane />
                      </Button>
                    </InputGroup>
                  </Form>

                  <input id="file-input" type="file" className="d-none" onChange={(e) => handleAttachFile(e.target.files[0])} />
                  <input id="camera-input" type="file" accept="image/*" capture="environment" className="d-none" onChange={(e) => handleAttachFile(e.target.files[0])} />

                  {showEmojiPicker && (
                    <div style={{ position: "absolute", bottom: "70px", right: "20px", zIndex: 1000 }}>
                      <EmojiPicker onEmojiClick={onEmojiClick} />
                    </div>
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Container>
      )}

      {/* Floating Button */}
      <Button
        variant="light"
        className="position-fixed d-flex align-items-center justify-content-center shadow"
        style={{
          bottom: "20px",
          right: "20px",
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          background: "linear-gradient(45deg,#ff5f6d,#ffc371)",
          zIndex: 1000,
        }}
        onClick={() => setIsMessengerOpen((s) => !s)}
      >
        <FaFacebookMessenger size={26} color="black" />
        {unreadCount > 0 && (
          <Badge bg="danger" pill style={{ position: "absolute", top: "8px", right: "8px" }}>
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* New Chat Modal */}
      <Modal show={showNewChat} onHide={() => setShowNewChat(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Start New Conversation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Chat Type</Form.Label>
              <div>
                <Form.Check inline type="radio" label="Individual" name="chatType" value="individual" checked={chatType === "individual"} onChange={(e) => setChatType(e.target.value)} />
                <Form.Check inline type="radio" label="Group" name="chatType" value="group" checked={chatType === "group"} onChange={(e) => setChatType(e.target.value)} />
                <Form.Check inline type="radio" label="Channel" name="chatType" value="channel" checked={chatType === "channel"} onChange={(e) => setChatType(e.target.value)} />
              </div>
            </Form.Group>

            {(chatType === "group" || chatType === "channel") && (
              <Form.Group className="mb-3">
                <Form.Label>Conversation Name</Form.Label>
                <Form.Control placeholder="Enter group/channel name" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Label>Add Participants</Form.Label>
              <Form.Select multiple={chatType !== "individual"} value={newMembers} onChange={(e) => setNewMembers(Array.from(e.target.selectedOptions, (o) => o.value))}>
                <option value="u1">Alice</option>
                <option value="u2">Bob</option>
                <option value="u3">Charlie</option>
                <option value="u4">David</option>
              </Form.Select>
              {chatType === "individual" && <Form.Text className="text-muted">Select exactly one participant for individual chat</Form.Text>}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Profile Picture (optional)</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => setNewAvatar(e.target.files[0])} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Chat Color</Form.Label>
              <Form.Control type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowNewChat(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateChat} disabled={chatType === "individual" && newMembers.length !== 1}>
            Create Chat
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Settings Modal */}
      <Modal show={showSettings} onHide={() => setShowSettings(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Messenger Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check label="Show online presence" defaultChecked />
          <Form.Check label="Enable notifications" defaultChecked />
          <Form.Check label="Play sound on message" />
          <Form.Check label="Dark mode theme" />
          <Form.Check label="Archive inactive chats" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShowSettings(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      {/* Call Modal */}
      <Modal show={callModal.show} onHide={endCall} centered>
        <Modal.Header closeButton>
          <Modal.Title>{callModal.type === "video" ? "Video Call" : "Voice Call"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>{`Simulating ${callModal.type} call with ${activeConv?.title || ""}`}</p>
          <Button variant="danger" onClick={endCall}>End Call</Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

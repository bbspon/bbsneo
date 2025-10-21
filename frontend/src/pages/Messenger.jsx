import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  ListGroup,
  Badge,
  Dropdown,
  Modal,
  Image,
  Form,
} from "react-bootstrap";
import {
  FaSearch,
  FaPaperPlane,
  FaPaperclip,
  FaSmile,
  FaEllipsisV,
  FaUserCircle,
  FaPhone,
  FaVideo,
  FaArrowLeft,
  FaEllipsisH,
  FaChevronLeft,
  FaChevronRight,
  FaTrash,
  FaThumbsUp,
  FaTimes,
  FaDownload,
} from "react-icons/fa";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { VscLayoutSidebarLeft } from "react-icons/vsc";
import { VscLayoutSidebarRight } from "react-icons/vsc";
// ------------------ CSS ------------------
const INJECTED_CSS = `
.messenger-root { height: 80vh; border: 1px solid #e6e6e6; border-radius: 8px; overflow: hidden; background: #fff; display:flex; }
.sidebar { background: #f8f9fa; height: 100%; padding: 12px; border-right: 1px solid #eee; overflow:hidden; }
.chat-area { flex:1; display:flex; flex-direction:column; }
.chat-header { padding: 12px 16px; border-bottom: 1px solid #eee; display:flex; align-items:center; justify-content:space-between; }
.messages { flex:1; padding: 16px; overflow-y:auto; background: linear-gradient(#fff,#fbfbfb); }
.message-row { display:flex; margin-bottom: 8px; }
.message-row.me { justify-content:flex-end; }
.message-bubble { max-width:72%; padding:8px 12px; border-radius:16px; box-shadow: 0 1px 0 rgba(0,0,0,0.04); }
.message-bubble.me { background:#d1f5d8; border-bottom-right-radius:4px; }
.message-bubble.them { background:#fff; border:1px solid #f0f0f0; }
.message-meta { font-size:11px; color:#666; margin-top:4px; }
.chat-input { padding:8px 12px; border-top:1px solid #eee; display:flex; gap:8px; align-items:center; }
.sidebar .profile { display:flex; align-items:center; gap:10px; padding:8px 6px; }
.sidebar .chat-search { margin:8px 0 12px 0; }
.chat-list-item { padding:8px; border-radius:8px; cursor:pointer; }
.chat-list-item:hover { background: rgba(0,0,0,0.02); }
.chat-list-item.active { background: rgba(0,123,255,0.08); }
.right-panel { background:#f7f7fb; border-left:1px solid #eee; padding:12px; overflow:hidden; }
.attachment-preview { max-width:120px; max-height:120px; object-fit:cover; border-radius:6px; }
.emoji-picker { display:flex; gap:8px; flex-wrap:wrap; padding:8px; }
.small-muted { font-size:12px; color:#777; }
@media (max-width: 768px) { .sidebar { display:none !important; } .right-panel { display:none !important; } .messenger-root { height: 92vh; } }
`;

// ------------------ Mock Data ------------------
const initialChats = [
  {
    id: "c1",
    name: "Rahul Sharma",
    avatar: null,
    lastMessage: "Hey — you free for a call?",
    lastSeen: "2025-10-07T18:24:00+05:30",
    unread: 2,
    messages: [
      { id: "m1", from: "them", text: "Hi! how are you?", ts: "2025-10-07T17:30:00+05:30" },
      { id: "m2", from: "me", text: "I'm good — working on the project.", ts: "2025-10-07T17:32:00+05:30" },
      { id: "m3", from: "them", text: "Nice. Ping me when free.", ts: "2025-10-07T17:40:00+05:30" },
    ],
  },
  {
    id: "c2",
    name: "Design Team",
    avatar: null,
    lastMessage: "Updated the hero image",
    lastSeen: "2025-10-07T12:01:00+05:30",
    unread: 0,
    messages: [
      { id: "m1", from: "them", text: "Updated the hero image — pls check.", ts: "2025-10-06T10:05:00+05:30" },
    ],
  },
  {
    id: "c3",
    name: "System",
    avatar: null,
    lastMessage: "Payment of ₹199 processed",
    lastSeen: null,
    unread: 1,
    messages: [
      { id: "m1", from: "them", text: "Payment of ₹199 processed for Gold SIP.", ts: "2025-10-06T09:00:00+05:30" },
    ],
  },
];

// ------------------ Utilities ------------------
function formatTime(ts) {
  const d = new Date(ts);
  if (isNaN(d)) return "";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// ------------------ Components ------------------
function Avatar({ name, size = 40 }) {
  const initials = (name || "?")
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const bg = "#" + Math.floor(Math.random() * 16777215).toString(16);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        background: bg,
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 600,
      }}
    >
      {initials}
    </div>
  );
}

function ChatListItem({ chat, active, onClick }) {
  const last = chat.messages[chat.messages.length - 1];
  const lastText = last ? last.text : chat.lastMessage;
  const time = last ? formatTime(last.ts) : "";
  return (
    <div
      className={`chat-list-item d-flex align-items-center gap-2 ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <Avatar name={chat.name} />
      <div style={{ flex: 1 }}>
        <div className="d-flex justify-content-between align-items-center">
          <strong>{chat.name}</strong>
          <small className="text-muted">{time}</small>
        </div>
        <div className="d-flex justify-content-between align-items-center mt-1">
          <small className="text-truncate" style={{ maxWidth: 180 }}>
            {lastText}
          </small>
          {chat.unread ? <Badge bg="danger">{chat.unread}</Badge> : <span style={{ width: 10 }} />}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ m }) {
  const isMe = m.from === "me";
  return (
    <div className={`message-row ${isMe ? "me" : "them"}`}>
      {!isMe && <div style={{ marginRight: 8 }}></div>}
      <div className={`message-bubble ${isMe ? "me" : "them"}`}>
        {m.text && <div>{m.text}</div>}
        {m.attachment && (
          <div className="mt-2">
            {m.attachment.type && m.attachment.type.startsWith("image") ? (
              <img src={m.attachment.data} alt="att" style={{ maxWidth: 220, borderRadius: 8 }} />
            ) : (
              <div className="d-flex align-items-center gap-2 small-muted">
                <FaDownload /> <span>{m.attachment.name}</span>
              </div>
            )}
          </div>
        )}
        <div className="message-meta d-flex justify-content-between">
          <small>{formatTime(m.ts)}</small>
          <small className="text-muted">{m.status || (isMe ? "Sent" : "")}</small>
        </div>
      </div>
    </div>
  );
}

// ------------------ Main Page ------------------
export default function MessengerPage() {
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "messenger-injected-styles";
    style.innerHTML = INJECTED_CSS;
    document.head.appendChild(style);
    return () => {
      const el = document.getElementById("messenger-injected-styles");
      if (el) el.remove();
    };
  }, []);

  const [chats, setChats] = useState(initialChats);
  const [archived, setArchived] = useState([]);
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id ?? null);
  const [messageText, setMessageText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [showAttachModal, setShowAttachModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typing, setTyping] = useState(false);

  const messagesRef = useRef(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [activeChatId, chats]);

  const activeChat = useMemo(() => chats.find((c) => c.id === activeChatId) || chats[0], [chats, activeChatId]);

  function handleSend() {
    if (!messageText.trim() && !attachment) return;
    const newMsg = {
      id: uid("m"),
      from: "me",
      text: messageText.trim() || "",
      ts: new Date().toISOString(),
      status: "Delivered",
      attachment: attachment ? { ...attachment } : null,
    };
    setChats((prev) => prev.map((c) => (c.id === activeChat.id ? { ...c, messages: [...c.messages, newMsg], unread: 0 } : c)));
    setMessageText("");
    setAttachment(null);
    setShowEmoji(false);

    setTimeout(() => {
      const reply = { id: uid("m"), from: "them", text: "Thanks — got it 👍", ts: new Date().toISOString() };
      setChats((prev) => prev.map((c) => (c.id === activeChat.id ? { ...c, messages: [...c.messages, reply] } : c)));
    }, 900 + Math.random() * 1400);
  }

  function handleAttachFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setAttachment({ name: file.name, type: file.type, data });
      setShowAttachModal(false);
    };
    reader.readAsDataURL(file);
  }

  function handleSelectChat(id) {
    setActiveChatId(id);
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));
  }

  function handleDeleteChat(id) {
    const chatToDelete = chats.find((c) => c.id === id);
    if (!chatToDelete) return;
    if (!window.confirm("Delete this chat?")) return;
    setArchived((p) => [chatToDelete, ...p]);
    setChats((p) => p.filter((c) => c.id !== id));
    if (activeChatId === id && chats.length > 1) setActiveChatId(chats[0].id);
  }

  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) return chats;
    const t = searchTerm.toLowerCase();
    return chats.filter((c) => c.name.toLowerCase().includes(t) || c.messages.some((m) => (m.text || "").toLowerCase().includes(t)));
  }, [chats, searchTerm]);

  // ------------------ Render ------------------
  return (
    <Container fluid className="p-3">
      <Row>
        <Col xs={12}>
          <div className="d-flex align-items-center justify-content-between mb-2">
                 <Button variant="outline-secondary" size="sm" onClick={() => setSidebarOpen((s) => !s)} className="me-2">
                {sidebarOpen ? <VscLayoutSidebarLeft /> : <VscLayoutSidebarRight />}
              </Button>
            <h5 className="mb-0">Messenger</h5>
        
         
              <Button variant="outline-secondary" size="sm" onClick={() => setRightOpen((s) => !s)}>
             <BsFillInfoCircleFill />
              </Button>
      
          </div>

          <div className="messenger-root">
            {/* Sidebar */}
            <div className="sidebar" style={{ width: sidebarOpen ? 320 : 0, transition: "width 0.2s" ,padding:"10 2%"}}>
              <div className="profile" onClick={() => setShowProfileModal(true)} style={{ cursor: "pointer" }}>
                <Avatar name={"You"} />
                <div style={{ flex: 1 }}>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>medunraj yason</strong>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" bsPrefix="" id="dropdown-basic" style={{ padding: 0 }}>
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setShowProfileModal(true)}>Profile</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="small-muted">Online</div>
                </div>
              </div>

              <div className="chat-search">
                <InputGroup>
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                  <FormControl placeholder="Search chats or messages" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </InputGroup>
              </div>

              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="small-muted">Recent</div>
                <div>
                  <Button size="sm" variant="outline-primary" onClick={() => setShowNewChatModal(true)}>
                    New Chat
                  </Button>
                </div>
              </div>

              <div style={{ overflowY: "auto", maxHeight: "calc(80vh - 200px)" }}>
                <ListGroup variant="flush">
                  {filteredChats.map((chat) => (
                    <ListGroup.Item key={chat.id} action onClick={() => handleSelectChat(chat.id)} className={chat.id === activeChatId ? "active" : ""}>
                      <ChatListItem chat={chat} active={chat.id === activeChatId} onClick={() => handleSelectChat(chat.id)} />
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>

              <div className="mt-2 small-muted">Tip: Click a chat to open</div>
            </div>

            {/* Chat area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <div className="chat-area">
                <div className="chat-header">
                  <div className="d-flex align-items-center gap-2">
                    <div className="d-md-none">
                      <Button variant="link" onClick={() => setSidebarOpen(true)}>
                        <FaArrowLeft />
                      </Button>
                    </div>
                    <Avatar name={activeChat?.name || "Unknown"} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{activeChat?.name}</div>
                      <div className="small-muted">{activeChat?.lastSeen ? `Last seen ${new Date(activeChat.lastSeen).toLocaleString()}` : "Active"}</div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" size="sm">
                      <FaPhone />
                    </Button>
                    <Button variant="outline-secondary" size="sm">
                      <FaVideo />
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" bsPrefix="" id="menu-more" style={{ padding: 6 }}>
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => handleDeleteChat(activeChat.id)}>
                          <FaTrash /> Delete Chat
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => alert("Archived")}>Archive</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>

                <div className="messages" ref={messagesRef}>
                  {(activeChat?.messages || []).map((m) => (
                    <MessageBubble key={m.id} m={m} />
                  ))}
                  {typing && (
                    <div className="message-row">
                      <div className="message-bubble them">Typing…</div>
                    </div>
                  )}
                </div>

                <div className="chat-input">
                  <Button variant="light" onClick={() => setShowEmoji((e) => !e)}>
                    <FaSmile />
                  </Button>
                  {showEmoji && (
                    <div className="emoji-picker">
                      {["😀", "😂", "😍", "👍", "🎉", "💬"].map((e) => (
                        <span key={e} style={{ cursor: "pointer" }} onClick={() => setMessageText((t) => t + e)}>
                          {e}
                        </span>
                      ))}
                    </div>
                  )}
                  <FormControl
                    placeholder="Type a message"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  />
                  <input type="file" style={{ display: "none" }} id="fileInput" onChange={handleAttachFile} />
                  <Button variant="light" onClick={() => document.getElementById("fileInput").click()}>
                    <FaPaperclip />
                  </Button>
                  <Button variant="primary" onClick={handleSend}>
                    <FaPaperPlane />
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Panel */}
            <div className="right-panel" style={{ width: rightOpen ? 280 : 0, transition: "width 0.2s" }}>
              {rightOpen && (
                <>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <strong>More Info</strong>
                    <Button variant="link" size="sm" onClick={() => setRightOpen(false)}>
                      <FaTimes />
                    </Button>
                  </div>
                  <div>
                    <div className="mb-2">Shared Media</div>
                    <div className="d-flex flex-wrap gap-2">
                      {(activeChat?.messages || [])
                        .filter((m) => m.attachment && m.attachment.type?.startsWith("image"))
                        .map((m) => (
                          <img key={m.id} src={m.attachment.data} alt="" className="attachment-preview" />
                        ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Col>
      </Row>

      {/* Profile Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" defaultValue="medunraj yason" />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" defaultValue="Online" />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Settings Modal */}
      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Check type="switch" id="themeSwitch" label="Dark Theme" />
            <Form.Check type="switch" id="notifSwitch" label="Notifications" />
            <Form.Check type="switch" id="privacySwitch" label="Private Mode" />
          </Form>
        </Modal.Body>
      </Modal>

      {/* New Chat Modal */}
      <Modal show={showNewChatModal} onHide={() => setShowNewChatModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Select Contact</Form.Label>
              <Form.Select
                onChange={(e) => {
                  const contactName = e.target.value;
                  if (!contactName) return;
                  const newChat = { id: uid("c"), name: contactName, avatar: null, lastMessage: "", messages: [], unread: 0 };
                  setChats((p) => [newChat, ...p]);
                  setActiveChatId(newChat.id);
                  setShowNewChatModal(false);
                }}
              >
                <option value="">Select contact...</option>
                <option>Rahul Sharma</option>
                <option>Design Team</option>
                <option>System</option>
                <option>Alice</option>
                <option>Bob</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

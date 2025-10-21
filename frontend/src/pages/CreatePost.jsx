// CreatePost.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Dropdown,
  Modal,
  Badge,
  Nav,
  Tab,
  Card,
  ListGroup,
  Spinner,
  ToggleButtonGroup,
  ToggleButton,
  OverlayTrigger,
  Tooltip,
  Image,
} from "react-bootstrap";
import {
  FaImage,
  FaVideo,
  FaCalendarAlt,
  FaClock,
  FaUpload,
  FaHashtag,
  FaTags,
  FaBolt,
  FaSave,
  FaShare,
  FaEye,
  FaUsers,
  FaCog,
  FaPlay,
  FaThumbsUp,
  FaLink,
  FaPoll,
  FaRegFileAlt,
  FaRocket,
  FaHome,
  FaBell,
  FaAd,
  FaInbox,
  FaChartLine,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const LOCAL_DRAFT_KEY = "create_post_drafts_v1";

const sampleAccounts = [
  { id: "page_fb_1", name: "Acme Co. (FB Page)", platform: "facebook" },
  { id: "ig_1", name: "Acme Co. (Instagram)", platform: "instagram" },
  { id: "internal_feed", name: "NEO Internal Feed", platform: "internal" },
];

const ctaOptions = [
  { id: "none", label: "No CTA" },
  { id: "shop_now", label: "Shop Now" },
  { id: "learn_more", label: "Learn More" },
  { id: "book", label: "Book" },
  { id: "contact", label: "Contact" },
];

const sampleTemplates = [
  {
    id: "tpl1",
    name: "New Product Launch",
    caption: "🎉 Introducing our new product — check it out! #NewArrival",
  },
  {
    id: "tpl2",
    name: "Holiday Promo",
    caption: "Happy Holidays! Exclusive deals inside. Use code HOLIDAY20.",
  },
];

function formatDateLocalInput(date) {
  if (!date) return "";
  const d = new Date(date);
  const tzOffset = d.getTimezoneOffset() * 60000;
  const localISOTime = new Date(d - tzOffset).toISOString().slice(0, 16);
  return localISOTime;
}

export default function CreatePost() {
  // Basic composer state
  const [selectedAccounts, setSelectedAccounts] = useState([sampleAccounts[0].id]);
  const [caption, setCaption] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]); // {id,type,url,file,name}
  const [selectedCTA, setSelectedCTA] = useState("none");
  const [altText, setAltText] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState([]); // simple string tags
  const [scheduledAt, setScheduledAt] = useState("");
  const [publishMode, setPublishMode] = useState("now"); // now | schedule | queue | draft
  const [platformView, setPlatformView] = useState("facebook"); // preview platform
  const [isAIing, setIsAIing] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [templates, setTemplates] = useState(sampleTemplates);
  const [showCollabModal, setShowCollabModal] = useState(false);
  const [comments, setComments] = useState([
    // sample comment
    { id: 1, user: "Maya", text: "Please add pricing info.", role: "editor", createdAt: Date.now() - 1000 * 60 * 60 },
  ]);
  const [drafts, setDrafts] = useState(() => {
    try {
      const raw = localStorage.getItem(LOCAL_DRAFT_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isPublishing, setIsPublishing] = useState(false);
  const [analyticsPrediction, setAnalyticsPrediction] = useState(null);
  const [advancedOptionsOpen, setAdvancedOptionsOpen] = useState(true);
  const fileInputRef = useRef(null);
const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const sidebarItems = [
    { icon: <FaHome />, label: "Home", path: "/" },
    { icon: <FaBell />, label: "Notifications", path: "/notifications" },
    { icon: <FaAd />, label: "Ads", path: "/ads" },
    { icon: <FaInbox />, label: "Messages", path: "/messages" },
    { icon: <FaRegFileAlt />, label: "Documents", path: "/documents" },
    { icon: <FaCalendarAlt />, label: "Calendar", path: "/calendar" },
    { icon: <FaChartLine />, label: "Analytics", path: "/analytics" },
    { icon: <FaCog />, label: "Settings", path: "/settings" },
  ];

  // Persist drafts whenever drafts array changes
  useEffect(() => {
    localStorage.setItem(LOCAL_DRAFT_KEY, JSON.stringify(drafts));
  }, [drafts]);

  // Simple utils
  const nextId = () => Math.random().toString(36).slice(2, 9);

  // Media handling
  function handleFilesSelected(files) {
    const arr = Array.from(files);
    arr.forEach((file) => {
      const reader = new FileReader();
      const id = nextId();
      reader.onload = (e) => {
        setMediaFiles((prev) => [
          ...prev,
          {
            id,
            type: file.type.startsWith("video") ? "video" : "image",
            url: e.target.result,
            name: file.name,
            file,
          },
        ]);
      };
      reader.readAsDataURL(file);
    });
  }

  function removeMedia(id) {
    setMediaFiles((prev) => prev.filter((m) => m.id !== id));
  }

  function reorderMedia(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;
    setMediaFiles((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      return copy;
    });
  }

  // Account toggle
  function toggleAccount(accountId) {
    setSelectedAccounts((prev) =>
      prev.includes(accountId) ? prev.filter((a) => a !== accountId) : [...prev, accountId]
    );
  }

  // Tagging input
  function addTagFromInput(text) {
    const t = text.trim();
    if (!t) return;
    if (!tags.includes(t)) setTags((p) => [...p, t]);
  }
  function removeTag(t) {
    setTags((p) => p.filter((x) => x !== t));
  }

  // Templates
  function applyTemplate(id) {
    const tpl = templates.find((t) => t.id === id);
    if (!tpl) return;
    setCaption((c) => (c ? `${c}\n\n${tpl.caption}` : tpl.caption));
    setSelectedTemplateId(id);
  }
  function saveNewTemplate(name, text) {
    const tpl = { id: nextId(), name, caption: text };
    setTemplates((p) => [tpl, ...p]);
    setShowTemplates(false);
  }

  // Collaboration modal actions
  function addComment(text) {
    if (!text || !text.trim()) return;
    const c = { id: nextId(), user: "You", text, role: "author", createdAt: Date.now() };
    setComments((p) => [c, ...p]);
  }

  // AI caption generator (stub)
  async function generateAICaption({ tone = "engaging", length = "short" } = {}) {
    // stub: emulate async behavior and produce a textual suggestion based on content
    setIsAIing(true);
    await new Promise((r) => setTimeout(r, 900 + Math.random() * 900));
    const suggestion = (() => {
      const base = caption || "Check out our latest update!";
      const extras = {
        short: "Quick read — tap to learn more.",
        medium: "Don’t miss out — limited time!",
        long: "We're excited to share updates, features, and insights. Visit now to get the early access.",
      };
      const tonePrefix = tone === "witty" ? "😎 Heads up —" : tone === "formal" ? "Announcement:" : "🔥";
      return `${tonePrefix} ${base} ${extras[length] || extras.short}`;
    })();
    setIsAIing(false);
    // set caption to suggested (append)
    setCaption((c) => (c ? `${c}\n\n${suggestion}` : suggestion));
  }

  // Validation pre-publish
  function runValidation() {
    const errs = [];
    if (selectedAccounts.length === 0) errs.push("Select at least one account/platform.");
    if (!caption.trim() && mediaFiles.length === 0) errs.push("A caption or media is required.");
    if (publishMode === "schedule" && !scheduledAt) errs.push("Set a valid scheduled date & time.");
    if (mediaFiles.length > 10) errs.push("Maximum 10 media items allowed.");
    setValidationErrors(errs);
    return errs.length === 0;
  }

  // Mock analytics prediction
  function predictAnalytics() {
    // simple mock: prediction based on selected accounts and media presence
    const scoreBase = selectedAccounts.length * 10 + (mediaFiles.length ? 30 : 5) + (caption.length > 120 ? 20 : 0);
    const reach = Math.round(scoreBase * (1 + Math.random() * 0.4));
    const engagementRate = (Math.min(5 + (mediaFiles.length ? 1.5 : 0) + (caption.length > 50 ? 1 : 0), 12) * Math.random())
      .toFixed(2);
    const predicted = {
      reach,
      engagementRate: `${engagementRate}%`,
      recommendation: reach > 60 ? "Good — consider boosting for extra reach" : "Consider adding media or hashtags",
    };
    setAnalyticsPrediction(predicted);
  }

  // Save draft
  function saveDraft(name = `Draft ${new Date().toLocaleString()}`) {
    const draft = {
      id: nextId(),
      name,
      caption,
      mediaFiles: mediaFiles.map((m) => ({ id: m.id, type: m.type, url: m.url, name: m.name })),
      selectedAccounts,
      selectedCTA,
      altText,
      tags,
      location,
      savedAt: Date.now(),
    };
    setDrafts((p) => [draft, ...p]);
  }

  // Load draft
  function loadDraft(id) {
    const d = drafts.find((x) => x.id === id);
    if (!d) return;
    setCaption(d.caption || "");
    setMediaFiles(d.mediaFiles.map((m) => ({ ...m })));
    setSelectedAccounts(d.selectedAccounts || []);
    setSelectedCTA(d.selectedCTA || "none");
    setAltText(d.altText || "");
    setTags(d.tags || []);
    setLocation(d.location || "");
  }

  function deleteDraft(id) {
    setDrafts((p) => p.filter((d) => d.id !== id));
  }

  // Publish (mock)
  async function handlePublish() {
    setValidationErrors([]);
    if (!runValidation()) return;
    setIsPublishing(true);
    // simulate uploading & publishing
    await new Promise((r) => setTimeout(r, 1200 + Math.random() * 1400));
    // For scheduled mode, store schedule (here just show success)
    if (publishMode === "schedule") {
      // add to planner (not implemented) — here we just save a scheduled draft
      saveDraft(`Scheduled - ${new Date(scheduledAt).toLocaleString()}`);
    }
    setIsPublishing(false);
    // success notification (simple)
    alert(
      publishMode === "now" ? "Post published successfully (mock)." : `Post scheduled for ${new Date(scheduledAt).toLocaleString()} (mock).`
    );
    // clear composer
    setCaption("");
    setMediaFiles([]);
    setSelectedCTA("none");
    setAltText("");
    setTags([]);
    setLocation("");
    setScheduledAt("");
    setPublishMode("now");
    setAnalyticsPrediction(null);
  }

  // Duplicate current composer into a new draft
  function duplicateAsDraft() {
    saveDraft(`Duplicated ${new Date().toLocaleString()}`);
    alert("Duplicated to drafts (local).");
  }

  // Quick preview modal content render per platform
  function PreviewPane({ platform }) {
    return (
      <Card className="mb-2">
        
        <Card.Body>
          <div className="d-flex align-items-start gap-3">
            <div style={{ width: 56, height: 56, borderRadius: 8, background: "#e9ecef" }} />
            <div style={{ flex: 1 }}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <strong>{platform === "facebook" ? "Acme Co." : platform === "instagram" ? "acme_company" : "NEO Feed"}</strong>
                  <div className="text-muted small">{new Date().toLocaleString()}</div>
                </div>
                <div>
                  <Badge bg="secondary">{platform.toUpperCase()}</Badge>
                </div>
              </div>

              <div className="mt-3" style={{ whiteSpace: "pre-wrap" }}>
                {caption || <span className="text-muted">No caption</span>}
              </div>

              {mediaFiles.length > 0 && (
                <div className="mt-3 d-flex gap-2 flex-wrap">
                  {mediaFiles.map((m) => (
                    <div key={m.id} style={{ width: 140, borderRadius: 8, overflow: "hidden", border: "1px solid #eee" }}>
                      {m.type === "image" ? (
                        <img src={m.url} alt={altText || "image"} style={{ width: "100%", height: 90, objectFit: "cover" }} />
                      ) : (
                        <video src={m.url} style={{ width: "100%", height: 90, objectFit: "cover" }} />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 d-flex gap-2 small text-muted align-items-center">
                {selectedCTA !== "none" && <Badge bg="info">{ctaOptions.find((c) => c.id === selectedCTA)?.label}</Badge>}
                {tags.length > 0 && <div>Tags: {tags.join(", ")}</div>}
                {location && <div> • {location}</div>}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // simple drag reorder handlers
  function onDragStart(e, index) {
    e.dataTransfer.setData("text/plain", index);
  }
  function onDrop(e, index) {
    e.preventDefault();
    const from = Number(e.dataTransfer.getData("text"));
    reorderMedia(from, index);
  }

  // Render
  return (
    <Container fluid className="py-4">
        
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex align-items-start justify-content-between mb-3">
                <div>
                  <h4 className="mb-1">Create Post</h4>
                  <div className="text-muted small">Compose and publish content across your connected accounts.</div>
                </div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-secondary"
                    onClick={() => {
                      setShowPreviewModal(true);
                    }}
                    title="Preview"
                  >
                    <FaEye /> Preview
                  </Button>

                  <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">More</Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                      <Dropdown.Item onClick={() => saveDraft()}>Save Draft</Dropdown.Item>
                      <Dropdown.Item onClick={() => duplicateAsDraft()}>Duplicate as Draft</Dropdown.Item>
                      <Dropdown.Item onClick={() => { setAdvancedOptionsOpen(a => !a); }}>
                        {advancedOptionsOpen ? "Hide Advanced" : "Show Advanced"}
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={() => { alert("Open settings (mock)"); }}>Composer Settings</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>

              {/* Account selector */}
              <div className="mb-3">
                <div className="d-flex gap-2 align-items-center flex-wrap">
                  {sampleAccounts.map((acc) => {
                    const active = selectedAccounts.includes(acc.id);
                    return (
                      <Button
                        key={acc.id}
                        variant={active ? "primary" : "outline-secondary"}
                        size="sm"
                        onClick={() => toggleAccount(acc.id)}
                        className="d-flex align-items-center gap-2"
                      >
                        {acc.platform === "facebook" ? "FB" : acc.platform === "instagram" ? "IG" : "NEO"}
                        <span style={{ fontSize: 12 }}>{acc.name.split(" ")[0]}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Main content editor */}
              <Form.Group>
                <Form.Label className="mb-1">Caption</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Write your caption..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                />
                <div className="d-flex justify-content-between align-items-center mt-2">
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        fileInputRef.current?.click();
                      }}
                      title="Upload media"
                    >
                      <FaUpload /> Add Media
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={(e) => handleFilesSelected(e.target.files)}
                      style={{ display: "none" }}
                    />
                    <Button size="sm" variant="outline-secondary" onClick={() => generateAICaption({ tone: "engaging", length: "short" })}>
                      <FaBolt /> AI Suggest
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => setShowTemplates(true)}>
                      <FaRegFileAlt /> Templates
                    </Button>
                    <Button size="sm" variant="outline-secondary" onClick={() => setShowCollabModal(true)}>
                      <FaUsers /> Collaborate
                    </Button>
                  </div>

                  <div className="text-muted small">
                    {caption.length} chars • {mediaFiles.length} media
                  </div>
                </div>
              </Form.Group>

              {/* Media preview */}
              {mediaFiles.length > 0 && (
                <div className="mt-3">
                  <h6>Media</h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {mediaFiles.map((m, idx) => (
                      <div
                        key={m.id}
                        className="position-relative"
                        draggable
                        onDragStart={(e) => onDragStart(e, idx)}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, idx)}
                        style={{ width: 140, borderRadius: 6, overflow: "hidden", border: "1px solid #e9ecef" }}
                      >
                        <div style={{ height: 100, overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {m.type === "image" ? (
                            <img src={m.url} alt={altText || "image"} style={{ width: "100%", objectFit: "cover" }} />
                          ) : (
                            <video src={m.url} style={{ width: "100%", objectFit: "cover" }} />
                          )}
                        </div>
                        <div className="p-2 d-flex justify-content-between align-items-center small">
                          <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 80 }}>{m.name}</div>
                          <div className="d-flex gap-1">
                            <Button size="sm" variant="outline-secondary" onClick={() => removeMedia(m.id)}>Remove</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Advanced options */}
              {advancedOptionsOpen && (
                <div className="mt-4">
                  <h6>Advanced</h6>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>CTA</Form.Label>
                        <Form.Select value={selectedCTA} onChange={(e) => setSelectedCTA(e.target.value)}>
                          {ctaOptions.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.label}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Alt Text (accessibility)</Form.Label>
                        <Form.Control value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image for screen readers" />
                      </Form.Group>
                      <Form.Group className="mb-2">
                        <Form.Label>Location</Form.Label>
                        <Form.Control value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Add location" />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-2">
                        <Form.Label>Tags</Form.Label>
                        <InputGroup>
                          <Form.Control placeholder="Add tag and press Enter" onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addTagFromInput(e.target.value);
                              e.target.value = "";
                            }
                          }} />
                          <Button variant="outline-secondary" onClick={(ev) => {
                            const input = ev.target.closest(".input-group")?.querySelector("input");
                            if (input) {
                              addTagFromInput(input.value);
                              input.value = "";
                            }
                          }}>Add</Button>
                        </InputGroup>
                        <div className="mt-2 d-flex gap-2 flex-wrap">
                          {tags.map((t) => (
                            <Badge key={t} bg="light" text="dark" style={{ cursor: "pointer" }} onClick={() => removeTag(t)}>
                              #{t} &nbsp;<span style={{ opacity: 0.6 }}>×</span>
                            </Badge>
                          ))}
                        </div>
                      </Form.Group>

                      <Form.Group className="mb-2">
                        <Form.Label>Audience & Options</Form.Label>
                        <div className="d-flex gap-2">
                          <Form.Check type="checkbox" id="opt-comments" label="Allow Comments" defaultChecked />
                          <Form.Check type="checkbox" id="opt-allow-share" label="Allow Reshare" defaultChecked />
                        </div>
                      </Form.Group>

                      <Form.Group>
                        <Form.Label>Content Category</Form.Label>
                        <Form.Select defaultValue="">
                          <option value="">Select category (e.g., Product, Announcement)</option>
                          <option value="product">Product</option>
                          <option value="promo">Promotion</option>
                          <option value="update">Update</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              )}

              {/* Publish controls */}
              <div className="mt-4 d-flex align-items-center gap-2">
                <ToggleButtonGroup type="radio" name="publishMode" value={publishMode} onChange={val => setPublishMode(val)}>
                  <ToggleButton id="pm-now" value={"now"} variant="outline-primary">Publish Now</ToggleButton>
                  <ToggleButton id="pm-sched" value={"schedule"} variant="outline-primary">Schedule</ToggleButton>
                  <ToggleButton id="pm-queue" value={"queue"} variant="outline-primary">Add to Queue</ToggleButton>
                  <ToggleButton id="pm-draft" value={"draft"} variant="outline-secondary">Save as Draft</ToggleButton>
                </ToggleButtonGroup>

                {publishMode === "schedule" && (
                  <InputGroup style={{ maxWidth: 320 }} className="ms-2">
                    <InputGroup.Text><FaCalendarAlt /></InputGroup.Text>
                    <Form.Control
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                    />
                  </InputGroup>
                )}

                <div className="ms-auto d-flex gap-2">
                  <Button variant="outline-secondary" onClick={() => saveDraft()}>
                    <FaSave /> Save Draft
                  </Button>

                  <Button variant="success" disabled={isPublishing} onClick={handlePublish}>
                    {isPublishing ? <Spinner animation="border" size="sm" /> : <FaRocket />} {publishMode === "now" ? "Publish" : publishMode === "schedule" ? "Schedule" : "Save"}
                  </Button>
                </div>
              </div>

              {/* Validation */}
              {validationErrors.length > 0 && (
                <div className="mt-3">
                  <ListGroup>
                    {validationErrors.map((err, i) => (
                      <ListGroup.Item key={i} variant="danger">{err}</ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Drafts & Templates quick lists */}
          <Row className="g-3">
            <Col md={6}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h6>Drafts</h6>
                    <Button variant="link" size="sm" onClick={() => { setDrafts([]); }}>Clear</Button>
                  </div>
                  {drafts.length === 0 ? (
                    <div className="text-muted small">No drafts saved locally.</div>
                  ) : (
                    <ListGroup variant="flush">
                      {drafts.map((d) => (
                        <ListGroup.Item key={d.id} className="d-flex justify-content-between align-items-center">
                          <div>
                            <div><strong>{d.name}</strong></div>
                            <div className="small text-muted">{new Date(d.savedAt).toLocaleString()}</div>
                          </div>
                          <div className="d-flex gap-2">
                            <Button size="sm" onClick={() => loadDraft(d.id)}>Load</Button>
                            <Button size="sm" variant="danger" onClick={() => deleteDraft(d.id)}>Delete</Button>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card>
                <Card.Body>
                  <div className="d-flex justify-content-between">
                    <h6>Templates</h6>
                    <Button size="sm" onClick={() => setShowTemplates(true)}>Manage</Button>
                  </div>
                  <div className="mt-2 d-flex gap-2 flex-wrap">
                    {templates.slice(0, 4).map((t) => (
                      <Button key={t.id} size="sm" variant="outline-secondary" onClick={() => applyTemplate(t.id)}>{t.name}</Button>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Right column: preview, analytics, insights */}
        <Col lg={4}>
          <Card className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between">
                <h6>Preview</h6>
                <div>
                  <Form.Select size="sm" value={platformView} onChange={(e) => setPlatformView(e.target.value)}>
                    <option value="facebook">Facebook</option>
                    <option value="instagram">Instagram</option>
                    <option value="internal">NEO Feed</option>
                  </Form.Select>
                </div>
              </div>

              <div className="mt-2">
                <PreviewPane platform={platformView} />
              </div>

              <div className="mt-3 d-grid">
                <Button onClick={() => { predictAnalytics(); }} variant="outline-primary"><FaBolt /> Predict Performance</Button>
                {analyticsPrediction && (
                  <div className="mt-3">
                    <h6>Predicted Metrics</h6>
                    <div>Reach: <strong>{analyticsPrediction.reach}</strong></div>
                    <div>Engagement Rate: <strong>{analyticsPrediction.engagementRate}</strong></div>
                    <div className="text-muted small">{analyticsPrediction.recommendation}</div>
                  </div>
                )}
              </div>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <h6>Quick Actions</h6>
              <div className="d-grid gap-2">
                <Button variant="outline-secondary" onClick={() => saveDraft()}>Save Draft</Button>
                <Button variant="outline-secondary" onClick={() => { alert("Open Media Library (mock)"); }}>Open Media Library</Button>
                <Button variant="outline-secondary" onClick={() => { alert("Open Campaign Builder (mock)"); }}>Add to Campaign</Button>
                <Button variant="outline-secondary" onClick={() => { alert("Boost post flow (mock)"); }}><FaRocket /> Boost Post</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Templates modal */}
      <Modal show={showTemplates} onHide={() => setShowTemplates(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Templates & Saved Captions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-2">
            <div style={{ flex: 1 }}>
              <ListGroup>
                {templates.map((t) => (
                  <ListGroup.Item key={t.id} className="d-flex justify-content-between align-items-center">
                    <div>
                      <div><strong>{t.name}</strong></div>
                      <div className="small text-muted" style={{ whiteSpace: "pre-wrap" }}>{t.caption}</div>
                    </div>
                    <div className="d-flex gap-2">
                      <Button size="sm" onClick={() => applyTemplate(t.id)}>Apply</Button>
                      <Button size="sm" variant="outline-secondary" onClick={() => {
                        // quick edit: append to caption
                        setCaption((c) => (c ? `${c}\n\n${t.caption}` : t.caption));
                        setShowTemplates(false);
                      }}>Append</Button>
                      <Button size="sm" variant="danger" onClick={() => setTemplates((p) => p.filter(x => x.id !== t.id))}>Delete</Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
            <div style={{ width: 360 }}>
              <h6>Create Template</h6>
              <TemplateForm onSave={(name, txt) => saveNewTemplate(name, txt)} />
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Collaboration modal */}
      <Modal show={showCollabModal} onHide={() => setShowCollabModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Collaborate & Approvals</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex gap-3">
            <div style={{ flex: 1 }}>
              <h6>Comments</h6>
              <div className="mb-3">
                <CommentList comments={comments} />
              </div>
            </div>
            <div style={{ width: 320 }}>
              <h6>Add Comment</h6>
              <AddComment onAdd={(txt) => addComment(txt)} />
              <div className="mt-3">
                <h6>Approvals</h6>
                <div className="d-flex gap-2">
                  <Button variant="outline-success">Approve</Button>
                  <Button variant="outline-danger">Request Changes</Button>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Preview modal */}
      <Modal show={showPreviewModal} onHide={() => setShowPreviewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Live Preview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container defaultActiveKey={platformView}>
            <Row>
              <Col md={3}>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item><Nav.Link eventKey="facebook" onClick={() => setPlatformView("facebook")}>Facebook</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="instagram" onClick={() => setPlatformView("instagram")}>Instagram</Nav.Link></Nav.Item>
                  <Nav.Item><Nav.Link eventKey="internal" onClick={() => setPlatformView("internal")}>NEO Feed</Nav.Link></Nav.Item>
                </Nav>
              </Col>
              <Col md={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="facebook"><PreviewPane platform="facebook" /></Tab.Pane>
                  <Tab.Pane eventKey="instagram"><PreviewPane platform="instagram" /></Tab.Pane>
                  <Tab.Pane eventKey="internal"><PreviewPane platform="internal" /></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

/* --- Helper components --- */

function TemplateForm({ onSave }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  return (
    <div>
      <Form.Group className="mb-2">
        <Form.Control placeholder="Template name" value={name} onChange={(e) => setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-2">
        <Form.Control as="textarea" rows={6} placeholder="Template caption" value={text} onChange={(e) => setText(e.target.value)} />
      </Form.Group>
      <div className="d-flex gap-2">
        <Button onClick={() => { if (!name || !text) { alert("Provide name & text"); return; } onSave(name, text); setName(""); setText(""); }} size="sm">Save Template</Button>
      </div>
    </div>
  );
}

function CommentList({ comments }) {
  return (
    <div>
      {comments.length === 0 && <div className="text-muted small">No comments</div>}
      {comments.map((c) => (
        <div key={c.id} className="mb-2 p-2" style={{ border: "1px solid #eee", borderRadius: 6 }}>
          <div className="d-flex justify-content-between">
            <div><strong>{c.user}</strong> <span className="small text-muted">• {new Date(c.createdAt).toLocaleString()}</span></div>
            <div className="small text-muted">{c.role}</div>
          </div>
          <div className="mt-1">{c.text}</div>
        </div>
      ))}
    </div>
  );
}

function AddComment({ onAdd }) {
  const [txt, setTxt] = useState("");
  return (
    <div>
      <Form.Control as="textarea" rows={4} value={txt} onChange={(e) => setTxt(e.target.value)} placeholder="Add a comment for collaborators" />
      <div className="d-flex gap-2 mt-2">
        <Button onClick={() => { if (!txt.trim()) return; onAdd(txt); setTxt(""); }}>Add</Button>
      </div>
    </div>
  );
}

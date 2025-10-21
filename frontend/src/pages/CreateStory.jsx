// CreateStory.jsx
import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
  Image,
  Badge,
} from "react-bootstrap";
import Swal from "sweetalert2";
import { FaImage, FaVideo, FaTextHeight, FaSmile, FaMusic } from "react-icons/fa";

const CreateStory = () => {
  const [storyType, setStoryType] = useState("image");
  const [mediaList, setMediaList] = useState([]); // multiple images/videos
  const [textOverlay, setTextOverlay] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [filter, setFilter] = useState("none");
  const [privacy, setPrivacy] = useState("Friends");
  const [scheduledTime, setScheduledTime] = useState("");
  const [drafts, setDrafts] = useState([]);
  const [stickers, setStickers] = useState([]);
  const [bgColor1, setBgColor1] = useState("#ff9a9e");
  const [bgColor2, setBgColor2] = useState("#fad0c4");
  const [music, setMusic] = useState(null);

  const fileInputRef = useRef();
  const musicRef = useRef();

  // Handle media upload
  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      const newMedia = files.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setMediaList([...mediaList, ...newMedia]);
      Swal.fire({
        icon: "success",
        title: `${files.length} file(s) uploaded!`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Handle music upload
  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMusic({ file, url: URL.createObjectURL(file) });
      Swal.fire({
        icon: "success",
        title: "Original music added!",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // Add sticker
  const addSticker = (sticker) => {
    setStickers([...stickers, sticker]);
    Swal.fire({
      icon: "success",
      title: "Sticker added!",
      timer: 1000,
      showConfirmButton: false,
    });
  };

  // Clear editor
  const clearEditor = () => {
    setMediaList([]);
    setTextOverlay("");
    setStickers([]);
    setMusic(null);
    setFilter("none");
    setStoryType("image");
    setPrivacy("Friends");
    setScheduledTime("");
  };

  // Save draft
  const saveDraft = () => {
    if (mediaList.length === 0 && !textOverlay && stickers.length === 0 && !music) {
      Swal.fire({ icon: "error", title: "Cannot save empty draft", timer: 1500, showConfirmButton: false });
      return;
    }
    const draft = {
      storyType,
      mediaList,
      textOverlay,
      filter,
      privacy,
      scheduledTime,
      stickers,
      bgColor1,
      bgColor2,
      music,
      timestamp: new Date(),
    };
    setDrafts([...drafts, draft]);
    Swal.fire({ icon: "success", title: "Draft saved!", timer: 1500, showConfirmButton: false });
    clearEditor();
  };

  // Post story
  const postStory = () => {
    if (mediaList.length === 0 && !textOverlay && stickers.length === 0 && !music) {
      Swal.fire({ icon: "error", title: "Cannot post empty story!", timer: 1500, showConfirmButton: false });
      return;
    }
    Swal.fire({ icon: "success", title: "Story posted successfully!", timer: 1500, showConfirmButton: false });
    clearEditor();
    setShowPreview(false);
  };

  return (
    <Container fluid className="p-3">
      <Row>
        <Col md={8} className="mx-auto">
          {/* Editor Card */}
          <Card className="mb-3" style={{ background: `linear-gradient(135deg, ${bgColor1}, ${bgColor2})` }}>
            <Card.Body>
              <h4>Create Story</h4>
              <hr />

              {/* Story Type */}
              <Row className="mb-3">
                <Col>
                  <Button variant={storyType === "image" ? "primary" : "outline-primary"} onClick={() => setStoryType("image")} className="me-2">
                    <FaImage /> Image
                  </Button>
                  <Button variant={storyType === "video" ? "primary" : "outline-primary"} onClick={() => setStoryType("video")} className="me-2">
                    <FaVideo /> Video
                  </Button>
                  <Button variant={storyType === "text" ? "primary" : "outline-primary"} onClick={() => setStoryType("text")}>
                    <FaTextHeight /> Text
                  </Button>
                </Col>
              </Row>

              {/* Media Upload */}
              {storyType !== "text" && (
                <Form.Group className="mb-3">
                  <Form.Label>Upload Media</Form.Label>
                  <Form.Control type="file" accept={storyType === "image" ? "image/*" : "video/*"} multiple onChange={handleMediaUpload} ref={fileInputRef} />
                </Form.Group>
              )}

              {/* Original Music */}
              <Form.Group className="mb-3">
                <Form.Label>Add Original Music</Form.Label>
                <Form.Control type="file" accept="audio/*" onChange={handleMusicUpload} />
                {music && <audio ref={musicRef} src={music.url} controls className="mt-2" style={{ width: "100%" }} />}
              </Form.Group>

              {/* Text Overlay */}
              <Form.Group className="mb-3">
                <Form.Label>Text Overlay</Form.Label>
                <Form.Control type="text" placeholder="Add text..." value={textOverlay} onChange={(e) => setTextOverlay(e.target.value)} />
              </Form.Group>

              {/* Filters */}
              <Form.Group className="mb-3">
                <Form.Label>Filter</Form.Label>
                <Form.Select value={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="none">None</option>
                  <option value="grayscale(100%)">Grayscale</option>
                  <option value="sepia(100%)">Sepia</option>
                  <option value="brightness(1.2)">Bright</option>
                  <option value="contrast(1.5)">High Contrast</option>
                </Form.Select>
              </Form.Group>

              {/* Stickers */}
              <Row className="mb-3">
                <Col>
                  <Button variant="warning" onClick={() => addSticker("😀")} className="me-2"><FaSmile /> Emoji</Button>
                  <Button variant="secondary" onClick={() => addSticker("🎵")}><FaMusic /> Music Note</Button>
                </Col>
              </Row>

              {/* Privacy & Scheduling */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Privacy</Form.Label>
                    <Form.Select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
                      <option>Public</option>
                      <option>Friends</option>
                      <option>Custom</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Schedule Story (Optional)</Form.Label>
                    <Form.Control type="datetime-local" value={scheduledTime} onChange={(e) => setScheduledTime(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>

              {/* Action Buttons */}
              <Row className="mb-3">
                <Col>
                  <Button variant="secondary" className="me-2" onClick={saveDraft}>Save Draft</Button>
                  <Button variant="info" className="me-2" onClick={() => setShowPreview(true)}>Preview</Button>
                  <Button variant="primary" onClick={postStory}>Post Story</Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>

          {/* Drafts */}
          {drafts.length > 0 && (
            <Card className="mt-3">
              <Card.Body>
                <h5>Drafts</h5>
                {drafts.map((d, idx) => (
                  <div key={idx} className="mb-2 d-flex align-items-center justify-content-between">
                    <div>
                      <Badge bg="secondary">{d.storyType}</Badge> {d.textOverlay || "No text"} - {d.scheduledTime ? `Scheduled: ${d.scheduledTime}` : "Not scheduled"}
                    </div>
                    <div>
                      <Button size="sm" variant="info" className="me-2" onClick={() => {
                        setStoryType(d.storyType);
                        setMediaList(d.mediaList);
                        setTextOverlay(d.textOverlay);
                        setFilter(d.filter);
                        setPrivacy(d.privacy);
                        setScheduledTime(d.scheduledTime);
                        setStickers(d.stickers);
                        setBgColor1(d.bgColor1);
                        setBgColor2(d.bgColor2);
                        setMusic(d.music);
                        Swal.fire({ icon: "success", title: "Draft loaded!", timer: 1500, showConfirmButton: false });
                      }}>Edit</Button>
                      <Button size="sm" variant="danger" onClick={() => {
                        setDrafts(drafts.filter((_, i) => i !== idx));
                        Swal.fire({ icon: "success", title: "Draft deleted!", timer: 1000, showConfirmButton: false });
                      }}>Delete</Button>
                    </div>
                  </div>
                ))}
              </Card.Body>
            </Card>
          )}

          {/* Preview Modal */}
          <Modal show={showPreview} onHide={() => setShowPreview(false)} size="lg">
            <Modal.Header closeButton>
              <Modal.Title>Preview Story</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center" style={{ background: `linear-gradient(135deg, ${bgColor1}, ${bgColor2})`, padding: "20px", borderRadius: "10px" }}>
              {/* Media */}
              {mediaList.length > 0 && mediaList.map((m, i) => (
                <div key={i} className="mb-2">
                  {storyType === "image" && <Image src={m.url} style={{ maxHeight: "300px", filter }} className="mb-2" fluid />}
                  {storyType === "video" && <video key={i} src={m.url} style={{ maxHeight: "300px", width: "100%" }} controls controlsList="nodownload noremoteplayback" preload="metadata" />}
                </div>
              ))}

              {/* Text */}
              {textOverlay && <h3 style={{ filter }}>{textOverlay}</h3>}

              {/* Stickers */}
              {stickers.length > 0 && <p>Stickers: {stickers.join(" ")}</p>}

              {/* Music */}
              {music && <audio key={music.url} src={music.url} controls controlsList="nodownload noplaybackrate" style={{ width: "100%" }} />}

              {/* Empty */}
              {mediaList.length === 0 && !textOverlay && stickers.length === 0 && !music && <p className="text-danger">No content added yet.</p>}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowPreview(false)}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateStory;

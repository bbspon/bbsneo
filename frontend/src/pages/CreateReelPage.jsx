// AdvancedCreateReel.jsx
import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  Badge,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div
    className="bg-dark text-white position-fixed d-flex flex-column "
    style={{
      top: 10,
      left: 0,
      height: "100vh",
      width: isOpen ? "220px" : "60px",
      transition: "width 0.3s",
      overflowY: "auto",
      zIndex: 1000,
    }}
  >
    <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
      {isOpen && <h5 className="m-0">Menu</h5>}
      <Button variant="outline-light" size="sm" onClick={toggleSidebar}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </Button>
    </div>

    <ListGroup variant="flush" className="mt-3">
      {["Dashboard", "Create Reel", "My Reels", "Settings"].map((item, idx) => (
        <ListGroup.Item
          key={idx}
          action
          className="bg-dark text-white border-0 d-flex align-items-center"
        >
          <FaPlus className="me-2" />
          {isOpen && item}
        </ListGroup.Item>
      ))}
    </ListGroup>
  </div>
);


const AdvancedCreateReel = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [videos, setVideos] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [audience, setAudience] = useState("Public");
  const [scheduleModal, setScheduleModal] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Drag & Drop handler
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.includes("video")
    );
    if (droppedFiles.length) setVideos([...videos, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setVideos([...videos, ...selectedFiles]);
  };

  const handleThumbnailChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setThumbnails([...thumbnails, ...selectedFiles.map((f) => URL.createObjectURL(f))]);
  };

  const addHashtag = () => {
    if (currentTag.trim() && !hashtags.includes(currentTag.trim())) {
      setHashtags([...hashtags, currentTag.trim()]);
      setCurrentTag("");
    }
  };

  const removeHashtag = (tag) => {
    setHashtags(hashtags.filter((t) => t !== tag));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      if (progress > 100) {
        clearInterval(interval);
        Swal.fire({
          icon: "success",
          title: "Reel Uploaded!",
          text: "Your reel has been successfully uploaded.",
          confirmButtonColor: "#3085d6",
        });
        setUploadProgress(0);
      } else {
        setUploadProgress(progress);
      }
    }, 200);
  };

  return (
    <Container fluid className="p-0 vh-100">
      {/* Sidebar */}

      {/* Main content */}
      <div
        style={{
          // marginLeft: isSidebarOpen ? "220px" : "60px",
          transition: "margin-left 0.3s",
          padding: "20px",
          height: "100vh",
          overflowY: "auto",
        }}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <Button
          variant="outline-primary"
          className="mb-3 d-md-none"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </Button>

        <h3>Create Reel</h3>
        <Form onSubmit={handleUpload}>
          {/* Video Upload */}
          <Form.Group className="mb-3">
            <Form.Label>Upload Videos (Drag & Drop or Click)</Form.Label>
            <Form.Control
              type="file"
              accept="video/*"
              multiple
              ref={fileInputRef}
              onChange={handleFileChange}
            />
            {videos.length > 0 && (
              <div className="mt-2">
                {videos.map((vid, idx) => (
                  <video
                    key={idx}
                    src={URL.createObjectURL(vid)}
                    controls
                    className="mb-2 w-100"
                    style={{ maxHeight: "200px" }}
                  />
                ))}
              </div>
            )}
          </Form.Group>

          {/* Thumbnails */}
          <Form.Group className="mb-3">
            <Form.Label>Select Thumbnails</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              multiple
              onChange={handleThumbnailChange}
            />
            <div className="d-flex flex-wrap mt-2">
              {thumbnails.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt="thumbnail"
                  className="me-2 mb-2"
                  style={{ width: "100px", height: "60px", objectFit: "cover" }}
                />
              ))}
            </div>
          </Form.Group>

          {/* Title */}
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          {/* Hashtags */}
          <Form.Group className="mb-3">
            <Form.Label>Hashtags</Form.Label>
            <InputGroup className="mb-2">
              <Form.Control
                type="text"
                placeholder="#tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addHashtag())
                }
              />
              <Button variant="secondary" onClick={addHashtag}>
                Add
              </Button>
            </InputGroup>
            {hashtags.map((tag) => (
              <Badge
                key={tag}
                bg="info"
                className="me-1 mb-1"
                style={{ cursor: "pointer" }}
                onClick={() => removeHashtag(tag)}
              >
                {tag} <FaTrash size={10} />
              </Badge>
            ))}
          </Form.Group>

          {/* Audience */}
          <Form.Group className="mb-3">
            <Form.Label>Audience</Form.Label>
            <Form.Select
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            >
              <option value="Public">Public</option>
              <option value="Friends">Friends</option>
              <option value="Only Me">Only Me</option>
            </Form.Select>
          </Form.Group>

          {/* Schedule */}
          <Form.Group className="mb-3">
            <Button
              variant="outline-primary"
              onClick={() => setScheduleModal(true)}
            >
              Schedule Post
            </Button>
          </Form.Group>

          {/* Upload Progress */}
          {uploadProgress > 0 && (
            <ProgressBar
              now={uploadProgress}
              label={`${uploadProgress}%`}
              className="mb-3"
            />
          )}

          {/* Submit */}
          <Button type="submit" variant="primary">
            Upload Reel
          </Button>
        </Form>

        {/* Schedule Modal */}
        <Modal
          show={scheduleModal}
          onHide={() => setScheduleModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Schedule Reel</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Select Date & Time</Form.Label>
              <Form.Control
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setScheduleModal(false)}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => setScheduleModal(false)}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default AdvancedCreateReel;

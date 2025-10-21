// TranscodePage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
  ListGroup,
  Badge,
  Modal,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUpload,
  FaCog,
  FaTasks,
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";

const TranscodePage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    mediaName: "",
    codec: "AVC",
    abrLadder: "Default",
    hdr: "SDR",
    audio: "AAC",
    subtitles: false,
    watermark: false,
    preset: "Standard",
    videoURL: "",
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Simulate job progress
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "Processing") {
            let progress = job.progress + Math.floor(Math.random() * 10 + 5);
            if (progress >= 100) {
              progress = 100;
              return { ...job, progress, status: "Completed" };
            }
            return { ...job, progress };
          }
          return job;
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleCreateJob = () => {
    if (!newJob.mediaName || !newJob.videoURL) {
      setAlert({ show: true, message: "Media name and video URL are required", variant: "danger" });
      return;
    }
    const jobId = Date.now();
    setJobs([
      ...jobs,
      {
        id: jobId,
        ...newJob,
        status: "Queued",
        progress: 0,
        createdAt: new Date().toLocaleString(),
      },
    ]);
    setShowModal(false);
    setNewJob({
      mediaName: "",
      codec: "AVC",
      abrLadder: "Default",
      hdr: "SDR",
      audio: "AAC",
      subtitles: false,
      watermark: false,
      preset: "Standard",
      videoURL: "",
    });
    setAlert({ show: true, message: "Job created successfully", variant: "success" });
  };

  const startJob = (id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Processing" } : job))
    );
  };

  const cancelJob = (id) => {
    setJobs((prev) =>
      prev.map((job) => (job.id === id ? { ...job, status: "Cancelled" } : job))
    );
  };

  const moveJob = (index, direction) => {
    const newJobs = [...jobs];
    if (direction === "up" && index > 0) {
      [newJobs[index - 1], newJobs[index]] = [newJobs[index], newJobs[index - 1]];
    }
    if (direction === "down" && index < newJobs.length - 1) {
      [newJobs[index], newJobs[index + 1]] = [newJobs[index + 1], newJobs[index]];
    }
    setJobs(newJobs);
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <h2>
            <FaCog /> Transcode Page
          </h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShowModal(true)}>
            <FaUpload /> New Transcode Job
          </Button>
        </Col>
      </Row>

      {alert.show && (
        <Alert
          variant={alert.variant}
          onClose={() => setAlert({ show: false })}
          dismissible
          className="mt-2"
        >
          {alert.message}
        </Alert>
      )}

      {/* Jobs List */}
      <Row className="mt-3">
        {jobs.length === 0 ? (
          <Col>
            <Alert variant="info">
              <FaInfoCircle /> No transcoding jobs yet. Click "New Transcode Job" to start.
            </Alert>
          </Col>
        ) : (
          <Col>
            <ListGroup>
              {jobs.map((job, index) => (
                <ListGroup.Item key={job.id}>
                  <Row className="align-items-center">
                    <Col md={3}>
                      <strong>{job.mediaName}</strong>
                      <div>
                        <Badge bg="secondary">{job.codec}</Badge>{" "}
                        <Badge bg="info">{job.hdr}</Badge>{" "}
                        <Badge bg="warning">{job.abrLadder}</Badge>
                      </div>
                      <video
                        src={job.videoURL}
                        controls
                        width="100%"
                        style={{ marginTop: "5px", borderRadius: "5px" }}
                      ></video>
                    </Col>
                    <Col md={3}>
                      <ProgressBar
                        now={job.progress}
                        label={`${job.progress}%`}
                        variant={
                          job.status === "Completed"
                            ? "success"
                            : job.status === "Cancelled"
                            ? "danger"
                            : "primary"
                        }
                      />
                    </Col>
                    <Col md={2}>{job.status}</Col>
                    <Col md={2}>{job.createdAt}</Col>
                    <Col md={2} className="text-end">
                      {job.status === "Queued" && (
                        <Button size="sm" variant="primary" onClick={() => startJob(job.id)}>
                          Start
                        </Button>
                      )}
                      {job.status === "Processing" && (
                        <Button size="sm" variant="danger" onClick={() => cancelJob(job.id)}>
                          Cancel
                        </Button>
                      )}
                      {job.status === "Completed" && (
                        <Button size="sm" variant="success">
                          Download
                        </Button>
                      )}
                      <div className="mt-1">
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => moveJob(index, "up")}
                          className="me-1"
                        >
                          <FaArrowUp />
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => moveJob(index, "down")}
                        >
                          <FaArrowDown />
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        )}
      </Row>

      {/* Create Job Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>New Transcode Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Media Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter media name"
                value={newJob.mediaName}
                onChange={(e) => setNewJob({ ...newJob, mediaName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Video URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter video URL"
                value={newJob.videoURL}
                onChange={(e) => setNewJob({ ...newJob, videoURL: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Codec</Form.Label>
              <Form.Select
                value={newJob.codec}
                onChange={(e) => setNewJob({ ...newJob, codec: e.target.value })}
              >
                <option>AVC</option>
                <option>HEVC</option>
                <option>AV1</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>ABR Ladder</Form.Label>
              <Form.Select
                value={newJob.abrLadder}
                onChange={(e) => setNewJob({ ...newJob, abrLadder: e.target.value })}
              >
                <option>Default</option>
                <option>Custom</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>HDR Format</Form.Label>
              <Form.Select
                value={newJob.hdr}
                onChange={(e) => setNewJob({ ...newJob, hdr: e.target.value })}
              >
                <option>SDR</option>
                <option>HDR10</option>
                <option>Dolby Vision</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Audio</Form.Label>
              <Form.Select
                value={newJob.audio}
                onChange={(e) => setNewJob({ ...newJob, audio: e.target.value })}
              >
                <option>AAC</option>
                <option>AC3</option>
                <option>Dolby Atmos</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Include Subtitles"
                checked={newJob.subtitles}
                onChange={(e) => setNewJob({ ...newJob, subtitles: e.target.checked })}
              />
              <Form.Check
                type="checkbox"
                label="Watermark"
                checked={newJob.watermark}
                onChange={(e) => setNewJob({ ...newJob, watermark: e.target.checked })}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Preset</Form.Label>
              <Form.Select
                value={newJob.preset}
                onChange={(e) => setNewJob({ ...newJob, preset: e.target.value })}
              >
                <option>Standard</option>
                <option>High Quality</option>
                <option>Fast Encode</option>
                <option>AI Optimized</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateJob}>
            Create Job
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TranscodePage;

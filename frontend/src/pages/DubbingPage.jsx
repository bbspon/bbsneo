// DubbingPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
  Badge,
  Modal,
  Alert,
  ProgressBar,
  InputGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlay,
  FaPause,
  FaUpload,
  FaDownload,
  FaCog,
  FaArrowUp,
  FaArrowDown,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const DubbingPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    mediaName: "",
    videoURL: "",
    languages: ["English"],
    aiDubbing: true,
    glossary: [],
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Simulate AI dubbing progress
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "Generating AI Dubbing") {
            let progress = job.progress + Math.floor(Math.random() * 20 + 10);
            if (progress >= 100) {
              progress = 100;
              return {
                ...job,
                status: "Review",
                progress,
                segments: generateDummySegments(job.languages),
              };
            }
            return { ...job, progress };
          }
          return job;
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const generateDummySegments = (languages) => {
    return languages.map((lang, idx) => [
      { id: 1, start: "00:00:01", end: "00:00:04", text: lang + " Line 1" },
      { id: 2, start: "00:00:05", end: "00:00:08", text: lang + " Line 2" },
    ]);
  };

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
        status: newJob.aiDubbing ? "Generating AI Dubbing" : "Review",
        progress: newJob.aiDubbing ? 0 : 100,
        segments: [],
        createdAt: new Date().toLocaleString(),
      },
    ]);
    setShowModal(false);
    setNewJob({ mediaName: "", videoURL: "", languages: ["English"], aiDubbing: true, glossary: [] });
    setAlert({ show: true, message: "Dubbing job created successfully", variant: "success" });
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

  const handleExport = (job) => {
    alert(`Exported dubbed tracks for ${job.mediaName}`);
  };

  const updateSegmentText = (jobId, langIdx, segmentId, newText) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const updatedSegments = job.segments.map((langSegs, idx) =>
            idx === langIdx
              ? langSegs.map((seg) => (seg.id === segmentId ? { ...seg, text: newText } : seg))
              : langSegs
          );
          return { ...job, segments: updatedSegments };
        }
        return job;
      })
    );
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <h2><FaCog /> Dubbing Page</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShowModal(true)}><FaUpload /> New Dubbing Job</Button>
        </Col>
      </Row>

      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible className="mt-2">
          {alert.message}
        </Alert>
      )}

      {/* Jobs List */}
      <Row className="mt-3">
        {jobs.length === 0 ? (
          <Col>
            <Alert variant="info"><FaInfoCircle /> No dubbing jobs yet. Click "New Dubbing Job" to start.</Alert>
          </Col>
        ) : (
          <Col>
            <ListGroup>
              {jobs.map((job, index) => (
                <ListGroup.Item key={job.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <strong>{job.mediaName}</strong>
                      <div>
                        <Badge bg="info">{job.status}</Badge>
                        {job.languages.map((lang) => (
                          <Badge key={lang} bg="secondary" className="ms-1">{lang}</Badge>
                        ))}
                      </div>
                      <video src={job.videoURL} controls width="100%" style={{ marginTop: "5px", borderRadius: "5px" }} />
                      {job.status === "Review" &&
                        job.segments.map((langSegs, langIdx) => (
                          <div key={langIdx} className="mt-2">
                            <h6>{job.languages[langIdx]} Track</h6>
                            {langSegs.map((seg) => (
                              <InputGroup className="mb-1" key={seg.id}>
                                <InputGroup.Text>{seg.start} → {seg.end}</InputGroup.Text>
                                <Form.Control
                                  value={seg.text}
                                  onChange={(e) =>
                                    updateSegmentText(job.id, langIdx, seg.id, e.target.value)
                                  }
                                />
                              </InputGroup>
                            ))}
                          </div>
                        ))}
                      {job.status === "Generating AI Dubbing" && (
                        <ProgressBar now={job.progress} label={`${job.progress}%`} className="mt-2" />
                      )}
                    </Col>

                    <Col md={2} className="text-center">
                      <div className="mb-2">
                        <Button size="sm" variant="secondary" onClick={() => moveJob(index, "up")} className="me-1"><FaArrowUp /></Button>
                        <Button size="sm" variant="secondary" onClick={() => moveJob(index, "down")}><FaArrowDown /></Button>
                      </div>
                      <Button size="sm" variant="success" onClick={() => handleExport(job)}><FaDownload /> Export</Button>
                    </Col>

                    <Col md={2}>{job.createdAt}</Col>
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
          <Modal.Title>New Dubbing Job</Modal.Title>
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
              <Form.Label>Languages</Form.Label>
              <Form.Select
                multiple
                value={newJob.languages}
                onChange={(e) =>
                  setNewJob({
                    ...newJob,
                    languages: Array.from(e.target.selectedOptions, (option) => option.value),
                  })
                }
              >
                <option>English</option>
                <option>Tamil</option>
                <option>Telugu</option>
                <option>Hindi</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Generate AI Dubbing"
                checked={newJob.aiDubbing}
                onChange={(e) => setNewJob({ ...newJob, aiDubbing: e.target.checked })}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Glossary (comma separated)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter glossary terms"
                value={newJob.glossary.join(", ")}
                onChange={(e) => setNewJob({ ...newJob, glossary: e.target.value.split(",").map((t) => t.trim()) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateJob}>Create Job</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default DubbingPage;

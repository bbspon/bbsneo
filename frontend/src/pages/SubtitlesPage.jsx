// SubtitlesPage.jsx
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

const SubtitlesPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({
    mediaName: "",
    videoURL: "",
    language: "English",
    aiDraft: true,
  });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });
  const [editingJob, setEditingJob] = useState(null);

  // Simulate AI draft generation
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "Generating AI Draft") {
            let progress = job.progress + Math.floor(Math.random() * 20 + 10);
            if (progress >= 100) {
              progress = 100;
              return { ...job, status: "Editing", progress, subtitles: generateDummySubtitles(job.language) };
            }
            return { ...job, progress };
          }
          return job;
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const generateDummySubtitles = (language) => {
    // placeholder dummy subtitles
    return [
      { id: 1, start: "00:00:01", end: "00:00:04", text: language === "English" ? "Hello World!" : "Hola Mundo!" },
      { id: 2, start: "00:00:05", end: "00:00:08", text: language === "English" ? "This is a subtitle demo." : "Esto es una demostración de subtítulos." },
    ];
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
        status: newJob.aiDraft ? "Generating AI Draft" : "Editing",
        progress: newJob.aiDraft ? 0 : 100,
        subtitles: [],
        createdAt: new Date().toLocaleString(),
      },
    ]);
    setShowModal(false);
    setNewJob({ mediaName: "", videoURL: "", language: "English", aiDraft: true });
    setAlert({ show: true, message: "Subtitle job created successfully", variant: "success" });
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
    alert(`Exported subtitles for ${job.mediaName} as VTT/IMSC`);
  };

  const updateSubtitleText = (jobId, subtitleId, newText) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id === jobId) {
          const updatedSubs = job.subtitles.map((sub) =>
            sub.id === subtitleId ? { ...sub, text: newText } : sub
          );
          return { ...job, subtitles: updatedSubs };
        }
        return job;
      })
    );
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col>
          <h2><FaCog /> Subtitles Page</h2>
        </Col>
        <Col className="text-end">
          <Button onClick={() => setShowModal(true)}><FaUpload /> New Subtitle Job</Button>
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
            <Alert variant="info"><FaInfoCircle /> No subtitle jobs yet. Click "New Subtitle Job" to start.</Alert>
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
                        <Badge bg="secondary">{job.language}</Badge>{" "}
                        <Badge bg="info">{job.status}</Badge>
                      </div>
                      <video src={job.videoURL} controls width="100%" style={{ marginTop: "5px", borderRadius: "5px" }} />
                      {job.status === "Editing" && (
                        <div className="mt-2">
                          {job.subtitles.map((sub) => (
                            <InputGroup className="mb-1" key={sub.id}>
                              <InputGroup.Text>{sub.start} → {sub.end}</InputGroup.Text>
                              <Form.Control
                                value={sub.text}
                                onChange={(e) => updateSubtitleText(job.id, sub.id, e.target.value)}
                              />
                            </InputGroup>
                          ))}
                        </div>
                      )}
                      {job.status === "Generating AI Draft" && (
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
          <Modal.Title>New Subtitle Job</Modal.Title>
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
              <Form.Label>Language</Form.Label>
              <Form.Select
                value={newJob.language}
                onChange={(e) => setNewJob({ ...newJob, language: e.target.value })}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
                <option>Hindi</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check
                type="checkbox"
                label="Generate AI Draft"
                checked={newJob.aiDraft}
                onChange={(e) => setNewJob({ ...newJob, aiDraft: e.target.checked })}
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

export default SubtitlesPage;

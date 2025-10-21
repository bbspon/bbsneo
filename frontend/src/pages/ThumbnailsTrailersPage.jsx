// ThumbnailsTrailersPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  ListGroup,
  Badge,
  Modal,
  ProgressBar,
  Form,
  InputGroup,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlay, FaPause, FaUpload, FaDownload, FaArrowUp, FaArrowDown, FaInfoCircle, FaCog } from "react-icons/fa";

const ThumbnailsTrailersPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newJob, setNewJob] = useState({ mediaName: "", videoURL: "", generateThumbnails: true, generateHighlights: true });
  const [alert, setAlert] = useState({ show: false, message: "", variant: "" });

  // Simulate AI thumbnail/highlight generation progress
  useEffect(() => {
    const interval = setInterval(() => {
      setJobs((prevJobs) =>
        prevJobs.map((job) => {
          if (job.status === "Generating") {
            let progress = job.progress + Math.floor(Math.random() * 15 + 10);
            if (progress >= 100) {
              progress = 100;
              return { ...job, status: "Ready", thumbnails: generateThumbnails(), highlights: generateHighlights() };
            }
            return { ...job, progress };
          }
          return job;
        })
      );
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const generateThumbnails = () => {
    return Array.from({ length: 6 }, (_, i) => `Thumbnail ${i + 1}`);
  };

  const generateHighlights = () => {
    return Array.from({ length: 3 }, (_, i) => ({
      id: i + 1,
      start: `00:00:0${i}`,
      end: `00:00:0${i + 3}`,
      text: `Highlight Clip ${i + 1}`,
    }));
  };

  const handleCreateJob = () => {
    if (!newJob.mediaName || !newJob.videoURL) {
      setAlert({ show: true, message: "Media name and video URL are required", variant: "danger" });
      return;
    }
    const jobId = Date.now();
    setJobs([
      ...jobs,
      { id: jobId, ...newJob, status: "Generating", progress: 0, thumbnails: [], highlights: [], createdAt: new Date().toLocaleString() },
    ]);
    setShowModal(false);
    setNewJob({ mediaName: "", videoURL: "", generateThumbnails: true, generateHighlights: true });
    setAlert({ show: true, message: "Thumbnail/Highlight job created successfully", variant: "success" });
  };

  const moveJob = (index, direction) => {
    const newJobs = [...jobs];
    if (direction === "up" && index > 0) [newJobs[index - 1], newJobs[index]] = [newJobs[index], newJobs[index - 1]];
    if (direction === "down" && index < newJobs.length - 1) [newJobs[index], newJobs[index + 1]] = [newJobs[index + 1], newJobs[index]];
    setJobs(newJobs);
  };

  const handleExport = (job) => {
    alert(`Exported thumbnails and highlights for ${job.mediaName}`);
  };

  return (
    <Container fluid className="mt-3">
      <Row>
        <Col><h2><FaCog /> Thumbnails & Trailers</h2></Col>
        <Col className="text-end"><Button onClick={() => setShowModal(true)}><FaUpload /> New Job</Button></Col>
      </Row>

      {alert.show && <Alert variant={alert.variant} onClose={() => setAlert({ show: false })} dismissible className="mt-2">{alert.message}</Alert>}

      <Row className="mt-3">
        {jobs.length === 0 ? (
          <Col><Alert variant="info"><FaInfoCircle /> No jobs yet. Click "New Job" to start.</Alert></Col>
        ) : (
          <Col>
            <ListGroup>
              {jobs.map((job, index) => (
                <ListGroup.Item key={job.id}>
                  <Row className="align-items-start">
                    <Col md={4}>
                      <strong>{job.mediaName}</strong> <Badge bg={job.status === "Ready" ? "success" : "info"}>{job.status}</Badge>
                      <video src={job.videoURL} controls width="100%" style={{ marginTop: "5px", borderRadius: "5px" }} />
                      {job.status === "Generating" && <ProgressBar now={job.progress} label={`${job.progress}%`} className="mt-2" />}
                      {job.status === "Ready" && (
                        <>
                          <h6 className="mt-2">Thumbnails</h6>
                          <Row>
                            {job.thumbnails.map((thumb, idx) => (
                              <Col key={idx} md={4} className="mb-2">
                                <Card>
                                  <Card.Body className="text-center p-1">{thumb}</Card.Body>
                                </Card>
                              </Col>
                            ))}
                          </Row>
                          <h6 className="mt-2">Highlight Clips</h6>
                          {job.highlights.map((clip) => (
                            <InputGroup className="mb-1" key={clip.id}>
                              <InputGroup.Text>{clip.start} → {clip.end}</InputGroup.Text>
                              <Form.Control value={clip.text} readOnly />
                            </InputGroup>
                          ))}
                        </>
                      )}
                    </Col>

                    <Col md={2} className="text-center">
                      <div className="mb-2">
                        <Button size="sm" variant="secondary" onClick={() => moveJob(index, "up")} className="me-1"><FaArrowUp /></Button>
                        <Button size="sm" variant="secondary" onClick={() => moveJob(index, "down")}><FaArrowDown /></Button>
                      </div>
                      <Button size="sm" variant="success" onClick={() => handleExport(job)} className="mt-1"><FaDownload /> Export</Button>
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
        <Modal.Header closeButton><Modal.Title>New Thumbnail/Highlight Job</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Media Name</Form.Label>
              <Form.Control type="text" placeholder="Enter media name" value={newJob.mediaName} onChange={(e) => setNewJob({ ...newJob, mediaName: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Video URL</Form.Label>
              <Form.Control type="text" placeholder="Enter video URL" value={newJob.videoURL} onChange={(e) => setNewJob({ ...newJob, videoURL: e.target.value })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Generate Thumbnails" checked={newJob.generateThumbnails} onChange={(e) => setNewJob({ ...newJob, generateThumbnails: e.target.checked })} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Generate Highlight Clips" checked={newJob.generateHighlights} onChange={(e) => setNewJob({ ...newJob, generateHighlights: e.target.checked })} />
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

export default ThumbnailsTrailersPage;

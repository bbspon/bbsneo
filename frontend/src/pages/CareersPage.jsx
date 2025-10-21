// CareersPage.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Modal,
  Form,
  InputGroup,
  FormControl,
  Accordion,
  Carousel,
} from "react-bootstrap";
import { FaSearch, FaLinkedin, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const mockLeaders = [
  { id: 1, name: "Asha Kapoor", title: "CEO", bio: "Visionary leader driving product & culture.", linkedin: "#", avatar: "https://i.pravatar.cc/200?img=32" },
  { id: 2, name: "Ravi Menon", title: "CTO", bio: "Leads engineering, data & infrastructure.", linkedin: "#", avatar: "https://i.pravatar.cc/200?img=12" },
  { id: 3, name: "Meera Iyer", title: "Head of People", bio: "Focuses on talent, growth & D&I.", linkedin: "#", avatar: "https://i.pravatar.cc/200?img=14" },
];

const mockJobs = [
  { id: "ENG-001", title: "Frontend Engineer", team: "Engineering", location: "Bengaluru, India", type: "Full-time", remote: true, posted: "2025-09-25", summary: "Build delightful UI experiences using React.", applyLink: "#", skills: ["React", "JavaScript", "CSS"] },
  { id: "ENG-002", title: "Backend Engineer (Node)", team: "Engineering", location: "Remote (India)", type: "Full-time", remote: true, posted: "2025-09-20", summary: "Design microservices and APIs.", applyLink: "#", skills: ["Node.js", "SQL", "Docker"] },
  { id: "PM-001", title: "Product Manager", team: "Product", location: "Mumbai, India", type: "Full-time", remote: false, posted: "2025-09-28", summary: "Drive product roadmap & launch features.", applyLink: "#", skills: ["Roadmaps", "Stakeholder mgmt"] },
  { id: "HR-INT-001", title: "HR Intern", team: "People", location: "Kolkata, India", type: "Internship", remote: false, posted: "2025-09-30", summary: "Support recruiting & employee programs.", applyLink: "#", skills: ["Communication", "MS Office"] },
];

export default function CareersPage() {
  const [query, setQuery] = useState("");
  const [teamFilter, setTeamFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const teams = ["All", ...Array.from(new Set(mockJobs.map((j) => j.team)))];
  const types = ["All", ...Array.from(new Set(mockJobs.map((j) => j.type)))];

  const filteredJobs = mockJobs.filter((job) => {
    if (teamFilter !== "All" && job.team !== teamFilter) return false;
    if (typeFilter !== "All" && job.type !== typeFilter) return false;
    if (remoteOnly && !job.remote) return false;
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return job.title.toLowerCase().includes(q) || job.summary.toLowerCase().includes(q) || job.skills.join(" ").toLowerCase().includes(q);
  });

  function openApply(job) {
    setSelectedJob(job);
    setShowApplyModal(true);
  }

  function submitApplication(e) {
    e.preventDefault();
    alert(`Applied for ${selectedJob?.title}`);
    setShowApplyModal(false);
  }

  return (
    <>
      {/* ---------- Hero / Top Video ---------- */}
      <section className="hero-section py-5 text-light text-center">
        <Container>
          <h1 className="display-6 fw-bold">Join us — build things that matter</h1>
          <p className="lead">Explore roles, meet our people, and build your future.</p>
          <div className="video-card rounded-3 overflow-hidden shadow mx-auto mt-4" style={{ maxWidth: 640 }}>
            <video controls className="w-100" poster="https://via.placeholder.com/640x360?text=Video+Poster">
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>
          </div>
        </Container>
      </section>

      {/* ---------- Meet our Leaders Carousel ---------- */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="mb-4 text-center">Meet our leadership</h2>
          <Carousel indicators={false}>
            {mockLeaders.map((leader) => (
              <Carousel.Item key={leader.id}>
                <Card className="mx-auto p-4 leader-card shadow" style={{ maxWidth: 500 }}>
                  <div className="d-flex flex-column align-items-center">
                    <img src={leader.avatar} className="rounded-circle mb-3" width={100} height={100} alt={leader.name} />
                    <h5>{leader.name}</h5>
                    <small className="text-muted">{leader.title}</small>
                    <p className="text-center mt-2">{leader.bio}</p>
                    <a href={leader.linkedin} target="_blank" rel="noreferrer"><FaLinkedin /> LinkedIn</a>
                  </div>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Container>
      </section>

      {/* ---------- Open Roles / Filters with Hotstar-like hover ---------- */}
      <section className="py-5">
        <Container>
          <h2 className="mb-4">Open roles</h2>
          <Row className="mb-3">
            <Col md={3}><Form.Select value={teamFilter} onChange={(e) => setTeamFilter(e.target.value)}>{teams.map((t) => <option key={t}>{t}</option>)}</Form.Select></Col>
            <Col md={3}><Form.Select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>{types.map((t) => <option key={t}>{t}</option>)}</Form.Select></Col>
            <Col md={4}><InputGroup><FormControl placeholder="Search jobs/skills" value={query} onChange={(e) => setQuery(e.target.value)} /><Button variant="outline-secondary"><FaSearch /></Button></InputGroup></Col>
            <Col md={2} className="d-flex align-items-center"><Form.Check type="checkbox" label="Remote only" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} /></Col>
          </Row>

          <Row className="g-3">
            {filteredJobs.map((job) => (
              <Col md={4} key={job.id}>
                <Card className="job-card h-100 p-3 shadow-sm" onClick={() => openApply(job)}>
                  <div className="d-flex flex-column gap-2">
                    <h5>{job.title}</h5>
                    <small className="text-muted">{job.team}</small>
                    <p className="small text-muted">{job.summary}</p>
                    <div className="d-flex gap-1 flex-wrap">{job.skills.map((s) => <Badge bg="light" text="dark" key={s}>{s}</Badge>)}</div>
                    <div className="small text-muted mt-1"><FaMapMarkerAlt /> {job.location} &nbsp; <FaCalendarAlt /> {job.posted}</div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* ---------- FAQs ---------- */}
      <section className="py-5 bg-light">
        <Container>
          <h3 className="mb-4 text-center">Hiring process & FAQs</h3>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>How long is the hiring process?</Accordion.Header>
              <Accordion.Body>Typically 2-4 weeks depending on the role and interview availability.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Can I apply to multiple roles?</Accordion.Header>
              <Accordion.Body>Yes — tailor your resume for each role.</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Do you offer relocation support?</Accordion.Header>
              <Accordion.Body>Provided for select roles; check listing or ask recruiter.</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Container>
      </section>

      {/* ---------- Apply Modal ---------- */}
      <Modal show={showApplyModal} onHide={() => setShowApplyModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>Apply — {selectedJob?.title}</Modal.Title></Modal.Header>
        <Form onSubmit={submitApplication}>
          <Modal.Body>
            <Form.Group className="mb-2"><Form.Label>Full name</Form.Label><Form.Control type="text" required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Email</Form.Label><Form.Control type="email" required /></Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowApplyModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <style>{`
        .hero-section { background: linear-gradient(90deg, rgba(24,29,59,0.95), rgba(18,126,214,0.9)); padding:4rem 0; }
        .job-card { cursor:pointer; transition: transform 0.3s, box-shadow 0.3s; }
        .job-card:hover { transform: translateY(-6px); box-shadow: 0 10px 25px rgba(0,0,0,0.15); }
        .leader-card img { object-fit: cover; }
        .badge { cursor: pointer; }
      `}</style>
    </>
  );
}

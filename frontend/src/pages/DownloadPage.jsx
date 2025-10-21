import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Form,
  Badge,
  Dropdown,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlay,
  FaPause,
  FaTrash,
  FaCloudDownloadAlt,
  FaRedo,
} from "react-icons/fa";

const initialDownloads = [
  {
    id: 1,
    title: "Planet Earth II",
    type: "Series • S1E3",
    size: 850,
    progress: 75,
    status: "downloading",
    expiry: "3 days",
    date: "2025-09-15",
    thumbnail:
      "https://image.tmdb.org/t/p/original/8bB9vPUtfrbXvXBDU4oEbKu4s6N.jpg",
  },
  {
    id: 2,
    title: "Inception",
    type: "Movie",
    size: 1200,
    progress: 100,
    status: "completed",
    expiry: "14 days",
    date: "2025-09-10",
    thumbnail:
      "https://tse1.explicit.bing.net/th/id/OIP.E7jom7uI4is-j39HSfk42wAAAA?rs=1&pid=ImgDetMain&o=7&rm=3",
  },
];

export default function DownloadPage() {
  const [downloads, setDownloads] = useState(initialDownloads);
  const [filter, setFilter] = useState("all");
  const [sortKey, setSortKey] = useState("date");
  const [search, setSearch] = useState("");
  const [toastMsg, setToastMsg] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);

  const triggerToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 2500);
  };

  const handlePauseResume = (id) => {
    setDownloads((prev) =>
      prev.map((d) =>
        d.id === id
          ? { ...d, status: d.status === "paused" ? "downloading" : "paused" }
          : d
      )
    );
    triggerToast("Status updated");
  };

  const handleDelete = (id) => {
    setDownloads((prev) => prev.filter((d) => d.id !== id));
    triggerToast("Download deleted");
  };

  const handleBulkDelete = () => {
    setDownloads([]);
    setShowConfirm(false);
    triggerToast("All downloads deleted");
  };

  const handleRetry = (id) => {
    setDownloads((prev) =>
      prev.map((d) =>
        d.id === id ? { ...d, status: "downloading", progress: 0 } : d
      )
    );
    triggerToast("Retry started");
  };

  const filtered = downloads
    .filter((d) => (filter === "all" ? true : d.status === filter))
    .filter((d) => d.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortKey === "name") return a.title.localeCompare(b.title);
      if (sortKey === "size") return b.size - a.size;
      return new Date(b.date) - new Date(a.date);
    });

  const totalSize = downloads.reduce((sum, d) => sum + d.size, 0);
  const used = downloads.reduce(
    (sum, d) =>
      sum + (d.status === "completed" ? d.size : (d.size * d.progress) / 100),
    0
  );
  const usedPercent = totalSize ? Math.round((used / totalSize) * 100) : 0;

  const lightMuted = { color: "rgba(255,255,255,0.7)" };

  return (
    <Container
      fluid
      className="p-4 min-vh-100"
      style={{
        background: "linear-gradient(135deg,#1f1c2c,#928dab)",
        color: "#f8f9fa",
      }}
    >
      <h2 className="mb-4 fw-bold text-center text-uppercase">My Downloads</h2>

      {/* Storage Meter */}
      <div className="mb-4 px-3">
        <strong>Storage Used: {usedPercent}%</strong>
        <ProgressBar
          now={usedPercent}
          style={{ height: "10px", borderRadius: "8px", background: "#333" }}
          variant="info"
          className="mt-2 shadow-sm"
        />
      </div>

      {/* Top Controls */}
      <Row className="mb-3 g-2 align-items-center">
        <Col md="4">
          <Form.Control
            placeholder="🔍  Search downloads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-dark text-light border-secondary rounded-pill"
            aria-label="Search downloads"
          />
        </Col>
        <Col md="auto">
          <Dropdown onSelect={(k) => setFilter(k)}>
            <Dropdown.Toggle
              variant="light"
              className="fw-semibold text-dark rounded-pill"
            >
              Filter: {filter}
            </Dropdown.Toggle>
            <Dropdown.Menu className="text-center bg-secondary" style={{ color: "#fff" }}>
              <Dropdown.Item eventKey="all">All</Dropdown.Item>
              <Dropdown.Item eventKey="downloading">Downloading</Dropdown.Item>
              <Dropdown.Item eventKey="completed">Completed</Dropdown.Item>
              <Dropdown.Item eventKey="paused">Paused</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="auto">
          <Dropdown onSelect={(k) => setSortKey(k)}>
            <Dropdown.Toggle
              variant="light"
              className="fw-semibold text-dark rounded-pill"
            >
              Sort: {sortKey}
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-secondary text-center" style={{ color: "#fff" }}>
              <Dropdown.Item eventKey="date">Newest</Dropdown.Item>
              <Dropdown.Item eventKey="name">Name</Dropdown.Item>
              <Dropdown.Item eventKey="size">Size</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col className="text-end">
          <Button
            className="rounded-pill border-0 px-4"
            onClick={() => setShowConfirm(true)}
            disabled={!downloads.length}
            style={{
              background:
                "linear-gradient(90deg, rgba(255,75,75,1) 0%, rgba(220,20,60,1) 100%)",
            }}
          >
            Delete All
          </Button>
        </Col>
      </Row>

      {/* Empty State */}
      {filtered.length === 0 && (
        <Card
          body
          className="text-center my-5 py-5 border-0"
          style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            color: "#f1f1f1",
            borderRadius: "1rem",
          }}
        >
          <FaCloudDownloadAlt size={60} className="mb-3 text-info" />
          <h5>No downloads match your criteria</h5>
        </Card>
      )}

      {/* Download List */}
      <Row xs={1} md={2} lg={3} className="g-4">
        {filtered.map((item) => (
          <Col key={item.id}>
            <Card
              className="shadow-lg h-100 border-0"
              style={{
                background: "rgba(0,0,0,0.4)",
                color: "#f1f1f1",
                borderRadius: "1rem",
              }}
            >
              <Card.Img
                variant="top"
                src={item.thumbnail}
                style={{
                  height: "380px",
                  objectFit: "cover",
                  borderRadius: "0.75rem 0.75rem 0 0",
                  cursor: "pointer",
                }}
                onClick={() => alert(`Preview: ${item.title}`)}
              />
              <Card.Body>
                <Card.Title className="d-flex justify-content-between">
                  {item.title}
                  {item.status === "completed" && (
                    <Badge bg="success" className="rounded-pill">
                      Ready
                    </Badge>
                  )}
                </Card.Title>
                <Card.Subtitle className="mb-2" style={lightMuted}>
                  {item.type}
                </Card.Subtitle>
                <small style={lightMuted}>
                  Size: {item.size} MB • Expiry: {item.expiry}
                </small>

                {item.progress < 100 && (
                  <ProgressBar
                    now={item.progress}
                    label={`${item.progress}%`}
                    variant="info"
                    className="my-3"
                    style={{ borderRadius: "8px" }}
                  />
                )}

                <div className="d-flex gap-2 mt-2 flex-wrap">
                  {item.status !== "completed" && (
                    <Button
                      size="sm"
                      style={{
                        background:
                          "linear-gradient(90deg,#56ccf2 0%,#2f80ed 100%)",
                        border: "none",
                      }}
                      onClick={() => handlePauseResume(item.id)}
                    >
                      {item.status === "paused" ? <FaPlay /> : <FaPause />}{" "}
                      {item.status === "paused" ? "Resume" : "Pause"}
                    </Button>
                  )}
                  {item.status === "failed" && (
                    <Button
                      size="sm"
                      style={{
                        background:
                          "linear-gradient(90deg,#f2994a 0%,#f2c94c 100%)",
                        border: "none",
                      }}
                      onClick={() => handleRetry(item.id)}
                    >
                      <FaRedo /> Retry
                    </Button>
                  )}
                  <Button
                    size="sm"
                    style={{
                      background:
                        "linear-gradient(90deg,#ff4b2b 0%,#ff416c 100%)",
                      border: "none",
                    }}
                    onClick={() => handleDelete(item.id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                  {item.status === "completed" && (
                    <Button
                      size="sm"
                      style={{
                        background:
                          "linear-gradient(90deg,#11998e 0%,#38ef7d 100%)",
                        border: "none",
                      }}
                    >
                      <FaPlay /> Play
                    </Button>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Bulk Delete Confirmation */}
      <Modal
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        centered
        contentClassName="bg-dark text-light rounded-4"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete All Downloads?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This will remove all downloaded content from this device.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button
            style={{
              background:
                "linear-gradient(90deg, rgba(255,75,75,1) 0%, rgba(220,20,60,1) 100%)",
              border: "none",
            }}
            onClick={handleBulkDelete}
          >
            Delete All
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toast Notifications */}
      <ToastContainer position="bottom-center" className="p-3">
        <Toast
          show={!!toastMsg}
          onClose={() => setToastMsg("")}
          delay={2500}
          autohide
          style={{
            background: "linear-gradient(135deg,#89f7fe 0%,#66a6ff 100%)",
            color: "#ffffff",
            borderRadius: "1rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            minWidth: "260px",
          }}
        >
          <Toast.Body className="fw-semibold text-center">{toastMsg}</Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

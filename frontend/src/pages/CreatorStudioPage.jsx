// CreatorStudioPage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  ListGroup,
  Modal,
  ProgressBar,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUpload,
  FaFileAlt,
  FaFilm,
  FaUsers,
  FaMagic,
  FaChartLine,
  FaWallet,
} from "react-icons/fa";

// Mock APIs
const mockAPIs = {
  postUpload: (file) => Promise.resolve({ success: true, file }),
  getEarnings: () =>
    Promise.resolve({ rpm: 12.5, watchHours: 350, revenue: 1200 }),
  postSplit: (split) => Promise.resolve({ success: true, split }),
};

const CreatorStudioPage = () => {
  const [uploadFile, setUploadFile] = useState(null);
  const [earnings, setEarnings] = useState({ rpm: 0, watchHours: 0, revenue: 0 });
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedSplit, setSelectedSplit] = useState([]);
  const [branchGraph, setBranchGraph] = useState([
    { node: "Start", next: ["Scene 1", "Scene 2"] },
    { node: "Scene 1", next: ["Ending A", "Ending B"] },
    { node: "Scene 2", next: ["Ending C"] },
  ]);
  const [metadata, setMetadata] = useState({
    title: "",
    description: "",
    tags: "",
    category: "",
  });

  useEffect(() => {
    // Fetch earnings
    mockAPIs.getEarnings().then((res) => setEarnings(res));
  }, []);

  const handleUpload = () => {
    if (uploadFile) {
      mockAPIs.postUpload(uploadFile).then((res) => {
        if (res.success) setShowUploadModal(true);
      });
    }
  };

  const handleSplit = () => {
    mockAPIs.postSplit(selectedSplit).then((res) => {
      if (res.success) alert("Revenue split updated successfully");
    });
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Creator Studio</h2>

      {/* Upload Tools & Rights Declaration */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaUpload /> Upload Tools
            </h5>
            <Form.Group>
              <Form.Control
                type="file"
                onChange={(e) => setUploadFile(e.target.files[0])}
              />
            </Form.Group>
            <Button className="mt-2" onClick={handleUpload} variant="primary">
              Upload
            </Button>
            {uploadFile && <p className="mt-2">Selected: {uploadFile.name}</p>}
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaFileAlt /> Rights Declaration
            </h5>
            <Form>
              <Form.Group>
                <Form.Label>Copyright Owner</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" />
              </Form.Group>
              <Form.Group>
                <Form.Label>License Type</Form.Label>
                <Form.Control as="select">
                  <option>Exclusive</option>
                  <option>Non-exclusive</option>
                </Form.Control>
              </Form.Group>
              <Button variant="success" className="mt-2">
                Save Rights
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Metadata Editor & AI Tools */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaFilm /> Metadata Editor
            </h5>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={metadata.title}
                  onChange={(e) =>
                    setMetadata({ ...metadata, title: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={metadata.description}
                  onChange={(e) =>
                    setMetadata({ ...metadata, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  value={metadata.tags}
                  onChange={(e) =>
                    setMetadata({ ...metadata, tags: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={metadata.category}
                  onChange={(e) =>
                    setMetadata({ ...metadata, category: e.target.value })
                  }
                />
              </Form.Group>
              <Button variant="info" className="mt-2">
                Save Metadata
              </Button>
            </Form>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaMagic /> AI Tools
            </h5>
            <ListGroup>
              <ListGroup.Item>Auto-thumbnails</ListGroup.Item>
              <ListGroup.Item>Auto-subtitles</ListGroup.Item>
              <ListGroup.Item>Auto-highlight trailers</ListGroup.Item>
            </ListGroup>
            <Button variant="warning" className="mt-2">
              Run AI Enhancements
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Interactive Editor & Branching Graph */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3">
            <h5>Interactive Editor</h5>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Node</th>
                  <th>Next Paths</th>
                </tr>
              </thead>
              <tbody>
                {branchGraph.map((node, idx) => (
                  <tr key={idx}>
                    <td>{node.node}</td>
                    <td>{node.next.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button variant="secondary">Preview Paths</Button>
          </Card>
        </Col>
      </Row>

      {/* Earnings Dashboard & Collaborative Revenue */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaChartLine /> Earnings Dashboard
            </h5>
            <p>RPM: ₹{earnings.rpm}</p>
            <p>Watch Hours: {earnings.watchHours}h</p>
            <p>Total Revenue: ₹{earnings.revenue}</p>
            <ProgressBar
              now={(earnings.watchHours / 500) * 100}
              label={`${earnings.watchHours}h`}
            />
            <Button variant="outline-primary" className="mt-2">
              View Detailed Analytics
            </Button>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="p-3">
            <h5>
              <FaUsers /> Collaborative Revenue
            </h5>
            <Form>
              <Form.Group>
                <Form.Label>User 1 %</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) =>
                    setSelectedSplit([{ user: "User 1", percent: e.target.value }])
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>User 2 %</Form.Label>
                <Form.Control
                  type="number"
                  onChange={(e) =>
                    setSelectedSplit([
                      ...selectedSplit,
                      { user: "User 2", percent: e.target.value },
                    ])
                  }
                />
              </Form.Group>
              <Button
                variant="success"
                className="mt-2"
                onClick={handleSplit}
              >
                Save Split
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>

      {/* Wallet / Monetization Links */}
      <Row className="mb-4">
        <Col>
          <Card className="p-3 text-center">
            <h5>
              <FaWallet /> Wallet & Monetization
            </h5>
            <Button variant="primary" className="m-2">
              View Wallet
            </Button>
            <Button variant="secondary" className="m-2">
              Monetization Dashboard
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Upload Success Modal */}
      <Modal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Upload Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your content <b>{uploadFile?.name}</b> has been uploaded successfully!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreatorStudioPage;

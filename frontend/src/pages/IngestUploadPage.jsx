// IngestUploadPage.jsx
import React, { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ProgressBar,
  Badge,
  Alert,
  Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineUpload } from "react-icons/ai";

// Simulate pre-signed URL upload
const simulatePreSignedUpload = (file, onProgress, startByte = 0) => {
  return new Promise((resolve, reject) => {
    let uploaded = startByte;
    const total = file.size;
    const interval = setInterval(() => {
      uploaded += total * 0.1;
      if (uploaded >= total) {
        onProgress(100);
        clearInterval(interval);
        resolve(true);
      } else {
        onProgress(Math.floor((uploaded / total) * 100));
      }
    }, 300);
  });
};

// Simulate antivirus scan
const simulateAntivirusScan = (file) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const passed = Math.random() > 0.1; // 90% chance file passes
      resolve(passed);
    }, 1500 + Math.random() * 2000);
  });
};

function IngestUploadPage() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [scanStatus, setScanStatus] = useState({});
  const [metadata, setMetadata] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [pausedUploads, setPausedUploads] = useState({});
  const fileInputRef = useRef();

  // Handle files selection
  const handleFiles = (selectedFiles) => {
    const filesArray = Array.from(selectedFiles);
    setFiles((prev) => [...prev, ...filesArray]);
    filesArray.forEach((file) => {
      setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
      setScanStatus((prev) => ({ ...prev, [file.name]: "Pending" }));
      setMetadata((prev) => ({
        ...prev,
        [file.name]: { name: file.name, description: "", tags: "" },
      }));
      setPausedUploads((prev) => ({ ...prev, [file.name]: false }));
    });
  };

  // Upload a single file
  const handleUpload = async (file, resumeFrom = 0) => {
    try {
      setScanStatus((prev) => ({ ...prev, [file.name]: "Uploading..." }));
      await simulatePreSignedUpload(file, (progress) =>
        setUploadProgress((prev) => ({ ...prev, [file.name]: progress }))
      , resumeFrom);

      setScanStatus((prev) => ({ ...prev, [file.name]: "Scanning..." }));
      const passed = await simulateAntivirusScan(file);
      setScanStatus((prev) => ({
        ...prev,
        [file.name]: passed ? "Passed" : "Quarantined",
      }));

      if (!passed) {
        setAlerts((prev) => [...prev, `${file.name} failed antivirus scan!`]);
      }
    } catch (err) {
      setScanStatus((prev) => ({ ...prev, [file.name]: "Error" }));
      setAlerts((prev) => [...prev, `${file.name} upload failed!`]);
    }
  };

  // Start upload for all files
  const handleStartUpload = () => {
    files.forEach((file) => handleUpload(file));
  };

  // Pause/resume support (simulated)
  const handlePauseResume = (file) => {
    setPausedUploads((prev) => {
      const newState = !prev[file.name];
      if (!newState) {
        // Resume upload from last progress
        const lastProgress = uploadProgress[file.name] || 0;
        handleUpload(file, (lastProgress / 100) * file.size);
      }
      return { ...prev, [file.name]: newState };
    });
  };

  // Retry failed upload
  const handleRetry = (file) => {
    handleUpload(file);
  };

  const handleMetadataChange = (fileName, field, value) => {
    setMetadata((prev) => ({
      ...prev,
      [fileName]: { ...prev[fileName], [field]: value },
    }));
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">Media Ingest & Upload</h2>

      {alerts.map((msg, idx) => (
        <Alert
          key={idx}
          variant="danger"
          onClose={() =>
            setAlerts((prev) => prev.filter((_, i) => i !== idx))
          }
          dismissible
        >
          {msg}
        </Alert>
      ))}

      <Card className="mb-4 p-3">
        <Form.Group controlId="fileUpload" className="mb-3">
          <Form.Label>
            <strong>Select Files to Upload</strong>
          </Form.Label>
          <div
            onDrop={(e) => {
              e.preventDefault();
              handleFiles(e.dataTransfer.files);
            }}
            onDragOver={(e) => e.preventDefault()}
            style={{
              border: "2px dashed #007bff",
              padding: "20px",
              textAlign: "center",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => fileInputRef.current.click()}
          >
            <AiOutlineUpload size={50} />
            <p>Drag & Drop files here or click to select</p>
            <Form.Control
              type="file"
              multiple
              hidden
              ref={fileInputRef}
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>
        </Form.Group>

        {files.length > 0 && (
          <Button onClick={handleStartUpload} variant="primary">
            Start Upload
          </Button>
        )}
      </Card>

      <Row xs={1} md={2} lg={3} className="g-3">
        {files.map((file) => (
          <Col key={file.name}>
            <Card className="h-100">
              <Card.Body>
                <Card.Title>{file.name}</Card.Title>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    value={metadata[file.name]?.description || ""}
                    onChange={(e) =>
                      handleMetadataChange(
                        file.name,
                        "description",
                        e.target.value
                      )
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Tags</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="comma-separated"
                    value={metadata[file.name]?.tags || ""}
                    onChange={(e) =>
                      handleMetadataChange(file.name, "tags", e.target.value)
                    }
                  />
                </Form.Group>

                <ProgressBar
                  now={uploadProgress[file.name] || 0}
                  label={`${uploadProgress[file.name] || 0}%`}
                  className="mb-2"
                />
                <Badge
                  bg={
                    scanStatus[file.name] === "Passed"
                      ? "success"
                      : scanStatus[file.name] === "Quarantined"
                      ? "danger"
                      : "secondary"
                  }
                  className="me-2"
                >
                  {scanStatus[file.name]}
                </Badge>

                <Button
                  variant={pausedUploads[file.name] ? "success" : "warning"}
                  size="sm"
                  onClick={() => handlePauseResume(file)}
                  className="mt-2"
                >
                  {pausedUploads[file.name] ? "Resume" : "Pause"}
                </Button>
              </Card.Body>

              <Card.Footer>
                {scanStatus[file.name] === "Quarantined" && (
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRetry(file)}
                  >
                    Retry Upload
                  </Button>
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Future enhancements:
          - Chunked/resumable upload to real pre-signed URLs
          - File validation (size, type) before upload
          - Parallel uploads with concurrency control
          - Cloud storage integration (AWS S3, GCS, Azure Blob)
          - Advanced antivirus integration with reports
          - Inline video/image preview
          - User roles & permissions for uploads
          - Search, filter, sort for uploaded files
      */}
    </Container>
  );
}

export default IngestUploadPage;

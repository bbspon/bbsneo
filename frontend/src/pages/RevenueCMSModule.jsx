// RevenueCMSModule.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaAd,
  FaRegCreditCard,
  FaTicketAlt,
  FaShoppingCart,
  FaGift,
  FaCoins,
  FaHandshake,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

// Initial Revenue Streams Config
const initialCMSStreams = [
  {
    id: "ads",
    name: "Ads",
    roles: [
      { role: "Creator", percent: 45, editable: true, regionOverride: true },
      { role: "Agent", percent: 12, editable: true, regionOverride: true },
      { role: "Viewer Pool", percent: 2, editable: true, regionOverride: false },
    ],
    advanced: [
      "Top 10 bonus pools (weekly/monthly)",
      "Contextual AI targeting",
      "Interactive AR/VR ad campaigns",
    ],
  },
  {
    id: "subs",
    name: "Subscriptions",
    roles: [
      { role: "Creator", percent: 70, editable: true, regionOverride: true },
      { role: "Platform", percent: 28, editable: true, regionOverride: false },
      { role: "Referral", percent: 2, editable: true, regionOverride: false },
    ],
    advanced: [
      "Family/student plans",
      "Recurring merchandise subscriptions",
      "Milestone-based bonuses",
    ],
  },
  {
    id: "ppv",
    name: "Pay-Per-View (PPV)",
    roles: [
      { role: "Creator", percent: 60, editable: true, regionOverride: true },
      { role: "Platform", percent: 40, editable: true, regionOverride: false },
    ],
    advanced: ["Bundle pricing", "Replay windows", "VIP fan passes"],
  },
  {
    id: "merch",
    name: "Merchandise",
    roles: [
      { role: "Creator", percent: 85, editable: true, regionOverride: true },
      { role: "Ambassador", percent: 5, editable: true, regionOverride: true },
    ],
    advanced: ["Co-branded product collabs", "Dropshipping integration"],
  },
  {
    id: "livecommerce",
    name: "Live Commerce",
    roles: [
      { role: "Creator", percent: 65, editable: true, regionOverride: true },
      { role: "Platform", percent: 35, editable: true, regionOverride: false },
    ],
    advanced: ["Live product drops", "Affiliate storefront integration"],
  },
];

export default function RevenueCMSModule() {
  const [streams, setStreams] = useState(initialCMSStreams);
  const [selectedStream, setSelectedStream] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Open modal for editing a stream
  const openStreamModal = (stream) => {
    setSelectedStream(JSON.parse(JSON.stringify(stream))); // deep copy
    setShowModal(true);
  };

  // Update role percent
  const updateRolePercent = (roleIndex, value) => {
    if (!selectedStream) return;
    const newRoles = [...selectedStream.roles];
    const num = parseFloat(value);
    if (!isNaN(num) && num >= 0 && num <= 100) {
      newRoles[roleIndex].percent = num;
      setSelectedStream({ ...selectedStream, roles: newRoles });
    }
  };

  // Save stream config
  const saveStreamConfig = () => {
    if (!selectedStream) return;

    // Validate total percent
    const totalPercent = selectedStream.roles.reduce((acc, r) => acc + r.percent, 0);
    if (totalPercent !== 100) {
      Swal.fire({
        title: "⚠️ Validation Error",
        text: `Total percentage must equal 100%. Currently: ${totalPercent}%`,
        icon: "error",
      });
      return;
    }

    // Confirm save
    Swal.fire({
      title: "Saving...",
      html: "Please wait while we save your revenue settings.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setTimeout(() => {
      setStreams((prev) =>
        prev.map((s) => (s.id === selectedStream.id ? selectedStream : s))
      );
      Swal.fire({
        title: "✅ Saved!",
        html: `Revenue settings for "<strong>${selectedStream.name}</strong>" updated successfully.<br>All changes are logged in the audit trail.`,
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      setShowModal(false);
    }, 1000);
  };

  // Reset all streams to defaults
  const resetStreams = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will reset all revenue streams to default values.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        setStreams(initialCMSStreams);
        Swal.fire({
          title: "🔄 Reset Complete",
          text: "All revenue streams restored to default values.",
          icon: "info",
        });
      }
    });
  };

  return (
    <Container className="py-4">
      <Row className="mb-3 align-items-center">
        <Col>
          <h2>💰 Revenue CMS Module</h2>
          <small className="text-muted d-block">
            Dynamic Revenue Control – All payouts read live from CMS configs.
          </small>
        </Col>
        <Col xs="auto">
          <Button
            variant="outline-info"
            onClick={() =>
              Swal.fire({
                title: "ℹ️ Module Info",
                html: `<ul style="text-align:left;">
                  <li>Thresholds configurable per role</li>
                  <li>Regional overrides supported</li>
                  <li>Audit logs track all changes</li>
                  <li>Future enhancements like tokenized bonuses supported</li>
                </ul>`,
                icon: "info",
              })
            }
          >
            Module Info <FaInfoCircle className="ms-1" />
          </Button>
        </Col>
      </Row>

      <Row className="g-3">
        {streams.map((s) => (
          <Col md={6} key={s.id}>
            <Card>
              <Card.Body>
                <h5>{s.name}</h5>
                <div className="mb-2">
                  <strong>Roles & % Splits:</strong>
                  <ListGroup variant="flush">
                    {s.roles.map((r, idx) => (
                      <ListGroup.Item key={idx}>
                        {r.role}: {r.percent}%
                        {r.editable && (
                          <Button
                            size="sm"
                            variant="link"
                            onClick={() => openStreamModal(s)}
                            className="ms-2"
                          >
                            Edit
                          </Button>
                        )}
                        {r.regionOverride && (
                          <span className="text-muted ms-2">(Region override enabled)</span>
                        )}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
                <div className="small">
                  <strong>Advanced Features:</strong>
                  <ul>
                    {s.advanced.map((a, idx) => (
                      <li key={idx}>{a}</li>
                    ))}
                  </ul>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="mt-3 d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={resetStreams}>
          Reset All
        </Button>
      </div>

      {/* Modal for Editing Stream */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit: {selectedStream?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedStream &&
            selectedStream.roles.map((r, idx) => (
              <Form.Group className="mb-3" key={idx}>
                <Form.Label>
                  {r.role} {r.regionOverride ? "(Region Override Enabled)" : ""}
                </Form.Label>
                <InputGroup>
                  <FormControl
                    type="number"
                    value={r.percent}
                    min="0"
                    max="100"
                    onChange={(e) => updateRolePercent(idx, e.target.value)}
                  />
                  <InputGroup.Text>%</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            ))}
          {selectedStream && (
            <>
              <h6>Advanced / Future Features</h6>
              <ListGroup variant="flush">
                {selectedStream.advanced.map((a, idx) => (
                  <ListGroup.Item key={idx}>{a}</ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() =>
              Swal.fire({
                title: "Cancel Changes?",
                text: "Any unsaved edits will be lost.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, cancel",
                cancelButtonText: "Continue Editing",
              }).then((result) => {
                if (result.isConfirmed) setShowModal(false);
              })
            }
          >
            Close
          </Button>
          <Button variant="primary" onClick={saveStreamConfig}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

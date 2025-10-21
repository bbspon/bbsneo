// HelpSettingsPage.jsx
import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { FaUserCircle, FaLock, FaQuestionCircle, FaDesktop, FaMobileAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const HelpSettingsPage = () => {
  const [plan, setPlan] = useState({
    name: "Super 3 Month Plan",
    expiresInDays: 26
  });

  const [mobileNumber, setMobileNumber] = useState("+91 8********6");
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [newMobile, setNewMobile] = useState("");

  const [devices, setDevices] = useState([
    { id: 1, type: "Web Browser", lastUsed: "Today", icon: <FaDesktop />, current: true },
    { id: 2, type: "Android Phone/Tablet", lastUsed: "Yesterday", icon: <FaMobileAlt />, current: false },
  ]);

  // Handlers
  const handleUpgrade = () => alert("Redirecting to Upgrade Page...");
  const handlePaymentDetails = () => alert("Opening Payment Details...");

  // FULL logout logic
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      // Remove any stored auth token (example: localStorage)
      localStorage.removeItem("authToken");
      localStorage.removeItem("userData");

      // Reset app state (optional)
      setDevices([]);
      setMobileNumber("");
      setPlan({ name: "", expiresInDays: 0 });

      // Redirect to login page (replace "/login" with your route)
      window.location.href = "/login";
    }
  };

  const handleDeviceLogout = (id) => {
    const device = devices.find(d => d.id === id);
    if (window.confirm(`Logout from ${device.type}?`)) {
      setDevices(devices.filter(d => d.id !== id));
    }
  };

  const handleMobileUpdate = () => {
    if (newMobile.trim() === "") return;
    setMobileNumber(newMobile);
    setNewMobile("");
    setShowMobileModal(false);
  };

  return (
    <Container fluid className="p-4 min-vh-100" style={{ background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)" }}>
      <Row className="g-4">
        {/* Left Sidebar */}
        <Col md={4} sm={12}>
          <h4 className="mb-4 text-light">Help & Settings</h4>

          {[ 
            { icon: <FaUserCircle size={20} className="me-2 text-info" />, title: "Subscription & Devices", subtitle: "Manage Subscription & Devices" },
            { icon: <FaLock size={20} className="me-2 text-warning" />, title: "Parental Controls", subtitle: "Parental Lock" },
            { icon: <FaQuestionCircle size={20} className="me-2 text-success" />, title: "Help & Support", subtitle: "Help Centre" }
          ].map((item, idx) => (
            <Card key={idx} className="mb-3" style={{ backgroundColor: "#1f2a38", color: "#f0f0f0", cursor: "pointer" }}>
              <Card.Body className="d-flex align-items-center justify-content-between">
                <div>
                  {item.icon}
                  <strong>{item.title}</strong>
                  <div style={{ fontSize: "0.85rem", color: "#b0b0b0" }}>{item.subtitle}</div>
                </div>
                <span style={{ color: "#b0b0b0" }}>&gt;</span>
              </Card.Body>
            </Card>
          ))}

          <Button variant="info" className="mt-3 w-100 fw-bold text-dark" onClick={handleLogout}>
            Log Out
          </Button>
        </Col>

        {/* Right Content */}
        <Col md={8} sm={12}>
          <Card className="p-4" style={{ backgroundColor: "#1f2a38", color: "#f0f0f0" }}>
            <h5 className="mb-2">{plan.name}</h5>
            <p className="text-muted mb-3">Plan expires in {plan.expiresInDays} days</p>

            <div className="mb-3 d-flex flex-wrap gap-2">
              <Button
                className="fw-bold"
                style={{ background: "linear-gradient(90deg, #00c6ff, #0072ff)", border: "none" }}
                onClick={handleUpgrade}
              >
                Upgrade
              </Button>
              <Button variant="secondary" className="fw-bold" onClick={handlePaymentDetails}>
                Payment Details
              </Button>
            </div>

            <div className="mb-3 d-flex flex-wrap align-items-center gap-2">
              <strong>Registered Mobile Number</strong>
              <span className="text-muted">{mobileNumber}</span>
              <Button variant="link" className="text-warning p-0 text-decoration-none" onClick={() => setShowMobileModal(true)}>Update</Button>
            </div>

            <div className="mb-3">
              <strong>This Device</strong>
              <div className="d-flex align-items-center justify-content-between mt-2 flex-wrap">
                <div className="d-flex align-items-center gap-2">
                  {devices[0]?.icon} {devices[0]?.type}
                  <div style={{ fontSize: "0.85rem", color: "#b0b0b0" }}>Last used: {devices[0]?.lastUsed}</div>
                </div>
                <Button variant="secondary" onClick={() => handleDeviceLogout(devices[0]?.id)}>Log Out</Button>
              </div>
            </div>

            {devices.length > 1 && (
              <div>
                <strong>Other Devices</strong>
                {devices.slice(1).map(device => (
                  <div key={device.id} className="d-flex align-items-center justify-content-between mt-2 flex-wrap">
                    <div className="d-flex align-items-center gap-2">
                      {device.icon} {device.type}
                      <div style={{ fontSize: "0.85rem", color: "#b0b0b0" }}>Last used: {device.lastUsed}</div>
                    </div>
                    <Button variant="secondary" onClick={() => handleDeviceLogout(device.id)}>Log Out</Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </Col>
      </Row>

      {/* Mobile Number Update Modal */}
      <Modal show={showMobileModal} onHide={() => setShowMobileModal(false)} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#1f2a38", color: "#f0f0f0" }}>
          <Modal.Title>Update Mobile Number</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#1f2a38" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: "#f0f0f0" }}>New Mobile Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new mobile number"
                value={newMobile}
                onChange={(e) => setNewMobile(e.target.value)}
                style={{ backgroundColor: "#2c3e50", color: "#fff", border: "1px solid #555" }}
              />
            </Form.Group>
            <Button variant="info" className="fw-bold w-100" onClick={handleMobileUpdate}>Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default HelpSettingsPage;

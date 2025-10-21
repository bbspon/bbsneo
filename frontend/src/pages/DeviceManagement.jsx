import React, { useState } from "react";
import { Table, Button, Badge, Modal, Form, Row, Col, Alert } from "react-bootstrap";
import Swal from "sweetalert2";

// Mock devices
const mockDevices = [
  {
    id: 1,
    name: "John's iPhone",
    type: "iOS",
    osVersion: "iOS 17.2",
    appVersion: "v3.5.1",
    lastActivity: "2025-09-16 11:40 AM",
    location: "Mumbai, India",
    ip: "192.168.0.101",
    trustScore: 95,
    status: "Active",
    rooted: false,
    group: "Personal",
  },
  {
    id: 2,
    name: "Samsung Galaxy S23",
    type: "Android",
    osVersion: "Android 14",
    appVersion: "v3.5.0",
    lastActivity: "2025-09-15 08:20 PM",
    location: "Delhi, India",
    ip: "192.168.0.102",
    trustScore: 60,
    status: "Active",
    rooted: true,
    group: "Personal",
  },
  {
    id: 3,
    name: "MacBook Pro",
    type: "Web",
    osVersion: "macOS 14.1",
    appVersion: "v3.4.9",
    lastActivity: "2025-09-14 05:10 PM",
    location: "Bangalore, India",
    ip: "192.168.0.103",
    trustScore: 85,
    status: "Active",
    rooted: false,
    group: "Work",
  },
];

const DeviceManagement = () => {
  const [devices, setDevices] = useState(mockDevices);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);

  const getTrustBadge = (score) => {
    if (score >= 80) return <Badge bg="success">Secure</Badge>;
    if (score >= 50) return <Badge bg="warning">At Risk</Badge>;
    return <Badge bg="danger">Compromised</Badge>;
  };

  const handleRevoke = (device) => {
    Swal.fire({
      title: `Revoke access for ${device.name}?`,
      text: "This will log out the device immediately!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Revoke",
    }).then((result) => {
      if (result.isConfirmed) {
        setDevices(devices.map(d => d.id === device.id ? { ...d, status: "Revoked" } : d));
        setAlerts([...alerts, { id: Date.now(), type: "danger", message: `${device.name} revoked.` }]);
      }
    });
  };

  const handleMarkTrusted = (device) => {
    Swal.fire({
      title: `Mark ${device.name} as trusted?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setDevices(devices.map(d => d.id === device.id ? { ...d, trustScore: 100 } : d));
        setAlerts([...alerts, { id: Date.now(), type: "success", message: `${device.name} marked as trusted.` }]);
      }
    });
  };

  const handleBulkRevoke = () => {
    if (selectedDevices.length === 0) return;
    Swal.fire({
      title: `Revoke access for selected devices?`,
      text: "This will log out all selected devices immediately!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Revoke",
    }).then((result) => {
      if (result.isConfirmed) {
        setDevices(devices.map(d => selectedDevices.includes(d.id) ? { ...d, status: "Revoked" } : d));
        setAlerts([...alerts, { id: Date.now(), type: "danger", message: `Selected devices revoked.` }]);
        setSelectedDevices([]);
      }
    });
  };

  const handleBulkMarkTrusted = () => {
    if (selectedDevices.length === 0) return;
    Swal.fire({
      title: `Mark selected devices as trusted?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        setDevices(devices.map(d => selectedDevices.includes(d.id) ? { ...d, trustScore: 100 } : d));
        setAlerts([...alerts, { id: Date.now(), type: "success", message: `Selected devices marked trusted.` }]);
        setSelectedDevices([]);
      }
    });
  };

  const handleSelectDevice = (id) => {
    setSelectedDevices(prev => prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]);
  };

  const handleViewDetails = (device) => {
    setSelectedDevice(device);
    setShowModal(true);
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20190221/ourmid/pngtree-film-festival-berlin-film-festival-grammy-golden-plum-image_23357.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflowY: "auto",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div
        className="container p-4"
        style={{
          backgroundColor: "rgba(255,255,255,0.95)",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
        }}
      >
        <h3>Device Management / Trusted Devices</h3>
        <p>Monitor your account devices, trust scores, and manage security actions.</p>

        {alerts.map(alert => (
          <Alert key={alert.id} variant={alert.type} onClose={() => setAlerts(alerts.filter(a => a.id !== alert.id))} dismissible>
            {alert.message}
          </Alert>
        ))}

        <Row className="mb-3">
          <Col>
            <Button variant="danger" className="me-2" onClick={handleBulkRevoke}>Bulk Revoke</Button>
            <Button variant="success" onClick={handleBulkMarkTrusted}>Bulk Mark Trusted</Button>
          </Col>
        </Row>

        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>
                <Form.Check
                  type="checkbox"
                  onChange={(e) => setSelectedDevices(e.target.checked ? devices.map(d => d.id) : [])}
                />
              </th>
              <th>Device Name</th>
              <th>Type</th>
              <th>OS Version</th>
              <th>App Version</th>
              <th>Last Activity</th>
              <th>Location / IP</th>
              <th>Trust Score</th>
              <th>Status</th>
              <th>Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => (
              <tr key={device.id}>
                <td>
                  <Form.Check type="checkbox" checked={selectedDevices.includes(device.id)} onChange={() => handleSelectDevice(device.id)} />
                </td>
                <td>{device.name}</td>
                <td>{device.type}</td>
                <td>{device.osVersion}</td>
                <td>{device.appVersion}</td>
                <td>{device.lastActivity}</td>
                <td>{device.location} / {device.ip}</td>
                <td>{getTrustBadge(device.trustScore)}</td>
                <td>
                  <Badge bg={device.status === "Active" ? "primary" : device.status === "Revoked" ? "danger" : "secondary"}>
                    {device.status}
                  </Badge>
                </td>
                <td>{device.group}</td>
                <td className="d-flex justify-content-center gap-1 align-items-stretch">
                  <Button variant="danger" size="sm" className="me-1" onClick={() => handleRevoke(device)} disabled={device.status === "Revoked"}>Revoke</Button>
                  <Button variant="success" size="sm" className="me-1" onClick={() => handleMarkTrusted(device)}>Mark Trusted</Button>
                  <Button variant="info" size="sm" onClick={() => handleViewDetails(device)}>Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Device Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedDevice && (
              <>
                <p><strong>Name:</strong> {selectedDevice.name}</p>
                <p><strong>Type:</strong> {selectedDevice.type}</p>
                <p><strong>OS Version:</strong> {selectedDevice.osVersion}</p>
                <p><strong>App Version:</strong> {selectedDevice.appVersion}</p>
                <p><strong>Last Activity:</strong> {selectedDevice.lastActivity}</p>
                <p><strong>Location:</strong> {selectedDevice.location}</p>
                <p><strong>IP Address:</strong> {selectedDevice.ip}</p>
                <p><strong>Trust Score:</strong> {selectedDevice.trustScore}</p>
                <p><strong>Rooted / Jailbroken:</strong> {selectedDevice.rooted ? "Yes" : "No"}</p>
                <p><strong>Status:</strong> {selectedDevice.status}</p>
                <p><strong>Device Group:</strong> {selectedDevice.group}</p>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default DeviceManagement;

// FullBusinessSettings.jsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Modal,
  Tabs,
  Tab,
  Accordion,
} from "react-bootstrap";
import {
  FaUserPlus,
  FaUserEdit,
  FaTrash,
  FaSave,
  FaCreditCard,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// Dummy Data
const dummyUsers = [
  { id: 1, name: "Alice Johnson", role: "Admin", email: "alice@biz.com" },
  { id: 2, name: "Bob Smith", role: "Employee", email: "bob@biz.com" },
];

const roles = ["Admin", "Employee", "Partner"];

const FullBusinessSettings = () => {
  const [business, setBusiness] = useState({
    name: "My Business",
    category: "Retail",
    email: "contact@mybiz.com",
    phone: "+91 9876543210",
    website: "https://mybusiness.com",
    description: "We sell quality products.",
    addresses: [{ line1: "", city: "", state: "", zip: "" }],
    hours: [
      { day: "Monday", open: "09:00", close: "18:00", closed: false },
      { day: "Tuesday", open: "09:00", close: "18:00", closed: false },
      { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
      { day: "Thursday", open: "09:00", close: "18:00", closed: false },
      { day: "Friday", open: "09:00", close: "18:00", closed: false },
      { day: "Saturday", open: "09:00", close: "18:00", closed: true },
      { day: "Sunday", open: "09:00", close: "18:00", closed: true },
    ],
    taxId: "",
    registrationNumber: "",
    socialLinks: { facebook: "", instagram: "", linkedin: "", whatsapp: "" },
    logo: null,
    banner: null,
  });

  const [users, setUsers] = useState(dummyUsers);
  const [showUserModal, setShowUserModal] = useState(false);
  const [modalType, setModalType] = useState("add");
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    role: "Employee",
  });

  const [permissions, setPermissions] = useState({
    posts: true,
    ads: true,
    analytics: true,
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
  });

  const [twoFA, setTwoFA] = useState(false);

  // ---------- User Management ----------
  const openUserModal = (
    type,
    user = { name: "", email: "", role: "Employee" }
  ) => {
    setModalType(type);
    setCurrentUser(user);
    setShowUserModal(true);
  };

  const handleAddUser = () => {
    setUsers([...users, { ...currentUser, id: Date.now() }]);
    setShowUserModal(false);
  };

  const handleEditUser = () => {
    setUsers(users.map((u) => (u.id === currentUser.id ? currentUser : u)));
    setShowUserModal(false);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to remove this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  // ---------- Business Info ----------
  const handleSaveBusinessInfo = () => {
    alert("Business info saved!");
  };

  // ---------- File Upload ----------
  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 1024 * 1024) return alert("File too large! Max 1MB.");
    setBusiness({ ...business, [field]: URL.createObjectURL(file) });
  };

  return (
    <Container fluid className="p-4">
      <h3 className="mb-4">Business Settings</h3>
      <Tabs defaultActiveKey="info" className="mb-3">
        {/* -------- Business Info -------- */}
        <Tab eventKey="info" title="Business Info">
          <Card className="p-3 mb-3">
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      value={business.name}
                      onChange={(e) =>
                        setBusiness({ ...business, name: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      value={business.category}
                      onChange={(e) =>
                        setBusiness({ ...business, category: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      value={business.email}
                      onChange={(e) =>
                        setBusiness({ ...business, email: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      value={business.phone}
                      onChange={(e) =>
                        setBusiness({ ...business, phone: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Website</Form.Label>
                    <Form.Control
                      value={business.website}
                      onChange={(e) =>
                        setBusiness({ ...business, website: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={business.description}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Addresses */}
              <Card className="p-3 mb-3">
                <h5>Addresses</h5>
                {business.addresses.map((addr, idx) => (
                  <Row key={idx} className="mb-2">
                    <Col md={3}>
                      <Form.Control
                        placeholder="Address Line"
                        value={addr.line1}
                        onChange={(e) => {
                          const newAddresses = [...business.addresses];
                          newAddresses[idx].line1 = e.target.value;
                          setBusiness({ ...business, addresses: newAddresses });
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        placeholder="City"
                        value={addr.city}
                        onChange={(e) => {
                          const newAddresses = [...business.addresses];
                          newAddresses[idx].city = e.target.value;
                          setBusiness({ ...business, addresses: newAddresses });
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        placeholder="State"
                        value={addr.state}
                        onChange={(e) => {
                          const newAddresses = [...business.addresses];
                          newAddresses[idx].state = e.target.value;
                          setBusiness({ ...business, addresses: newAddresses });
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        placeholder="ZIP"
                        value={addr.zip}
                        onChange={(e) => {
                          const newAddresses = [...business.addresses];
                          newAddresses[idx].zip = e.target.value;
                          setBusiness({ ...business, addresses: newAddresses });
                        }}
                      />
                    </Col>
                    <Col md={1}>
                      <Button
                        variant="danger"
                        onClick={() => {
                          const newAddresses = business.addresses.filter(
                            (_, i) => i !== idx
                          );
                          setBusiness({ ...business, addresses: newAddresses });
                        }}
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  onClick={() =>
                    setBusiness({
                      ...business,
                      addresses: [
                        ...business.addresses,
                        { line1: "", city: "", state: "", zip: "" },
                      ],
                    })
                  }
                >
                  Add Address
                </Button>
              </Card>

              {/* Business Hours */}
              <Card className="p-3 mb-3">
                <h5>Business Hours</h5>
                {business.hours.map((h, idx) => (
                  <Row key={idx} className="mb-2 align-items-center">
                    <Col md={2}>{h.day}</Col>
                    <Col md={3}>
                      <Form.Control
                        type="time"
                        value={h.open}
                        disabled={h.closed}
                        onChange={(e) => {
                          const newHours = [...business.hours];
                          newHours[idx].open = e.target.value;
                          setBusiness({ ...business, hours: newHours });
                        }}
                      />
                    </Col>
                    <Col md={3}>
                      <Form.Control
                        type="time"
                        value={h.close}
                        disabled={h.closed}
                        onChange={(e) => {
                          const newHours = [...business.hours];
                          newHours[idx].close = e.target.value;
                          setBusiness({ ...business, hours: newHours });
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Check
                        type="switch"
                        label="Closed"
                        checked={h.closed}
                        onChange={(e) => {
                          const newHours = [...business.hours];
                          newHours[idx].closed = e.target.checked;
                          setBusiness({ ...business, hours: newHours });
                        }}
                      />
                    </Col>
                  </Row>
                ))}
              </Card>

              {/* Tax & Legal */}
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Tax ID</Form.Label>
                    <Form.Control
                      value={business.taxId}
                      onChange={(e) =>
                        setBusiness({ ...business, taxId: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label>Registration Number</Form.Label>
                    <Form.Control
                      value={business.registrationNumber}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          registrationNumber: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Social Links */}
              <Card className="p-3 mb-3">
                <h5>Social Links</h5>
                {Object.keys(business.socialLinks).map((key) => (
                  <Form.Group className="mb-2" key={key}>
                    <Form.Label>
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Form.Label>
                    <Form.Control
                      type="url"
                      value={business.socialLinks[key]}
                      onChange={(e) =>
                        setBusiness({
                          ...business,
                          socialLinks: {
                            ...business.socialLinks,
                            [key]: e.target.value,
                          },
                        })
                      }
                    />
                  </Form.Group>
                ))}
              </Card>

              {/* File Uploads */}
              <Card className="p-3 mb-3">
                <h5>Uploads</h5>
                <Form.Group className="mb-2">
                  <Form.Label>Logo</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileUpload(e, "logo")}
                  />
                  {business.logo && (
                    <img
                      src={business.logo}
                      alt="logo"
                      style={{ height: "80px", marginTop: "10px" }}
                    />
                  )}
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Label>Banner</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => handleFileUpload(e, "banner")}
                  />
                  {business.banner && (
                    <img
                      src={business.banner}
                      alt="banner"
                      style={{ height: "80px", marginTop: "10px" }}
                    />
                  )}
                </Form.Group>
              </Card>

              <Button variant="primary" onClick={handleSaveBusinessInfo}>
                <FaSave /> Save Info
              </Button>
            </Form>
          </Card>
        </Tab>

        {/* -------- Users -------- */}
        <Tab eventKey="users" title="Users">
          <Row className="mb-3">
            <Col className="text-end">
              <Button onClick={() => openUserModal("add")} variant="primary">
                <FaUserPlus /> Add User
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.name}</td>
                          <td>{u.email}</td>
                          <td>{u.role}</td>
                          <td>
                            <Button
                              size="sm"
                              variant="warning"
                              className="me-2"
                              onClick={() => openUserModal("edit", u)}
                            >
                              <FaUserEdit /> Edit
                            </Button>
                            <Button
                              size="sm"
                              variant="danger"
                              onClick={() => handleDeleteUser(u.id)}
                            >
                              <FaTrash /> Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        {/* -------- Permissions -------- */}
        <Tab eventKey="permissions" title="Permissions">
          <Card className="p-3">
            <Form>
              <Form.Check
                type="switch"
                label="Allow all users to post"
                checked={permissions.posts}
                onChange={() =>
                  setPermissions({ ...permissions, posts: !permissions.posts })
                }
              />
              <Form.Check
                type="switch"
                label="Allow all users to manage ads"
                checked={permissions.ads}
                onChange={() =>
                  setPermissions({ ...permissions, ads: !permissions.ads })
                }
              />
              <Form.Check
                type="switch"
                label="Allow all users to view analytics"
                checked={permissions.analytics}
                onChange={() =>
                  setPermissions({
                    ...permissions,
                    analytics: !permissions.analytics,
                  })
                }
              />
            </Form>
          </Card>
        </Tab>

        {/* -------- Payments -------- */}
        <Tab eventKey="payment" title="Payment">
          <Card className="p-3">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                if (!business.paymentMethod) {
                  alert("Please enter a valid payment method!");
                  return;
                }
                alert(
                  `Payment method "${business.paymentMethod}" updated successfully!`
                );
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  placeholder="Card / PayPal info"
                  value={business.paymentMethod || ""}
                  onChange={(e) =>
                    setBusiness({ ...business, paymentMethod: e.target.value })
                  }
                />
              </Form.Group>
              <Button type="submit" variant="success">
                <FaCreditCard /> Update Payment
              </Button>
            </Form>
          </Card>
        </Tab>

        {/* -------- Notifications -------- */}
        <Tab eventKey="notifications" title="Notifications">
          <Card className="p-3">
            <Form>
              <Form.Check
                type="switch"
                label="Email Alerts"
                checked={notifications.email}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    email: !notifications.email,
                  })
                }
              />
              <Form.Check
                type="switch"
                label="Push Notifications"
                checked={notifications.push}
                onChange={() =>
                  setNotifications({
                    ...notifications,
                    push: !notifications.push,
                  })
                }
              />
            </Form>
          </Card>
        </Tab>

        {/* -------- Advanced -------- */}
        <Tab eventKey="advanced" title="Advanced">
          <Card className="p-3">
            <Form>
              <Form.Check
                type="switch"
                label="Enable Two-Factor Authentication (2FA)"
                checked={twoFA}
                onChange={() => setTwoFA(!twoFA)}
              />
              <Accordion className="mt-3">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Activity Log</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>01 Oct 2025: Alice updated business info</li>
                      <li>02 Oct 2025: Bob added new user</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Connected Assets</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>Instagram: Connected</li>
                      <li>WhatsApp Business: Connected</li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Form>
          </Card>
        </Tab>
      </Tabs>

      {/* -------- User Modal -------- */}
      <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "add" ? "Add User" : "Edit User"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={currentUser.name}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={currentUser.email}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={currentUser.role}
                onChange={(e) =>
                  setCurrentUser({ ...currentUser, role: e.target.value })
                }
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUserModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={modalType === "add" ? handleAddUser : handleEditUser}
          >
            {modalType === "add" ? "Add User" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default FullBusinessSettings;

// ExtendedAdManagerPage.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Table,
  Modal,
  Offcanvas,
  Nav,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import {
  FaBars,
  FaSearch,
  FaPlus,
  FaBullhorn,
  FaChartBar,
  FaUsers,
  FaCog,
  FaLayerGroup,
  FaMobileAlt,
  FaCheck,
  FaCamera,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import Webcam from "react-webcam";
// Mock function to simulate verification
const fakeVerifyPhone = (phone) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(phone === "9876543210"), 1500)
  );

const sampleCampaigns = [
  {
    id: 1,
    name: "Spring Sale Campaign",
    status: "Active",
    objective: "Conversions",
    impressions: 15000,
    clicks: 1200,
    cpc: 0.45,
    conversions: 300,
    roas: 3.5,
  },
  {
    id: 2,
    name: "Brand Awareness Summer",
    status: "Paused",
    objective: "Awareness",
    impressions: 50000,
    clicks: 2000,
    cpc: 0.6,
    conversions: 50,
    roas: 1.2,
  },
];

const sampleAdSets = [
  {
    id: 1,
    campaignId: 1,
    name: "Spring Sale Ad Set 1",
    audience: "Lookalike 1%",
    placement: "Facebook Feed",
    budget: 100,
    status: "Active",
  },
];

const sampleAds = [
  {
    id: 1,
    adSetId: 1,
    name: "Spring Sale Ad 1",
    creative: "Image + Text",
    cta: "Shop Now",
    status: "Active",
  },
];

export default function ExtendedAdManagerPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState("campaigns");
  const [campaigns, setCampaigns] = useState(sampleCampaigns);
  const [adSets, setAdSets] = useState(sampleAdSets);
  const [ads, setAds] = useState(sampleAds);
  const [searchTerm, setSearchTerm] = useState("");

  // Payment & Account States
  const [showAddModal, setShowAddModal] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPayment, setNewPayment] = useState({
    type: "",
    number: "",
    verified: false,
  });
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);
  const [kycStatus, setKycStatus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const webcamRef = useRef(null);
  // Sidebar toggle
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleModal = () => setCreateModal(!createModal);

  // Handle adding new payment method
  const handleAddPayment = () => {
    if (!newPayment.type || !newPayment.number) return;
    setPaymentMethods([...paymentMethods, { ...newPayment, verified: true }]);
    setNewPayment({ type: "", number: "", verified: false });
    setShowAddModal(false);
    Swal.fire("Added!", "Payment method has been added.", "success");
  };

  // Handle phone verification
  const handleSendOTP = async () => {
    setLoading(true);
    const verified = await fakeVerifyPhone(phone);
    setLoading(false);
    if (verified) {
      Swal.fire("Verified!", "Phone verified successfully.", "success");
      setOtpSent(true);
    } else {
      Swal.fire(
        "Failed",
        "Phone verification failed. Use 9876543210 to test.",
        "error"
      );
    }
  };

  const handleKycSubmit = () => {
    // Here you would send form data + capturedImage to backend
    setKycStatus(true);
    alert("KYC completed successfully!");
  };

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowCamera(false);
  };
  const handleVerifyOTP = () => {
    if (otp === "1234") {
      // for testing, assume 1234 is correct OTP
      setOtpVerified(true);
      Swal.fire({
        icon: "success",
        title: "Phone Verified!",
        text: `Phone number ${phone} verified successfully.`,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "OTP Incorrect",
        text: "Please try again.",
      });
    }
  };

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Campaign Created!",
      text: "Your new campaign has been added successfully.",
    });
    setCreateModal(false);
  };

  const filteredCampaigns = campaigns.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container fluid className="p-0">
      {/* Header */}
      <Row className="bg-light shadow-sm align-items-center p-2">
        <Col xs="auto">
          <Button
            onClick={toggleSidebar}
            variant="link"
            className="text-secondary"
          >
            <FaBars size={25} />
          </Button>
        </Col>
        <Col>
          <InputGroup>
            <Form.Control
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="primary">
              <FaSearch />
            </Button>
          </InputGroup>
        </Col>
  
      </Row>

      {/* Sidebar */}
      <Offcanvas show={sidebarOpen} onHide={toggleSidebar}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Ad Manager</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => setActiveTab("account")}>
              <FaBullhorn /> Account
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab("campaigns")}>
              <FaBullhorn /> Campaigns
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab("adsets")}>
              <FaLayerGroup /> Ad Sets
            </Nav.Link>
            <Nav.Link onClick={() => setActiveTab("ads")}>
              <FaChartBar /> Ads
            </Nav.Link>
            <Nav.Link>
              <FaUsers /> Audiences
            </Nav.Link>
            <Nav.Link>
              <FaCog /> Pixels & Events
            </Nav.Link>
            <Nav.Link>
              <FaChartBar /> Reports
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Metrics Cards */}
      <Container fluid className="mt-3">
        <Row className="mb-3 justify-content-center">
          <Col md={2}>
            <Card className="text-center bg-light">
              <Card.Body>
                <h6>Total Impressions</h6>
                <h5>{campaigns.reduce((a, c) => a + c.impressions, 0)}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="text-center bg-light">
              <Card.Body>
                <h6>Total Clicks</h6>
                <h5>{campaigns.reduce((a, c) => a + c.clicks, 0)}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="text-center bg-light">
              <Card.Body>
                <h6>Total Conversions</h6>
                <h5>{campaigns.reduce((a, c) => a + c.conversions, 0)}</h5>
              </Card.Body>
            </Card>
          </Col>
          <Col md={2}>
            <Card className="text-center bg-light">
              <Card.Body>
                <h6>Total ROAS</h6>
                <h5>
                  {(
                    campaigns.reduce((a, c) => a + c.roas, 0) / campaigns.length
                  ).toFixed(2)}
                </h5>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Tabs */}
      <Container fluid>
        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className="mb-3"
        >
          {/* Campaigns */}
          <Tab eventKey="campaigns" title="Campaigns">
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Status</th>
                      <th>Objective</th>
                      <th>Impressions</th>
                      <th>Clicks</th>
                      <th>CPC</th>
                      <th>Conversions</th>
                      <th>ROAS</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCampaigns.map((c) => (
                      <tr key={c.id}>
                        <td>{c.name}</td>
                        <td>
                          <Badge
                            bg={c.status === "Active" ? "success" : "secondary"}
                          >
                            {c.status}
                          </Badge>
                        </td>
                        <td>{c.objective}</td>
                        <td>{c.impressions}</td>
                        <td>{c.clicks}</td>
                        <td>${c.cpc}</td>
                        <td>{c.conversions}</td>
                        <td>{c.roas}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            className="me-1"
                            onClick={() =>
                              Swal.fire("Edit Campaign", c.name, "info")
                            }
                          >
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            onClick={() =>
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  setCampaigns(
                                    campaigns.filter((camp) => camp.id !== c.id)
                                  );
                                  Swal.fire(
                                    "Deleted!",
                                    "Campaign has been deleted.",
                                    "success"
                                  );
                                }
                              })
                            }
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Ad Sets */}
          <Tab eventKey="adsets" title="Ad Sets">
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Campaign</th>
                      <th>Audience</th>
                      <th>Placement</th>
                      <th>Budget</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adSets.map((a) => (
                      <tr key={a.id}>
                        <td>{a.name}</td>
                        <td>
                          {campaigns.find((c) => c.id === a.campaignId)?.name}
                        </td>
                        <td>{a.audience}</td>
                        <td>{a.placement}</td>
                        <td>${a.budget}</td>
                        <td>
                          <Badge
                            bg={a.status === "Active" ? "success" : "secondary"}
                          >
                            {a.status}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-primary">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Ads */}
          <Tab eventKey="ads" title="Ads">
            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Ad Set</th>
                      <th>Creative</th>
                      <th>CTA</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ads.map((ad) => (
                      <tr key={ad.id}>
                        <td>{ad.name}</td>
                        <td>
                          {adSets.find((as) => as.id === ad.adSetId)?.name}
                        </td>
                        <td>{ad.creative}</td>
                        <td>{ad.cta}</td>
                        <td>
                          <Badge
                            bg={
                              ad.status === "Active" ? "success" : "secondary"
                            }
                          >
                            {ad.status}
                          </Badge>
                        </td>
                        <td>
                          <Button size="sm" variant="outline-primary">
                            Edit
                          </Button>
                          <Button size="sm" variant="outline-danger">
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Tab>

          {/* Account Tab */}
          <Tab eventKey="account" title="Account">
            <Row className="d-flex flex-column ">
              {/* Payment Methods Card */}
              <Col md={12}>
                <Card className="border-info mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <h6 className="mb-0">Payment Methods</h6>
                    <Button size="sm" onClick={() => setShowAddModal(true)}>
                      <FaPlus className="me-1" /> Add
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    {paymentMethods.length === 0 && (
                      <div>No payment methods added yet.</div>
                    )}
                    <ul>
                      {paymentMethods.map((p, idx) => (
                        <li key={idx}>
                          {p.type} ending with {p.number.slice(-4)}{" "}
                          {p.verified && <Badge bg="success">Verified</Badge>}
                        </li>
                      ))}
                    </ul>
                  </Card.Body>
                </Card>
              </Col>

              {/* Phone Verification Card */}
              <Col md={12}>
                {/* Phone Verification */}
                <Card className="border-warning mb-3">
                  <Card.Header>
                    <h6>Phone Verification</h6>
                  </Card.Header>
                  <Card.Body>
                    {otpVerified ? (
                      <div>
                        <FaCheck className="text-success me-2" /> Phone Verified
                      </div>
                    ) : otpSent ? (
                      <InputGroup className="mb-2">
                        <FormControl
                          placeholder="Enter OTP"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                        <Button onClick={handleVerifyOTP}>Verify</Button>
                      </InputGroup>
                    ) : (
                      <InputGroup className="mb-2">
                        <InputGroup.Text>
                          <FaMobileAlt />
                        </InputGroup.Text>
                        <FormControl
                          placeholder="Enter phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        <Button onClick={handleSendOTP} disabled={loading}>
                          {loading ? "Sending..." : "Send OTP"}
                        </Button>
                      </InputGroup>
                    )}
                  </Card.Body>
                </Card>

                {/* KYC Verification */}
                <Card className="border-success mb-3">
                  <Card.Header>
                    <h6>KYC Verification</h6>
                  </Card.Header>
                  <Card.Body>
                    {kycStatus ? (
                      <div>
                        <FaCheck className="text-success me-2" />
                        KYC Completed
                      </div>
                    ) : (
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleKycSubmit();
                        }}
                      >
                        <Form.Group className="mb-2">
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your full name"
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Date of Birth</Form.Label>
                          <Form.Control type="date" required />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>ID Type</Form.Label>
                          <Form.Select required>
                            <option value="">Select ID type</option>
                            <option value="Passport">Passport</option>
                            <option value="Driver's License">
                              Driver's License
                            </option>
                            <option value="Aadhaar">Aadhaar</option>
                            <option value="PAN Card">PAN Card</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>ID Number</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter ID number"
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Address</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder="Enter your address"
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-2">
                          <Form.Label>Upload Documents</Form.Label>
                          <Form.Control type="file" multiple required />
                        </Form.Group>

                        {/* Webcam Capture */}
                        <Form.Group className="d-flex flex-column align-items-center my-3">
                          <Form.Label>Scan with Webcam</Form.Label>
                          {!showCamera && !capturedImage && (
                            <Button
                              variant="secondary"
                              onClick={() => setShowCamera(true)}
                            >
                              <FaCamera className="me-1" /> Open Camera
                            </Button>
                          )}
                          {showCamera && (
                            <div className="my-2 ">
                              <Webcam
                                audio={false}
                                ref={webcamRef}
                                screenshotFormat="image/jpeg"
                                width={200}
                                className="mx-auto border border-success rounded"
                              />
                              <div className="mt-2 d-flex justify-content-center gap-3">
                                <Button variant="success" onClick={capture}>
                                  Capture
                                </Button>{" "}
                                <Button
                                  variant="danger"
                                  onClick={() => setShowCamera(false)}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          )}
                          {capturedImage && (
                            <div className="mt-2">
                              <img
                                src={capturedImage}
                                alt="captured"
                                width={300}
                              />
                              <div>
                                <Button
                                  variant="warning"
                                  onClick={() => setCapturedImage(null)}
                                  className="mt-2"
                                >
                                  Retake
                                </Button>
                              </div>
                            </div>
                          )}
                        </Form.Group>

                        <div className="d-flex flex-row align-items-center justify-content-end ">
                         <Button variant="success" type="submit" >
                          Complete KYC
                        </Button>
                       </div>
                      </Form>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </Container>

      {/* Add Payment Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Payment Type</Form.Label>
              <Form.Select
                value={newPayment.type}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, type: e.target.value })
                }
              >
                <option value="">Select</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Debit Card">Debit Card</option>
                <option value="UPI">UPI</option>
                <option value="Wallet">Wallet</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Card/UPI Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter number"
                value={newPayment.number}
                onChange={(e) =>
                  setNewPayment({ ...newPayment, number: e.target.value })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleAddPayment}>
              Add Payment Method
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

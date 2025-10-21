// UserProfilePage.jsx
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
  Carousel,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle, FaEdit, FaPlus, FaPlay, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoSettingsOutline } from "react-icons/io5";

// Initial mock data
const initialProfiles = [
  {
    id: 1,
    name: "Medun",
    avatar: "https://i.pravatar.cc/100?img=1",
    isChild: false,
    pin: "",
  },
];

const initialWatchlist = [
  {
    id: 1,
    title: "Epic Adventure",
    img: "https://wallpapers.com/images/file/movie-pictures-18wr94ekcoztrpht.jpg",
    type: "Movie",
  },
  {
    id: 2,
    title: "Thrilling Series",
    img: "https://wallpaperaccess.com/full/3075771.jpg",
    type: "Series",
  },
];

const initialContinueWatching = [
  {
    id: 1,
    title: "Mystery Show",
    img: "https://wallpaperaccess.com/full/1561771.jpg",
    progress: 45,
  },
  {
    id: 2,
    title: "Comedy Nights",
    img: "https://wallpapercave.com/wp/wp2751453.jpg",
    progress: 75,
  },
];

const UserProfilePage = ({ show, onHide }) => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [continueWatching, setContinueWatching] = useState(
    initialContinueWatching
  );

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isAddMode, setIsAddMode] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  const [showPinModal, setShowPinModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pinInput, setPinInput] = useState("");

  const [topPosition, setTopPosition] = useState(-100);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [streamingQuality, setStreamingQuality] = useState("Auto");
  const [language, setLanguage] = useState("English");
  const [autoplay, setAutoplay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [subtitles, setSubtitles] = useState("Off");
  const [dataSaver, setDataSaver] = useState(false);
  const [parentalPin, setParentalPin] = useState("");
  const [downloadQuality, setDownloadQuality] = useState("Standard");
  const [devices, setDevices] = useState([
    { id: 1, name: "Device 1", lastActive: "02 Oct 2025" },
    { id: 2, name: "Device 2", lastActive: "28 Sep 2025" },
  ]);

  // Handlers
  const handleRemoveDevice = (id) => {
    setDevices(devices.filter((d) => d.id !== id));
  };

  const handleSaveSettings = () => {
    const settings = {
      streamingQuality,
      language,
      autoplay,
      notifications,
      subtitles,
      dataSaver,
      parentalPin,
      downloadQuality,
      devices,
    };
    console.log("Saved Settings:", settings);

    // SweetAlert success popup
    Swal.fire({
      icon: "success",
      title: "Settings Saved",
      text: "Your preferences have been updated successfully!",
      timer: 2000, // auto close after 2 seconds
      showConfirmButton: false,
      background: "#a72323ff",
      color: "#fff",
    });

    onHide(); // close modal
  };
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTopPosition((prev) => (prev >= 0 ? -100 : prev + 1)); // scroll from -100% to 0%
    }, 150); // adjust speed

    return () => clearInterval(interval);
  }, []);

  // ------------------ Profile Modal Handlers ------------------
  const handleEditProfile = (profile) => {
    setCurrentProfile(profile);
    setIsAddMode(false);
    setShowProfileModal(true);
  };

  const handleAddProfile = () => {
    setCurrentProfile({ name: "", avatar: "", isChild: false, pin: "" });
    setIsAddMode(true);
    setShowProfileModal(true);
  };

  const handleshowSettingsModal = () => {
    setShowSettingsModal(true);
  };
  const handleDeleteProfile = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this profile?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      background: "#1e1e1e",
      color: "white",
    }).then((result) => {
      if (result.isConfirmed) {
        setProfiles((prev) => prev.filter((p) => p.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The profile has been deleted.",
          icon: "success",
          background: "#1e1e1e",
          color: "white",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleSaveProfile = () => {
    if (isAddMode) {
      setProfiles((prev) => [...prev, { ...currentProfile, id: Date.now() }]);
    } else {
      setProfiles((prev) =>
        prev.map((p) => (p.id === currentProfile.id ? currentProfile : p))
      );
    }
    setShowProfileModal(false);
    setCurrentProfile(null);
  };

  // ------------------ Upgrade Plan ------------------
  const handleUpgradePlan = () => {
    setShowUpgradeModal(true);
  };

  const handleSaveUpgrade = () => {
    alert("Plan upgraded successfully!");
    setShowUpgradeModal(false);
  };

  // ------------------ Watchlist ------------------
  const handleRemoveWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  // ------------------ Profile Selection / Kids PIN ------------------
  const handleSelectProfile = (profile) => {
    if (profile.isChild) {
      setSelectedProfile(profile);
      setPinInput("");
      setShowPinModal(true);
    } else {
      // Redirect to home page
      window.location.href = "/home"; // replace with your router push if using react-router
    }
  };

  const handleVerifyPin = () => {
    if (pinInput === selectedProfile.pin) {
      setShowPinModal(false);
      setSelectedProfile(null);
      window.location.href = "/home"; // replace with router push
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  };

  return (
    <Container
      fluid
      style={{
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Profile Header */}
      <Card className="mb-4 shadow-sm p-3 ">
        <Row className=" d-flex  flex-row align-items-center w-100 justify-content-between gap-3">
          <Col md={2} className="text-center">
            <FaUserCircle size={80} />
          </Col>
          <Col md={7}>
            <h4 className="mb-1">Medun</h4>
            <p className="mb-1">Email: medun@example.com</p>
            <p className="mb-0">
              Subscription: Premium Plan - Next Renewal: 15 Oct 2025
            </p>
          </Col>
          <Col
            md={3}
            className="text-md-end text-center mt-2 mt-md-0 gap-2 d-flex w-100 flex-row  align-items-center justify-content-between"
          >
            <Button variant="danger" onClick={handleUpgradePlan} className="gap-1 w-100 bg-warning text-dark">
              Upgrade Plan
            </Button>
            <Button variant="primary" onClick={handleshowSettingsModal} className="gap-1 w-100 bg-warning text-dark">
              <IoSettingsOutline /> Settings & Help
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Profiles Section */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Profiles</Card.Title>
        <Row className="mt-3">
          {profiles.map((profile) => (
            <Col
              key={profile.id}
              xs={6}
              sm={4}
              md={2}
              className="text-center mb-4"
            >
              <img
                src={profile.avatar || "https://i.pravatar.cc/100?img=3"}
                alt={profile.name}
                className="rounded-circle mb-2"
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  cursor: "pointer",
                }}
                onClick={() => handleSelectProfile(profile)}
              />
              <p className="mb-2">{profile.name}</p>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  size="sm"
                  variant="outline-secondary"
                  onClick={() => handleEditProfile(profile)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </Col>
          ))}

          {/* Add Profile Card */}
          <Col xs={6} sm={4} md={2} className="text-center mb-4">
            <div
              className="card text-center p-3"
              style={{
                width: "100%",
                cursor: "pointer",
                transition: "transform 0.3s",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
              }}
              onClick={handleAddProfile}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle mb-2"
                style={{
                  width: "80px",
                  height: "80px",
                  margin: "0 auto",
                  backgroundColor: "#857979ff",
                  fontSize: "36px",
                  border: "2px solid white",
                }}
              >
                <FaPlus />
              </div>
              <h6 className="mt-4">Add Profile</h6>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Watchlist */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Watchlist</Card.Title>
        <Carousel indicators={false} className="mt-3">
          {watchlist.map((item) => (
            <Carousel.Item key={item.id}>
              <Row className="justify-content-center">
                <Col xs={10} sm={6} md={3}>
                  <Card className="shadow-sm text-center">
                    <Card.Img
                      variant="top"
                      src={item.img}
                      style={{ height: "300px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title style={{ fontSize: "1rem" }}>
                        {item.title}
                      </Card.Title>
                      <Button size="sm" variant="primary" className="me-2">
                        <FaPlay /> Play
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleRemoveWatchlist(item.id)}
                      >
                        <FaTrash />
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card>

      {/* Continue Watching */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Continue Watching</Card.Title>
        <Row className="mt-3">
          {continueWatching.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={3} className="mb-4">
              <Card className="shadow-sm">
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ height: "300px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title style={{ fontSize: "1rem" }}>
                    {item.title}
                  </Card.Title>
                  <div className="progress mb-2" style={{ height: "6px" }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${item.progress}%` }}
                      aria-valuenow={item.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <Button size="sm" variant="primary">
                    <FaPlay /> Resume
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Settings & Preferences */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Settings & Preferences</Card.Title>
        <Form className="mt-3">
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Streaming Quality</Form.Label>
                <Form.Select>
                  <option>Auto</option>
                  <option>HD</option>
                  <option>4K</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Language</Form.Label>
                <Form.Select>
                  <option>English</option>
                  <option>Hindi</option>
                  <option>Spanish</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Check
                type="switch"
                id="autoplay"
                label="Autoplay Next Episode"
              />
            </Col>
            <Col md={6}>
              <Form.Check
                type="switch"
                id="notifications"
                label="Receive Notifications"
              />
            </Col>
          </Row>
          <Button variant="success" className="mt-3">
            Save Preferences
          </Button>
        </Form>
      </Card>

      {/* Advanced Features */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Advanced Features</Card.Title>
        <ListGroup className="mt-2">
          <ListGroup.Item>AI Recommendations</ListGroup.Item>
          <ListGroup.Item>Download Management</ListGroup.Item>
          <ListGroup.Item>Device Management</ListGroup.Item>
          <ListGroup.Item>Parental Controls / PIN Settings</ListGroup.Item>
          <ListGroup.Item>Gift Subscriptions</ListGroup.Item>
          <ListGroup.Item>Cross-Platform Sync</ListGroup.Item>
          <ListGroup.Item>Watch Party / Social Share</ListGroup.Item>
          <ListGroup.Item>Multiple Profiles per Account</ListGroup.Item>
        </ListGroup>
      </Card>

      {/* Profile Modal (Add/Edit) */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isAddMode ? "Add New Profile" : "Edit Profile"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Name Input */}
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Profile Name"
                value={currentProfile?.name || ""}
                onChange={(e) =>
                  setCurrentProfile({ ...currentProfile, name: e.target.value })
                }
              />
            </Form.Group>

            {/* Avatar Selection */}
            <Form.Group className="mb-3">
              <Form.Label>Choose Avatar:</Form.Label>
              <div className="d-flex gap-2 mt-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <img
                    key={num}
                    src={`https://i.pravatar.cc/100?img=${num}`}
                    alt={`Avatar ${num}`}
                    onClick={() =>
                      setCurrentProfile({
                        ...currentProfile,
                        avatar: `https://i.pravatar.cc/100?img=${num}`,
                      })
                    }
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      cursor: "pointer",
                      border: currentProfile?.avatar?.includes(`img=${num}`)
                        ? "3px solid #0d6efd"
                        : "2px solid #ccc",
                    }}
                  />
                ))}
              </div>
            </Form.Group>

            {/* Language Preferences */}
            <Form.Group className="mb-3">
              <Form.Label>Language Preferences:</Form.Label>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {[
                  "Tamil",
                  "English",
                  "Hindi",
                  "Spanish",
                  "French",
                  "German",
                  "Chinese",
                ].map((lang) => (
                  <Button
                    key={lang}
                    size="sm"
                    variant={
                      currentProfile?.language === lang
                        ? "success"
                        : "outline-secondary"
                    }
                    onClick={() =>
                      setCurrentProfile({ ...currentProfile, language: lang })
                    }
                  >
                    {lang}
                  </Button>
                ))}
              </div>
            </Form.Group>

            {/* Kids Mode */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Kids Mode"
                checked={currentProfile?.isChild || false}
                onChange={(e) =>
                  setCurrentProfile({
                    ...currentProfile,
                    isChild: e.target.checked,
                  })
                }
              />
            </Form.Group>

            {/* PIN Code for Kids Mode */}
            {currentProfile?.isChild && (
              <Form.Group className="mb-3">
                <Form.Label>Set 4-digit PIN</Form.Label>
                <Form.Control
                  type="password"
                  maxLength={4}
                  placeholder="Enter PIN"
                  value={currentProfile?.pin || ""}
                  onChange={(e) =>
                    setCurrentProfile({
                      ...currentProfile,
                      pin: e.target.value,
                    })
                  }
                />
              </Form.Group>
            )}

            {/* Modal Actions */}
            <div className="d-flex justify-content-end gap-2 mt-3">
              <Button
                variant="secondary"
                onClick={() => setShowProfileModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveProfile}>
                {isAddMode ? "Add Profile" : "Save Changes"}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Upgrade Plan Modal */}
      <Modal
        show={showUpgradeModal}
        onHide={() => setShowUpgradeModal(false)}
        centered
        size="xl"
        className="upgrade-modal p-0 "
      >
        <div className="d-flex flex-column flex-lg-row">
          {/* ---------- Left Side ---------- */}
          <div className="company-side d-none d-lg-flex flex-column justify-content-center align-items-center text-white p-5 overflow-hidden">
            <div className="scrolling-bg ">
              <img
                src="https://wallpapercave.com/wp/wp1945909.jpg"
                alt="Scrolling Background"
                className="scrolling-img"
              />
              <img
                src="https://wallpapercave.com/wp/wp1945909.jpg"
                alt="Scrolling Background"
                className="scrolling-img"
              />
            </div>
            {/* Overlay content */}
            <div
              className="position-absolute top-50 start-50 translate-middle text-center text-white shadow p-4 rounded w-75"
              style={{
                background: "rgba(24, 24, 24, 0.5)", // semi-transparent black background
                backdropFilter: "blur(4px)", // optional blur effect
              }}
            >
              <h2 className="fw-bold mb-3 fs-1">BBS NEO</h2>
              <p className="mb-4 fw-bold fs-5">
                Enjoy unlimited access to all our premium content. Stream
                anytime, anywhere, ad-free.
              </p>
            </div>
          </div>

          {/* ---------- Right Side: Plans ---------- */}
          <div className="flex-1 p-4 bg-white">
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="text-dark fw-bold">
                Choose Your Plan
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Plan cards */}
              <div className="d-flex flex-column flex-md-row justify-content-around gap-3">
                {/* Super */}
                <div className="plan-card border rounded-lg p-4 w-100 text-center hover-shadow bg-light d-flex flex-column justify-content-between align-items-center">
                  <h5 className="fw-bold mb-2">Super</h5>
                  <p className="text-muted mb-3">$5 / month</p>
                  <ul className=" text-start mb-3 d-flex flex-column gap-2 align-items-start">
                    <li>Limited content access</li>
                    <li>Ads included</li>
                    <li>SD streaming</li>
                  </ul>
                  <div className="fw-bold mb-2 text-primary">
                    Best for casual viewers
                  </div>
                  <Button
                    variant="outline-primary"
                    className="w-100"
                    onClick={() => handleSaveUpgrade("Super")}
                  >
                    Select
                  </Button>
                </div>

                {/* Super+ Ads Free */}
                <div className="plan-card border rounded-lg p-4 text-center flex-1 hover-shadow bg-info-subtle w-100 d-flex flex-column justify-content-between align-items-center">
                  <h5 className="fw-bold mb-2">Super+ Ads Free</h5>
                  <p className="text-muted mb-3">$10 / month</p>
                  <ul className="text-start mb-3">
                    <li>Most content access</li>
                    <li>Ads-free experience</li>
                    <li>HD streaming</li>
                    <li>Limited offline downloads</li>
                  </ul>
                  <div className="fw-bold mb-2 text-primary">
                    Enjoy uninterrupted content
                  </div>
                  <Button
                    variant="info"
                    className="w-100 fw-bold"
                    onClick={() => handleSaveUpgrade("Super+")}
                  >
                    Select
                  </Button>
                </div>

                {/* Premium */}
                <div className="plan-card border border-warning rounded-lg p-4 text-center  bg-warning-subtle hover-shadow d-flex flex-column justify-content-between align-items-center w-100">
                  <h5 className="fw-bold mb-2">Premium</h5>
                  <p className="text-dark fw-bold mb-3">$15 / month</p>
                  <ul className="list-unstyled text-start mb-3">
                    <li>All content unlocked</li>
                    <li>Ad-free experience</li>
                    <li>HD & 4K Streaming</li>
                    <li>Offline downloads</li>
                    <li>Early access to new shows</li>
                  </ul>
                  <div className="fw-bold mb-2 text-dark">
                    Best for binge-watchers
                  </div>
                  <Button
                    variant="dark"
                    className="w-100 fw-bold "
                    onClick={() => handleSaveUpgrade("Premium")}
                  >
                    Upgrade Now
                  </Button>
                </div>
              </div>

              <p className="text-center text-muted mt-4 small">
                Cancel anytime. All plans auto-renew monthly. Taxes may apply.
              </p>
            </Modal.Body>
          </div>
        </div>
      </Modal>

      {/* settigs and help modal */}
      <Modal
        show={showSettingsModal}
        onHide={() => setShowSettingsModal(false)}
        centered
        size="xl"
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-white">
            Settings & Preferences
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light p-4">
          <Form>
            {/* Streaming Quality */}
            <Form.Group className="mb-3">
              <Form.Label>Streaming Quality</Form.Label>
              <Form.Select
                value={streamingQuality}
                onChange={(e) => setStreamingQuality(e.target.value)}
                className="bg-secondary text-white border-0"
              >
                <option>Auto</option>
                <option>HD</option>
                <option>4K</option>
                <option>SD</option>
              </Form.Select>
            </Form.Group>

            {/* Language */}
            <Form.Group className="mb-3">
              <Form.Label>Language</Form.Label>
              <Form.Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-secondary text-white border-0"
              >
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </Form.Select>
            </Form.Group>

            {/* Autoplay & Notifications */}
            <Form.Check
              type="switch"
              label="Autoplay Next Episode"
              checked={autoplay}
              onChange={() => setAutoplay(!autoplay)}
              className="mb-2"
            />
            <Form.Check
              type="switch"
              label="Receive Notifications"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="mb-3"
            />

            {/* Subtitles */}
            <Form.Group className="mb-3">
              <Form.Label>Subtitles / Captions</Form.Label>
              <Form.Select
                value={subtitles}
                onChange={(e) => setSubtitles(e.target.value)}
                className="bg-secondary text-white border-0"
              >
                <option>Off</option>
                <option>English</option>
                <option>Hindi</option>
                <option>Spanish</option>
              </Form.Select>
            </Form.Group>

            {/* Data Saver */}
            <Form.Check
              type="switch"
              label="Enable Data Saver Mode (low bandwidth streaming)"
              checked={dataSaver}
              onChange={() => setDataSaver(!dataSaver)}
              className="mb-3"
            />

            {/* Parental Control */}
            <Form.Group className="mb-3">
              <Form.Label>Parental Control PIN</Form.Label>
              <Form.Control
                type="password"
                placeholder="Set 4-digit PIN"
                maxLength={4}
                value={parentalPin}
                onChange={(e) => setParentalPin(e.target.value)}
                className="bg-secondary text-white border-0"
              />
              <Form.Text className="text-muted">
                Required to access mature content or modify kids profiles.
              </Form.Text>
            </Form.Group>

            {/* Download Quality */}
            <Form.Group className="mb-3">
              <Form.Label>Download Quality</Form.Label>
              <Form.Select
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(e.target.value)}
                className="bg-secondary text-white border-0"
              >
                <option>Standard</option>
                <option>High</option>
                <option>HD</option>
              </Form.Select>
            </Form.Group>

            {/* Device Management */}
            <Form.Group className="mb-3">
              <Form.Label>Manage Devices</Form.Label>
              <ListGroup className="bg-secondary text-white border-0 rounded">
                {devices.map((device) => (
                  <ListGroup.Item
                    key={device.id}
                    className="d-flex justify-content-between align-items-center bg-secondary text-white border-0"
                  >
                    <span>
                      {device.name} - Last active: {device.lastActive}
                    </span>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleRemoveDevice(device.id)}
                    >
                      Remove
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Form.Group>

            {/* Save / Cancel */}
            <div className="d-flex justify-content-end mt-4">
              <Button
                variant="outline-light"
                onClick={() => setShowSettingsModal(false)}
                className="me-2"
              >
                Cancel
              </Button>
              <Button variant="success" onClick={handleSaveSettings}>
                Save Settings
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Kids PIN Modal */}
      <Modal show={showPinModal} onHide={() => setShowPinModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter PIN for {selectedProfile?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Enter 4-digit PIN"
                maxLength={4}
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-end mt-3 gap-2">
              <Button
                variant="secondary"
                onClick={() => setShowPinModal(false)}
              >
                Cancel
              </Button>
              <Button variant="primary" onClick={handleVerifyPin}>
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <style>
        {`
        .company-side {
  width: 50%;
  height: 7;
  position: relative;
}

.scrolling-bg {
  position: absolute;
  width: 100%;
  height: 200%;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
}
 .custom-modal .modal-content {
    background-color: #1c1c1c;
    border-radius: 12px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.7);
  }
  .custom-modal .form-select,
  .custom-modal .form-control {
    transition: all 0.2s;
  }
  .custom-modal .form-select:focus,
  .custom-modal .form-control:focus {
    box-shadow: none;
    border-color: #0d6efd;
  }
.scrolling-img {
  width: 100%;
  height: 50%;
  object-fit: cover;
  animation: scroll 10s linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateY(0%);
  }
  100% {
    transform: translateY(-50%);
  }
}

        `}
      </style>
    </Container>
  );
};

export default UserProfilePage;

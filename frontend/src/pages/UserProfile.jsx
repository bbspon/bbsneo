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

/* ======================= [API-PROFILE] helpers START ======================= */
const API_BASE = (
  import.meta?.env?.VITE_API_BASE || "http://127.0.0.1:3103"
).replace(/\/+$/, "");
const authHeader = () => {
  const t = localStorage.getItem("bbsneo_token");
  return t ? { Authorization: `Bearer ${t}` } : {};
};

const getMe = async () => {
  const res = await fetch(`${API_BASE}/profile`, {
    headers: { "Content-Type": "application/json", ...authHeader() },
  });
  if (!res.ok) {
    let txt = "";
    try {
      txt = await res.text();
    } catch {}
    throw new Error(txt || `GET /profile failed (${res.status})`);
  }
  return res.json();
};

const updateMe = async (payload) => {
  const res = await fetch(`${API_BASE}/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let txt = "";
    try {
      txt = await res.text();
    } catch {}
    throw new Error(txt || `PUT /profile failed (${res.status})`);
  }
  return res.json();
};
/* ======================= [API-PROFILE] helpers END ========================= */

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
  // Core data
  const [profiles, setProfiles] = useState(initialProfiles);
  const [watchlist, setWatchlist] = useState(initialWatchlist);
  const [continueWatching, setContinueWatching] = useState(
    initialContinueWatching
  );

  // Active profile (new) — drives header avatar
  const [activeProfileId, setActiveProfileId] = useState(null);

  // Modals and form state
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [isAddMode, setIsAddMode] = useState(true);

  const [showPinModal, setShowPinModal] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [pinInput, setPinInput] = useState("");

  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Settings & preferences
  const [streamingQuality, setStreamingQuality] = useState("auto");
  const [autoplayNext, setAutoplayNext] = useState(true);
  const [downloadQuality, setDownloadQuality] = useState("standard");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [contentRestrictions, setContentRestrictions] = useState({
    violence: false,
    adult: false,
  });

  // Header user info bound to API
  const [userHeader, setUserHeader] = useState({
    fullName: "paavu",
    email: "user@example.com",
    subscriptionPlan: "Free",
    nextRenewalDate: "-",
  });

  /* =============== [API-PROFILE] Load -> GET /profile START =============== */
  useEffect(() => {
    const load = async () => {
      try {
        const me = await getMe();
        // Bind header
        setUserHeader({
          fullName: me.fullName || me.name || userHeader.fullName,
          email: me.email || userHeader.email,
          subscriptionPlan: me.subscriptionPlan || userHeader.subscriptionPlan,
          nextRenewalDate: me.nextRenewalDate
            ? new Date(me.nextRenewalDate).toDateString()
            : userHeader.nextRenewalDate,
        });

        // Profiles (use synthetic numeric id for UI)
        const withIds =
          Array.isArray(me.profiles) && me.profiles.length
            ? me.profiles.map((p, i) => ({
                id: i + 1,
                name: p.name || `Profile ${i + 1}`,
                avatar: p.avatar || "",
                isChild: !!p.isChild,
                pin: p.pin || "",
                language: p.language || "",
              }))
            : initialProfiles;

        setProfiles(withIds);

        // Restore active profile (or default to first) and persist
        const savedPid = localStorage.getItem("bbsneo_active_profile");
        if (savedPid && withIds.some((p) => p.id === Number(savedPid))) {
          setActiveProfileId(Number(savedPid));
        } else if (withIds.length) {
          setActiveProfileId(withIds[0].id);
          localStorage.setItem("bbsneo_active_profile", String(withIds[0].id));
        }
      } catch (e) {
        console.error("GET /profile failed:", e);
        // keep UI usable with mock data
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  /* =============== [API-PROFILE] Load -> GET /profile END ================= */

  // Header avatar from active profile
  const activeProfile = profiles.find((p) => p.id === activeProfileId);
  const headerAvatar = activeProfile?.avatar || null;

  // Upgrade plan
  const handleUpgradePlan = () => setShowUpgradeModal(true);
  const handleSaveUpgrade = async (plan) => {
    try {
      const me = await updateMe({ subscriptionPlan: plan });
      setUserHeader((uh) => ({
        ...uh,
        subscriptionPlan: me.subscriptionPlan || plan,
        nextRenewalDate: me.nextRenewalDate
          ? new Date(me.nextRenewalDate).toDateString()
          : uh.nextRenewalDate,
      }));
      Swal.fire({
        icon: "success",
        title: "Plan updated",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (e) {
      console.error("Plan update failed:", e);
      Swal.fire({ icon: "error", title: "Failed to update plan" });
    } finally {
      setShowUpgradeModal(false);
    }
  };

  // Settings modal
  const handleshowSettingsModal = () => setShowSettingsModal(true);

  // Watchlist
  const handleRemoveWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  // Profile selection / Kids PIN — also set active profile
  const handleSelectProfile = (profile) => {
    setActiveProfileId(profile.id);
    localStorage.setItem("bbsneo_active_profile", String(profile.id));

    if (profile.isChild) {
      setSelectedProfile(profile);
      setPinInput("");
      setShowPinModal(true);
    } else {
      window.location.href = "/home";
    }
  };

  const handleVerifyPin = () => {
    if (pinInput === selectedProfile.pin) {
      setShowPinModal(false);
      setSelectedProfile(null);
      window.location.href = "/home";
    } else {
      alert("Incorrect PIN. Please try again.");
    }
  };

  // Add/Edit/Delete profiles (pure UI; persist via PUT /profile)
  const handleOpenAddProfile = () => {
    setIsAddMode(true);
    setCurrentProfile({
      name: "",
      avatar: "",
      isChild: false,
      pin: "",
      language: "",
    });
    setShowProfileModal(true);
  };

  const handleOpenEditProfile = (p) => {
    setIsAddMode(false);
    setCurrentProfile({ ...p });
    setShowProfileModal(true);
  };

  const persistProfiles = async (list) => {
    // Convert back to API shape (drop UI-only id)
    const payloadProfiles = list.map(({ id, ...rest }) => rest);
    return updateMe({ profiles: payloadProfiles });
  };

  const handleSaveProfile = async () => {
    try {
      let next;
      if (isAddMode) {
        const nextId = profiles.length
          ? Math.max(...profiles.map((p) => p.id)) + 1
          : 1;
        next = [...profiles, { id: nextId, ...currentProfile }];
      } else {
        next = profiles.map((p) =>
          p.id === currentProfile.id ? { ...currentProfile } : p
        );
      }

      const saved = await persistProfiles(next);
      const withIds = (saved.profiles || []).map((p, i) => ({
        id: i + 1,
        name: p.name || `Profile ${i + 1}`,
        avatar: p.avatar || "",
        isChild: !!p.isChild,
        pin: p.pin || "",
        language: p.language || "",
      }));
      setProfiles(withIds);

      // keep active selection stable; if missing, fallback to first
      const stillThere = withIds.find((p) => p.id === activeProfileId);
      const nextActive = stillThere ? stillThere.id : withIds[0]?.id ?? null;
      setActiveProfileId(nextActive);
      if (nextActive)
        localStorage.setItem("bbsneo_active_profile", String(nextActive));
      else localStorage.removeItem("bbsneo_active_profile");

      setShowProfileModal(false);
      Swal.fire({
        icon: "success",
        title: isAddMode ? "Profile added" : "Profile updated",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (e) {
      console.error("Save profile failed:", e);
      Swal.fire({ icon: "error", title: "Failed to save profile" });
    }
  };

  const handleDeleteProfile = async (id) => {
    const confirm = await Swal.fire({
      icon: "warning",
      title: "Delete this profile?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      const next = profiles.filter((p) => p.id !== id);
      const saved = await persistProfiles(next);
      const withIds = (saved.profiles || []).map((p, i) => ({
        id: i + 1,
        name: p.name || `Profile ${i + 1}`,
        avatar: p.avatar || "",
        isChild: !!p.isChild,
        pin: p.pin || "",
        language: p.language || "",
      }));
      setProfiles(withIds);

      // update active profile if deleted
      if (activeProfileId === id) {
        const fallback = withIds[0]?.id ?? null;
        setActiveProfileId(fallback);
        if (fallback)
          localStorage.setItem("bbsneo_active_profile", String(fallback));
        else localStorage.removeItem("bbsneo_active_profile");
      }

      Swal.fire({
        icon: "success",
        title: "Profile deleted",
        timer: 1000,
        showConfirmButton: false,
      });
    } catch (e) {
      console.error("Delete profile failed:", e);
      Swal.fire({ icon: "error", title: "Failed to delete profile" });
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
            {headerAvatar ? (
              <img
                src={headerAvatar}
                alt="Profile"
                className="rounded-circle"
                style={{ width: 80, height: 80, objectFit: "cover" }}
              />
            ) : (
              <FaUserCircle size={80} />
            )}
          </Col>
          <Col md={7}>
            {/* ================== [API-PROFILE] header bind START ================== */}
            <h4 className="mb-1">{userHeader.fullName}</h4>
            <p className="mb-1">Email: {userHeader.email}</p>
            <p className="mb-0">
              Subscription: {userHeader.subscriptionPlan} Plan - Next Renewal:{" "}
              {userHeader.nextRenewalDate}
            </p>
            {/* =================== [API-PROFILE] header bind END =================== */}
          </Col>
          <Col
            md={3}
            className="text-md-end text-center mt-2 mt-md-0 gap-2 d-flex w-100 flex-row  align-items-center justify-content-between"
          >
            <Button
              variant="danger"
              onClick={handleUpgradePlan}
              className="gap-1 w-100 bg-warning text-dark"
            >
              Upgrade Plan
            </Button>
            <Button
              variant="primary"
              onClick={handleshowSettingsModal}
              className="gap-1 w-100 bg-warning text-dark"
            >
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
                  border:
                    activeProfileId === profile.id
                      ? "3px solid #0d6efd"
                      : "2px solid #ccc",
                }}
                onClick={() => handleSelectProfile(profile)}
              />
              <p className="mb-2">{profile.name}</p>
              <div className="d-flex justify-content-center gap-2">
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => handleOpenEditProfile(profile)}
                >
                  <FaEdit /> Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  <FaTrash /> Delete
                </Button>
              </div>
            </Col>
          ))}

          {/* Add Profile Card */}
          <Col xs={6} sm={4} md={2} className="text-center mb-4">
            <div
              className="d-flex flex-column align-items-center justify-content-center rounded"
              style={{
                width: "100%",
                height: "120px",
                backgroundColor: "#333",
                color: "#fff",
                cursor: "pointer",
              }}
              onClick={handleOpenAddProfile}
            >
              <FaPlus size={24} />
              <span className="mt-2">Add Profile</span>
            </div>
          </Col>
        </Row>
      </Card>

      {/* Watchlist Section */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Watchlist</Card.Title>
        <Row className="mt-3">
          {watchlist.map((item) => (
            <Col key={item.id} xs={6} sm={4} md={3} className="mb-4">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={item.img}
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title className="h6 mb-2">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-3">{item.type}</Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button size="sm" variant="dark">
                      <FaPlay /> Play
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => handleRemoveWatchlist(item.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Continue Watching Section */}
      <Card className="mb-4 shadow-sm p-3">
        <Card.Title>Continue Watching</Card.Title>
        <Carousel className="mt-3">
          {continueWatching.map((cw) => (
            <Carousel.Item key={cw.id}>
              <Row className="align-items-center">
                <Col md={3}>
                  <img
                    src={cw.img}
                    alt={cw.title}
                    className="w-100"
                    style={{ height: "160px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={9}>
                  <h5 className="mb-2">{cw.title}</h5>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className="progress-bar bg-dark"
                      role="progressbar"
                      style={{ width: `${cw.progress}%` }}
                      aria-valuenow={cw.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Card>

      {/* Upgrade Plan Modal */}
      <Modal
        show={showUpgradeModal}
        onHide={() => setShowUpgradeModal(false)}
        centered
        size="lg"
      >
        <div className="bg-dark text-light rounded">
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="text-white">Choose Your Plan</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row className="g-3">
              <Col md={4}>
                <div className="border rounded p-3 h-100 bg-light text-dark">
                  <h5 className="fw-bold mb-2">Free</h5>
                  <p className="text-dark fw-bold mb-3">$0 / month</p>
                  <ul className="list-unstyled text-start mb-3">
                    <li>Limited content</li>
                    <li>Ads supported</li>
                    <li>SD streaming</li>
                  </ul>
                  <Button
                    variant="dark"
                    className="w-100 fw-bold"
                    onClick={() => handleSaveUpgrade("Free")}
                  >
                    Stay on Free
                  </Button>
                </div>
              </Col>
              <Col md={4}>
                <div className="border rounded p-3 h-100 bg-light text-dark">
                  <h5 className="fw-bold mb-2">Standard</h5>
                  <p className="text-dark fw-bold mb-3">$8 / month</p>
                  <ul className="list-unstyled text-start mb-3">
                    <li>Most content</li>
                    <li>Fewer ads</li>
                    <li>HD streaming</li>
                  </ul>
                  <Button
                    variant="dark"
                    className="w-100 fw-bold"
                    onClick={() => handleSaveUpgrade("Standard")}
                  >
                    Upgrade Now
                  </Button>
                </div>
              </Col>
              <Col md={4}>
                <div className="border rounded p-3 h-100 bg-light text-dark w-100">
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
              </Col>
            </Row>
            <p className="text-center text-muted mt-4 small">
              Cancel anytime. All plans auto-renew monthly. Taxes may apply.
            </p>
          </Modal.Body>
        </div>
      </Modal>

      {/* Settings & Help Modal */}
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
              >
                <option value="auto">Auto</option>
                <option value="sd">SD</option>
                <option value="hd">HD</option>
                <option value="uhd">UHD (4K)</option>
              </Form.Select>
            </Form.Group>

            {/* Autoplay Next */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Autoplay next episode"
                checked={autoplayNext}
                onChange={(e) => setAutoplayNext(e.target.checked)}
              />
            </Form.Group>

            {/* Download Quality */}
            <Form.Group className="mb-3">
              <Form.Label>Download Quality</Form.Label>
              <Form.Select
                value={downloadQuality}
                onChange={(e) => setDownloadQuality(e.target.value)}
              >
                <option value="standard">Standard</option>
                <option value="high">High</option>
              </Form.Select>
            </Form.Group>

            {/* Notifications */}
            <Form.Group className="mb-3">
              <Form.Label>Notifications</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="checkbox"
                  label="Email"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <Form.Check
                  type="checkbox"
                  label="Push"
                  checked={pushNotifications}
                  onChange={(e) => setPushNotifications(e.target.checked)}
                />
              </div>
            </Form.Group>

            {/* Content Restrictions */}
            <Form.Group className="mb-3">
              <Form.Label>Content Restrictions</Form.Label>
              <div className="d-flex gap-3">
                <Form.Check
                  type="checkbox"
                  label="Violence"
                  checked={contentRestrictions.violence}
                  onChange={(e) =>
                    setContentRestrictions((c) => ({
                      ...c,
                      violence: e.target.checked,
                    }))
                  }
                />
                <Form.Check
                  type="checkbox"
                  label="Adult"
                  checked={contentRestrictions.adult}
                  onChange={(e) =>
                    setContentRestrictions((c) => ({
                      ...c,
                      adult: e.target.checked,
                    }))
                  }
                />
              </div>
            </Form.Group>

            <div className="text-end">
              <Button
                variant="warning"
                className="text-dark"
                onClick={() => setShowSettingsModal(false)}
              >
                Save Preferences
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Add/Edit Profile Modal */}
      <Modal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        centered
      >
        <Modal.Header closeButton className="border-0">
          <Modal.Title>
            {isAddMode ? "Add Profile" : "Edit Profile"}
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

      {/* Kids PIN Modal */}
      <Modal show={showPinModal} onHide={() => setShowPinModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Enter PIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Control
              type="password"
              maxLength={4}
              placeholder="Enter 4-digit PIN"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPinModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleVerifyPin}>
            Verify
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfilePage;

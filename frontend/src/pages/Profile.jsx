import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
const avatars = [
  "https://i.pravatar.cc/100?img=1",
  "https://i.pravatar.cc/100?img=2",
  "https://i.pravatar.cc/100?img=3",
  "https://i.pravatar.cc/100?img=4",
  "https://i.pravatar.cc/100?img=5",
];

const Profile = () => {
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [pinInput, setPinInput] = useState(""); // for PIN entry
  const [currentKidsProfile, setCurrentKidsProfile] = useState(null); // track which kids profile clicked
  const [newProfile, setNewProfile] = useState({
    name: "",
    avatar: avatars[0],
    language: "English",
    kidsMode: false,
    pin: "",
  });

  const addProfile = () => {
    if (!newProfile.name) {
      Swal.fire({
        icon: "warning",
        title: "Oops!",
        text: "Please enter profile name",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Got it!",
      });
      return;
    }

    setProfiles([...profiles, newProfile]);
    setNewProfile({
      name: "",
      avatar: avatars[0],
      language: "English",
      kidsMode: false,
      pin: "",
    });
    setShowModal(false);

    Swal.fire({
      icon: "success",
      title: "Profile Added!",
      text: "The profile has been added successfully.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const deleteProfile = (index) =>
    setProfiles(profiles.filter((_, i) => i !== index));

  // Handle profile click
  const handleProfileClick = (profile) => {
    if (profile.kidsMode) {
      setCurrentKidsProfile(profile);
    } else {
      navigate("/home");
    }
  };

  const verifyPin = () => {
    if (pinInput === currentKidsProfile.pin) {
      setPinInput("");
      setCurrentKidsProfile(null);
      navigate("/home");
    } else {
      Swal.fire({
        icon: "error",
        title: "Wrong PIN!",
        text: "Please enter the correct PIN to access Kids Mode",
      });
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-white"
      style={{
        background:
          "url('https://wallpapercave.com/wp/24t2Yct.jpg') no-repeat center center",
        backgroundSize: "cover",
      }}
    >
      <h2 className="mb-4">Who's Watching?</h2>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {profiles.map((p, i) => (
          <div
            key={i}
            className="card border-2 border-danger text-center p-3"
            style={{
              width: "150px",
              cursor: "pointer",
              transition: "transform 0.3s",
              transform: "scale(1)",
              borderRadius: "10px",
              backgroundColor: "rgba(0, 0, 0, 0.6)",
            }}
            onClick={() => handleProfileClick(p)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.1)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={p.avatar}
              alt="avatar"
              className="rounded-circle mb-2"
              style={{ width: "80px", height: "80px", margin: "0 auto" }}
            />
            <h6>{p.name}</h6>
            {p.kidsMode && (
              <span className="badge bg-warning text-dark mb-2">Kids Mode</span>
            )}
            <button
              className="btn btn-danger btn-sm"
              onClick={(e) => {
                e.stopPropagation();
                deleteProfile(i);
              }}
            >
              Delete
            </button>
          </div>
        ))}

        {/* Add Profile Card */}
        <div
          className="card text-center p-3"
          style={{
            width: "150px",
            cursor: "pointer",
            transition: "transform 0.3s",
            transform: "scale(1)",
            borderRadius: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          }}
          onClick={() => setShowModal(true)}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <div
            className="d-flex align-items-center justify-content-center rounded-circle mb-2 position-relative"
            style={{
              width: "80px",
              height: "80px",
              margin: "0 auto",
              backgroundColor: "#857979ff",
              fontSize: "36px",
              border: "2px solid white",
            }}
          >
            <div className="position-absolute text-white top-10 start-15 bottom-20">
              +
            </div>
          </div>
          <h6 className="text-white mt-4">Add Profile</h6>
        </div>
      </div>

      {/* PIN Modal for Kids Mode */}
      {currentKidsProfile && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">
                  Enter PIN for {currentKidsProfile.name}
                </h5>
              </div>
              <div className="modal-body">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter PIN"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setCurrentKidsProfile(null)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={verifyPin}>
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Add New Profile</h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {/* Profile Name */}
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Profile Name"
                  value={newProfile.name}
                  onChange={(e) =>
                    setNewProfile({ ...newProfile, name: e.target.value })
                  }
                />

                {/* Choose Avatar */}
                <label className="mb-2">Choose Avatar:</label>
                <div className="d-flex gap-2 mb-3 flex-wrap justify-content-center">
                  {avatars.map((a) => (
                    <img
                      key={a}
                      src={a}
                      alt="avatar"
                      className={`rounded-circle ${
                        newProfile.avatar === a
                          ? "border border-3 border-primary"
                          : ""
                      }`}
                      style={{
                        width: "60px",
                        height: "60px",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setNewProfile({ ...newProfile, avatar: a })
                      }
                    />
                  ))}
                </div>

                {/* Language Preference Multi-Select */}
                <label className="mb-2">Language Preferences:</label>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {[
                    "Tamil",
                    "English",
                    "Hindi",
                    "Spanish",
                    "French",
                    "German",
                    "Chinese",
                  ].map((lang) => {
                    const isSelected = newProfile.language.includes(lang);
                    return (
                      <div
                        key={lang}
                        className={`p-2 border rounded ${
                          isSelected
                            ? "border-primary bg-success text-white"
                            : "border-light text-white"
                        }`}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (isSelected) {
                            // Remove from array
                            setNewProfile({
                              ...newProfile,
                              language: newProfile.language.filter(
                                (l) => l !== lang
                              ),
                            });
                          } else {
                            // Add to array
                            setNewProfile({
                              ...newProfile,
                              language: [...newProfile.language, lang],
                            });
                          }
                        }}
                      >
                        {lang}
                      </div>
                    );
                  })}
                </div>

                {/* Kids Mode */}
                <div className="form-check mb-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={newProfile.kidsMode}
                    onChange={(e) =>
                      setNewProfile({
                        ...newProfile,
                        kidsMode: e.target.checked,
                      })
                    }
                  />
                  <label className="form-check-label">Kids Mode</label>
                </div>
                {newProfile.kidsMode && (
                  <input
                    type="password"
                    className="form-control mb-2"
                    placeholder="Set PIN"
                    value={newProfile.pin}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, pin: e.target.value })
                    }
                  />
                )}
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={addProfile}>
                  Add Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

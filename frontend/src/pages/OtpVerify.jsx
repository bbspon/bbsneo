// src/pages/OtpVerify.jsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OtpVerify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState("");

  // Grab phone number from navigation state
  useEffect(() => {
    if (location.state?.phone) {
      setPhone(location.state.phone);
    } else {
      setPhone("unknown");
    }
  }, [location.state]);

  // ✅ Correct submit handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic OTP validation (6 digits)
    if (!/^\d{6}$/.test(otp)) {
      Swal.fire({
        icon: "error",
        title: "Invalid OTP",
        text: "Please enter a valid 6-digit code.",
      });
      return;
    }

    // Mock success
    Swal.fire({
      icon: "success",
      title: "Verification Successful",
      text: `Phone +91${phone} verified!`,
      timer: 2000,
      showConfirmButton: false,
    });

    // Navigate to profile (mock)
    setTimeout(() => navigate("/profile"), 1200);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://static.vecteezy.com/system/resources/previews/043/555/242/non_2x/realistic-3d-cinema-film-strip-in-perspective-isolated-on-blue-background-template-cinema-festival-movie-design-cinema-film-strip-for-ad-poster-presentation-show-brochure-banner-or-flyer-vector.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "1rem",
      }}
    >
      <div
        className="col-11 col-sm-8 col-md-4 bg-white p-4 rounded shadow"
        style={{ maxWidth: "400px" }}
      >
        <h3 className="text-center mb-3">Verify OTP</h3>
        <p className="text-center text-muted mb-4">
          Enter the 6-digit code sent to <strong>+91 {phone}</strong>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            maxLength="6"
            pattern="\d{6}"
            className="form-control text-center mb-3 fs-5"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Verify
          </button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() =>
              Swal.fire({
                icon: "info",
                title: "OTP Resent",
                text: `Mock resend to +91${phone}`,
                timer: 1500,
                showConfirmButton: false,
              })
            }
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;

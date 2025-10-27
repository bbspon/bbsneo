import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  InputGroup,
  Alert,
} from "react-bootstrap";
import {
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaAndroid,
  FaLock,
  FaEnvelope,
} from "react-icons/fa";
import { API_BASE } from "../config/api";

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Email/Password form state
  const [form, setForm] = useState({ email: "", password: "" });
  // Phone login state
  const [phone, setPhone] = useState("");
  // Mock flag for OTP
  const [otpSent, setOtpSent] = useState(false);

  // Handle email/password input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Real email/password login (env-based URL, no hardcoding)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = (form.email || "").trim().toLowerCase();
    const password = form.password || "";

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      // Resolve base URL in this priority:
      // 1) VITE_IDENTITY_URL (recommended)
      // 2) API_BASE from ../config/api (if you already use it)
      // 3) Local fallback (dev)
      const base = (
        import.meta.env?.VITE_IDENTITY_URL ||
        API_BASE ||
        "http://127.0.0.1:3103"
      ) // fallback for local dev
        .replace(/\/+$/, "");
      const url = `${base}/login`;

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const txt = await res.text().catch(() => "");
        throw new Error(txt || `Login failed (${res.status})`);
      }

      const data = await res.json();

      if (data?.token) {
        localStorage.setItem("bbsneo_token", data.token);
      }
      if (data?.user) {
        try {
          localStorage.setItem("bbsneo_user", JSON.stringify(data.user));
        } catch {}
      }

      alert("Login successful!");
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert(err?.message || "Invalid credentials or server error.");
    }
  };

  // Mock phone login logic (unchanged UI/flow)
  const handlePhoneLogin = (e) => {
    e.preventDefault();
    if (!/^[0-9]{10}$/.test(phone)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Number",
        text: "Enter a valid 10-digit phone number",
      });
      return;
    }

    setOtpSent(true);
    Swal.fire({
      icon: "success",
      title: "OTP Sent",
      text: `OTP sent to +91${phone}`,
      timer: 2000,
      showConfirmButton: false,
    });

    setTimeout(() => navigate("/otp-verify", { state: { phone } }), 1000);
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side Background Image */}
        <div
          className="col-md-7 d-none d-md-block"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/popcorn-bucket-clapper-board-film-reel-inside-big-movie-theater_285885-2785.jpg?w=2000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Right Side Form */}
        <div className="col-md-5 d-flex justify-content-center align-items-center">
          <div className="w-75">
            <h2 className="mb-4 text-center">Login</h2>

            {/* Email + Password */}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="form-control mb-3"
                onChange={handleChange}
                required
              />
              <button className="btn btn-success w-100 mb-3">Login</button>
            </form>

            {/* OR Divider */}
            <div className="d-flex align-items-center my-3">
              <div className="flex-grow-1 border-top"></div>
              <span className="mx-2 text-muted fw-bold">OR</span>
              <div className="flex-grow-1 border-top"></div>
            </div>

            {/* Phone + OTP */}
            <form onSubmit={handlePhoneLogin}>
              <div className="input-group mb-3">
                <span className="input-group-text">+91</span>
                <input
                  type="tel"
                  name="phone"
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="Phone Number"
                  className="form-control"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-primary w-100">
                {otpSent ? "OTP Sent (Mock)" : "Get OTP"}
              </button>
            </form>

            {/* Links */}
            <p className="text-center mt-4">
              Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <p className="text-center">
              <Link to="/forward-password">Forgot Password</Link>
            </p>
            <p className="text-center text-muted mb-2">Or continue with</p>

            <div className="d-flex justify-content-center gap-3">
              <Button
                variant="light"
                className="border rounded-circle p-3"
                onClick={() => handleSocialLogin("Google")}
              >
                <FaGoogle size={20} color="#DB4437" />
              </Button>

              <Button
                variant="light"
                className="border rounded-circle p-3"
                onClick={() => handleSocialLogin("Apple")}
              >
                <FaApple size={22} color="#000" />
              </Button>

              <Button
                variant="light"
                className="border rounded-circle p-3"
                onClick={() => handleSocialLogin("Android")}
              >
                <FaAndroid size={22} color="#3DDC84" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

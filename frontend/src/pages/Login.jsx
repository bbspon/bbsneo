import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
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
const Login = () => {
  const navigate = useNavigate();
const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    // Simulated login logic
    setTimeout(() => {
      setLoading(false);
      if (email === "demo@user.com" && password === "123456") {
        alert("Login successful!");
      } else {
        setError("Invalid credentials.");
      }
    }, 1200);
  };

const handleSocialLogin = (provider) => {
  const urls = {
    Google: "https://accounts.google.com/signin",
    Facebook: "https://www.facebook.com/login",
    Apple: "https://appleid.apple.com/",
    Twitter: "https://twitter.com/login",
  
  };

  const url = urls[provider];
  if (url) {
    window.open(url, "_blank", "noopener,noreferrer");
  } else {
    alert(`No login URL configured for ${provider}`);
  }
};


  // Email/Password form state
  const [form, setForm] = useState({ email: '', password: '' });
  // Phone login state
  const [phone, setPhone] = useState('');
  // Mock flag for OTP
  const [otpSent, setOtpSent] = useState(false);

  // Handle email/password input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Mock email/password login
  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔹 Mock check: pretend these credentials are correct
    if (form.email && form.password) {
      alert('Logged in (mock)');
      // navigate('/mfa'); // pretend MFA page
         navigate('/home'); // pretend HOME page
    } else {
      alert('Invalid credentials (mock)');
    }
  };

  // Mock phone login logic
  const handlePhoneLogin = (e) => {
  e.preventDefault();
  if (!/^[0-9]{10}$/.test(phone)) {
    Swal.fire({
      icon: 'error',
      title: 'Invalid Number',
      text: 'Enter a valid 10-digit phone number',
    });
    return;
  }

  setOtpSent(true);
  Swal.fire({
    icon: 'success',
    title: 'OTP Sent',
    text: `OTP sent to +91${phone}`,
    timer: 2000,
    showConfirmButton: false,
  });

  setTimeout(() => navigate('/otp-verify', { state: { phone } }), 1000);
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
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
                {otpSent ? 'OTP Sent (Mock)' : 'Get OTP'}
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

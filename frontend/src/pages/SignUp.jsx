import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaApple, FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations (unchanged)
    const nameValid = /^[A-Za-z ]{2,}$/.test(form.name.trim());
    if (!nameValid) {
      alert("Full name must be letters/spaces only, min 2 chars.");
      return;
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email.trim().toLowerCase()
    );
    if (!emailValid) {
      alert("Enter a valid email address.");
      return;
    }

    const phoneDigits = form.phone.replace(/\D/g, "");
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      alert("Phone must be 10–15 digits (country code allowed).");
      return;
    }

    const passwordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/.test(
        form.password
      );
    if (!passwordValid) {
      alert("Password must be 8+ chars with upper, lower, number, special.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // ✅ updated API endpoint to match backend
      const apiBase = import.meta.env.VITE_IDENTITY_URL;
      const res = await fetch(`${apiBase}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phoneNumber: form.phone.trim(),
          password: form.password,
          signUpMethod: "Manual",
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Signup failed: ${res.status} ${text}`);
      }

      const data = await res.json();
      console.log("Signup response:", data);

      if (data?.id) {
        alert("Signup successful!");
        navigate("/home");
      } else {
        alert("Signup completed, but no ID returned.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert(err.message || "Network error. Please try again.");
    }
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: `url('https://smilingldsgirl.files.wordpress.com/2014/04/top15movies.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          maxWidth: "450px",
          width: "100%",
          backgroundImage:
            "url('https://odishatv.org/wp-content/uploads/2023/09/TP-BG2a-1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          color: "#fff",
          border: "2px solid #ccc",
        }}
      >
        <h2 className="mb-4 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="p-3">
          <label className="pb-2">Full name</label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="form-control mb-3"
            onChange={handleChange}
            value={form.name}
            required
          />

          <label className="pb-2">E-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            value={form.email}
            required
          />

          <label className="pb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="form-control mb-3"
            onChange={handleChange}
            value={form.phone}
            required
          />

          <label className="pb-2">Password</label>
          <div className="input-group mb-3">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              value={form.password}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <label className="pb-2">Confirm Password</label>
          <div className="input-group mb-4">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              className="form-control"
              onChange={handleChange}
              value={form.confirmPassword}
              required
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              tabIndex={-1}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button className="btn btn-primary w-100 mb-3">Sign Up</button>
        </form>

        <p className="text-center mb-2">Or Sign Up with</p>
        <div className="d-flex justify-content-center gap-3 mb-3">
          <FaGoogle size={30} />
          <FaApple size={30} />
        </div>

        <p className="text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

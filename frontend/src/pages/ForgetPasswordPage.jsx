import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

// ForwardPasswordPage.jsx
// React + Bootstrap variation: robust, no react-router dependency.
// Props:
//  - onComplete(password)  => called when password is successfully set
//  - onBack()              => optional custom back handler

export default function ForgetPasswordPage({ onComplete, onBack } = {}) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [touched, setTouched] = useState({ password: false, confirm: false });

  // validations
  const isLongEnough = password.length >= 8;
  const hasNumber = /\d/.test(password);
  const hasMixedCase = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
  const passwordsMatch = password !== "" && password === confirm;

  // strength score: 0..3
  const score = (isLongEnough ? 1 : 0) + (hasNumber ? 1 : 0) + (hasMixedCase ? 1 : 0);
  const strengthPercent = (score / 3) * 100;
  const strengthClass = score === 3 ? "bg-success" : score === 2 ? "bg-warning" : "bg-danger";

  function handleSubmit(e) {
    e.preventDefault();
    setTouched({ password: true, confirm: true });

    // require full strength + match
    if (score < 3 || !passwordsMatch) return;

    if (typeof onComplete === "function") {
      onComplete(password);
      return;
    }

    // default fallback: console log and try to redirect to /signin
    console.log("Password set:", password);
    try {
      window.location.href = "/login";
    } catch (err) {
      // do nothing
    }
  }

  function handleBack() {
    if (typeof onBack === "function") return onBack();
    if (window && window.history && window.history.length) return window.history.back();
    // fallback: go to homepage
    window.location.href = "/";
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100  text-light p-3"
    style={{
    backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/043/555/242/non_2x/realistic-3d-cinema-film-strip-in-perspective-isolated-on-blue-background-template-cinema-festival-movie-design-cinema-film-strip-for-ad-poster-presentation-show-brochure-banner-or-flyer-vector.jpg')",  // path to your image
    backgroundSize: "cover",                  // scale to fill
    backgroundPosition: "center",             // center the image
    backgroundRepeat: "no-repeat"             // avoid tiling
  }}>
      <div className="card shadow-lg p-4" style={{ maxWidth: 460, width: "100%" }}>
        <h1 className="h4 text-center mb-2">Create New Password</h1>
        <p className="text-center text-muted mb-4">Choose a strong password to protect your account.</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* New password */}
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">New Password</label>

            <div className="input-group">
              <input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                className={`form-control ${touched.password && score < 3 ? "is-invalid" : ""}`}
                placeholder="At least 8 chars, upper+lower & a number"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                aria-describedby="passwordHelp"
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword((s) => !s)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* validation message placed after the input (Bootstrap expects this) */}
            {touched.password && score < 3 && (
              <div className="invalid-feedback d-block">Password must be at least 8 characters and include upper/lower case letters and a number.</div>
            )}

            <div id="passwordHelp" className="form-text mt-2 small">
              <span className={isLongEnough ? "text-success" : "text-muted"}>8+ chars</span>
              <span className="mx-2">·</span>
              <span className={hasNumber ? "text-success" : "text-muted"}>1 number</span>
              <span className="mx-2">·</span>
              <span className={hasMixedCase ? "text-success" : "text-muted"}>Upper & lower</span>
            </div>

            {/* strength bar */}
            {password.length > 0 && (
              <div className="progress mt-2" style={{ height: 8 }}>
                <div
                  className={`progress-bar ${strengthClass}`}
                  role="progressbar"
                  style={{ width: `${strengthPercent}%` }}
                  aria-valuenow={strengthPercent}
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
            )}
          </div>

          {/* Confirm password */}
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>

            <div className="input-group">
              <input
                id="confirmPassword"
                type={showConfirm ? "text" : "password"}
                className={`form-control ${touched.confirm && !passwordsMatch ? "is-invalid" : ""}`}
                placeholder="Re-enter your password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                required
              />

              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowConfirm((s) => !s)}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {touched.confirm && !passwordsMatch && (
              <div className="invalid-feedback d-block">Passwords do not match.</div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={score < 3 || !passwordsMatch}>
            Set Password
          </button>

          <div className="text-end mt-3 me-4 ">
            <button type="button" className="btn btn-link text-decoration-none text-end" onClick={handleBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

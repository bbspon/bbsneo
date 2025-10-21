import React, { useEffect, useState } from "react";
import { API_BASE } from "../config/api";

export default function Mfa() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);

  // Helpers
  const jsonFetch = async (url, bodyObj) => {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyObj),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const msg = data?.message || data?.error || `HTTP ${res.status}`;
      throw new Error(msg);
    }
    return data;
  };

  const sendOtp = async (targetEmail) => {
    if (!targetEmail) {
      setStatus("Missing email. Go back to Sign Up.");
      return;
    }
    setSending(true);
    setStatus("Sending OTP...");
    try {
      const data = await jsonFetch(`${API_BASE}/auth/mfa/send`, {
        email: targetEmail,
      });
      setStatus(data?.message || "OTP sent");
    } catch (err) {
      setStatus(err.message || "Failed to send OTP");
    } finally {
      setSending(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("Missing email. Go back to Sign Up.");
      return;
    }
    if (code.trim().length !== 6) {
      setStatus("Enter the 6-digit code.");
      return;
    }
    setVerifying(true);
    setStatus("Verifying...");
    try {
      const data = await jsonFetch(`${API_BASE}/auth/mfa/verify`, {
        email,
        code: code.trim(),
      });
      if (data?.ok) {
        setStatus("Verified! 🎉");
        // TODO: route to dashboard/home
        // window.location.href = "/";
      } else {
        setStatus(data?.message || "Invalid code");
      }
    } catch (err) {
      setStatus(err.message || "Invalid code");
    } finally {
      setVerifying(false);
    }
  };

  // On mount: get email from signup and send OTP
  useEffect(() => {
    const e = (localStorage.getItem("mfa_email") || "").trim().toLowerCase();
    setEmail(e);
    // Auto-send OTP on page open
    if (e) {
      sendOtp(e);
    } else {
      setStatus("Missing email. Go back to Sign Up.");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-vh-100 d-flex justify-content-end align-items-center"
      style={{
        backgroundImage: "url('https://wallpaperaccess.com/full/329563.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingRight: "40px",
      }}
    >
      <div className="card p-4 shadow" style={{ width: 380 }}>
        <h3 className="mb-2 text-center">MFA Verification</h3>
        <p className="text-center text-muted" style={{ fontSize: 14 }}>
          {email ? `Enter the OTP sent to ${email}` : "Email not set"}
        </p>

        <form onSubmit={verifyOtp}>
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            className="form-control mb-3"
            placeholder="Enter 6-digit OTP"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            maxLength={6}
            required
          />

          <button className="btn btn-warning w-100" disabled={verifying}>
            {verifying ? "Verifying..." : "Verify"}
          </button>
        </form>

        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="btn btn-link p-0"
            onClick={() => sendOtp(email)}
            disabled={sending}
          >
            {sending ? "Sending..." : "Resend OTP"}
          </button>
          <span style={{ fontSize: 13 }}>{status}</span>
        </div>
      </div>
    </div>
  );
}

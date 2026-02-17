import { sendBsnlSms } from "./bsnl-helpers";

// simple in-memory store; survives while the dev server is running
const otpStore = global.__otpStore || new Map();
global.__otpStore = otpStore;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const { phone } = req.body || {};
  if (!phone || !/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ error: "phone required (10 digits)" });
  }

  // generate 6‑digit code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore.set(phone, code);

  try {
    // BSNL gateway expects international format
    await sendBsnlSms(`+91${phone}`, `Your verification code is ${code}`);
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("send-otp error", err);
    return res.status(500).json({ error: "Failed to send OTP" });
  }
}

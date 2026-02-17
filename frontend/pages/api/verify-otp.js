// reads from the same global map used in send-otp
const otpStore = global.__otpStore || new Map();
global.__otpStore = otpStore;

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method not allowed");
  }

  const { phone, otp } = req.body || {};
  if (!phone || !otp) {
    return res.status(400).json({ error: "phone and otp required" });
  }

  const stored = otpStore.get(phone);
  if (stored && stored === otp) {
    otpStore.delete(phone);
    return res.status(200).json({ ok: true });
  } else {
    return res.status(400).json({ ok: false, error: "Invalid OTP" });
  }
}
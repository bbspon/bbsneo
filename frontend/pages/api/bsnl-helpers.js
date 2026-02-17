// shared helper for BSNL SMS configuration and sending

const BSNL_SMS_CONFIG = {
  baseUrl: process.env.BSNL_BASE_URL || "https://bulksms.bsnl.in:5010",

  // Portal credentials (move to env ideally)
  username: process.env.BSNL_USERNAME || "bbspon",
  password: process.env.BSNL_PASSWORD || "1947@PEAcock",

  // From BSNL portal API Details
  serviceId: process.env.BSNL_SERVICE_ID || "10894",

  // From template screen
  senderId: process.env.BSNL_SENDER_ID || "GLXINF",
  contentTemplateId:
    process.env.BSNL_TEMPLATE_ID || "1407172612209917457",
  entityId: process.env.BSNL_ENTITY_ID || "1401534940000071127", // ✅ ADD THIS

  // Token cache
  jwtToken: null,

  // Optional: comma-separated public IPs whitelisted in BSNL (if BSNL enforces it)
  // Example: set BSNL_IPS="49.204.xx.xx,103.xxx.xx.xx"
  ipAddresses: (process.env.BSNL_IPS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),

  mockMode: process.env.BSNL_MOCK_MODE === "true",
};

// Acquire/refresh a JWT token from BSNL portal
async function ensureToken() {
  if (BSNL_SMS_CONFIG.mockMode) return null;
  if (BSNL_SMS_CONFIG.jwtToken) return BSNL_SMS_CONFIG.jwtToken;

  const resp = await fetch(`${BSNL_SMS_CONFIG.baseUrl}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: BSNL_SMS_CONFIG.username,
      password: BSNL_SMS_CONFIG.password,
      serviceId: BSNL_SMS_CONFIG.serviceId,
    }),
  });

  const data = await resp.json().catch(() => ({}));
  if (!resp.ok) {
    throw new Error(data?.message || "Failed to obtain BSNL token");
  }

  BSNL_SMS_CONFIG.jwtToken = data.token || data.jwtToken || null;
  return BSNL_SMS_CONFIG.jwtToken;
}

// send an SMS via BSNL gateway; in mockMode we simply log
async function sendBsnlSms(phone, message) {
  if (BSNL_SMS_CONFIG.mockMode) {
    console.log("[BSNL MOCK SMS] to", phone, message);
    return;
  }

  const token = await ensureToken();
  const url = `${BSNL_SMS_CONFIG.baseUrl}/sms/send`;
  const payload = {
    serviceId: BSNL_SMS_CONFIG.serviceId,
    senderId: BSNL_SMS_CONFIG.senderId,
    templateId: BSNL_SMS_CONFIG.contentTemplateId,
    entityId: BSNL_SMS_CONFIG.entityId,
    to: phone,
    message,
  };

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`BSNL SMS failed: ${txt}`);
  }
}

export { BSNL_SMS_CONFIG, sendBsnlSms };

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/identity/auth/signup", async (req, res) => {
  try {
    const { fullName, email, phoneNumber } = req.body;

    // TODO: save user to MongoDB here

    const token = jwt.sign(
      { sub: email, name: fullName, phone: phoneNumber, role: "user" },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "1h" }
    );

    return res.status(201).json({ message: "Signed up", token });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Identity service running on http://localhost:${PORT}`);
});

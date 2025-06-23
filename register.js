
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ API Key kamu & Panel URL
const PTERO_API = "ptla_CQUEK9imNNzG5MHyCJ4Bc6EiOEf0w2pJAnIl4TjNq9U";
const PANEL_URL = "https://silit.zraxtur.my.id";

app.use(express.json());
app.use(express.static(__dirname)); // Agar bisa akses file HTML dari browser

// ✅ Endpoint Register
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const response = await axios.post(`${PANEL_URL}/api/application/users`, {
      username,
      email,
      first_name: username,
      last_name: "ZraX",
      password
    }, {
      headers: {
        "Authorization": `Bearer ${PTERO_API}`,
        "Content-Type": "application/json",
        "Accept": "Application/vnd.pterodactyl.v1+json"
      }
    });

    res.json({ message: "✅ Pendaftaran berhasil!" });
  } catch (err) {
    const error = err.response?.data?.errors?.[0]?.detail || "❌ Gagal mendaftar.";
    res.status(500).json({ message: error });
  }
});

// ✅ Jalankan server
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});

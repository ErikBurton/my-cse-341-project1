// backend/server.js
const express = require("express");
const cors    = require("cors");
const path    = require("path");
const data    = require("./professionalData");

const app = express();
const PORT = process.env.PORT || 8080;

// (Optional) serve your frontend so you can browse at http://localhost:8080/
app.use(express.static(path.join(__dirname, "../frontend")));

// allow your frontend (whether file:// or http://) to fetch
app.use(cors());

// JSON endpoint the JS will call
app.get("/professional", (req, res) => {
  res.json(data);
});

// fallback to index.html if you want http://localhost:8080/ to load it
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening at http://localhost:${PORT}`);
});

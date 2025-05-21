require("dotenv").config();
require("./database/connection");

const express = require("express");
const cors    = require("cors");
const path    = require("path");
const Profile = require("./models/Profile");
const contactRoutes = require("./routes/contactRoutes");


const app = express();
const PORT = process.env.PORT || 8080;

// Express setup
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(cors());
app.use(express.json());

app.get("/professional", async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).send("No profile found");
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

app.use("/contacts", contactRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

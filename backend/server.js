require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors    = require("cors");
const path    = require("path");
const Profile = require("./models/Profile");
const Contact = require("./models/Contact");


const app = express();
const PORT = process.env.PORT || 8080;

// 1. Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // exit if cannot connect
});

// 2. 
// listen for additional connection events
mongoose.connection.on('disconnected', () => {
  console.warn('MongoDB disconnected');
});

// 3. Express setup
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));


app.use(cors());


app.get("/professional", async (req, res, next) => {
  try {
    const profile = await Profile.findOne().lean();
    if (!profile) return res.status(404).send("No profile found");
    res.json(profile);
  } catch (err) {
    next(err);
  }
});

// GET all contacts
app.get("/contacts", async (req, res, next) => {
  try {
    const list = await Contact.find().lean();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET one contact by ID
app.get("/contacts/:id", async (req, res, next) => {
  try {
    const single = await Contact.findById(req.params.id).lean();
    if (!single) return res.status(404).json({ error: "Not found" });
    res.json(single);
  } catch (err) {
    next(err);
  }
});


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

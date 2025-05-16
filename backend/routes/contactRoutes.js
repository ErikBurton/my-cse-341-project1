const express = require("express");
const router  = express.Router();
const Contact = require("../models/Contact");

// GET all
router.get("/", async (req, res, next) => {
  try {
    const list = await Contact.find().lean();
    res.json(list);
  } catch (err) {
    next(err);
  }
});

// GET one by ID
router.get("/:id", async (req, res, next) => {
  try {
    const one = await Contact.findById(req.params.id).lean();
    if (!one) return res.status(404).json({ error: "Not found" });
    res.json(one);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

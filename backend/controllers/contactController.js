const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// GET contacts
exports.getAll = async (req, res, next) => {
  try {
    res.json(await Contact.find().lean());
  } catch (err) {
    next(err);
  }
};

// GET contacts by id
exports.getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    if ( !mongoose.Types.ObjectId.isValid(id))  {
        return res.status(400).json({ error: "Invalid contact ID" });
    }
    const doc = await Contact.findById(req.params.id).lean();
    if (!doc) return res.status(404).json({ error: "Not found" });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// POST contacts
exports.create = async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    const saved = await contact.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT contacts by id
exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact ID" });
    }
    const updated = await Contact.findByIdAndUpdate(id, req.body, {
      new:true,
      runValidators: true,      
    }).lean();
    if (!updated) return res.status(404).json({ error: "Not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE contacts by id
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid contact ID"});
    }
    const deleted = await Contact.findByIdAndDelete(id).lean();
    if (!deleted) return res.status(404).json({ error: "Not found" });
    res.json(deleted);
  } catch (err) {
    next(err);
  }
};
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

exports.getAll = async (req, res, next) => {
  try {
    res.json(await Contact.find().lean());
  } catch (err) {
    next(err);
  }
};

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

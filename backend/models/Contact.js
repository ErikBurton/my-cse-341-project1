const mongoose = require("mongoose");
const { Schema } = mongoose;

const ContactSchema = new Schema({
  firstName:     { type: String, required: true },
  lastName:      { type: String, required: true },
  email:         { type: String, required: true, unique: true },
  favoriteColor: { type: String },
  birthday:      { type: Date }
}, { timestamps: true });

module.exports = mongoose.model("Contact", ContactSchema);
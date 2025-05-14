const mongoose = require("mongoose");
const { Schema } = mongoose;

const LinkSchema = new Schema({
  text: { type: String, required: true },
  link: { type: String, required: true }
}, { _id: false });


const NameLinkSchema = new Schema({
  firstName: { type: String, required: true },
  url:       { type: String, required: true }
}, { _id: false });

const ProfileSchema = new Schema({
  professionalName:  { type: String, required: true },
  base64Image:       { type: String, required: true },
  nameLink:          { type: NameLinkSchema, required: true },
  primaryDescription:{ type: String, required: true },
  workDescription1:  { type: String, required: true },
  workDescription2:  { type: String, required: true },
  linkTitleText:     { type: String, required: true },
  linkedInLink:      { type: LinkSchema, required: true },
  githubLink:        { type: LinkSchema, required: true },
  contactText:       { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Profile", ProfileSchema);

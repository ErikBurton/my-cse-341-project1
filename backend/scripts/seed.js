require("dotenv").config();
const mongoose = require("mongoose");
const fs       = require("fs");
const path     = require("path");
const Profile  = require("../models/Profile");

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);

  // Clear existing
  await Profile.deleteMany({});


  const imgPath     = path.join(__dirname, "../../frontend/erikb.jpg");
  const base64Image = fs.readFileSync(imgPath).toString("base64");

  
  const data = {
    professionalName:    "Erik Burton ",
    base64Image,         
    nameLink: { firstName: "Erik: ", url: "https://erikburton.github.io/" },
    primaryDescription:  "Scrum Master SM6",
    workDescription1:    "Over 10 years automating tests with Selenium, Postman, and Jenkins.",
    workDescription2:    "Ensuring high-quality releases in agile environments.",
    linkTitleText:       "Connect with me:",
    linkedInLink:  { text: "LinkedIn", link: "https://linkedin.com/in/erikburton1" },
    githubLink:    { text: "GitHub",   link: "https://github.com/erikburton" },
    contactText:         "Email me at cburton@byupathway.edu"
  };

  await Profile.create(data);
  console.log("Seed complete");

  await mongoose.connection.close();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});

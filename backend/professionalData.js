const fs   = require("fs");
const path = require("path");

const imgPath     = path.join(__dirname, "../frontend/erikb.jpg");
const base64Image = fs.readFileSync(imgPath).toString("base64");
module.exports = {
  professionalName: "Erik Burton",
  base64Image,
  nameLink: {
    firstName: "Erik: ",
    url: "https://erikburton.github.io/"
  },
  primaryDescription: "Scrum Master / QA Engineer",
  workDescription1: "Over 10 years automating tests with Selenium, Postman, and Jenkins,",
  workDescription2: "ensuring high-quality releases in agile environments.",
  linkTitleText: "Find me online:",
  linkedInLink: { text: "LinkedIn", link: "https://linkedin.com/in/erikburton1" },
  githubLink:  { text: "GitHub",  link: "https://github.com/erikburton" },
  contactText: "Email me at cburton1@byupathway.edu"
};

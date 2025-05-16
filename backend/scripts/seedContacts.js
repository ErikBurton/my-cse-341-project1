require("dotenv").config();
const mongoose = require("mongoose");
const Contact  = require("../models/Contact");

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");

    // Wipe existing contacts
    await Contact.deleteMany({});
    console.log("Cleared contacts");

    // Sample data
    const sampleContacts = [
      {
        firstName:     "Neil",
        lastName:      "Peart",
        email:         "theprofessor@rush.com",
        favoriteColor: "blue",
        birthday:      new Date("1952-09-28")
      },
      {
        firstName:     "Geddy",
        lastName:      "Lee",
        email:         "glee@rush.com",
        favoriteColor: "green",
        birthday:      new Date("1953-08-16")
      }
    ];

    await Contact.insertMany(sampleContacts);
    console.log("Seeded contacts:", sampleContacts.length);

  } catch (err) {
    console.error("SeedContacts error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

seed();
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

    // Data to seed
    const contacts = [
      {
        firstName: 'Geddy',
        lastName: 'Lee',
        email: 'geddy.lee@rushband.com',
        favoriteColor: 'Sunburst',
        birthday: '1953-07-29', 
      },
      {
        firstName: 'Alex',
        lastName: 'Lifeson',
        email: 'alex.lifeson@rushband.com',
        favoriteColor: 'Teal',
        birthday: '1953-08-27', 
      },
      {
        firstName: 'Neil',
        lastName: 'Peart',
        email: 'neil.peart@rushband.com',
        favoriteColor: 'Silver',
        birthday: '1952-09-12', 
      },
      {
        firstName: 'John',
        lastName: 'Rutsey',
        email: 'john.rutsey@rushband.com',
        favoriteColor: 'Green',
        birthday: '1952-07-23', 
      },
      {
        firstName: 'Jeff',
        lastName: 'Jones',
        email: 'jeff.jones@rushband.com',
        favoriteColor: 'Brown',
        birthday: '1953-09-20', 
      }
    ];

    await Contact.insertMany(contacts);
    console.log("Seeded contacts:", contacts.length);

  } catch (err) {
    console.error("SeedContacts error:", err);
  } finally {
    await mongoose.connection.close();
    console.log("Connection closed");
  }
}

seed();
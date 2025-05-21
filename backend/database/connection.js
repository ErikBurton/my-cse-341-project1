const mongoose = require("mongoose");

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("Missing MONGODB_URI in environment");
  process.exit(1);
}

mongoose
  .connect(mongoUri, {
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// listen for disconnects
mongoose.connection.on("disconnected", () =>
  console.warn("MongoDB disconnected")
);

module.exports = mongoose;
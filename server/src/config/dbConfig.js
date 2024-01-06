const mongoose = require("mongoose");
require("dotenv").config()

const monogooseUrl=process.env.MONGO_URL
mongoose.connect(monogooseUrl);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB is conneted");
});

connection.on("error", (error) => {
  console.log("Error is MongoDB connection", error);
});

module.exports = mongoose;
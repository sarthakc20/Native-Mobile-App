const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(`Connected to DB ${mongoose.connection.host}`.bgCyan.white);
  } catch (error) {
    console.log(`error in connection DB ${error}`.bgBlack.white);
  }
};

module.exports = connectDB;

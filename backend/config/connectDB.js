const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDB = () => {
  mongoose.connect(process.env.DATABASE_URL, {
      family: 4,
    })
    .then(console.log("Connected to MongoDB"))
    .catch((err) => {
      console.log("Error while connecting to db :(");
      console.log(err);
    });
};

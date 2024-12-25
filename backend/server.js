//modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());
//cors
app.use(
    cors({
      origin: '*',
      credentials: true,
    })
  );

//imports
const handleError = require("./middleware/errorHandler");
const { connectDB } = require("./config/connectDB");
const assignSanta = require("./routes/assignSanta");
connectDB();


app.use('/api', assignSanta);

app.use(handleError);
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
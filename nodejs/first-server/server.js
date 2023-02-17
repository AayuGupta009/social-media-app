const express = require("express");
// const db = require("./db");
require("dotenv").config();

const app = express();

// Start the server
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const userRoutes = require("./routes/User.js");
app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  // console.log('Press Ctrl+C to quit.');
});

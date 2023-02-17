const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const db_connect = process.env.MONGO_URI;

app.get('/', (req,res) => {
    res.send("Welcome to Server")
})

const PORT = process.env.PORT || 5000;
mongoose.connect(db_connect, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => app.listen(PORT, () => console.log(`Server running on ${PORT} `)))
.catch((error) => console.log(error));

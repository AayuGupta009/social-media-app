const jwt = require("jsonwebtoken");
const db = require("../db");
require("dotenv").config();

const UserModel = (data) => {
  (Name = data.Name), (Email = data.Email), (Gender = data.Gender);
};

UserModel.getAll = (result) => {
  const query = "Select Name , Email , Gender FROM User";
  db.query(query, (err, data) => {
    if (err) result(null, err);
    else result(null, data);
  });
};

UserModel.Token = (Email, result) => {
  const email = Email;
  const accessToken = jwt.sign(email, process.env.TOKEN_KEY);
  const accessTokenSec = jwt.sign(email, process.env.TOKEN_KEY);
  console.log(accessToken + "   " + accessTokenSec);
  result(null, "Hey");
};

module.exports = UserModel;

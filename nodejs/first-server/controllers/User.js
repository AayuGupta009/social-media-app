const UserModel = require("../models/User.models.js");

exports.getAll = (req, res) => {
  UserModel.getAll((err, result) => {
    if (err) res.send("Can't find posts");
    res.send(result);
  });
};

exports.generateToken = (req, res) => {
  UserModel.Token(req.body.Email, (err, result) => {
    res.redirect("/profile");
    // if (err) res.send(err);
    // else res.send("Token successfully!!");
  });
};

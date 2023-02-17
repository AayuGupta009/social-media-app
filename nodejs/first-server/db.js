const mysql = require("mysql2");

const dbConnect = mysql.createConnection({
  host: "jwt-authentication.cd3xfitpfsc8.ap-south-1.rds.amazonaws.com",
  user: "admin",
  password: "Aayu1234",
  database: "jwt_auth",
  port: 3306,
});

dbConnect.connect((err) => {
  if (err) console.log(err);
  else console.log("Connected!!!!");
});

module.exports = dbConnect;

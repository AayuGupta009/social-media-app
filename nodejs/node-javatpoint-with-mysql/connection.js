var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aayu@123",
});

con.connect((err) => {
  // if (err) throw err;
  console.log("Connected with DB!!!!");
});

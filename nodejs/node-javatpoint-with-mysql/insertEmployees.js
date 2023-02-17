var mysql = require("mysql2");
var con = mysql.createConnection({
  host: "localhost",
  user: "Aayush",
  password: "Aayu@123",
  database: "Dummy",
});
con.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

var query = "INSERT INTO Employees (id , Name , Age , City , Salary) VALUES?";

var values = [
  [7, "Tom Cruise", 56, "London", 340000],
  [8, "The Rock", 51, "Jumanji", 560000],
  [9, "Shah Rukh Khan", 54, "Mannat", 170000],
];

con.query("DROP TABLE Job", (err, result) => {
  if (err) throw err;
  console.log("Table Dropped!!");
});

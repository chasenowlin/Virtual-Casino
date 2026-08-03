const mysql = require("mysql2/promise");
const db = mysql.createPool({
  host: process.env.DB_IP,
  user: "casinoguest",
  password: process.env.DB_PASSWORD,
  database: "virtualcasino",
});
module.exports = db;

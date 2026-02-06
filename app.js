require("dotenv").config();
const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 4000;
const { faker } = require("@faker-js/faker");
const bodyParser = require("body-parser");

// SET OUR ENGINE;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views/public"));
//  CONNECTING TO THE DATABSE; NOW;
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Sharitech",
//   database: "node_sql_db",
// });
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// LETS FIRST USE EXPRESS ONLY FOR NOW;
app.get("/", (req, res) => {
  // We want to return the number of users from our database;
  let myCount = "SELECT COUNT(*) AS count FROM users";
  connection.query(myCount, (err, result) => {
    if (err) throw err;
    let count = result[0].count;
    res.render("Home", { users: count });
  });
  //res.send("we have" + users + "users"); // something like this;
});

// POST REQUESTS ARE TACKLED IN THIS WAY;
app.post("/register", (req, res) => {
  let person = { email: req.body.email };
  connection.query("INSERT INTO users SET ?", person, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.redirect("/");
  });
});
// START THE SERVER;
app.listen(port, () => {
  console.log(`Example Sharitech is  listening on port ${port}`);
});
// LET THIS WAIT FIRST;

// app.get("/joke", (req, res) => {
//   let joke = "Sharif will be meeting us at the joking center!!!!!!";
//   res.send(joke);
//   //res.send("Hello World! I have just started learning Node.js and MySQL");
// });
// // SELECTING DATA;
// // let myTime = "SELECT COUNT(*) AS total_users FROM users";
// // connection.query(myTime, (err, result) => {
// //   if (err) {
// //     console.error(err.message);
// //     return;
// //   }
// //   //console.log("✅ MySQL connected");
// //   console.log(result);
// //   // End the connection after the query is done
// //   connection.end();
// // });

// //INSERTING DATA;
// // let person = { email: faker.internet.email() };
// // connection.query("INSERT INTO users SET ?", person, (err, result) => {
// //   if (err) {
// //     console.error(err.message);
// //     return;
// //   }
// //   //console.log("✅ MySQL connected");
// //   console.log(result);
// //   // End the connection after the query is done
// //   connection.end();
// // });

// // INSERTING MULTIPLE DATA;
// let data = [];
// //for loop
// for (let i = 0; i < 500; i++) {
//   data.push([faker.internet.email(), faker.date.past()]);
// }

// //console.log(data);

// //let many = `INSERT INTO USERS(email, create_at) VALUES ?`;
// connection.query(many, [data], (err, result) => {
//   if (err) {
//     console.error(err.message);
//     return;
//   }
//   //console.log("✅ MySQL connected");
//   console.log(result);
//   // End the connection after the query is done
//   connection.end();
// });

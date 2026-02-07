console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import type { Request, Response } from "express";
import { Connection } from "mysql2";
import mysql from "mysql2";
import { faker } from "@faker-js/faker";
import type { RowDataPacket } from "mysql2";
const app = express();
const port = 4000;
//import bodyParser from "body-parser";

export interface User {
  id?: number; // optional because DB auto-generates it
  email: string;
  created_at?: Date; // optional if auto-filled
}

// SET OUR ENGINE;
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("views/public"));
//CONNECTING TO MYSQL
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// LETS FIRST USE EXPRESS ONLY FOR NOW;
app.get("/", async (req: Request, res: Response) => {
  try {
    interface countRow extends RowDataPacket {
      count: number;
    }

    const [rows] = await connection
      .promise()
      .query<countRow[]>("SELECT COUNT(*) AS count FROM users");

    const count = rows[0].count;
    res.render("Home", { users: count });
  } catch (err) {
    console.error(err);
    res.status(500).send("Database query failure");
  }
});
// POST REQUESTS ARE TACKLED IN THIS WAY;
app.post("/register", async (req: Request, res: Response) => {
  try {
    let person: User = { email: req.body.email };

    const [result] = await connection
      .promise()
      .query("INSERT INTO users SET ?", [person]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database insertion failure");
  }
});
// START THE SERVER;
app.listen(port, (): void => {
  console.log(`Example Sharitech is  listening on port ${port}`);
});
// We want to return the number of users from our database;
//   let myCount = "SELECT COUNT(*) AS count FROM users";
//   connection.query<RowDataPacket[]>(myCount, (err, result) => {
//     if (err) throw err;
//     let  count : number = result[0].count;
//     res.render("Home", { users: count });
//   });

// });
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
//  CONNECTING TO THE DATABSE; NOW;
// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Sharitech",
//   database: "node_sql_db",
// })

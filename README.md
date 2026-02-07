Node.js + Express + MySQL + Typescript User Management Mini Project

A simple Node.js project that connects Express and MySQL to manage user emails. The project allows adding user
emails through a UI and dynamically tracks the total number of users. It also comes pre-populated with 500 users generated using Faker.js for testing.

Features

Add user emails through a simple web interface.

Store and manage emails in a MySQL database.

Pre-populated database with 500 fake users using Faker.js.

Real-time update of total number of users.

Simple and clean UI for easy testing.

Tech Stack

Backend: Node.js, Express (just connecting backend and Databases)

Database: MySQL

Fake Data: Faker from express

Frontend: Basic HTML/CSS (served via Express)

Typescript.

Installation

Clone the repository

git clone <your-repo-url>
cd <your-repo-folder>

Install dependencies

npm install

Setup MySQL Database

Create a database (e.g., node_sql_db) in MySQL.

Import the provided SQL dump if included, or let the app create the necessary table.

Example SQL:

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

     Configure database connection

REPLACE THESE WITH YOUR CREDENTIALS.

     const port = 4000;
     const { faker } = require("@faker-js/faker");
      const bodyParser = require("body-parser");

      // SET OUR ENGINE;
     app.set("view engine", "ejs");
                 app.use(bodyParser.urlencoded({ extended: true }));
         app.use(express.static("views/public"));

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



OR VISIT https://expressjs.com/

YOU WILL NEED THE .ENV file
Usage

Start the server

node app.js

Open your browser

Add a new user email

Enter an email in the form.

Click join now to save it to the database.

The total number of users will update automatically.

Project Structure
├── app.js # Main server file
├── package.json # Project dependencies
├── views/
│ └── Home.ejs # Frontend UI
├── public/
│ └── app.css # Styles
├── seed.js # Faker.js user generator
└── README.md # Project documentation

Dependencies

express

mysql2

faker

ejs

Screenshots

<img width="1366" height="658" alt="Screenshot (50)" src="https://github.com/user-attachments/assets/34f78532-2f0f-4eb2-aae3-91d6464f94e3" />

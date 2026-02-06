const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");

// console.log(faker.internet.email());
// console.log(faker.date.past());

function generateAddress() {
  console.log(faker.location.city()); // replace the address method
  console.log(faker.location.state()); // replace the address method
  console.log(faker.location.streetAddress()); // replace the address method
}
generateAddress();

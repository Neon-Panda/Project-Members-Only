import pg from "pg";
import "dotenv/config";
const { Client } = pg;

const SQL = `
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255),
  status VARCHAR(255)
);

CREATE TABLE user_post (
  id SERIAL PRIMARY KEY,
  post_text VARCHAR(255),
  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by_id INT NOT NULL,
  FOREIGN KEY (created_by_id) REFERENCES users(id)
);

INSERT INTO 
users (first_name, last_name, email, password, status)
VALUES
('John', 'Smith', 'johnsmith@example.com', '123', 'member'),
('Will', 'Rivers', 'willrivers@example.com', '123', 'member'),
('Helena', 'Wells', 'helenawells@example.com', '123', 'admin');

INSERT INTO
user_post (post_text, created_by_id)
VALUES
('Hello this is my message', 1),
('Hello its my first time here', 2),
('I like it here very much', 2),
('I am an Admin', '3');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.poolInfo,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done");
}
main();

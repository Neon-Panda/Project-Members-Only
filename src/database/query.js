import { pool } from "./pool.js";

export async function registerUser(
  first_name,
  last_name,
  email,
  password,
  status
) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password, status) VALUES ($1, $2, $3, $4, $5)",
    [first_name, last_name, email, password, status]
  );
}

export async function getUserByEmail(email) {
  return await pool.query("SELECT * FROM users WHERE email = $1", [email]);
}

export async function getUserByID(id) {
  return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
}

export async function getAllPost() {
  return await pool.query(
    "SELECT first_name, last_name, email, post_text, created_by_id FROM users LEFT JOIN user_post ON users.id = user_post.created_by_id WHERE created_by_id IS NOT NULL"
  );
}

export async function getUserPostByEmail(email) {
  return await pool.query(
    "SELECT first_name, last_name, email, post_text FROM users LEFT JOIN user_post ON users.id = user_post.created_by_id WHERE email = $1",
    [email]
  );
}

import { pool } from "./pool.js";

export async function registerUser(first_name, last_name, email, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
    [first_name, last_name, email, password]
  );
}

export async function makeUserMember(userID) {
  return await pool.query(
    "UPDATE users SET member = true WHERE users.id = $1",
    [userID]
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

export async function createPost(postText, userID) {
  return await pool.query(
    "INSERT INTO user_post(post_text, created_by_id) VALUES ($1, $2)",
    [postText, userID]
  );
}

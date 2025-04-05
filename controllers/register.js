import bcrypt from "bcryptjs";
import * as db from "../db/query.js";

export function page(request, response) {
  response.render("sign-up-form");
}

export async function register(request, response) {
  console.log(request.body);
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    await db.registerUser(
      request.body.first_name,
      request.body.last_name,
      request.body.email,
      hashedPassword,
      "member"
    );
    response.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

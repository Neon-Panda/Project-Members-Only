import bcrypt from "bcryptjs";
import * as db from "../database/query.js";
import "dotenv/config";

export async function register(request, response) {
  try {
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    await db.registerUser(
      request.body.first_name,
      request.body.last_name,
      request.body.email,
      hashedPassword
    );
    response.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
}

export function login(request, response) {
  response.redirect("/");
}

export function logout(request, response) {
  if (!request.user) return response.sendStatus(401);

  request.logout((error) => {
    if (error) return response.sendStatus(400);
    response.sendStatus(200);
  });
}

export async function makeMember(request, response) {
  const secretCode = request.body.memberSecret;
  const userObj = request.session.passport.user;

  if (secretCode === process.env.secretMember) {
    await db.makeUserMember(userObj.userID);
    return response.send(200);
  }
  response.send("Could not make you a member");
}

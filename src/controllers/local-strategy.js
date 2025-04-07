import passport from "passport";
import { Strategy } from "passport-local";
import * as db from "../database/query.js";
import bcrypt from "bcryptjs";

passport.serializeUser((user, done) => {
  console.log("Inside serialize user");
  console.log(user);
  done(null, user.id);
});

passport.deserializeUser((userID, done) => {
  console.log("inside deserialize user");
  console.log("user ID", userID);
  try {
    const findUser = db.getUserByID(userID);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport.use(
  new Strategy({ usernameField: "email" }, async (email, password, done) => {
    try {
      const { rows } = await db.getUserByEmail(email);
      const user = rows[0];

      if (!user) throw new Error("Invalid email");

      const match = await bcrypt.compare(password, user.password);
      if (!match) throw new Error("Invalid password");

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

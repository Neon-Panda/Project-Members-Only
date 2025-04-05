import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import router from "./routes/router.js";

const app = express();

app.set("views", path.join(import.meta.dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(router);

app.listen(3000, () => console.log("Server listening on port 3000"));

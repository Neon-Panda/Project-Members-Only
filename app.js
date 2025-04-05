import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import "dotenv/config";

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
ap.use(express.urlencoded({ extended: false }));

app.get("/");

app.get("/sign-up");
app.post("/sign-up");

app.post("/log-in");

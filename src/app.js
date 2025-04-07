import express from "express";
import path from "node:path";
import session from "express-session";
import passport from "passport";
import "dotenv/config";
import routes from "./routes/index.js";

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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

const PORT = process.env.POR || 3000;
app.listen(PORT, () => console.log("Server: ", PORT));

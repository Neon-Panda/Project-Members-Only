import { Router } from "express";
import * as render from "../controllers/render.js";
import * as auth from "../controllers/auth.js";
import passport from "passport";
import "../controllers/local-strategy.js";

const routes = Router();

routes.get("/", render.home);
routes.get("/register", render.register);
routes.get("/login", render.login);

routes.post("/register", auth.register);
routes.post("/login", passport.authenticate("local"), auth.login);
routes.post("/logout", auth.logout);

export default routes;

import { Router } from "express";
import * as render from "../controllers/render.js";
import * as auth from "../controllers/auth.js";
import * as validators from "../controllers/validators.js";
import * as create from "../controllers/create.js";
import passport from "passport";
import "../config/local-strategy.js";

const routes = Router();

routes.get("/", render.home);
routes.get("/register", render.register);
routes.get("/login", render.login);
routes.get("/make-member", render.makeMember);

routes.post(
  "/register",
  validators.registerBodyChecker,
  validators.register,
  auth.register
);
routes.post("/login", passport.authenticate("local"), auth.login);
routes.post("/logout", auth.logout);
routes.post("/make-member", auth.makeMember);
routes.post("/create-post", create.post);

routes.get("/login-status", (request, response) => {
  console.log(request.session);
  response.send(200);
});

export default routes;

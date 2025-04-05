import { Router } from "express";
import { home } from "../controllers/home.js";
import * as register from "../controllers/register.js";

const router = Router();

router.get("/", home);

// router.post("/log-in");

router.get("/register", register.page);
router.post("/register", register.register);

export default router;

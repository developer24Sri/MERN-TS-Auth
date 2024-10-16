import express from "express";
import { signup, login } from "../controllers/authController";
import { validateSignup, validateLogin } from "../validation/authValidation";

const router = express.Router();

router.post("/signup", validateSignup, signup); // 1. validateSignup runs first, 2. Then signup controller runs
router.post("/login", validateLogin, login); // 1. validateLogin runs first, 2. Then login controller runs

export default router;

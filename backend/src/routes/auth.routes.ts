import express from "express";
import { signinHandler, signupHandler } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/api/auth/signup", signupHandler);
router.post("/api/auth/signin", signinHandler);

export default router;

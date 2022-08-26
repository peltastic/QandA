import express from "express";
import { signUpUser } from "../controllers/auth.controllers";

const router = express.Router();

router.post("/api/auth/signup", signUpUser);

export default router

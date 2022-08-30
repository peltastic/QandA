import express from "express";
import { verifyUser } from "../controllers/user.controller";
const router = express.Router();

router.post("/api/users/:id/:verificationCode/:accountType", verifyUser);

export default router;

import Router from "express";
import { googleLogin } from "../controllers/authController.js";
export const router = Router();
router.get("/google",googleLogin)
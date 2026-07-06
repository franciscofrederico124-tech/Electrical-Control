import express from "express";
import auth from "../controllers/auth.js";
import authSession from "../middlewares/auth-middlewares.js"

const router = express.Router();

router.post("/login", auth.login);

export default router;
import express from "express";
const router = express.Router();

import systemControllers from "../controllers/system-controllers.js";

router.get("/ping", systemControllers.ping);

export default router
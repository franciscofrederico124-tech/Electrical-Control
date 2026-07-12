import express from "express";
const router = express.Router();

import systemControllers from "../controllers/system-controllers.js";
import getdData from "../services/get_data.js";
import setData from "../services/set_dados.js";

router.get("/ping", systemControllers.ping);
router.post("/get-data", getdData);
router.get("/set-data", setData);

export default router
import express from "express";
import pages from "../controllers/pages.js";
import authSession from "../middlewares/auth-middlewares.js";

const router = express.Router();

router.get("/", authSession.authSession, pages.home);
router.get("/login", authSession.authLogin, pages.login);
router.get("/sobre",authSession.authSession, pages.about);
router.get("/controlar", authSession.authSession, pages.control);
router.get("/configuracoes", authSession.authSession, pages.config);

router.get("/*any", authSession.authSession, pages.redirect);

export default router
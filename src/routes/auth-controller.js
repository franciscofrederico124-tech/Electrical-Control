import express from "express";
import auth from "../controllers/auth.js";
import authSession from "../middlewares/auth-middlewares.js"

const router = express.Router();

router.post("/login", auth.login);
router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Erro ao destruir sessão:", err);
            return res.status(500).send("Erro ao sair");
        }

        res.clearCookie('connect.sid');
        return res.redirect("/inicio/login");
    });
})

export default router;
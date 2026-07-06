import db from "../config/conn.js";
import bcrypt from "bcryptjs";

async function login(req, res) {
    try {

        if (req.session && req.session.user)
        {
            return res.status(409).json({
                success: false,
                message: "Você já está logado! ",
            })
        }
        const data = req.body;

        if (!data || !data.email || !data.password || !(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(data.email)) {
            return res.status(400).json({
                success: false,
                message: "E-mail ou senha incorretos.",
            });
        }

        const localData = db.prepare(`SELECT * FROM users WHERE email = ?`).get(data.email);

        if (!localData) {
            return res.status(400).json({
                success: false,
                message: "E-mail ou senha incorretos.",
            });
        }

        const hashedPassword = localData.password;
        const permission = await bcrypt.compare(data.password, hashedPassword);

        if (!permission) {
            return res.status(400).json({
                success: false,
                message: "E-mail ou senha incorretos."
            });
        }

        req.session.user = {
            name: localData.name,
            email: localData.email,
            role: localData.role,
            id: localData.id,
        };
        
        return res.status(200).json({
            success: true,
            message: "Sucesso. Seja bem-vindo de volta!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor.",
        });
    }
}

export default {
    login
};

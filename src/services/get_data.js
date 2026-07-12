import dataStore from "../hooks/data.js";

export default function getdData(req, res) {
    try {
        const data = req.body;

        if (!data || !data.data || !data.firmware || !data.time) {
            return res.status(400).json({
                success: false,
                message: "Faltam dados no corpo da requisição!"
            });
        }

        dataStore.currentData = data;

        return res.status(200).json({
            success: true,
            message: "Dados recebidos com sucesso!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor!",
        });
    }
}

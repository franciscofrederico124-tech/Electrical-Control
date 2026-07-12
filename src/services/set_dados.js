import dataStore from "../hooks/data.js";

export default function setData(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({
                success: false,
                message: "Acesso negado. Sessao invalida ou expirada!"
            });
        }

        if (!dataStore || !dataStore.currentData) {
            return res.status(404).json({
                success: false,
                message: "Nenhum dado encontrado no sistema!"
            });
        }

        return res.status(200).json({
            success: true,
            currentData: dataStore.currentData
        });
    }
    catch (error) {
        console.error("Erro ao consumir dados do sistema:", error);
        return res.status(500).json({
            success: false,
            message: "Erro interno no servidor!"
        });
    }
}

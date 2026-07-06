import dotenv from "dotenv";
import db from "./conn.js";
import bcrypt from "bcryptjs";

dotenv.config();

export default async function initSytem() {
    try {
        const initalTable = db.prepare(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMATY KEY AUTO INCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                password,
                role TEXT DEFAULT "user"
            );
        `);

        const consultDefaultUser = `
            SELECT * FROM users WHERE name = ? AND email = ?
        `;
        
        const defaultUser = `
            INSERT INTO users ( name, email, password, role ) VALUES ( @name, @email, @password, @role )
        `;

        const defaultUserData = {
            name: "Electrial control Amdin",
            email: "admin2026@gmail.com",
            password: await bcrypt.hash(process.env.DEFAULT_PASSOWRD, 10),
            role: "geral admin"
        }

        console.log("| > Configurando  Tabel inicial...");
        initalTable.run();

        console.log("| > Tabela inicial configirada com sucesso! ");

        console.log("| > Configurano usuário padrão... ");
        

        const data = db.prepare(consultDefaultUser).get(defaultUserData.name, defaultUserData.email);
        let exists = data ? true : false;

        if  (exists)
        {
            console.log("| > Configuração completa!");
        }
        else
        {
            db.prepare(defaultUser).run(defaultUserData);
            console.log("| > Sistema configuradi  com sucesso! ");
        }
    }
    catch (error) {
        console.log("| > Erro ao configrar sistema -> ", error);
    }
}
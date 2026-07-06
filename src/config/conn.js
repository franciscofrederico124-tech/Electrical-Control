import Database from "better-sqlite3";
import path from "path";

const __dirname = import.meta.dirname;

const db = new Database(path.resolve(__dirname, "../controll.db"));


export default db;
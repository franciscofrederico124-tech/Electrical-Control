import express from "express";
import session from "express-session";
import path from "path";
import { engine } from "express-handlebars";
import cors from "cors";
import dotenv from "dotenv";

import initSytem from "./config/init-system.js";
import systemRoutes from "./routes/system-routes.js";
import pages from "./routes/handlebars-pages.js";
import auth from "./routes/auth-controller.js";


dotenv.config();

const app = express();
const __dirname = import.meta.dirname;

app.use(express.json());

app.use(cors({
    origin: true,
    Credential: true,
}));

app.use(session({
    secret: "Industrial_control_secret_key",
    resave: false,
    saveUnitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: false,
    }
}));


app.engine("hbs", engine({
    extname: ".hbs"
}))
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "./views"));

app.use(express.static(path.resolve(__dirname, "../public")));
app.use(express.static(path.resolve(__dirname, "../node_modules/bootstrap-icons/font")));

const port = process.env.PORT;
initSytem();

app.use("/system", systemRoutes);
app.use("/inicio", pages);
app.use("/auth", auth);

app.use(pages);

app.listen(port, () => {
    console.log(`
 > Server on in http://127.0.0.1:${port}
        `);
})
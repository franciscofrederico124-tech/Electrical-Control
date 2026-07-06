async function home(req, res) {
    res.status(200).render("pages/home", { activeHome: true });
}

async function about(req, res) {
    res.status(200).render("pages/about", { activeAbout: true });
}
async function control(req, res) {
    res.status(200).render("pages/control", { activeControl: true });
}
async function config(req, res) {
    res.status(200).render("pages/config", { activeSettings: true });
}
async function login(req, res) {
    res.status(200).render("auth/login", {
        layout: false
    })
}

async function redirect(req, res) {
    res.redirect(303, "/inicio");
}
export default {
    home,
    about,
    config,
    control,
    login,
    redirect,

}
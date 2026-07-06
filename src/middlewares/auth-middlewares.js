async function authSession(req, res, next) {
    if (!req.session || !req.session.user) {
        return res.redirect(303, "/inicio/login");
    }
    next();
}

async function authLogin(req, res, next) {
    if (req.session && req.session.user) {
        return res.redirect(303, "/inicio/dashboard");
    }
    next();
}

export default {
    authSession,
    authLogin
};

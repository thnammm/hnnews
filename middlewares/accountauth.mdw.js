module.exports = (req, res, next) => {
    if (req.user && req.user.role_id != 4) {
        res.locals.isAuthenticatedAccount = true;
        res.locals.authAccount = req.user;
    }

    next();
}
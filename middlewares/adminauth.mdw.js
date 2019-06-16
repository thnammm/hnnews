module.exports = (req, res, next) => {
    if (req.user && req.user.role_id == 4) {
        res.locals.isAuthenticatedAdmin = true;
        res.locals.authAdmin = req.user;
    }

    next();
}
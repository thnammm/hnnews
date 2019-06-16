module.exports = (req, res, next) => {
    if (!req.user || req.user.role_id == 4) {
        res.redirect('/dangnhap');
    } else next();
}
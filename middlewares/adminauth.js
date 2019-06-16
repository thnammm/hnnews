module.exports = (req, res, next) => {
    if (!req.user) {
        res.redirect('/admin');
    } else if (req.user && req.user.role_id != 4) {
        res.render('pages/index', {
            err_message: 'Tài khoản không có quyền truy cập vào trang Quản trị viên'
        })
    } else next();
}
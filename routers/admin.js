var express = require('express');
var passport = require('passport');
var app = express.Router();

var adminauth = require('../middlewares/adminauth.js');
module.exports = app;

app.get('/admin', function (req, res, next) {
    if (req.user && req.user.role_id == 4) {
        res.redirect('/admin-dashboard');
    } else if (req.user) {
        res.render('pages/index', {
            err_message: 'Tài khoản không có quyền truy cập vào trang <span class="text-blue"> Quản trị viên </span>'
        })
    } else
        res.render('pages/admin');
})

app.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('pages/admin', {
                err_message: info.message
            })
        }


        req.logIn(user, err => {
            if (err)
                return next(err);

            if (user.role_id == 4) {
                return res.redirect('/admin-dashboard');
            } else {
                req.logOut();
                return res.render('pages/admin', {
                    err_message: 'Tài khoản của bạn không đủ quyền truy cập'
                })
            }
        });
    })(req, res, next);
})
var express = require('express');
var bcrypt = require('bcrypt');
var path = require('path');
var passport = require('passport');

var app = express.Router();
var account = require('../models/account.model.js');

var accountauth = require('../middlewares/accountauth.js');

app.use(express.static(path.join(__dirname, 'public')));

// Register

app.get('/dangky', function (req, res, next) {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (req.user && req.user.role_id != 4) {
        res.redirect('/thongtincanhan');
    } else
        res.render('pages/register');
})

app.post('/dangky/taotaikhoan', function (req, res, next) {
    var saltRounds = 10;
    var passhashed = '';
    if (req.body.pass === '' || req.body.pass.length < 6) {
        passhashed = '';
    } else {
        passhashed = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    var entity = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: passhashed
    }

    if (entity.username === '' || entity.fullname === '' || entity.email === '' || entity.password === '') {
        res.send("FailFull");
    } else {
        account.register(entity.username, entity.password, entity.fullname, entity.email)
            .then(id => {
                if (id[0][0].count === '0') {
                    res.send("FailEmail");
                } else if (id[0][0].count === '1') {
                    res.send("FailUserName");
                } else if (id[0][0].count === '2') {
                    res.send("FailBoth");
                } else {
                    res.send("Success");
                }
            })
            .catch(next)
    }
})

// Login

app.get('/dangnhap', function (req, res, next) {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (req.user && req.user.role_id != 4) {
        res.redirect('/thongtincanhan');
    } else
        res.render('pages/login');
})

app.post('/dangnhap', function (req, res, next) {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            return res.render('pages/login', {
                err_message: info.message
            })
        }

        req.logIn(user, err => {
            if (err)
                return next(err);

            if (user.role_id != 4) {
                return res.redirect('/');
            } else {
                return res.render('pages/register', {
                    err_message: 'Bạn phải đăng ký tài khoản mới, <span class="text-alert"> không thể </span> dùng tài khoản <span class="text-bold"> Quản trị viên </span> để đăng nhập trang báo.'
                })
            }
        });
    })(req, res, next);
})

// Forget Password
app.get('/quenmatkhau', function (req, res, next) {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if ((!req.user) || (req.user && req.user.role_id == 4))
        res.render('pages/forget-password');
})

module.exports = app;
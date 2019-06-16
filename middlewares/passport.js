var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt');
var accountModel = require('../models/account.model.js');

module.exports = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());

    var ls = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, (username, password, done) => {
        accountModel.login(username).
            then(rows => {
                if (rows[0].length === 0) {
                    return done(null, false, { message: 'Tên đăng nhập <span class="text-alert"> không đúng </span>. Vui lòng <span class="text-bold"> nhập lại </span> thông tin để đăng nhập.' });
                }

                var user = rows[0][0];
                var ret = bcrypt.compareSync(password, rows[0][0].password);
                if (ret) {
                    return done(null, user);
                }

                return done(null, false, { message: 'Mật khẩu <span class="text-alert"> không đúng </span>. Vui lòng <span class="text-bold"> kiểm tra lại </span> mật khẩu của tài khoản.' })
            })
            .catch(err => {
                return done(err, false);
            })
    });

    passport.use('local', ls);

    passport.serializeUser((user, done) => {
        return done(null, user);
    });

    passport.deserializeUser((user, done) => {
        return done(null, user);
    });
}
var express = require('express');
var bcrypt = require('bcrypt');
var path = require('path');

var app = express.Router();
var account = require('../models/account.model.js');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/dangky', function (req, res) {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    res.render('pages/register');
})

app.post('/dangky/taotaikhoan', function (req, res) {
    var saltRounds = 10;
    var passhashed = '';
    if (req.body.pass === '') {
        passhashed = '';
    } else {
        passhashed = bcrypt.hashSync(req.body.password, saltRounds);
    }

    var entity = {
        username: req.body.username,
        fullname: req.body.fullname,
        email: req.body.email,
        password: passhashed
    }

    if (entity.username === '' || entity.fullname === '' || entity.email === '') {
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
            .catch(err => {
                console.log(err);
            })
    }
})

module.exports = app;
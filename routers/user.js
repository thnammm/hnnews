var express = require('express');
var app = express.Router();
var user = require('../models/user.model.js');

module.exports = app;

app.get('/user', function (req, res) {
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    user.load(1).then(user => {
        vm = {
            fullname: user[0][0].full_name,
            email: user[0][0].email,
            dob: user[0][0].dob
        }
        res.render('pages/user', {vm});
    }).catch(err => {
        console.log(err)
    })
})


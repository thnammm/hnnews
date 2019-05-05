var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/user', function (req, res) {
    res.render('pages/user');
})
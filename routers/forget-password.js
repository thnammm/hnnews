var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/forget-password', function(req, res) {
    res.render('pages/forget-password');
})
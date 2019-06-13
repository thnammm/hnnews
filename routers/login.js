var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/login', function(req, res) {
    res.render('pages/login');
})
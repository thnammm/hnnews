var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/register', function(req, res) {
    res.render('pages/register');
})
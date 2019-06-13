var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/admin', function (req, res) {
    res.render('pages/admin');
})
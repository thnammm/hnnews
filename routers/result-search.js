var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/result-search', function(req, res) {
    res.render('pages/result-search');
})
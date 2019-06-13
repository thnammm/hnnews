var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/detail-eachpost', function (req, res) {
    res.render('pages/detail-eachpost');
})
var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/hashtag-detail', function(req, res) {
    res.render('pages/hashtag-detail');
})
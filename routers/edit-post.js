var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/edit-post', function (req, res) {
    res.render('pages/edit-post');
})
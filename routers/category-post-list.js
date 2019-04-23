var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/category-post-list', function(req, res) {
    res.render('pages/category-post-list');
})
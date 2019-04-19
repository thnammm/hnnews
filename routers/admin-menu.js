var express = require('express');
var app = express.Router();
module.exports = app;

app.get('/admin-account', function(req, res) {
    res.render('pages/admin-account');
})

app.get('/admin-posts', function(req, res) {
    res.render('pages/admin-posts');
})

app.get('/admin-category', function(req, res) {
    res.render('pages/admin-category');
})

app.get('/admin-tag', function(req, res) {
    res.render('pages/admin-tag');
})
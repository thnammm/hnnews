var express = require('express');
var app = express.Router();
var tagmodel = require('../models/hashtag.model.js');
module.exports = app;

app.get('/hashtag-list', function (req, res) {
    var alltag = tagmodel.all();
    Promise.all([alltag]).then(([alltag]) => {
        res.render('pages/hashtag-list', {
            alltag: alltag
        });
    }).catch(err => {
        console.log(err);
    })
})
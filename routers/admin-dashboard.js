var express = require('express');
var app = express.Router();
var admin = require('../models/admin.model.js');
module.exports = app;

app.get('/admin-dashboard', function (req, res) {
    var admincategory = admin.allcategory();
    var categorydad = admin.category();
    var editor = admin.editor();

    // ID Automatically increase
    var Handlebars = require('handlebars');
    Handlebars.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    // Promise.then.catch and Render pages
    Promise.all([admincategory, categorydad, editor]).then(([admincategory, categorydad, editor]) => {
        res.render('pages/admin-dashboard', {
            categorylist: admincategory,
            categorydad: categorydad,
            editorlist: editor
        });
    }).catch(err => {
        console.log(err);
    })
})

app.post('/admin-dashboard/add', function (req, res) {
    var entity = {
        dad: req.body.categorydad,
        son: req.body.categoryson,
        editor: req.body.categoryeditor
    }

    admin.add(entity)
        .then(id => {
            console.log(id);
            res.render('pages/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})
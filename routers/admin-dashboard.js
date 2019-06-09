var express = require('express');
var app = express.Router();
var admin = require('../models/admin.model.js');
module.exports = app;

app.get('/admin-dashboard', function (req, res) {
    // Post
    var adminpost = admin.allpost();

    // Category
    var admincategory = admin.allcategory();
    var categorydad = admin.category();
    var editor = admin.editor();

    // Tag
    var admintag = admin.alltag();

    // ID Automatically increase
    var Handlebars = require('handlebars');
    Handlebars.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    // If Equals Handlebars
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // Promise.then.catch and Render pages
    Promise.all([admincategory, categorydad, editor, admintag, adminpost])
        .then(([admincategory, categorydad, editor, admintag, adminpost]) => {
            res.render('pages/admin-dashboard', {
                categorylist: admincategory,
                categorydad: categorydad,
                editorlist: editor,
                taglist: admintag,
                postlist: adminpost
            });
        }).catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/addcategory', function (req, res) {
    var entity = {
        dad: req.body.categorydad,
        son: req.body.categoryson,
        editor: req.body.categoryeditor
    }

    admin.addcategory(entity)
        .then(id => {
            console.log(id);
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/addtag', function (req, res) {
    var entity = req.body.tagname;

    admin.addtag(entity)
        .then(id => {
            console.log(id);
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})
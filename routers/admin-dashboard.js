var express = require('express');
var app = express.Router();
var admin = require('../models/admin.model.js');
module.exports = app;

app.get('/admin-dashboard', function (req, res) {
    //Account
    var numberaccount = admin.numberaccount();
    var adminaccount = admin.allaccount();
    var adminuser = admin.alluser();
    var adminwriter = admin.allwriter();
    var admineditor = admin.alleditor();

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
    Promise.all([admincategory, categorydad, editor, admintag, adminpost, numberaccount, adminaccount, adminuser, adminwriter, admineditor])
        .then(([admincategory, categorydad, editor, admintag, adminpost, numberaccount, adminaccount, adminuser, adminwriter, admineditor]) => {
            res.render('pages/admin-dashboard', {
                categorylist: admincategory,
                categorydad: categorydad,
                editorlist: editor,
                taglist: admintag,
                postlist: adminpost,
                numberaccount: numberaccount,
                accountlist: adminaccount,
                userlist: adminuser,
                writerlist: adminwriter,
                editorlist: admineditor
            });
        }).catch(err => {
            console.log(err);
        })
})

// Post

app.get('/admin-editpost/:id', function (req, res) {
    var id = req.params.id;

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(id)) {
        res.render('pages/admin-editpost', {
            error: true
        });
    }

    admin.singlepost(id).then(rows => {
        if (rows.length > 0) {
            if (rows[0][0].count === '0') {
                res.render('pages/admin-editpost', {
                    error: true
                });
            } else {
                admin.tagofpost(id).then(ids => {
                    var tagString = { data: "", length: 0 };
                    for (var i = 0; i < ids[0].length; i++) {
                        if (i === ids[0].length - 1) {
                            tagString.data += ids[0][i].tag_name;
                            tagString.length += 1;
                        } else {
                            tagString.data += ids[0][i].tag_name + ", ";
                            tagString.length += 1;
                        }
                    }
                    rows[0][0].tagpost = tagString;

                    res.render('pages/admin-editpost', {
                        post: rows[0],
                        error: false
                    });
                })
                    .catch(err => {
                        console.log(err);
                        res.render('pages/admin-editpost', {
                            error: true
                        });
                    })
            }
        }
    }).catch(err => {
        console.log(err);
        res.render('pages/admin-editpost', {
            error: true
        });
    })
})

app.post('/admin-dashboard/updatepost', function (req, res) {
    var entity = {
        id: req.body.id,
        poststatus: req.body.poststatus
    }

    admin.updatepost(entity.id, entity.poststatus)
        .then(id => {
            res.send("Success");
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/deletepost', function (req, res) {
    var id = req.body.postid;

    admin.deletepost(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

// Category

app.post('/admin-dashboard/addcategory', function (req, res) {
    var entity = {
        subcat: req.body.subcat,
        cat: req.body.cat,
        editor: req.body.editor
    }

    if (entity.cat === '') {
        entity.cat = null;
    }

    if (entity.editor === '') {
        entity.editor = null;
    }

    admin.addcategory(entity)
        .then(id => {
            console.log(id);
            if (id[0][0].count === '1') {
                res.send("FailNotEnough");
            } else if (id[0][0].count === '0') {
                res.send("FailSame");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/admin-editcategory/:id', function (req, res) {
    var id = req.params.id;

    if (isNaN(id)) {
        res.render('pages/admin-editcategory', {
            error: true
        });
    }

    admin.singlecategory(id).then(rows => {
        if (rows.length > 0) {
            if (rows[0][0].count === '0') {
                res.render('pages/admin-editcategory', {
                    error: true
                });
            } else {
                res.render('pages/admin-editcategory', {
                    category: rows[0],
                    error: false
                });
            }
        }
    }).catch(err => {
        console.log(err);
        res.render('pages/admin-editcategory', {
            error: true
        });
    })
})

app.post('/admin-dashboard/updatecategory', function (req, res) {
    var entity = {
        id: req.body.id,
        catname: req.body.newcatname
    }

    admin.updatecategory(entity.id, entity.catname)
        .then(id => {
            console.log(id);
            if (id[0][0].count === '0') {
                res.send("FailTyping");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/deletecategory', function (req, res) {
    var id = req.body.subcatid;

    admin.deletecategory(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

// Tag

app.post('/admin-dashboard/addtag', function (req, res) {
    var entity = req.body.newtag;

    admin.addtag(entity)
        .then(id => {
            if (id[0][0].count === '1') {
                res.send("FailTyping");
            } else if (id[0][0].count === '0') {
                res.send("FailSame");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.get('/admin-edittag/:id', function (req, res) {
    var id = req.params.id;

    if (isNaN(id)) {
        res.render('pages/admin-edittag', {
            error: true
        });
    }

    admin.singletag(id).then(rows => {
        if (rows.length > 0) {
            if (rows[0][0].count === '0') {
                res.render('pages/admin-edittag', {
                    error: true
                });
            } else {
                res.render('pages/admin-edittag', {
                    tag: rows[0],
                    error: false
                });
            }
        }
    }).catch(err => {
        console.log(err);
        res.render('pages/admin-edittag', {
            error: true
        });
    })
})

app.post('/admin-dashboard/updatetag', function (req, res) {
    var entity = {
        id: req.body.id,
        tagname: req.body.newtagname
    }

    admin.updatetag(entity.id, entity.tagname)
        .then(id => {
            console.log(id);
            if (id[0][0].count === '1') {
                res.send("FailTyping");
            } else if (id[0][0].count === '0') {
                res.send("FailSame");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/deletetag', function (req, res) {
    var id = req.body.tagid;

    admin.deletetag(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})
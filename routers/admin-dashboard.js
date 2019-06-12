var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');

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
                editorsubcatlist: editor,
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

// Account

app.post('/admin-dashboard/addaccount', function (req, res) {
    // Crypt Password
    var saltRounds = 10;
    var passhashed = '';
    if (req.body.pass === '') {
        passhashed = '';
    } else {
        passhashed = bcrypt.hashSync(req.body.pass, saltRounds);
    }

    var entity = {
        username: req.body.username,
        pass: passhashed,
        roleid: req.body.roleid,
        fullname: req.body.fullname,
        email: req.body.email,
        penname: req.body.penname,
        dob: req.body.dob,
        start: req.body.start,
        end: req.body.end,
    }

    if (entity.username === '' || entity.pass === '' || entity.roleid === NaN || entity.fullname === '' || entity.email === '' || entity.dob === '') {
        res.send("FailFull");
    } else {
        // Change format of Date type Input
        entity.dob = moment(entity.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');

        if (entity.roleid == 1) {
            if (entity.start === '' || entity.end === '') {
                res.send("FailFull");
            } else {
                entity.start = moment(entity.start, 'DD/MM/YYYY').format('YYYY-MM-DD');
                entity.end = moment(entity.end, 'DD/MM/YYYY').format('YYYY-MM-DD');
                entity.penname = 'test';
                admin.addaccount(entity.username, entity.pass, entity.roleid, entity.fullname, entity.email, entity.penname, entity.dob, entity.start, entity.end)
                    .then(id => {
                        if (id[0][0].count === '0') {
                            res.send("FailEmail");
                        } else if (id[0][0].count === '1') {
                            res.send("FailUserName");
                        } else if (id[0][0].count === '2') {
                            res.send("FailBoth");
                        } else {
                            res.send("Success");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }

        if (entity.roleid == 2) {
            if (entity.penname === '') {
                res.send("FailFull");
            } else {
                entity.start = '0000-01-01';
                entity.end = '0000-01-01';
                admin.addaccount(entity.username, entity.pass, entity.roleid, entity.fullname, entity.email, entity.penname, entity.dob, entity.start, entity.end)
                    .then(id => {
                        if (id[0][0].count === '0') {
                            res.send("FailEmail");
                        } else if (id[0][0].count === '1') {
                            res.send("FailUserName");
                        } else if (id[0][0].count === '2') {
                            res.send("FailBoth");
                        } else {
                            res.send("Success");
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            }
        }

        if (entity.roleid == 3) {
            entity.penname = 'test';
            entity.start = '0000-01-01';
            entity.end = ' 0000-01-01';
            admin.addaccount(entity.username, entity.pass, entity.roleid, entity.fullname, entity.email, entity.penname, entity.dob, entity.start, entity.end)
                .then(id => {
                    if (id[0][0].count === '0') {
                        res.send("FailEmail");
                    } else if (id[0][0].count === '1') {
                        res.send("FailUserName");
                    } else if (id[0][0].count === '2') {
                        res.send("FailBoth");
                    } else {
                        res.send("Success");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }
})

app.get('/admin-editaccount/:rolename/:id', function (req, res) {
    var id = req.params.id;
    var rolename = req.params.rolename;

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(id)) {
        res.render('pages/admin-editaccount', {
            error: true
        });
    }

    if (rolename != 'user' && rolename != 'writer' && rolename != 'editor') {
        res.render('pages/admin-editaccount', {
            error: true
        });
    }

    if (rolename === 'user') {
        admin.singleuser(id).then(rows => {
            if (rows.length > 0) {
                if (rows[0][0].count === '0') {
                    console.log('a');
                    res.render('pages/admin-editaccount', {
                        error: true
                    });
                } else {
                    res.render('pages/admin-editaccount', {
                        rolename: rolename,
                        user: rows[0],
                        error: false
                    });
                }
            }
        }).catch(err => {
            res.render('pages/admin-editaccount', {
                error: true
            });
        })
    }

    if (rolename === 'writer') {
        admin.singlewriter(id).then(rows => {
            if (rows.length > 0) {
                if (rows[0][0].count === '0') {
                    res.render('pages/admin-editaccount', {
                        error: true
                    });
                } else {
                    res.render('pages/admin-editaccount', {
                        rolename: rolename,
                        writer: rows[0],
                        error: false
                    });
                }
            }
        }).catch(err => {
            console.log(err);
            res.render('pages/admin-editaccount', {
                error: true
            });
        })
    }

    var catnoteditor = admin.catnoteditor();

    if (rolename === 'editor') {
        admin.singleeditor(id).then(rows => {
            if (rows.length > 0) {
                if (rows[0][0].count === '0') {
                    res.render('pages/admin-editaccount', {
                        error: true
                    });
                } else {
                    Promise.all([catnoteditor]).then((catnoteditor) => {
                        res.render('pages/admin-editaccount', {
                            subcatnoeditor: catnoteditor[0],
                            rolename: rolename,
                            editor: rows[0][0],
                            editorsubcat: rows[0],
                            error: false
                        });
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            res.render('pages/admin-editaccount', {
                error: true
            });
        })
    }
})

app.post('/admin-dashboard/updateaddsubcat', function (req, res) {
    var entity = {
        editorid: req.body.editorid,
        subcatid: req.body.subcatid
    }

    if (entity.subcatid == '') {
        res.send("FailNotChoose");
    } else {
        admin.addcatnoteditor(entity.subcatid, entity.editorid)
            .then(id => {
                res.send("Success");
            })
            .catch(err => {
                console.log(err);
            })
    }
})

app.post('/admin-dashboard/deleteuser', function (req, res) {
    var id = req.body.userid;

    admin.deleteuser(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/updateduedate', function (req, res) {
    var entity = {
        duedate: req.body.duedate,
        userid: req.body.userid
    }

    admin.updateduedate(entity.userid, entity.duedate)
        .then(id => {
            if (id[0][0].count === '0') {
                res.send("FailSetDate");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/updatepenname', function (req, res) {
    var entity = {
        penname: req.body.penname,
        writerid: req.body.writerid
    }

    if (entity.penname == '') {
        res.send("FailNotTyping");
    } else {
        admin.updatepenname(entity.writerid, entity.penname)
            .then(id => {
                if (id[0][0].count === '0') {
                    res.send("FailSetPenName");
                } else {
                    res.send("Success");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

app.post('/admin-dashboard/deletewriter', function (req, res) {
    var id = req.body.writerid;

    admin.deletewriter(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/deleteeditor', function (req, res) {
    var id = req.body.editorid;

    admin.deleteeditor(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(err => {
            console.log(err);
        })
})

app.post('/admin-dashboard/updateremovesubcat', function (req, res) {
    var entity = {
        editorid: req.body.editorid,
        subcatid: req.body.subcatid
    }

    if (entity.subcatid === '') {
        entity.subcatid = null;
    }

    admin.deletecategoryeditor(entity.subcatid, entity.editorid)
        .then(id => {
            if (id[0][0].count === '0') {
                res.send("FailNotChoose");
            } else {
                res.send("Success");
            }
        })
        .catch(err => {
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
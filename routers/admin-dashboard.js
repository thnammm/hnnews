var express = require('express');
var bcrypt = require('bcrypt');
var moment = require('moment');

var app = express.Router();
var admin = require('../models/admin.model.js');

var adminauth = require('../middlewares/adminauth.js');

// Logout
app.post('/admin-dashboard/logout', adminauth, (req, res, next) => {
    req.logOut();
    res.redirect('/admin');
})

// Dashboard
app.get('/admin-dashboard', adminauth, function (req, res, next) {
    // Set limit and offset value for all part of admin
    /*
    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 5;
    var offset = (page - 1) * limit; */

    //Account
    var numberaccount = admin.numberaccount();
    var adminaccount = admin.allaccount();
    // var countallaccount = admin.countallaccount();
    var adminuser = admin.alluser();
    // var countalluser = admin.countalluser();
    var adminwriter = admin.allwriter();
    // var countallwriter = admin.countallwriter();
    var admineditor = admin.alleditor();
    // var countalleditor = admin.countalleditor();

    // Post
    var adminpost = admin.allpost();
    // var countallpost = admin.countallpost();

    // Category
    var admincategory = admin.allcategory();
    // var countallcategory = admin.countallcategory();
    var categorydad = admin.category();
    var editor = admin.editor();

    // Tag
    var admintag = admin.alltag();
    // var countalltag = admin.countalltag();

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

            /*
            var accountvalue = countallaccount[0].accountvalue;
            var uservalue = countalluser[0].uservalue;
            var writervalue = countallwriter[0].writervalue;
            var editorvalue = countalleditor[0].editorvalue;
            var postvalue = countallpost[0].postvalue;
            var categoryvalue = countallcategory[0].categoryvalue;
            var tagvalue = countalltag[0].tagvalue;

            var accPages = Math.floor(accountvalue / limit);
            var userPages = Math.floor(uservalue / limit);
            var writerPages = Math.floor(writervalue / limit);
            var editorPages = Math.floor(editorvalue / limit);
            var postPages = Math.floor(postvalue / limit);
            var categoryPages = Math.floor(categoryvalue / limit);
            var tagPages = Math.floor(tagvalue / limit);

            if (accountvalue % limit > 0) accPages++;
            if (uservalue % limit > 0) userPages++;
            if (writervalue % limit > 0) writerPages++;
            if (editorvalue % limit > 0) editorPages++;
            if (postvalue % limit > 0) postPages++;
            if (categoryvalue % limit > 0) categoryPages++;
            if (tagvalue % limit > 0) tagPages++;


            // Pagination Number
            var accountpagination = [];
            for (var i = 1; i <= accPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                accountpagination.push(object);
            }

            var userpagination = [];
            for (var i = 1; i <= userPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                userpagination.push(object);
            }

            var writerpagination = [];
            for (var i = 1; i <= writerPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                writerpagination.push(object);
            }

            var editorpagination = [];
            for (var i = 1; i <= editorPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                editorpagination.push(object);
            }

            var postpagination = [];
            for (var i = 1; i <= postPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                postpagination.push(object);
            }

            var categorypagination = [];
            for (var i = 1; i <= categoryPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                categorypagination.push(object);
            }

            var tagpagination = [];
            for (var i = 1; i <= tagPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                tagpagination.push(object);
            }

            // Pagination Button
            var btnaccPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnaccNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btnuserPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnuserNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btnwriterPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnwriterNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btneditorPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btneditorNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btnpostPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnpostNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btncategoryPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btncategoryNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            var btntagPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btntagNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            // Account Page first
            if (page == accountpagination[0].value) {
                btnaccPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnaccNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Account Page last
            if (page == accountpagination[accPages - 1].value) {
                btnaccPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnaccNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Account Page middle
            if (page != accountpagination[0].value && page != accountpagination[accPages - 1].value) {
                btnaccPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnaccNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Account Just one page
            if (page == accountpagination[0].value && page == accountpagination[accPages - 1].value) {
                btnaccPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnaccNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // User Page first
            if (page == userpagination[0].value) {
                btnuserPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnuserNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // User Page last
            if (page == userpagination[userPages - 1].value) {
                btnuserPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnuserNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // User Page middle
            if (page != userpagination[0].value && page != userpagination[userPages - 1].value) {
                btnuserPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnuserNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // User Just one page
            if (page == userpagination[0].value && page == userpagination[userPages - 1].value) {
                btnuserPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnuserNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // Writer Page first
            if (page == writerpagination[0].value) {
                btnwriterPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnwriterNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Writer Page last
            if (page == writerpagination[writerPages - 1].value) {
                btnwriterPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnwriterNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Writer Page middle
            if (page != writerpagination[0].value && page != writerpagination[writerPages - 1].value) {
                btnwriterPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnwriterNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Writer Just one page
            if (page == writerpagination[0].value && page == writerpagination[writerPages - 1].value) {
                btnwriterPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnwriterNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // Editor Page first
            if (page == editorpagination[0].value) {
                btneditorPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btneditorNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Editor Page last
            if (page == editorpagination[editorPages - 1].value) {
                btneditorPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btneditorNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Editor Page middle
            if (page != editorpagination[0].value && page != editorpagination[editorPages - 1].value) {
                btneditorPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btneditorNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Editor Just one page
            if (page == editorpagination[0].value && page == editorpagination[editorPages - 1].value) {
                btneditorPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btneditorNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // Post Page first
            if (page == postpagination[0].value) {
                btnpostPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnpostNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Post Page last
            if (page == postpagination[postPages - 1].value) {
                btnpostPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnpostNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Post Page middle
            if (page != postpagination[0].value && page != postpagination[postPages - 1].value) {
                btnpostPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnpostNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Post Just one page
            if (page == postpagination[0].value && page == postpagination[postPages - 1].value) {
                btnpostPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnpostNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // Category Page first
            if (page == categorypagination[0].value) {
                btncategoryPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btncategoryNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Category Page last
            if (page == categorypagination[categoryPages - 1].value) {
                btncategoryPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btncategoryNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Category Page middle
            if (page != categorypagination[0].value && page != categorypagination[categoryPages - 1].value) {
                btncategoryPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btncategoryNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Category Just one page
            if (page == categorypagination[0].value && page == categorypagination[categoryPages - 1].value) {
                btncategoryPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btncategoryNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            // Tag Page first
            if (page == tagpagination[0].value) {
                btntagPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btntagNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Tag Page last
            if (page == tagpagination[tagPages - 1].value) {
                btntagPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btntagNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Tag Page middle
            if (page != tagpagination[0].value && page != tagpagination[tagPages - 1].value) {
                btntagPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btntagNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Tag Just one page
            if (page == tagpagination[0].value && page == tagpagination[tagPages - 1].value) {
                btntagPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btntagNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            */

            /* --------------------------------------------------- */
            /* ------------------- RENDER HERE ------------------- */
            /* --------------------------------------------------- */

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
        }).catch(next)
})

// Account

app.post('/admin-dashboard/addaccount', function (req, res, next) {
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
                    .catch(next)
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
                    .catch(next)
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
                .catch(next)
        }
    }
})

app.get('/admin-editaccount/:rolename/:id', adminauth, function (req, res, next) {
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
            console.log(err);
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
            var catString = { data: "", length: 0 };
            for (var i = 0; i < rows[0].length; i++) {
                if (i === rows[0].length - 1) {
                    catString.data += rows[0][i].subcategory_name;
                    catString.length += 1;
                } else {
                    catString.data += rows[0][i].subcategory_name + ", ";
                    catString.length += 1;
                }
            }
            rows[0][0].editor_subcat = catString;

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

app.post('/admin-dashboard/updateaddsubcat', function (req, res, next) {
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
            .catch(next)
    }
})

app.post('/admin-dashboard/deleteuser', function (req, res, next) {
    var id = req.body.userid;

    admin.deleteuser(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

app.post('/admin-dashboard/updateduedate', function (req, res, next) {
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
        .catch(next)
})

app.post('/admin-dashboard/updatepenname', function (req, res, next) {
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
            .catch(next)
    }
})

app.post('/admin-dashboard/deletewriter', function (req, res, next) {
    var id = req.body.writerid;

    admin.deletewriter(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

app.post('/admin-dashboard/deleteeditor', function (req, res, next) {
    var id = req.body.editorid;

    admin.deleteeditor(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

app.post('/admin-dashboard/updateremovesubcat', function (req, res, next) {
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
        .catch(next)
})

// Post

app.get('/admin-editpost/:id', adminauth, function (req, res, next) {
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

app.post('/admin-dashboard/updatepost', function (req, res, next) {
    var entity = {
        id: req.body.id,
        poststatus: req.body.poststatus
    }

    admin.updatepost(entity.id, entity.poststatus)
        .then(id => {
            res.send("Success");
        })
        .catch(next)
})

app.post('/admin-dashboard/deletepost', function (req, res, next) {
    var id = req.body.postid;

    admin.deletepost(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

// Category

app.post('/admin-dashboard/addcategory', function (req, res, next) {
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
        .catch(next)
})

app.get('/admin-editcategory/:id', adminauth, function (req, res, next) {
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

app.post('/admin-dashboard/updatecategory', function (req, res, next) {
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
        .catch(next)
})

app.post('/admin-dashboard/deletecategory', function (req, res, next) {
    var id = req.body.subcatid;

    admin.deletecategory(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

// Tag

app.post('/admin-dashboard/addtag', function (req, res, next) {
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
        .catch(next)
})

app.get('/admin-edittag/:id', adminauth, function (req, res, next) {
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

app.post('/admin-dashboard/updatetag', function (req, res, next) {
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
        .catch(next)
})

app.post('/admin-dashboard/deletetag', function (req, res, next) {
    var id = req.body.tagid;

    admin.deletetag(id)
        .then(id => {
            res.redirect('/admin-dashboard');
        })
        .catch(next)
})

module.exports = app;
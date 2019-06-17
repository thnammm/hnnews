var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');

var userModel = require('../models/user.model.js');
var accountModel = require('../models/account.model.js');

var accountauth = require('../middlewares/accountauth.js');

module.exports = app;

app.get('/thongtincanhan', accountauth, (req, res, next) => {

    // Get Info of Writer, Editor
    var userloadinfo = userModel.userloadinfo(req.user.profile_id);
    var editorloadinfo = userModel.editorloadinfo(req.user.profile_id);
    var writerloadinfo = userModel.writerloadinfo(req.user.profile_id);

    // Post List of Writer
    var writerpostlist = userModel.writerpostlist(req.user.profile_id);
    var poststatus1 = userModel.poststatus1(req.user.profile_id);
    var poststatus2 = userModel.poststatus2(req.user.profile_id);
    var poststatus3 = userModel.poststatus3(req.user.profile_id);
    var poststatus4 = userModel.poststatus4(req.user.profile_id);


    var Handlebars = require('handlebars');
    //If Equals Handlebars
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });
    // If Condition Handlebars
    Handlebars.registerHelper('ifCond', function (v1, v2, v3, options) {
        return (v1 && (v2 == v3)) ? options.fn(this) : options.inverse(this);
    });


    Promise.all([
        userloadinfo, editorloadinfo, writerloadinfo, writerpostlist, poststatus1, poststatus2, poststatus3, poststatus4
    ]).then(([userloadinfo, editorloadinfo, writerloadinfo, writerpostlist, poststatus1, poststatus2, poststatus3, poststatus4]) => {

        // All Status name
        for (var i = 0; i < writerpostlist[0].length; i++) {
            if (writerpostlist[0][i].status_post == '1') {
                writerpostlist[0][i].status_name = "Đã xuất bản";
            }
            else if (writerpostlist[0][i].status_post == '2') {
                writerpostlist[0][i].status_name = "Đã duyệt và chờ xuất bản";
            }
            else if (writerpostlist[0][i].status_post == '3') {
                writerpostlist[0][i].status_name = "Chưa được duyệt";
            }
            else {
                writerpostlist[0][i].status_name = "Bị từ chối";
            }
        }
        // 1234 Status name
        for (var i = 0; i < poststatus1[0].length; i++) {
            poststatus1[0][i].status_name = "Đã xuất bản";
        }
        for (var i = 0; i < poststatus2[0].length; i++) {
            poststatus2[0][i].status_name = "Đã duyệt và chờ xuất bản";
        }
        for (var i = 0; i < poststatus3[0].length; i++) {
            poststatus3[0][i].status_name = "Chưa được duyệt";
        }
        for (var i = 0; i < poststatus4[0].length; i++) {
            poststatus4[0][i].status_name = "Bị từ chối";
        }

        // Render
        res.render('pages/profile', {
            user: userloadinfo[0][0],
            editor: editorloadinfo[0][0],
            writer: writerloadinfo[0][0],
            writerpostlist: writerpostlist[0],
            poststatus1: poststatus1[0],
            poststatus2: poststatus2[0],
            poststatus3: poststatus3[0],
            poststatus4: poststatus4[0]
        });
    }).catch(next)
});

app.post('/thongtincanhan/capnhatthongtin', (req, res, next) => {
    var profileid = req.user.profile_id;
    var roleid = req.user.role_id;

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (roleid == 1) {
        var user = {
            id: profileid,
            fullname: req.body.username,
            email: req.body.useremail,
            dob: req.body.userdob
        };

        if (user.fullname == '' || user.email == '' || user.dob == '') {
            res.render('pages/profile', {
                err_message: 'Bạn chưa điền đầy đủ thông tin để cập nhật'
            })
        } else {
            req.user.fullname = user.fullname;

            userModel.userupdateinfo(user)
                .then(result => {
                    res.redirect('/thongtincanhan')
                })
                .catch(next)
        }
    }

    if (roleid == 2) {
        var writer = {
            id: profileid,
            fullname: req.body.writername,
            penname: req.body.penname,
            email: req.body.writeremail,
            dob: req.body.writerdob
        };
        if (writer.fullname == '' || writer.email == '' || writer.dob == '' || writer.penname == '') {
            res.render('pages/profile', {
                err_message: 'Bạn chưa điền đầy đủ thông tin để cập nhật'
            })
        } else {
            req.user.fullname = writer.fullname;

            userModel.writerupdateinfo(writer)
                .then(result => {
                    res.redirect('/thongtincanhan')
                })
                .catch(next)
        }
    }
})

app.post('/user', (req, res, next) => {
    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (role == 3) {
        //update editor
        editor = {
            id: 1, // hao sua
            fullname: req.body.editorname,
            email: req.body.editoremail,
            dob: req.body.editordob
        };

        console.log(editor);
        userModel.editorupdateinfo(editor).then(result => {
            res.redirect('/thongtincanhan')
        })
            .catch(err => {
                console.log(err);
            })

    }


});

app.post('/thongtincanhan/doimatkhau', (req, res, next) => {
    var oldpass = req.body.oldpass;
    var newpass = req.body.newpass;
    var retypepass = req.body.retypepass;
    var accountid = req.user.account_id;

    if (oldpass == '' || newpass == '' || retypepass == '') {
        res.send('FailNotTyping');
    } else if (newpass.length < 6 || retypepass.length < 6) {
        res.send('FailEnoughCharacter');
    } else if (newpass != retypepass) {
        res.send('FailEqualPass');
    } else {
        var ret = bcrypt.compareSync(oldpass, req.user.password);
        if (ret) {
            // Crypt password
            var saltRounds = 10;
            var passhashed = bcrypt.hashSync(newpass, saltRounds);

            req.user.password = passhashed;

            accountModel.changepassword(accountid, passhashed).then(rows => {
                res.send('Success');
            }).catch(next);
        } else {
            res.send('FailOldPass');
        }
    }
})

app.post('/dangxuat', accountauth, (req, res, next) => {
    req.logOut();
    res.redirect('/');
})

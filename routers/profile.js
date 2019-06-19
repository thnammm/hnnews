var express = require('express');
var app = express.Router();
var bcrypt = require('bcrypt');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/img/post/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage });

var userModel = require('../models/user.model.js');
var accountModel = require('../models/account.model.js');
var categoryModel = require('../models/category.model.js');

var accountauth = require('../middlewares/accountauth.js');

app.get('/thongtincanhan', accountauth, (req, res, next) => {

    // Get Info of Writer, Editor
    var userloadinfo = userModel.userloadinfo(req.user.profile_id);
    var editorloadinfo = userModel.editorloadinfo(req.user.profile_id);
    var writerloadinfo = userModel.writerloadinfo(req.user.profile_id);

    // Post List of Writer
    var writerpostlist = userModel.writerpostlist(req.user.profile_id);
    var writerpoststatus1 = userModel.writerpoststatus1(req.user.profile_id);
    var writerpoststatus2 = userModel.writerpoststatus2(req.user.profile_id);
    var writerpoststatus3 = userModel.writerpoststatus3(req.user.profile_id);
    var writerpoststatus4 = userModel.writerpoststatus4(req.user.profile_id);

    // Category of Writer and Editor
    var subcategory = categoryModel.subcatofcat();

    // Post List of Editor
    var editorpostlist = userModel.editorpostlist(req.user.profile_id);
    var editorpoststatus1 = userModel.editorpoststatus1(req.user.profile_id);
    var editorpoststatus2 = userModel.editorpoststatus2(req.user.profile_id);
    var editorpoststatus3 = userModel.editorpoststatus3(req.user.profile_id);
    var editorpoststatus4 = userModel.editorpoststatus4(req.user.profile_id);


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
        userloadinfo, editorloadinfo, writerloadinfo, writerpostlist, writerpoststatus1, writerpoststatus2, writerpoststatus3, writerpoststatus4, subcategory, editorpostlist, editorpoststatus1, editorpoststatus2, editorpoststatus3, editorpoststatus4
    ]).then(([userloadinfo, editorloadinfo, writerloadinfo, writerpostlist, writerpoststatus1, writerpoststatus2, writerpoststatus3, writerpoststatus4, subcategory, editorpostlist, editorpoststatus1, editorpoststatus2, editorpoststatus3, editorpoststatus4]) => {

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
        for (var i = 0; i < writerpoststatus1[0].length; i++) {
            writerpoststatus1[0][i].status_name = "Đã xuất bản";
        }
        for (var i = 0; i < writerpoststatus2[0].length; i++) {
            writerpoststatus2[0][i].status_name = "Đã duyệt và chờ xuất bản";
        }
        for (var i = 0; i < writerpoststatus3[0].length; i++) {
            writerpoststatus3[0][i].status_name = "Chưa được duyệt";
        }
        for (var i = 0; i < writerpoststatus4[0].length; i++) {
            writerpoststatus4[0][i].status_name = "Bị từ chối";
        }

        // All Status name
        for (var i = 0; i < editorpostlist[0].length; i++) {
            if (editorpostlist[0][i].status_post == '1') {
                editorpostlist[0][i].status_name = "Đã xuất bản";
            }
            else if (editorpostlist[0][i].status_post == '2') {
                editorpostlist[0][i].status_name = "Đã duyệt và chờ xuất bản";
            }
            else if (editorpostlist[0][i].status_post == '3') {
                editorpostlist[0][i].status_name = "Chưa được duyệt";
            }
            else {
                editorpostlist[0][i].status_name = "Bị từ chối";
            }
        }
        // 1234 Status name
        for (var i = 0; i < editorpoststatus1[0].length; i++) {
            editorpoststatus1[0][i].status_name = "Đã xuất bản";
        }
        for (var i = 0; i < editorpoststatus2[0].length; i++) {
            editorpoststatus2[0][i].status_name = "Đã duyệt và chờ xuất bản";
        }
        for (var i = 0; i < editorpoststatus3[0].length; i++) {
            editorpoststatus3[0][i].status_name = "Chưa được duyệt";
        }
        for (var i = 0; i < editorpoststatus4[0].length; i++) {
            editorpoststatus4[0][i].status_name = "Bị từ chối";
        }

        // Render
        res.render('pages/profile', {
            user: userloadinfo[0][0],
            editor: editorloadinfo[0][0],
            writer: writerloadinfo[0][0],
            writerpostlist: writerpostlist[0],
            poststatus1: writerpoststatus1[0],
            poststatus2: writerpoststatus2[0],
            poststatus3: writerpoststatus3[0],
            poststatus4: writerpoststatus4[0],
            subcategory: subcategory[0],
            editorpostlist: editorpostlist[0],
            pstatus1: editorpoststatus1[0],
            pstatus2: editorpoststatus2[0],
            pstatus3: editorpoststatus3[0],
            pstatus4: editorpoststatus4[0],
            meg: req.flash('meg')
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

    if (roleid == 3) {
        var editor = {
            id: profileid,
            fullname: req.body.editorname,
            email: req.body.editoremail,
            dob: req.body.editordob
        };

        if (editor.fullname == '' || editor.email == '' || editor.dob == '') {
            res.render('pages/profile', {
                err_message: 'Bạn chưa điền đầy đủ thông tin để cập nhật'
            })
        } else {
            req.user.fullname = editor.fullname;

            userModel.editorupdateinfo(editor)
                .then(result => {
                    res.redirect('/thongtincanhan')
                })
                .catch(next)
        }
    }
})

app.post('/thongtincanhan/vietbai', upload.single('writeravapost'), (req, res, next) => {
    var writerid = req.user.profile_id;
    var title = req.body.writertitlepost;
    var summary = req.body.writersummarypost;
    var content = req.body.writertinymce;
    var subid = req.body.writercategorypost;
    var ispremium = req.body.writerispremium;
    var linkimage = req.file.path;

    var tag = req.body.writertagpost;
    var listtag = tag.split(",");
    linkimage = linkimage.replace(/\\/g, '/');

    if (title == '' || summary == '' || content == '' || subid == '' || tag == '' || ispremium == '' || tag == '' || linkimage == '') {
        res.send('FailNotTyping');
    } else {
        userModel.writeraddpost(writerid, title, summary, content, ispremium, subid, linkimage).then(id => {
            if (id[0].length == 0) {
                res.send('FailQuery');
            } else {
                var postid = id[0][0].id;
                for (var i = 0; i < listtag.length; i++) {
                    var temp = "#";
                    listtag[i] = listtag[i].replace(/'/g, "");
                    var finaltag = temp.concat(listtag[i]);
                    userModel.writeraddtagofpost(postid, finaltag).then(id => { }).catch(next)
                }
                req.flash('meg', 'Bài viết đã được đăng tải <span style="color: rgb(54, 177, 23)"> thành công </span>');
                res.redirect('/thongtincanhan');
            }
        }).catch(next);
    }
})

app.get('/thongtincanhan/suabaiviet/:postid', accountauth, (req, res, next) => {
    var postid = req.params.postid;
    var writerid = req.user.profile_id;

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(postid)) {
        res.render('pages/writer-editpost', {
            error: true
        });
    }

    var subcat = userModel.writergetothersubcat(postid);
    var editpost = userModel.writergeteditpost(writerid, postid);
    var tagpost = userModel.writergettagofonepost(postid);

    Promise.all([subcat, editpost, tagpost])
        .then(([subcat, editpost, tagpost]) => {
            var alltag = [];
            for (var i = 0; i < tagpost[0].length; i++) {
                var finaltag = tagpost[0][i].tag_name.replace(/#/g, "");
                alltag.push({ tag: finaltag });
            }

            editpost[0][0].link_image = editpost[0][0].link_image.slice(6);

            res.render('pages/writer-editpost', {
                editpost: editpost[0][0],
                eachtag: alltag,
                subcat: subcat[0],
                error: false
            })
        }).catch(err => {
            console.log(err);
            res.render('pages/writer-editpost', {
                error: true
            });
        });
})

app.post('/thongtincanhan/suabaiviet/:postid', upload.single('writeravapost'), (req, res, next) => {
    var writerid = req.user.profile_id;
    var postid = req.params.postid;
    var title = req.body.writertitlepost;
    var summary = req.body.writersummarypost;
    var content = req.body.writertinymce;
    var subid = req.body.writercategorypost;
    var ispremium = req.body.writerispremium;
    var tag = req.body.writertagpost;

    var linkimage = '';
    if (!req.file) {
        linkimage = req.body.writeroldavapost;
        console.log(linkimage);
        var tmp = 'public';
        linkimage = tmp.concat(linkimage);
        console.log(linkimage);

    } else {
        linkimage = req.file.path;
        linkimage = linkimage.replace(/\\/g, '/');
    }

    if (tag == '') {
        listtag = '';
    } else {
        listtag = tag.split(",");
    }


    if (title == '' || summary == '' || content == '' || subid == '' || ispremium == '') {
        req.flash('meg', 'Cập nhật bài viết <span style="color: red"> thất bại </span>. Vui lòng nhập đầy đủ nội dung, tiêu chí yêu cầu của bài viết.');
        res.redirect(`/thongtincanhan/suabaiviet/${postid}`);
    } else {
        if (isNaN(postid)) {
            next;
        } else {
            userModel.writerupdaterejectpost(postid, title, summary, content, subid, ispremium, linkimage).then(id => {
                if (listtag != '') {
                    for (var i = 0; i < listtag.length; i++) {
                        var temp = "#";
                        listtag[i] = listtag[i].replace(/'/g, "");
                        var finaltag = temp.concat(listtag[i]);
                        console.log(finaltag);
                        userModel.editoraddtagofpost(postid, finaltag).then(id => { }).catch(next)
                    }
                }
                req.flash('meg', 'Cập nhật bài viết <span style="color: rgb(54, 177, 23)"> thành công </span>. Hãy vào trang danh sách bài viết để kiểm tra lại và chờ Biên tập viên phụ trách duyệt bài.');
                res.redirect(`/thongtincanhan`);
            }).catch(next);
        }
    }
})

app.get('/thongtincanhan/duyetbaiviet/:postid', accountauth, (req, res, next) => {
    var postid = req.params.postid;
    var editorid = req.user.profile_id;

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(postid)) {
        res.render('pages/editor-editpost', {
            error: true,
        });
    }

    var subcat = userModel.editorgetothersubcat(postid);
    var editpost = userModel.editorgeteditpost(editorid, postid);
    var tagpost = userModel.editorgettagofonepost(postid);

    Promise.all([subcat, editpost, tagpost])
        .then(([subcat, editpost, tagpost]) => {
            var alltag = [];
            for (var i = 0; i < tagpost[0].length; i++) {
                var finaltag = tagpost[0][i].tag_name.replace(/#/g, "");
                alltag.push({ tag: finaltag });
            }

            editpost[0][0].link_image = editpost[0][0].link_image.slice(6);

            res.render('pages/editor-editpost', {
                editpost: editpost[0][0],
                eachtag: alltag,
                tagpost: tagpost[0],
                subcat: subcat[0],
                error: false,
                meg: req.flash('meg')
            })
        }).catch(err => {
            console.log(err);
            res.render('pages/editor-editpost', {
                error: true
            });
        });
})

app.post('/thongtincanhan/doimatkhau', (req, res, next) => {
    var oldpass = req.body.oldpass;
    var newpass = req.body.newpass;
    var retypepass = req.body.retypepass;
    var accountid = req.user.account_id;

    console.log(oldpass, newpass, retypepass);

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

app.post('/thongtincanhan/tuchoi/:postid', (req, res, next) => {
    var postid = req.params.postid;
    var editorid = req.user.profile_id;
    var content = req.body.rejectreason;

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(postid)) {
        next;
    } else {
        userModel.editorsendfeedback(postid, editorid, content).then(rows => {
            req.flash('meg', 'Gửi thành công góp ý chỉnh sửa. <a class="a-tag-nostyle" href="/thongtincanhan"> Quay về </a>');
            res.redirect(`/thongtincanhan/duyetbaiviet/${postid}`);
        }).catch(next);
    }
})

app.post('/thongtincanhan/duyet/:postid', (req, res, next) => {
    var postid = req.params.postid;
    var editorid = req.user.profile_id;
    var subid = req.body.editorcategorypost;
    var postdate = req.body.editorpostdate;

    var tag = req.body.editortagpost;
    var listtag = ''

    if (tag == '') {
        listtag = '';
    } else {
        listtag = tag.split(",");
    }

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (isNaN(postid)) {
        next;
    } else {
        userModel.editorapprove(postid, subid, postdate).then(id => {
            if (listtag != '') {
                for (var i = 0; i < listtag.length; i++) {
                    var temp = "#";
                    listtag[i] = listtag[i].replace(/'/g, "");
                    var finaltag = temp.concat(listtag[i]);
                    console.log(finaltag);
                    userModel.editoraddtagofpost(postid, finaltag).then(id => { }).catch(next)
                }
            }
            req.flash('meg', 'Duyệt bài viết <span style="color: rgb(54, 177, 23)"> thành công </span>. Hãy vào trang danh sách bài viết để kiểm tra lại.');
            res.redirect(`/thongtincanhan/duyetbaiviet/${postid}`);
        }).catch(next);
    }
})

app.post('/dangxuat', accountauth, (req, res, next) => {
    req.logOut();
    res.redirect('/');
})

module.exports = app;
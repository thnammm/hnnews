var express = require('express');
var app = express.Router();
var userModel = require('../models/user.model.js');

module.exports = app;

app.get('/thongtincanhan', function (req, res) {
    var userloadinfo = userModel.userloadinfo(1);
    var editorloadinfo = userModel.editorloadinfo(1);
    var writerloadinfo = userModel.writerloadinfo(1);
    var writerpostlist = userModel.writerpostlist(1);

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    // hao sua
    var temp = true;
    var temp1 = false;
    var temp2 = false;


    Promise.all([
        userloadinfo, editorloadinfo, writerloadinfo, writerpostlist
    ]).then(([userloadinfo, editorloadinfo, writerloadinfo, writerpostlist]) => {

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
       
        res.render('pages/user', {
            temp, temp1, temp2,
            muser: userloadinfo[0][0],
            meditor: editorloadinfo[0][0],
            mwriter: writerloadinfo[0][0],
            mwriterpostlist: writerpostlist[0]
        });
    }).catch(err => {
        console.log(err)
    })
});

app.post('/user', function (req, res) {

    var role = 1; //do Hao sua 1-2-3

    //If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    if (role == 2) {
        writer = {
            id: 1, // hao sua
            fullname: req.body.writername,
            penname: req.body.penname,
            email: req.body.writeremail,
            dob: req.body.writerdob
        };
        userModel.writerupdateinfo(writer).then(result => {
            res.redirect('/user')
        })
            .catch(err => {
                console.log(err);
            })

    } else if (role == 1) {
        // update user
        user = {
            id: 1, // hao sua
            fullname: req.body.username,
            email: req.body.useremail,
            dob: req.body.userdob
        };
        userModel.userupdateinfo(user).then(result => {
            res.redirect('/user')
        })
            .catch(err => {
                console.log(err);
            })
    } else if (role == 3) {
        //update editor
        editor = {
            id: 1, // hao sua
            fullname: req.body.editorname,
            email: req.body.editoremail,
            dob: req.body.editordob
        };
        
        console.log(editor);
        userModel.editorupdateinfo(editor).then(result => {
            res.redirect('/user')
        })
            .catch(err => {
                console.log(err);
            })

    }


});



var express = require('express');
var app = express.Router();
var path = require('path');
var tagModel = require('../models/tag.model.js');
var categoryModel = require('../models/category.model.js');
var postModel = require('../models/post.model.js');

app.use(express.static(path.join(__dirname, 'public')));

// Tag
app.get('/nhandan', (req, res) => {
    var alltag = tagModel.alltag();

    Promise.all([alltag]).then(([alltag]) => {
        res.render('pages/hashtag-list', {
            alltag: alltag
        });
    }).catch(err => {
        console.log(err);
    })
})

app.get('/nhandan/:tagid', (req, res) => {
    var tagid = req.params.tagid;

    var postvalue = tagModel.postvaluesingletag(tagid);
    var othertag = tagModel.othertag(tagid);
    var singletag = tagModel.singletag(tagid);

    if (isNaN(tagid)) {
        res.render('pages/hashtag-detail', {
            error: true
        });
    }

    async function GetTagOfPost(array) {
        var eachtag = [];
        for (let each of array) {
            try {
                var tagofpost = await tagModel.tagofpost(each.post_id);
                eachtag.push({
                    alltag: tagofpost[0]
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        return eachtag;
    }

    Promise.all([postvalue, othertag, singletag])
        .then(([postvalue, othertag, singletag]) => {
            GetTagOfPost(singletag[0]).then(results => {
                for (var i = 0; i < singletag[0].length; i++) {
                    singletag[0][i].tagofpost = results[i].alltag;
                }
                res.render('pages/hashtag-detail', {
                    postvalue: postvalue[0],
                    othertag: othertag[0],
                    singletag: singletag[0],
                    error: false
                })
            }).catch(err => {
                console.log(err);
                res.render('pages/hashtag-detail', {
                    error: true
                });
            })
        }).catch(err => {
            console.log(err);
            res.render('pages/hashtag-detail', {
                error: true
            });
        })
})

// Category

app.get('/chuyenmuc/:catid', (req, res) => {
    var catid = req.params.catid;

    var catvalue = categoryModel.postvaluesinglecat(catid);
    var singlecat = categoryModel.singlecat(catid);
    var viewmuch = categoryModel.viewmuchotherpostsinglecat(catid);

    if (isNaN(catid)) {
        res.render('pages/subcategory-detail', {
            error: true
        });
    }

    async function GetTagOfPost(array) {
        var eachtag = [];
        for (let each of array) {
            try {
                var tagofpost = await tagModel.tagofpost(each.post_id);
                eachtag.push({
                    alltag: tagofpost[0]
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        return eachtag;
    }

    Promise.all([catvalue, singlecat, viewmuch])
        .then(([catvalue, singlecat, viewmuch]) => {
            if (catvalue.length > 0 && singlecat.length > 0 && viewmuch.length > 0) {
                if (catvalue[0][0].count === '0' || singlecat[0][0].count === '0' || viewmuch[0][0].count === '0') {
                    res.render('pages/category-detail', {
                        error: true
                    });
                } else {
                    GetTagOfPost(singlecat[0]).then(results => {
                        for (var i = 0; i < singlecat[0].length; i++) {
                            singlecat[0][i].tagofpost = results[i].alltag;
                        }
                        res.render('pages/category-detail', {
                            viewmuch: viewmuch[0],
                            catvalue: catvalue[0],
                            singlecat: singlecat[0],
                            error: false
                        })
                    }).catch(err => {
                        console.log(err);
                        res.render('pages/category-detail', {
                            error: true
                        });
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            res.render('pages/category-detail', {
                error: true
            });
        })
})

// SubCategory

app.get('/chuyenmuc/:catid/:subcatid', (req, res) => {
    var catid = req.params.catid;
    var subcatid = req.params.subcatid;

    var subcatvalue = categoryModel.postvaluesinglesubcat(catid, subcatid);
    var singlesubcat = categoryModel.singlesubcat(catid, subcatid);
    var viewmuch = categoryModel.viewmuchotherpostsinglesubcat(catid, subcatid);

    if (isNaN(catid)) {
        res.render('pages/subcategory-detail', {
            error: true
        });
    }

    if (isNaN(subcatid)) {
        res.render('pages/subcategory-detail', {
            error: true
        });
    }

    async function GetTagOfPost(array) {
        var eachtag = [];
        for (let each of array) {
            try {
                var tagofpost = await tagModel.tagofpost(each.post_id);
                eachtag.push({
                    alltag: tagofpost[0]
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        return eachtag;
    }

    Promise.all([subcatvalue, singlesubcat, viewmuch])
        .then(([subcatvalue, singlesubcat, viewmuch]) => {
            console.log(subcatvalue[0][0].count);
            console.log(singlesubcat[0][0].count);
            console.log(viewmuch[0][0].count);
            if (subcatvalue.length > 0 && singlesubcat.length > 0 && viewmuch.length > 0) {
                if (subcatvalue[0][0].count === '0' || singlesubcat[0][0].count === '0' || viewmuch[0][0].count === '0') {
                    res.render('pages/subcategory-detail', {
                        error: true
                    });
                } else {
                    GetTagOfPost(singlesubcat[0]).then(results => {
                        for (var i = 0; i < singlesubcat[0].length; i++) {
                            singlesubcat[0][i].tagofpost = results[i].alltag;
                        }
                        res.render('pages/subcategory-detail', {
                            viewmuch: viewmuch[0],
                            subcatvalue: subcatvalue[0],
                            singlesubcat: singlesubcat[0],
                            error: false
                        })
                    }).catch(err => {
                        console.log(err);
                        res.render('pages/subcategory-detail', {
                            error: true
                        });
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            res.render('pages/subcategory-detail', {
                error: true
            });
        })
})

// Post
app.get('/baiviet/:catid/:subcatid/:postid', (req, res) => {
    var catid = req.params.catid;
    var subcatid = req.params.subcatid;
    var postid = req.params.postid;

    var singlepost = postModel.singlepost(catid, subcatid, postid);
    var postcomment = postModel.commentofpost(postid);
    var otherpost = postModel.otherpostsamecategory(postid);

    if (isNaN(catid) || isNaN(subcatid) || isNaN(postid)) {
        res.render('pages/detail-eachpost', {
            error: true
        });
    }

    async function GetTagOfPost(array) {
        var eachtag = [];
        for (let each of array) {
            try {
                var tagofpost = await tagModel.tagofpost(each.post_id);
                eachtag.push({
                    alltag: tagofpost[0]
                });
            }
            catch (e) {
                console.log(e);
            }
        }
        return eachtag;
    }

    Promise.all([singlepost, postcomment, otherpost])
        .then(([singlepost, postcomment, otherpost]) => {
            if (singlepost.length > 0 && postcomment.length > 0) {
                if (singlepost[0][0].count === '0') {
                    res.render('pages/detail-eachpost', {
                        error: true
                    });
                } else {
                    GetTagOfPost(singlepost[0]).then(results => {
                        for (var i = 0; i < singlepost[0].length; i++) {
                            singlepost[0][i].tagofpost = results[i].alltag;
                        }
                        res.render('pages/detail-eachpost', {
                            singlepost: singlepost[0],
                            postcomment: postcomment[0],
                            otherpost: otherpost[0],
                            error: false
                        })
                    }).catch(err => {
                        console.log(err);
                        res.render('pages/detail-eachpost', {
                            error: true
                        });
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            res.render('pages/detail-eachpost', {
                error: true
            });
        })
})

module.exports = app;
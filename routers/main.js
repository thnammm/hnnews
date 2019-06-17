var express = require('express');
var app = express.Router();
var path = require('path');
var tagModel = require('../models/tag.model.js');
var categoryModel = require('../models/category.model.js');
var postModel = require('../models/post.model.js');

app.use(express.static(path.join(__dirname, 'public')));

// Tag
app.get('/nhandan', (req, res) => {
    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 12;
    var offset = (page - 1) * limit;

    var alltag = tagModel.alltag(limit, offset);
    var countalltag = tagModel.countalltag();

    Promise.all([alltag, countalltag])
        .then(([alltag, countalltag]) => {

            var tagvalue = countalltag[0].tagvalue;
            var nPages = Math.floor(tagvalue / limit);
            if (tagvalue % limit > 0) nPages++;

            // Pagination Number
            var tagpagination = [];
            for (var i = 1; i <= nPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                tagpagination.push(object);
            }
            // Pagination Button
            var btnPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            // Page first
            if (page == tagpagination[0].value) {
                btnPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Page last
            if (page == tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Page middle
            if (page != tagpagination[0].value && page != tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Just one page
            if (page == tagpagination[0].value && page == tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            res.render('pages/hashtag-list', {
                alltag: alltag,
                tagpagination,
                btnPrevious,
                btnNext
            });
        }).catch(err => {
            console.log(err);
        })
})

app.get('/nhandan/:tagid', (req, res) => {
    var tagid = req.params.tagid;

    // CasePost
    var casepost = 0;
    if (!req.user || (req.user.casepost == 0)) {
        casepost = 0;
    } else if (req.user.casepost == 1) {
        casepost = 1;
    }

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 3;
    var offset = (page - 1) * limit;

    var postvalue = tagModel.postvaluesingletag(casepost, tagid);
    var othertag = tagModel.othertag(tagid);
    var singletag = tagModel.singletag(casepost, tagid, limit, offset);
    var countallpostsingletag = tagModel.postvaluesingletag(casepost, tagid);

    if (isNaN(tagid)) {
        res.render('pages/hashtag-detail', {
            error: true
        });
    }

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

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

    Promise.all([postvalue, othertag, singletag, countallpostsingletag])
        .then(([postvalue, othertag, singletag, countallpostsingletag]) => {

            var singletagpostvalue = countallpostsingletag[0][0].tagvalue;
            var nPages = Math.floor(singletagpostvalue / limit);
            if (singletagpostvalue % limit > 0) nPages++;

            // Pagination Number
            var tagpagination = [];
            for (var i = 1; i <= nPages; i++) {
                var object = {
                    value: i,
                    active: i === +page
                };
                tagpagination.push(object);
            }
            // Pagination Button
            var btnPrevious = {
                disable: true,
                value: parseInt(page) - 1
            };
            var btnNext = {
                disable: false,
                value: parseInt(page) + 1
            };

            // Page first
            if (page == tagpagination[0].value) {
                btnPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Page last
            if (page == tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }
            // Page middle
            if (page != tagpagination[0].value && page != tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: false,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: false,
                    value: parseInt(page) + 1
                }
            }
            // Just one page
            if (page == tagpagination[0].value && page == tagpagination[nPages - 1].value) {
                btnPrevious = {
                    disable: true,
                    value: parseInt(page) - 1
                };
                btnNext = {
                    disable: true,
                    value: parseInt(page) + 1
                }
            }

            GetTagOfPost(singletag[0]).then(results => {
                for (var i = 0; i < singletag[0].length; i++) {
                    singletag[0][i].tagofpost = results[i].alltag;
                }

                res.render('pages/hashtag-detail', {
                    postvalue: postvalue[0],
                    othertag: othertag[0],
                    singletag: singletag[0],
                    tagpagination,
                    btnPrevious,
                    btnNext,
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

    // CasePost
    var casepost = 0;
    if (!req.user || (req.user.casepost == 0)) {
        casepost = 0;
    } else if (req.user.casepost == 1) {
        casepost = 1;
    }

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 3;
    var offset = (page - 1) * limit;

    var catvalue = categoryModel.postvaluesinglecat(casepost, catid);
    var singlecat = categoryModel.singlecat(casepost, catid, limit, offset);
    var viewmuch = categoryModel.viewmuchotherpostsinglecat(casepost, catid);
    var countallpostsinglecat = categoryModel.postvaluesinglecat(casepost, catid);

    if (isNaN(catid)) {
        res.render('pages/subcategory-detail', {
            error: true
        });
    }

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

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

    Promise.all([catvalue, singlecat, viewmuch, countallpostsinglecat])
        .then(([catvalue, singlecat, viewmuch, countallpostsinglecat]) => {
            if (catvalue.length > 0 && singlecat.length > 0 && viewmuch.length > 0) {
                if (catvalue[0][0].count === '0' || singlecat[0][0].count === '0' || viewmuch[0][0].count === '0') {
                    res.render('pages/category-detail', {
                        error: true
                    });
                } else {
                    var singlecatpostvalue = countallpostsinglecat[0][0].postvalue;
                    var nPages = Math.floor(singlecatpostvalue / limit);
                    if (singlecatpostvalue % limit > 0) nPages++;

                    // Pagination Number
                    var catpagination = [];
                    for (var i = 1; i <= nPages; i++) {
                        var object = {
                            value: i,
                            active: i === +page
                        };
                        catpagination.push(object);
                    }
                    // Pagination Button
                    var btnPrevious = {
                        disable: true,
                        value: parseInt(page) - 1
                    };
                    var btnNext = {
                        disable: false,
                        value: parseInt(page) + 1
                    };

                    // Page first
                    if (page == catpagination[0].value) {
                        btnPrevious = {
                            disable: true,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: false,
                            value: parseInt(page) + 1
                        }
                    }
                    // Page last
                    if (page == catpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: false,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: true,
                            value: parseInt(page) + 1
                        }
                    }
                    // Page middle
                    if (page != catpagination[0].value && page != catpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: false,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: false,
                            value: parseInt(page) + 1
                        }
                    }
                    // Just one page
                    if (page == catpagination[0].value && page == catpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: true,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: true,
                            value: parseInt(page) + 1
                        }
                    }

                    GetTagOfPost(singlecat[0]).then(results => {
                        for (var i = 0; i < singlecat[0].length; i++) {
                            singlecat[0][i].tagofpost = results[i].alltag;
                        }
                        res.render('pages/category-detail', {
                            viewmuch: viewmuch[0],
                            catvalue: catvalue[0],
                            singlecat: singlecat[0],
                            catpagination,
                            btnPrevious,
                            btnNext,
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

    // CasePost
    var casepost = 0;
    if (!req.user || (req.user.casepost == 0)) {
        casepost = 0;
    } else if (req.user.casepost == 1) {
        casepost = 1;
    }

    var page = req.query.page || 1;
    if (page < 1) page = 1;

    var limit = 3;
    var offset = (page - 1) * limit;

    var subcatvalue = categoryModel.postvaluesinglesubcat(casepost, catid, subcatid);
    var singlesubcat = categoryModel.singlesubcat(casepost, catid, subcatid, limit, offset);
    var viewmuch = categoryModel.viewmuchotherpostsinglesubcat(casepost, catid, subcatid);
    var countallpostsinglesubcat = categoryModel.postvaluesinglesubcat(casepost, catid, subcatid);

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

    // If Equals Handlebars
    var Handlebars = require('handlebars');
    Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
    });

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

    Promise.all([subcatvalue, singlesubcat, viewmuch, countallpostsinglesubcat])
        .then(([subcatvalue, singlesubcat, viewmuch, countallpostsinglesubcat]) => {
            if (subcatvalue.length > 0 && singlesubcat.length > 0 && viewmuch.length > 0) {
                if (subcatvalue[0][0].count === '0' || singlesubcat[0][0].count === '0' || viewmuch[0][0].count === '0') {
                    res.render('pages/subcategory-detail', {
                        error: true
                    });
                } else {
                    var singlesubcatpostvalue = countallpostsinglesubcat[0][0].postvalue;
                    var nPages = Math.floor(singlesubcatpostvalue / limit);
                    if (singlesubcatpostvalue % limit > 0) nPages++;

                    // Pagination Number
                    var subcatpagination = [];
                    for (var i = 1; i <= nPages; i++) {
                        var object = {
                            value: i,
                            active: i === +page
                        };
                        subcatpagination.push(object);
                    }
                    // Pagination Button
                    var btnPrevious = {
                        disable: true,
                        value: parseInt(page) - 1
                    };
                    var btnNext = {
                        disable: false,
                        value: parseInt(page) + 1
                    };

                    // Page first
                    if (page == subcatpagination[0].value) {
                        btnPrevious = {
                            disable: true,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: false,
                            value: parseInt(page) + 1
                        }
                    }
                    // Page last
                    if (page == subcatpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: false,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: true,
                            value: parseInt(page) + 1
                        }
                    }
                    // Page middle
                    if (page != subcatpagination[0].value && page != subcatpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: false,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: false,
                            value: parseInt(page) + 1
                        }
                    }
                    // Just one page
                    if (page == subcatpagination[0].value && page == subcatpagination[nPages - 1].value) {
                        btnPrevious = {
                            disable: true,
                            value: parseInt(page) - 1
                        };
                        btnNext = {
                            disable: true,
                            value: parseInt(page) + 1
                        }
                    }

                    GetTagOfPost(singlesubcat[0]).then(results => {
                        for (var i = 0; i < singlesubcat[0].length; i++) {
                            singlesubcat[0][i].tagofpost = results[i].alltag;
                        }
                        res.render('pages/subcategory-detail', {
                            viewmuch: viewmuch[0],
                            subcatvalue: subcatvalue[0],
                            singlesubcat: singlesubcat[0],
                            subcatpagination,
                            btnPrevious,
                            btnNext,
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


    // CasePost
    var casepost = 0;
    if (!req.user || (req.user.casepost == 0)) {
        casepost = 0;
    } else if (req.user.casepost == 1) {
        casepost = 1;
    }

    var singlepost = postModel.singlepost(catid, subcatid, postid);
    var postcomment = postModel.commentofpost(postid);
    var otherpost = postModel.otherpostsamecategory(casepost, postid);

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

app.post('/baiviet/:catid/:subcatid/:postid', (req, res, next) => {
    var postid = req.params.postid;
    var accountid = req.user.account_id;
    var comment = req.body.comment;
    var catid = req.params.catid;
    var subcatid = req.params.subcatid;

    var error = {
        stack: "You didn't type anything in your comment box. Please request backto the post page you've been reading and type again the message you want to send"
    }

    if (comment == '') {
        res.render('pages/errorElse', {
            message: 'NO MESSAGES TO COMMENT ON THE POST',
            error
        })
    } else {
        postModel.sendcomment(accountid, postid, comment).then(results => {
            res.redirect(`/baiviet/${catid}/${subcatid}/${postid}`);
        }).catch(next);
    }
})

module.exports = app;
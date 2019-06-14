var db = require('../utils/db');

module.exports = {
    singlepost: (catid, subcatid, postid) => {
        return db.load(`call IndexGetDetailPost(${catid}, ${subcatid}, ${postid})`);
    },

    commentofpost: id => {
        return db.load(`call IndexGetCommentDetailPost(${id})`);
    },

    otherpostsamecategory: id => {
        return db.load(`call IndexGetSameCategoryPost(${id})`);
    }
};
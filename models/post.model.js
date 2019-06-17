var db = require('../utils/db');

module.exports = {
    singlepost: (catid, subcatid, postid) => {
        return db.load(`call IndexGetDetailPost(${catid}, ${subcatid}, ${postid})`);
    },

    commentofpost: id => {
        return db.load(`call IndexGetCommentDetailPost(${id})`);
    },

    otherpostsamecategory: (casepost, id) => {
        return db.load(`call IndexGetSameCategoryPost(${casepost}, ${id})`);
    },

    sendcomment: (accountid, postid, comment) => {
        return db.load(`call IndexSendComment(${accountid}, ${postid}, '${comment}')`);
    }
};
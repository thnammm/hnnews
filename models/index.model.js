var db = require('../utils/db');

module.exports = {
    bestpost: casepost => {
        return db.load(`call IndexGetBestPost(${casepost})`);
    },

    newpost: casepost => {
        return db.load(`call IndexGetNewPost(${casepost})`);
    },

    viewpost: casepost => {
        return db.load(`call IndexGetViewPost(${casepost})`);
    },

    top8post: casepost => {
        return db.load(`call IndexGetTop8Post(${casepost})`);
    },

    top10tag: () => {
        return db.load('call IndexGetTop10Tag()');
    },

    catmenu: id => {
        return db.load(`call IndexGetSubCatofCat(${id})`);
    },

    statistic: () => {
        return db.load('call IndexGetStatistic()');
    }
};
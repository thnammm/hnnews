var db = require('../utils/db');

module.exports = {
    bestpost: () => {
        return db.load('call IndexGetBestPost()');
    },

    newpost: () => {
        return db.load('call IndexGetNewPost()');
    },

    viewpost: () => {
        return db.load('call IndexGetViewPost()');
    },

    top8post: () => {
        return db.load('call IndexGetTop8Post()');
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
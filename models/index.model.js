var db = require('../utils/db');

module.exports = {
    bestofbest: () => {
        return db.load('call GetBestOfBestPosts()');
    },

    best: () => {
        return db.load('call GetBestPosts()');
    },

    newest: () => {
        return db.load('call GetNewestPosts()');
    },

    viewest: () => {
        return db.load('call GetViewestPosts()');
    },

    top10posts: () => {
        return db.load('call GetTop10Posts()');
    },

    top10tags: () => {
        return db.load('call GetTop10Tags()');
    },

    statistic: () => {
        return db.load('call GetStatistic()');
    }
};
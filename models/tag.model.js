var db = require('../utils/db');

module.exports = {
    alltag: () => {
        return db.load('call IndexGetAllTag()');
    },

    postvaluesingletag: id => {
        return db.load(`call IndexGetPostValueOfOneTag(${id})`);
    },

    tagofpost: id => {
        return db.load(`call IndexGetTagOfPost(${id})`);
    },

    singletag: id => {
        return db.load(`call IndexGetPostOfTag(${id})`);
    },

    othertag: id => {
        return db.load(`call IndexGetOtherTag(${id})`);
    }
};
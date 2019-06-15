var db = require('../utils/db');

module.exports = {
    alltag: (limit, offset) => {
        return db.load(`call IndexGetAllTag(${limit}, ${offset})`);
    },

    countalltag: () => {
        return db.load('select count(*) as tagvalue from tag where status = 1');
    },

    postvaluesingletag: id => {
        return db.load(`call IndexGetPostValueOfOneTag(${id})`);
    },

    tagofpost: id => {
        return db.load(`call IndexGetTagOfPost(${id})`);
    },

    singletag: (id, limit, offset) => {
        return db.load(`call IndexGetPostOfTag(${id}, ${limit}, ${offset})`);
    },

    othertag: id => {
        return db.load(`call IndexGetOtherTag(${id})`);
    }
};
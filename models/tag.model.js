var db = require('../utils/db');

module.exports = {
    alltag: (limit, offset) => {
        return db.load(`call IndexGetAllTag(${limit}, ${offset})`);
    },

    countalltag: () => {
        return db.load('select count(*) as tagvalue from tag where status = 1');
    },

    postvaluesingletag: (casepost, id) => {
        return db.load(`call IndexGetPostValueOfOneTag(${casepost}, ${id})`);
    },

    tagofpost: id => {
        return db.load(`call IndexGetTagOfPost(${id})`);
    },

    singletag: (casepost, id, limit, offset) => {
        return db.load(`call IndexGetPostOfTag(${casepost}, ${id}, ${limit}, ${offset})`);
    },

    othertag: id => {
        return db.load(`call IndexGetOtherTag(${id})`);
    },

    searchtag: search => {
        return db.load(`call IndexSearchTag('${search}')`);
    }
};
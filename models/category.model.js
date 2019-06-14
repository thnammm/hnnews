var db = require('../utils/db');

module.exports = {
    postvaluesinglesubcat: (catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetPostValueOfOne(${catid}, ${subcatid})`);
    },

    singlesubcat: (catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetPostOf(${catid}, ${subcatid})`);
    },

    viewmuchotherpostsinglesubcat: (catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetViewPost(${catid}, ${subcatid})`);
    },

    postvaluesinglecat: (catid) => {
        return db.load(`call IndexCategoryGetPostValueOfOne(${catid})`);
    },

    singlecat: (catid) => {
        return db.load(`call IndexCategoryGetPostOf(${catid})`);
    },

    viewmuchotherpostsinglecat: (catid) => {
        return db.load(`call IndexCategoryGetViewPost(${catid})`);
    }
};
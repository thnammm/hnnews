var db = require('../utils/db');

module.exports = {
    postvaluesinglesubcat: (catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetPostValueOfOne(${catid}, ${subcatid})`);
    },

    singlesubcat: (catid, subcatid, limit, offset) => {
        return db.load(`call IndexSubCategoryGetPostOf(${catid}, ${subcatid}, ${limit}, ${offset})`);
    },

    viewmuchotherpostsinglesubcat: (catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetViewPost(${catid}, ${subcatid})`);
    },

    postvaluesinglecat: (catid) => {
        return db.load(`call IndexCategoryGetPostValueOfOne(${catid})`);
    },

    singlecat: (catid, limit, offset) => {
        return db.load(`call IndexCategoryGetPostOf(${catid}, ${limit}, ${offset})`);
    },

    viewmuchotherpostsinglecat: (catid) => {
        return db.load(`call IndexCategoryGetViewPost(${catid})`);
    },

    catofcat: () => {
        return db.load(`call IndexGetCatofCat()`);
    },

    subcatofcat: () => {
        return db.load(`call IndexGetSubCatofCat()`);
    }
};
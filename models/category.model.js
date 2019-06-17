var db = require('../utils/db');

module.exports = {
    postvaluesinglesubcat: (casepost, catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetPostValueOfOne(${casepost}, ${catid}, ${subcatid})`);
    },

    singlesubcat: (casepost, catid, subcatid, limit, offset) => {
        return db.load(`call IndexSubCategoryGetPostOf(${casepost}, ${catid}, ${subcatid}, ${limit}, ${offset})`);
    },

    viewmuchotherpostsinglesubcat: (casepost, catid, subcatid) => {
        return db.load(`call IndexSubCategoryGetViewPost(${casepost}, ${catid}, ${subcatid})`);
    },

    postvaluesinglecat: (casepost, catid) => {
        return db.load(`call IndexCategoryGetPostValueOfOne(${casepost}, ${catid})`);
    },

    singlecat: (casepost, catid, limit, offset) => {
        return db.load(`call IndexCategoryGetPostOf(${casepost}, ${catid}, ${limit}, ${offset})`);
    },

    viewmuchotherpostsinglecat: (casepost, catid) => {
        return db.load(`call IndexCategoryGetViewPost(${casepost}, ${catid})`);
    },

    catofcat: () => {
        return db.load(`call IndexGetCatofCat()`);
    },

    subcatofcat: () => {
        return db.load(`call IndexGetSubCatofCat()`);
    }
};
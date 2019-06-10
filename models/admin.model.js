var db = require('../utils/admindb');

module.exports = {
    // Account
    numberaccount: () => {
        return db.load('call AdminCountAccount()');
    },

    allaccount: () => {
        return db.load('call AdminGetAccount()');
    },

    // Post
    allpost: () => {
        return db.load('call AdminGetPost()');
    },

    singlepost: id => {
        return db.load(`call AdminGetOnePost(${id})`);
    },

    updatepost: (id, poststatus) => {
        return db.load(`call AdminUpdateStatusPost(${id}, '${poststatus}')`);
    },

    deletepost: id => {
        return db.load(`call AdminDeleteOnePost(${id})`);
    },

    // Category
    allcategory: () => {
        return db.load('call AdminGetCategory()');
    },

    category: () => {
        return db.load('select * from category');
    },

    editor: () => {
        return db.load('select * from editor');
    },

    addcategory: entity => {
        return db.addcategory(entity);
    },

    singlecategory: id => {
        return db.load(`call AdminGetOneCategory(${id})`);
    },

    updatecategory: (id, catname) => {
        return db.load(`call AdminUpdateOneCategory(${id}, '${catname}')`);
    },

    deletecategory: id => {
        return db.load(`call AdminDeleteOneCategory(${id})`);
    },

    // Tag
    alltag: () => {
        return db.load('call AdminGetTag()');
    },

    addtag: entity => {
        return db.addtag(entity);
    },

    singletag: id => {
        return db.load(`call AdminGetOneTag(${id})`);
    },

    updatetag: (id, tagname) => {
        return db.load(`call AdminUpdateTag(${id}, '${tagname}')`);
    },

    deletetag: id => {
        return db.load(`call AdminDeleteOneTag(${id})`);
    }
};
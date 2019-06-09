var db = require('../utils/db');

module.exports = {
    allpost: () => {
        return db.load('call AdminGetPost()');
    },

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
        return db.addcategory(entity.dad, entity.son, entity.editor);
    },

    alltag: () => {
        return db.load('call AdminGetTag()');
    },

    addtag: entity => {
        return db.addtag(entity);
    }
};
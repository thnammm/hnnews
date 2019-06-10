var db = require('../utils/admindb');

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
        return db.addcategory(entity.son, entity.dad, entity.editor);
    },

    alltag: () => {
        return db.load('call AdminGetTag()');
    },

    addtag: entity => {
        return db.addtag(entity);
    },

    singletag: id => {
        return db.load(`call AdminGetOneTag(${id})`);
    }
};
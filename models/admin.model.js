var db = require('../utils/db');

module.exports = {
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
        return db.add(entity.dad, entity.son, entity.editor);
    }
};
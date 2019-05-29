var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from USER');
    },

    single: id => {
        return db.load(`select * from USER where UserID = ${id}`)
    },

    add: entity => {
        return db.add('USER', entity);
    },

    update: entity => {
        return db.update('USER', 'UserID', entity);
    },

    delete: id => {
        return db.delete('USER', 'UserID', id);
    }
};
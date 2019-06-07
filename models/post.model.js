var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from post');
    },

    best: () => {
        return db.load(`select * from post where id = '1'`);
    }
};
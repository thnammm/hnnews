var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('call GetAllTags()');
    },
    
    search: tagkeyword => {
        return db.load(`call SearchTag('${tagkeyword}')`)
    },
};
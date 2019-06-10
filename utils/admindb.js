var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'thuynhien0302',
        database: 'hnnews'
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();

            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error)
                    reject(error);
                else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },

    addcategory: entity => {
        return new Promise((resolve, reject) => {
            var sql = `call AdminAddCategory('${entity.subcat}', ${entity.cat}, ${entity.editor})`;
            var connection = createConnection();

            connection.connect();
            connection.query(sql, entity, (error, value) => {
                if (error)
                    reject(error);
                else {
                    resolve(value);
                }
                connection.end();
            });
        });
    },

    addtag: tagname => {
        return new Promise((resolve, reject) => {
            var sql = `call AdminAddTag('${tagname}')`;
            var connection = createConnection();

            connection.connect();
            connection.query(sql, tagname, (error, value) => {
                if (error)
                    reject(error);
                else {
                    resolve(value);
                }
                connection.end();
            });
        });
    },

    
};
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

    addcategory: (dad, son, editor) => {
        return new Promise((resolve, reject) => {
            var sql = `call AdminAddCategory('${dad}', '${son}', '${editor}', @counts)`;
            var connection = createConnection();

            connection.connect();
            connection.query(sql, dad, son, editor, (error, value) => {
                if (error)
                    reject(error);
                else {
                    resolve(value.insertId);
                }
                connection.end();
            });
        });
    },

    addtag: tagname => {
        return new Promise((resolve, reject) => {
            var sql = `call AdminAddTag('${tagname}', @counts)`;
            var connection = createConnection();

            connection.connect();
            connection.query(sql, tagname, (error, value) => {
                if (error)
                    reject(error);
                else {
                    resolve(value.insertId);
                }
                connection.end();
            });
        });
    },
};
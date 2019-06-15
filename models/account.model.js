var db = require('../utils/accountdb');

module.exports = {
    register: (username, password, fullname, email) => {
        return db.load(`call SignStateRegister(${username}, ${password}, ${fullname}, ${email})`);
    }
}
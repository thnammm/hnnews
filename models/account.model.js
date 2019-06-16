var db = require('../utils/accountdb');

module.exports = {
    // Login
    login: username => {
        return db.load(`call SignStateLogin('${username}')`);
    },

    // Register
    register: (username, password, fullname, email) => {
        return db.load(`call SignStateRegister('${username}', '${password}', '${fullname}', '${email}')`);
    },

    // Get Account
    getaccount: username => {
        return db.load(`select * from account where status = 1 and user_name = '${username}'`);
    }
}
const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);


class PasswordChange{
    async changePassword (id) {
        db
        
    }

}
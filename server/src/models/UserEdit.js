const promisify = require('util').promisify;
const db = require('../dbconnection');
db.query = promisify(db.query);


class userChange{
    async changePassword (id,user) {
        db
        .query("UPDATE user SET password WHERE uid = ?" , [id])
        .then(rows => {
            return rows;
          })
            .catch(err => {
            throw err;
          });
        
    }
    async updateUser (id, user) {
        db.
        query("UPDATE user SET email = ?, firstname = ?, lastname = ? WHERE uid = ?" , [user.email, user.firstname, user.lastname, id])
        .then(rows => {
            return rows;
        })
        .catch(err => {
            throw err;
        });
        
    }
}

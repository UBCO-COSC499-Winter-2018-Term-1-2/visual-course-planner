const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);

class User {

  async checkUser(email) {
    db
      .query("SELECT * FROM user WHERE email = ?", [email])
      .then(rows => {

        if (rows > 0){
          return false;
        }
        else
          return true;
      })
      .catch(err => {
        throw err;
      });
  }

  async insertUser(newUser) {
    
    db
      .query("INSERT INTO user SET ?", [newUser])
      .then(
        console.log("user inserted")
      )
      .catch(err => {
        throw err;
      });  
  }

}

module.exports = User;


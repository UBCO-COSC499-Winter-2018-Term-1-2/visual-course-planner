const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


class User {
  async changePassword(id) {
    return db
      .query("UPDATE user SET password WHERE uid = ?", [id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });

  }
  async updateUser(id, user) {
    return db.
      query("UPDATE user SET email = ?, firstname = ?, lastname = ? WHERE uid = ?", [user.email, user.firstname, user.lastname, id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });

  }

  async checkUser(email) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    } catch (err) {
      throw err;
    }

    if (rows.length > 0) {
      return true;
    } else {
      return false;
    }

  }

  async insertUser(newUser) {

    db
      .query("INSERT INTO user SET ?", newUser)
      .then(

        console.log("user inserted")
      )
      .catch(err => {
        throw err;
      });
  }

}

module.exports = User;


const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);

class User {

  async checkUser(email) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    } catch (err) {
      throw err;
    }

    if (rows.length > 0){
      return true;
    } else {
      return false;
    }

  }

  async insertUser(newUser) {
    
    return db.query("INSERT INTO user SET ?", newUser)
      .then(rows => {
        console.log("user inserted", newUser);
        return rows.insertId;
      })
      .catch(err => {
        throw err;
      });  
  }

  async getUser(email) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    } catch (err) {
      throw err;
    }

    return rows[0];

  }


  async getUserById(id) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE id = ?", [id]);
    } catch (err) {
      throw err;
    }

    return rows[0];

  }

  async insertCourses(courses) {

        db
      .query("INSERT INTO user_course_info SET ?", courses)
      .then(
        console.log("Course(s) succesfully inserted into db for user")
      )
      .catch(err => {
        throw err;
      });  
  }



}

module.exports = User;


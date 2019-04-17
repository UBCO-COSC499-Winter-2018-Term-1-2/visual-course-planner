const promisify = require('util').promisify;
const db = require('../../../dbconnection');
db.query = promisify(db.query);


module.exports = {
  async changePassword(id) {
    return db
      .query("UPDATE user SET password WHERE id = ?", [id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });

  },
  async updateUser(id, user) {
    return db.
      query("UPDATE user SET firstname = ?, lastname = ? WHERE id = ?", [user.firstname, user.lastname, id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });

  },

  async updateUserName(id, firstname, lastname) {
    return db.
      query("UPDATE user SET firstname = ?, lastname = ? WHERE id = ?", [firstname, lastname, id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },

  async updateUserNameAndPassword(id, firstname, lastname, password) {
    return db.
      query("UPDATE user SET firstname = ?, lastname = ?, password = ? WHERE id = ?", [firstname, lastname, password, id])
      .then(rows => {
        return rows;
      })
      .catch(err => {
        throw err;
      });
  },

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

  },

  async insertUser(newUser) {
    
    return db.query("INSERT INTO user SET ?", newUser)
      .then(rows => {
        // console.log("user inserted", newUser);
        return rows.insertId;
      })
      .catch(err => {
        throw err;
      });  
  },

  async getUser(email) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE email = ?", [email]);
    } catch (err) {
      throw err;
    }

    return rows[0];

  },


  async getUserById(id) {
    let rows = [];
    try {
      rows = await db.query("SELECT * FROM user WHERE id = ?", [id]);
    } catch (err) {
      throw err;
    }

    return rows[0];

  },

  async insertCourse(course) {
    return db
      .query("INSERT INTO user_course_info SET ?", course)
      .then(rows => {
        // console.log("Course(s) succesfully inserted into db for user");
        return rows.insertId;
      })
      .catch(err => {
        throw err;
      });
  },

  async getCourses(id) {
    let rows = [];
    try {
      rows = await db.query("SELECT cid FROM user_course_info WHERE uid = ?", [id]);
    } catch (err) {
      throw err;
    }

    return rows;

  }

};

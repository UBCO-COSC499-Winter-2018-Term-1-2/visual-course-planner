const promisify = require('util').promisify;
const db = require('../../..dbconnection');
db.query = promisify(db.query);

class Note { 

    async getNotes (id){
        db
        .query("SELECT description FROM plan WHERE uid = ?" ,[id] )
    
        .then(rows => {
        return rows;
      })
        .catch(err => {
        throw err;
      });
    }
    

    async saveNotes (id) {
      db 
      .query( "UPDATE description FROM plan WHERE uid = ?" , [id] )

      then(rows => {
        return rows;
      })
      .catch (err => {
        throw err;
      });
      }
      }
    

  

const db = require('../dbconnection');

var Item = {

  getAllItems: function(callback) {
    return db.query('SELECT * FROM Item ORDER BY date DESC', callback);
  },

  getItemById: function(id, callback) {
    return db.query('SELECT * FROM Item WHERE id = ?', [id], callback);
  },

  addItem: function(Item, callback) {
    return db.query('INSERT INTO Item(name) VALUES(?)', [Item.name], callback);
  },

  deleteItem: function(id, callback) {
    return db.query('DELETE FROM Item WHERE id = ?', [id], callback);
  }
}

module.exports = Item;
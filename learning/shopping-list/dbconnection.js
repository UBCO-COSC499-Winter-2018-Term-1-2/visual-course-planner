const mysql = require('mysql');

const connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'root',
  database:'db_shopping_list',
  port: '8889'
 
});

module.exports = connection;
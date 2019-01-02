const mysql = require('mysql');

const connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'',
  database:'vcp',
  port: '8889'
 
});


module.exports = connection;
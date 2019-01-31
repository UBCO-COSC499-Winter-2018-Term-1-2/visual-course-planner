const mysql = require('mysql');

const connection = mysql.createPool({
  host:'localhost',
  user:'vcpUser',
  password:'',
  database:'vcp',
  port: '3306'
 
});


module.exports = connection;
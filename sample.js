var fs = require('fs');
var csv = require('fast-csv');

fs.createReadStream('datasample.csv')
 .pipe(csv())
 .on('data', function(data) {
     console.log(data);
 })
 .on('end' , function(data){
     console.log('Read finished');
 })
 

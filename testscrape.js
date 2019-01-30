var csvParser = require('csv-parse');

fs.readFile(filePath, {
  encoding: 'utf-8'
}, function(err, csvData) {
  if (err) {
    console.log(err);
  }

  csvParser(csvData, {
    delimiter: ','
  }, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
});
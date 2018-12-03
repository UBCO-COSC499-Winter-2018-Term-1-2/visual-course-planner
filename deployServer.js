const exec = require('child_process').exec;
const express = require('express');

const app = express();
app.use(express.json());

if (process.env.NODE_ENV != 'production') {
  console.log("This should only run on server.");
  return;
}
const codePath = "/var/www/html/client/build";

// Server static assets if in production
app.post('/api/deploy', (req, res) => {
  console.log(req.body);
  const updateCommand = `cd ${codePath}; git fetch --all; git reset origin/master;`;
  exec(updateCommand, function(err) {
    if (err == null) {
      res.status(200);
      res.setHeader('ContentType', 'text/plain');
      res.send("success");
    }
  });
});

const port = 4000;

app.listen(port, () => console.log(`Deploy server started on port ${port}.`));
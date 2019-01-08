const express = require('express');
const bodyParser = require('body-parser');

const adminUpload = require('./server/src/routes/api/admin/upload');
const warnings = require('./server/src/routes/api/warnings');
const degrees = require('./server/src/routes/api/degrees');
const signup = require('./server/src/routes/api/users');
const path = require('path');
const fileUpload = require('express-fileupload');


const app = express();

// Express Middleware
app.use(express.json());
app.use(fileUpload());

// Body ParserMiddleware
app.use(bodyParser.json());

// Use routes
app.use('/api/admin/upload', adminUpload);
app.use('/api/warnings', warnings);
app.use('/api/degrees', degrees);
app.use('/api/users', signup);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));

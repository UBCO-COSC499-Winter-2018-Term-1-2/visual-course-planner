const express = require('express');

const adminUpload = require('./server/src/routes/api/admin/upload');
const warnings = require('./server/src/routes/api/warnings');
const degrees = require('./server/src/routes/api/degrees');
const path = require('path');
const fileUpload = require('express-fileupload');

const app = express();

// Express Middleware
app.use(express.json());
app.use(fileUpload());

// Use routes
app.use('/api/admin/upload', adminUpload);
app.use('/api/warnings', warnings);
app.use('/api/degrees', degrees);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
const express = require('express');

const upload = require('./server/src/routes/api/upload');
const warnings = require('./server/src/routes/api/warnings');
const path = require('path');
const fileUpload = require('express-fileupload');
const userEdit = require('./server/src/routes/api/userEdit');
const plan = require('./server/src/routes/api/plans');
const notes = require('./server/src/routes/api/notes');

const app = express();

// Express Middleware
app.use(express.json());
app.use(fileUpload());

// Use routes
app.use('/api/upload', upload);
app.use('/api/warnings', warnings);
app.use('/api/userEdit', userEdit );
app.use('/api/plans', plans);
app.use('/api/notes', notes);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));
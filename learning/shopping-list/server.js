const express = require('express');
const mongoose = require('mongoose');

const items = require('./routes/api/items');
const path = require('path');

const app = express();

// Express Middleware
app.use(express.json());

// DB config
const db = require('./keys/config.js').mongoURI;

// DB Connection
mongoose
    .connect(db)
    .then(() => console.log('MongoDB Connected.'))
    .catch(err => console.log(err));

// Use routes
app.use('/api/items', items)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`))
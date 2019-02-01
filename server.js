const express = require('express');
const bodyParser = require('body-parser');

const adminUpload = require('./server/src/routes/api/admin/upload');
const warnings = require('./server/src/routes/api/warnings');
const users = require('./server/src/routes/api/users');
const degrees = require('./server/src/routes/api/degrees');
const courses = require('./server/src/routes/api/courses');
const path = require('path');
const fileUpload = require('express-fileupload');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const app = express();

// Express Middleware
app.use(express.json());
app.use(fileUpload());

// Body ParserMiddleware
app.use(bodyParser.json());

//flash middleware
app.use(cookieParser());
app.use(session(
  {
    cookie: {
      maxAge: 60000,
      name: 'gang'
    },
    secret: "cats",
    resave: false,
    saveUninitialized: false
  }
));
app.use(flash());

// passport config
require('./server/src/config/passport')(passport);

// passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Use routes
app.use('/api/admin/upload', adminUpload);
app.use('/api/warnings', warnings);
app.use('/api/users', users);
app.use('/api/degrees', degrees);
app.use('/api/courses', courses);

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));

const express = require('express');
const bodyParser = require('body-parser');

const adminUpload = require('./server/src/routes/api/admin/upload');
const warnings = require('./server/src/routes/api/warnings');
const users = require('./server/src/routes/api/users');
const degrees = require('./server/src/routes/api/degrees');
const specializations = require('./server/src/routes/api/specializations');
const courses = require('./server/src/routes/api/courses');
const terms = require('./server/src/routes/api/terms');
const sessions = require('./server/src/routes/api/sessions');
const path = require('path');
const fileUpload = require('express-fileupload');
const plans = require('./server/src/routes/api/plans');
const passport = require('passport');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressValidator = require('express-validator');
const morgan = require('morgan');


const app = express();


// Logging
<<<<<<< HEAD
app.use(morgan("dev"));
=======
app.use(morgan("tiny"));
>>>>>>> c9c2572f803245e51f79ad3b248ef2ec0e0b04eb
// Express Middleware
app.use(fileUpload());
app.use(expressValidator());

// Body ParserMiddleware
app.use(bodyParser.json({ limit: "50mb" }));

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
app.use('/api/users', users );
app.use('/api/plans', plans);
app.use('/api/degrees', degrees);
app.use('/api/specializations', specializations);
app.use('/api/courses', courses);
app.use('/api/terms', terms);
app.use('/api/sessions', sessions);


// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}.`));

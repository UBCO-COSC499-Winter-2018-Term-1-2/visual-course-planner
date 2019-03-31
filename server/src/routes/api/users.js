const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const nodemailer = require("nodemailer");

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.getUserById(userId);
    console.log(user);
    res.status(200).send({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      id: user.id,
      standing: user.standing
    });
  } catch(e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.post('/:id/changePassword', async (req, res) => {
  const UserId = req.params.id;
  await User.changePassword(UserId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error("Couldn't change password", err);
    });
});

router.post('/:id/updateUserInfo', (req, res) => {
  const UserId = req.params.id;
  User.updateUser(UserId, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("Couldn't change info");
    }
  });
});

/**
 * @route POST api/users/signup
 * @desc Insert a new user into the database
 * @access Private
 */ 

router.post('/signup', async (req, res) => {
  console.log(req.body);

  const email = req.body.email;
  const password = req.body.password;

  //server side validation

  req.checkBody('fName', 'Name is required').notEmpty();
  req.checkBody('lName', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.status(500).send(errors);

  } else {
        
    const existUser = await User.checkUser(email);
        
    if(existUser === true){
      console.error("User already exists");
      res.status(500).send("User already exists. Did not create user.");
    }else{

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
          if(err){
            console.log(err);
          }

          const hashPassword = hash;
          var newUser = {     
            email: req.body.email,
            password: hashPassword,
            firstname: req.body.fName,
            lastname: req.body.lName,
            isAdmin: false,
            standing: 0
          };
          
          try{
            const userId = await User.insertUser(newUser);
            console.log("User was created: " + userId);
            res.status(200).send({userId, email: newUser.email});
          }
          catch(err) {
            console.error("User was not created");
            res.status(500).send("User was not created. Error with db." + err);
          }

        });
      });
    }
  }
});


/**
 * @route POST api/users/login
 * @desc authenticate a user
 * @access Private
 */ 

router.post('/login', (req, res, next) => {
  console.log('here now!');
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    console.log("info", info);
    if (err) {
      console.error(err);
    }
    res.send({...info, user});
  })(req, res, next);
  
});

/**
 * @route POST api/users/coursehistory
 * @desc Insert previous courses taken by user into database
 * @access Private
 */ 

router.post('/:id/coursehistory', async (req, res) => {
  if (Object.keys(req.body).length === 0){
    console.log('no courses selected, nothing stored');
    res.status(200).send('no course history selected');
  } else {
    let userId = req.params.id;
    let courses = [];
    for (let course in req.body.takenCourses) {
      courses.push({
        uid: userId,
        cid: course.code
      });
    }
    console.log(courses);
    for (let i in courses) {
      console.log(courses[i]);
      await User.insertCourse(courses[i]);
    }
    res.status(200).send('course(s) inserted for user');
  }
});

/**
 * @route GET api/users/coursehistory
 * @desc Retreive all user course history
 * @access Private
 */ 

router.get('/:id/coursehistory', async (req, res) => {
  let userId = req.params.id;

  if (await User.getCourses(userId) <= 0){
    console.log('no course history found for user');
    res.status(200).send('no course history found for user');
  } else {
    const courses = await User.getCourses(userId); 
    console.log(courses);
    res.status(200).send("fetching all user courses: " + courses);
  }
});


// router.get('/emailVerification', async (req, res) => {

//   // async..await is not allowed in global scope, must use a wrapper
//   async function main(){
  
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let account = await nodemailer.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: account.user, // generated ethereal user
//         pass: account.pass // generated ethereal password
//       }
//     });
  
//     // setup email data with unicode symbols
//     let mailOptions = {
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>" // html body
//     };
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail(mailOptions)
  
//     console.log("Message sent: %s", info.messageId);
//     // Preview only available when sending through an Ethereal account
//     console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  
//     // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//     // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//   }
  
//   main().catch(console.error);

// });

router.post('/emailVerification', async (req, res) => {
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'visualcourseplanner@gmail.com',
    pass: 'capstone2019'
  }
});

var mailOptions = {
  from: 'visualcourseplanner@gmail.com',
  to: 'noman0786@hotmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});

});

module.exports = router;

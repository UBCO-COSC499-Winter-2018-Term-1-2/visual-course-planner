const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const mail = require('../../services/EmailService');


/**
 * @route GET api/users/id
 * @desc Get all user info
 * @access Private
 */ 

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

/**
 * @route POST api/users/changePassword
 * @desc Change a user password
 * @access Private
 */ 

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

/**
 * @route POST api/users/updateUserInfo
 * @desc Change the user info 
 * @access Private
 */ 

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

          //create the token here and store in DB
          const token = mail.generateEmailToken();

          const hashPassword = hash;
          var newUser = {     
            email: req.body.email,
            password: hashPassword,
            firstname: req.body.fName,
            lastname: req.body.lName,
            isAdmin: false,
            standing: 1
            confirmed: false,
            authToken: token

          };
          
          try{
            const userId = await User.insertUser(newUser);
            console.log("User was created: " + userId);
            res.status(200).send({userId, email: newUser.email});
            //Verification email being sent
            mail.sendEmail(newUser.email, token, userId);
            console.log("The user: " + newUser.email + " was sent a verification email.");
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
 * @desc authenticate a user for login
 * @access Private
 */ 

router.post('/login', async (req, res, next) => {
  console.log(req.body);
  let email = req.body.email;
  let user = await User.getUser(email);
  console.log(user.confirmed);
  if (user.confirmed == 1){
    passport.authenticate('local', (err, user, info) => {
      console.log("info", info);
      if (err) {
        console.error(err);
      }
      res.send({...info, user});
    })(req, res, next);
  }else{

    console.log('The user: ' + user.email + ' is not verified. Please verify your email');
    res.status(200).send('The user: ' + user.email + ' is not verified. Please verify your email');

  }
  
});

/**
 * @route POST api/users/coursehistory
 * @desc Insert previous courses taken by user into database
 * @access Private
 */ 

router.post('/:id/coursehistory', async (req, res) => {
  console.log("hit course hist route");
  if (Object.keys(req.body).length === 0){
    console.log('no courses selected, nothing stored');
    res.status(200).send('no course history selected');
  } else {
    let userId = req.params.id;
    let courses = [];
    console.log({"body": req.body});
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
    console.log(courses[0]);
    res.status(200).send({message: "fetching all user course history", course: courses});
  }
});

/**
 * @route POST api/users/emailToken
 * @desc Replace existing verification token with new token for authentication and send out email
 * @access Private
 */ 

router.post('/:id/emailToken', async (req, res) => {
  let userId = req.body.uid;
  let user = await User.getUserById(userId);

  const token = mail.generateEmailToken();
  if(user.confirmed == 0){
    await User.updateUserToken(userId, token);
    mail.sendEmail(user.email, token, userId);
    console.log("The user: " + user.email + " is sent another email. The old link is no longer valid");
    res.status(200).send("The user: " + user.email + " is sent another email. The old link is no longer valid");
  }else{
    console.log("The user: " + user.email + " is already verified.");
    res.status(200).send("The user: " + user.email + " is already verified.");
  }
});

/**
 * @route POST api/users/emailVerification
 * @desc Authenticate the user token for verification
 * @access Private
 */ 

router.post('emailVerification/:uid/:token/', async (req, res) => {
  let token = req.body.token;
  let userId = req.body.uid;
  let user = await User.getUserById(userId);
  
  if(token === user.authToken){
    console.log("The tokens match! User authenticated");
    res.status(200).send("The tokens match! User authenticated");
    await User.verifyUser(userId);
  }else{
    console.log("The user: " + user.email + " could not be verified.");
    res.status(200).send("The user: " + user.email + " could not be verified.");
  }
});


module.exports = router;

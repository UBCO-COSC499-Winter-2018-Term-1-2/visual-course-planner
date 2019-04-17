const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const passport = require('passport');

router.get('/:id', async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.getUserById(userId);
    // console.log(user);
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
  const userId = req.params.id;


  req.checkBody('fName', 'Name is required').notEmpty();
  req.checkBody('lName', 'Name is required').notEmpty();

  console.log(req.body.newPassword !== '', req.body.newPassword, req.body.confirmNewPassword);
  if (req.body.newPassword !== '' && req.body.newPassword) {
    req.checkBody('newPassword', 'Minimum password length is 5 characters').isLength({ min: 5 });
    req.checkBody('confirmNewPassword', 'Passwords do not match').equals(req.body.newPassword);
  }


  let errors = req.validationErrors();
  if (errors) {
    console.log(errors);
    res.status(500).send(errors);
  } else {

    const firstname = req.body.fName;
    const lastname = req.body.lName;
    const password = req.body.newPassword;

    if (password !== '' && password) {
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, async function(err, hash){
          if(err){
            console.log(err);
          }
  
          User.updateUserNameAndPassword(userId, firstname, lastname, hash);
          res.status(200).send('Name and password were updated');
  
        });
      });
    } else {
      User.updateUserName(userId, firstname, lastname);
      res.status(200).send('Name was updated');
    }
    
  }
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
  req.checkBody('password', 'Minimum password length is 5 characters').isLength({ min: 5 });
  req.checkBody('confirmPassword', 'Minimum password length is 5 characters').isLength({ min: 5 });
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
            standing: 1,
            confirmed: false,
            authToken: token
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

router.post('/login', async (req, res, next) => {
  // console.log(req.body);
  let email = req.body.email;
  let user = await User.getUser(email);
  console.log(user.confirmed);
  if (user.confirmed == 1){
    passport.authenticate('local', (err, user, info) => {
      console.log("info", info);
      if (err) {
        console.error(err);
      }
      delete user.password;
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
    console.log(courses);
    res.status(200).send("fetching all user courses: " + courses);
  }
});

/**
 * @route POST api/logout
 * @desc end the users session
 * @access Private
 */

router.post('/emailVerification/:uid/:token', async (req, res) => {
  let token = req.params.token;
  let userId = req.params.uid;
  let user = await User.getUserById(userId);
  console.log(user);
  if (user) {
    if(token === user.authToken){
      console.log("The tokens match! User authenticated");
      await User.verifyUser(userId);
      res.status(200).send({message: "The tokens match! User authenticated", verified: true});
    }else{
      console.log({message: "The user: " + user.email + " could not be verified.", verified: false});
      res.status(200).send({message: "The user: " + user.email + " could not be verified.", verified: false});
    }
  } else {
    res.status(404).send("User not found");
  }
  
});

//   console.log(req.session);
// });

module.exports = router;

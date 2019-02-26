const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const passport = require('passport');


router.use(expressValidator()); // put the use in server.js and also import through npm?


//user model
const User = require('../../models/User');
const user = new User();

/**
 * @route POST api/users
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
  if(errors){
    console.log(errors);
    res.status(500).send(errors);

  }else{ 
        
    const existUser = await user.checkUser(email);
        
    if(existUser === true){

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
            await user.insertUser(newUser);
            res.status(200).send("New user was created.");
          }
          catch(err) {
            res.status(500).send("User was not created. Error with db." + err);
          }

        });
      });
    }
  }
});


router.post('/login', (req, res, next) => {
  console.log(req.body);
  passport.authenticate('local', (err, user, info) => {
    console.log("info", info);
    if (err) {
      console.error(err);
    }
    res.send({...info, user});
  })(req, res, next);
  
});


router.post('/signup/coursehistory', async (req, res) => {

  if(Object.keys(req.body).length === 0){
    console.log('no courses selected, nothing stored');
    res.status(200).send('no course history selected');
  }else{
  // console.log(req.body);
  // console.log(req.body.length);
    var courses = {};
    for(var key in req.body) {
      if(req.body.hasOwnProperty(key)){
        courses[key] = req.body[key];
      }
    }
    //console.log(courses);
    // var test = {
    // uid: req.body.uid,
    // cid: req.body.course
    // };
    for(var i in courses) {
      console.log(courses[i]);
      await user.insertCourses(courses[i]);
    }

    res.status(200).send('course(s) inserted for user');
  }

});


module.exports = router;
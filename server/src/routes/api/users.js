const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const passport = require('passport');


router.use(expressValidator()); // put the use in server.js and also import through npm?

const redirectLogin = (req, res, next) => {
  if (!req.session.userId){
    res.redirect('/login')
  }else{
    next()
  }
}

//user model
const User = require('../../models/User');
const user = new User();

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
    return info;
    //res.send({...info, user});
  })(req, res, next);
  
});

/**
 * @route POST api/users/coursehistory
 * @desc Insert previous courses taken by user into database
 * @access Private
 */ 

router.post('/:id/coursehistory', async (req, res) => {
  if(Object.keys(req.body).length === 0){
    console.log('no courses selected, nothing stored');
    res.status(200).send('no course history selected');
  }else{
  let user_Id = req.params.id;
  let courses = [];
  for(let key in req.body) {
    courses[key] = {
      uid:user_Id,
      cid: req.body[key]
    }
  }
  console.log(courses);
  for(let i in courses) {
    console.log(courses[i]);
    await user.insertCourses(courses[i]);
}
  res.status(200).send('course(s) inserted for user');
}
});

router.get('/:id/coursehistory', async (req, res) => {
  let user_Id = req.params.id;
  if(await user.getCourses(user_Id).length == 0){
    console.log('no course history found for user');
    res.status(200).send('no course history found for user')
  }else{
    let courses = await user.getCourses(courses[i]);
    console.log(courses);
  }

  

});

/**
 * @route POST api/logout
 * @desc end the users session
 * @access Private
 */

router.post('/logout',redirectLogin, async (req, res) => {

  console.log(req.session);
 
  });

module.exports = router;
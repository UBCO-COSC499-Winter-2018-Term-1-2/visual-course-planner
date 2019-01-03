const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


//user model
const User = require('../../models/User');


/**
 * @route POST api/sign-up
 * @desc Insert a new user into the database
 * @access Private
 */ 

router.post('/', (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  // server side validation
  req.checkBody('fname', 'Name is required').notEmpty();
  req.checkBody('lname', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').isEmpty();
  req.checkBody('confirmPassword', 'Confirm password is required').isEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();
  if(errors){

    res.render('LoginInterface', {

      errors:errors
    });     
  }else{
        
    let existUser = User.checkUser(email);
        
    if(existUser == true){

      res.status(500).send("User already exists. Did not create user.");

    }else{

      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(password, salt, function(err, hash){
          if(err){
            console.log(err);
          }

          const hashPassword = hash;
          var newUser = {
                        
            email: req.body.email,
            password: hashPassword,
            firstname: req.body.fname,
            lastname: req.body.lname,
            isAdmin: false,
            standing: 0
                
          };

          // do some error handling either in the model, or here: https://medium.com/technoetics/handling-user-login-and-registration-using-nodejs-and-mysql-81b146e37419

          User.insertUser(newUser);

          // check on postman

        });
      });
    }
  }
});

module.exports = router;
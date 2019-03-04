const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const userChange = require('../../models/User');

router.post('/:id/changePassword', (req, res) => {
  const UserId = req.params.id;
  userChange.changePassword(UserId, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("Couldn't change password");
    }
  });
});

router.post('/:id/updateUserInfo', (req, res) => {
  const UserId = req.params.id;
  userChange.updateUser(UserId, (err, data) => {
    if (err == null) {
      res.send(data);
    } else {
      console.error("Couldn't change info");
    }
  });
});

module.exports = router;
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');

router.use(expressValidator());


//user model

const user = new User();

/**
 * @route POST api/users
 * @desc Insert a new user into the database
 * @access Private
 */ 

router.post('/', async (req, res) => {
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
        bcrypt.hash(password, salt, function(err, hash){
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
            yearStanding: 0
                
          };
          
          try{
            user.insertUser(newUser);
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

module.exports = router;

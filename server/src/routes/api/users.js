const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const passport = require('passport');
const flash = require('connect-flash');

app.use(flash());

router.use(expressValidator());


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
            standing: 0
                
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

router.get('/login', async (req, res) => {
  res.status(500).send("login get route");
  // res.render('LoginInterface')

 });

router.post('/login', async (req, res, next) => {

res.status(500).send("login post route");

passport.authenticate('local', {

  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true,
  passReqToCallback : true
})(req, res, next);

});


module.exports = router;
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 

//user model
const User = require('../models/User');
const user = new User();

module.exports = function(passport){
//local strategy
passport.use(new LocalStrategy({

  usernameField: 'email',
  passwordField: 'password'
},
  
  function(email, password, done){


  console.log(email, password);
 // match email
  let userExists = false;
  try {
    userExists = user.checkUser(email);
  }
  catch(err) {
    done("Error with db." + err);
  } 
  if (userExists === false) {
    console.log('no user found');
    return done(null, false, {message: 'no user found'});
  } else {
    const userLogin = user.getUser(email);// probably not the right way to do it
    bcrypt.compare(password, userLogin[0].password, function(err, isMatch){ 
    
      if (err) {
        throw err;
      } 

      if (isMatch) {
          console.log('user matched');
          return done(null, userLogin[0]);
      } else {
          console.log('wrong password');
          return done(null, false, {message: 'Wrong password'});
      }
 });

  }
}));

passport.serializeUser(function(user, done) {
    done(null, userLogin[0].id);
  });
  
  passport.deserializeUser(function(id, done) {
    const userLogin2 = getuserbyId(id);
      done(err, userLogin2[0]);
  });

}

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
  
  async function(email, password, done){


  console.log(email, password);
  // match email
  let userExists = false;
  try {
    userExists = await user.checkUser(email);
  }
  catch(err) {
    done("Error with db." + err);
  } 
  if (userExists === false) {
    console.log('no user found');
    return done(null, false, {message: 'no user found'});
  } else {
    const loggedInUser = await user.getUser(email);
    bcrypt.compare(password, loggedInUser.password, function(err, isMatch){ 
    
      if (err) {
        throw err;
      } 

      if (isMatch) {
        console.log('user matched');
        return done(null, loggedInUser);
      } else {
        console.log('wrong password');
        return done(null, false, {message: 'Wrong password'});
      }
 });

  }
}));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
  
passport.deserializeUser(function(id, done) {
  const userLogin = user.getUserById(id);
  done(err, userLogin);
});

}

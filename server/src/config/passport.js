const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 

//user model
const User = require('../models/User');
const user = new User();

module.exports = function(passport){
//local strategy
passport.use(new LocalStrategy(function(email, password, done){
 // match email
 try{
    const existUser = await user.checkUser(email);
  }
  catch(err) {
    res.status(500).send("Error with db." + err);
  } 
  if(existUser === false){
      return done(null, false, {message: 'no user found'});
  }else{
      const userLogin = user.getUser(email);// probably not the right way to do it
    bcrypt.compare(password, userLogin[0].password, function(err, isMatch){ 
    if(err) throw err;
    if(isMatch){
        return done(null,userLogin[0]);
    }else{
        return done(null, false, {message: 'Wrong password'});
    }
 });

  }
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}

//basically how can i access each elememt indivdually then continue coding 
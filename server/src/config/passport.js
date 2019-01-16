const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs'); 
const passport = require('passport');

//user model
const User = require('../models/User');
const user = new User();

module.exports = function(passport){
//local strategy
passport.use(new LocalStrategy(function(email, password, done){
 // match email
 try{
    const existUser = user.checkUser(email);
  }
  catch(err) {
    res.status(500).send("Error with db." + err);
  } 
  if(existUser === false){
    res.status(500).send("no user found");
    console.log('no user found');
      return done(null, false, {message: 'no user found'});
    
  }else{
      const userLogin = user.getUser(email);// probably not the right way to do it
    bcrypt.compare(password, userLogin[0].password, function(err, isMatch){ 
    if(err) throw err;
    if(isMatch){
        res.status(200).send("User matched.");
        console.log('user matched');
        return done(null,userLogin[0]);
    }else{
        res.status(200).send("wrong password.");
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

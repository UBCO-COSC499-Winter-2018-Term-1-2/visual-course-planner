const express = require('express');
const router = express.Router();

//user model
const User = require('../../models/User');


/**
 * @route POST api/sign-up
 * @desc Insert a new user into the database
 * @access Private
 */ 

 router.post('/', (req, res) => {

    // const fname = req.body.fname;
    // const lname = req.body.lname;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirmPassword = req.body.confirmPassword;

    const newUser = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        isAdmin: false,
        standing: 0
    }

    req.checkBody('fname', 'Name is required').notEmpty();
    req.checkBody('lname', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('password', 'Password is required').isEmpty();
    req.checkBody('confirmPassword', 'Confirm password is required').isEmpty();
    req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);







// todo: do some server side validation from the video

//todo: chek if user exists using function, if yes then refresh page and send a flash message,if no then hash password using bcrypt
//and insert user usisng the funciton from model
// test using postman

req.body

 });

module.exports = router;
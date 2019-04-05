const nodemailer = require("nodemailer");
const randomstring = require('randomstring');

module.exports = {
  //Method takes in the user email to be sent, the token and id to be concatenated in the verification link
    async sendEmail(email,token, id) {
      //TODO: need to change the link so its dynamic, for now hard coded!
        let link = "http://localhost:3000/confirm-email?token=" + token +"&id=" +id;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'visualcourseplanner@gmail.com',
              pass: 'capstone2019'
            }
          });
          
          var mailOptions = {
            from: 'visualcourseplanner@gmail.com',
            to: email,
            subject: 'VCP: Confirm Email Address',
            html : "Hello,<br> Please click on the link to verify your email.<br><a href="+link+">Click here to verify</a> <br> " + link +"<br>" 
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
  },
//Method generates the auth token for verification
    generateEmailToken() {

    const token = randomstring.generate();
    return token;

}
};


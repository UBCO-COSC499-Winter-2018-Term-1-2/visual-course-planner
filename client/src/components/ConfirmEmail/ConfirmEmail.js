import React, { Component } from 'react';
import './ConfirmEmail.css';
import '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';

import Input from '../Input/input';
import axios from 'axios';

class ConfirmEmail extends Component {
 
    state = {
      emailVerificationMenu: {
        email: {
          elementType: 'text',
          elementConfig: {
            type: 'text',
            placeholder: 'Email'
          },
          value: '',
          validation: {
            required: true
          },
          valid: false,
          inputElementTouched: false 
        },
      
    
      },
      formIsValid: false,
      loading: false
    }

    handler = ( event ) => {
      event.preventDefault();
      this.setState( { loading: true } );
      
      //this is log send user input to send to database.
      const menuData = {};

      for (let formElementIdentifier in this.state.emailVerificationMenu) {
        menuData[formElementIdentifier] = this.state.emailVerificationMenu[formElementIdentifier].value;
      }

      //AXIO CODE HERE
      axios.get('/api/users', {
        emailVerificationMenu: {

          fName: this.state.value,
          email: this.state.value
        }
      })
        .then(function (response) {
          console.log("THIS IS THE GET CALL");
          console.log(response);
          //resultElement.innerHTML = generateSuccessHTMLOutput(response);
        })
        .catch(error => {
          //resultElement.innerHTML = generateErrorHTMLOutput(error);
          this.setState( { loading: false } );
          if(error.response){
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request){
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }


    render(){
      const formElementsArray = [];

      for (let key in this.state.emailVerificationMenu) {
        formElementsArray.push({
          id: key,
    
          config: this.state.emailVerificationMenu[key]
        });
      }
      
      let form = (
        <form onSubmit={this.handler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              value={formElement.config.value} 
            />
          ))}
        </form>
      );


      return(
        //RETURN LOGIN MENU HERE
        <div className="menu">
          <h1 className="login-heading">Registration Successful</h1>
          <p className='msg-text'>Thank you for registering with the Visual Course Planner!
           An email has been sent out to {form} </p>
          <p className='msg-text'>Please confirm your email to proceed. </p>
        </div> 

      );
    }
} //end of class 

ConfirmEmail.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
};

export default ConfirmEmail;
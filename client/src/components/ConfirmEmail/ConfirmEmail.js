import React, { Component } from 'react';
import './ConfirmEmail.css';
import '../Signup/CreateAccountMenu';
// import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';
//mport { promises } from 'fs';


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
      // this needs to be changed to validate user login info... Handling Form Submission Video on udemy.comn 
      const menu = {
        // ingredients: this.props.ingredients,
        // price: this.props.price,
        menuData: menuData
      };

      //AXIO CODE HERE
      axios.get('/api/users', {
        createAccountMenu: {

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

      axios.post( 'login', menu )
        .then( response => {
          this.setState( { loading: false } );
          console.log("no errors::");
          console.log(response);
          //this.props.history.push( '/' );
        } )
        .catch( error => {
          this.setState( { loading: false } );
          if(error.response){
          // console.log(error.response);
            console.log("data::");
            console.log(error.response.data);
            console.log("status::");
            console.log(error.response.status);
            console.log("headers::");
            console.log(error.response.headers);
          } else if (error.request){
            console.log('ERROR', error.message);
          }
          console.log(error.config);
        } );
    
    }


    render(){
      const formElementsArray = [];

      for (let key in this.state.emailVerificationMenu) {
        formElementsArray.push({
          id: key,
    
          config: this.state.emailVerificationMenu[key]
        });
      }
      
      //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + LOGININTERFACE.CSS
      //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
      let form = (
        <form onSubmit={this.handler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              //elementType={formElement.config.elementType}
              //elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              //invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
              //shouldBeValidated={formElement.config.validation}
              //inputElementTouched={formElement.config.inputElementTouched}
              //changed={(event) => this.inputChangeHandler(event, formElement.id)} 
            />
          ))}
        </form>
      );


      return(
        //RETURN LOGIN MENU HERE
        <div className="menu">
          <h1 className="login-heading">Registration Successful</h1>
          {/* {form}      */}
          <p className='msg-text'>Thank you for registering with the Visual Course Planner!
           An email has been sent out to {form} </p>
          <p className='msg-text'>Please confirm your email to proceed. </p>
        </div> 

      );
    }
} //end of class 

ConfirmEmail.propTypes = {
  toggleMenu: PropTypes.func, //MAKE SURE TO ADD . isRequired!!!
};

export default ConfirmEmail;
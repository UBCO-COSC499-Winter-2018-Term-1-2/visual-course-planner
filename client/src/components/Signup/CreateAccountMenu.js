import React, { Component } from 'react';
// import React from 'react';
import '../Login/LoginInterface.css';
//import Button from '../Button/button';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Input from '../Input/input';
//import axios from 'axios';
//import validationWarning from '../WarningSnackbar/WarningSnackbar';


class CreateAccountMenu extends Component {
  
    state = {      
      validationWarnings: [],
      createAccountMenu: {
        fName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* First Name'
          },
          value: '',
          validation: {
            required: true
          },
          label: '',
          valid: false,
          inputElementTouched: false 
        },
        lName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* Last Name'
          },
          value: '',
          validation: {
            required: true
          },
          label: '',
          valid: false,
          inputElementTouched: false 
        },

        email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* Email'
          },
          value: '',
          validation: {
            required: true,
            isEmail: true,
          },
          label: '',
          name: 'email',
          valid: false,
          inputElementTouched: false 
        },

        password: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: '* Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            passMatch: false,
          },
          name: 'passwordName',
          valid: false,
          inputElementTouched: false 
        },
        confirmPassword: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
            placeholder: '* Confirm Password'
          },
          value: '',
          validation: {
            required: true,
            minLength: 5,
            passMatch: false,
          },
          name: 'confirmPasswordName',
          valid: false,
          inputElementTouched: false 
        },

      }, //end of menu

      formIsValid: false,
      loading: false
    }// end of state


    checkValidity(value, rules) {
      let isValid = true;
      if(!rules){
        return true;
      }
        
      if(rules.required){
        isValid = value.trim() !== '' && isValid;
      } 

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
        console.log("minlength: " + isValid);
      }

      if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        //const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
        console.log("valid email: " + isValid);
      }

      if(rules.passMatch){
        const pass = this.password.value;
        const confirmPass = this.confirmPassword.value;
        isValid = pass === confirmPass && isValid;
        console.log("Pass matches: " + isValid);
      }
      return isValid;
    }

  handler = ( event ) => {
    //console.log('handler')
    event.preventDefault();
    
    const formData ={};
    for (let formElementIdentifier in this.state.createAccountMenu) {
      formData[formElementIdentifier] = this.state.createAccountMenu[formElementIdentifier].value;
    }
    //let formData = new FormData();
    // for (let formElementIdentifier in this.state.createAccountMenu) {
    //   formData.append(formElementIdentifier, this.state.createAccountMenu[formElementIdentifier].value);
    // }
   
    // axios.post( '/api/users', formData )
    //   .then( response => {
    //     this.setState( { loading: false } );
    //     //this.props.history.push('/');
    //     console.log(response);
    //   } )
    //   .catch( error => {
    //     this.setState( { loading: false } );
    //     console.log(error);
    //   } );
  
  }

  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    //console.log(event.target.value); //prints values to console
    const updatedCreateAccountMenu = {
      ...this.state.createAccountMenu
    };
    const updatedMenuElement = { 
      ...updatedCreateAccountMenu[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;

    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation, updatedMenuElement.name);
    updatedMenuElement.inputElementTouched = true;
    updatedCreateAccountMenu[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedCreateAccountMenu){
      formIsValid = updatedCreateAccountMenu[inputIdentifier].valid && formIsValid;
    }
    this.setState({createAccountMenu: updatedCreateAccountMenu, formIsValid: formIsValid});
   
  }
  
  onNavigation = () => {
    this.props.history.push('/course-history');

  }

  render(){
    const formElementsArray = [];
    for (let key in this.state.createAccountMenu) {
      formElementsArray.push({
        id: key,
        config: this.state.createAccountMenu[key]
      });
    }
    
    //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + LOGININTERFACE.CSS
    //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
    let form = (
      <form>
        {formElementsArray.map(formElement => (
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
            shouldBeValidated={formElement.config.validation}
            inputElementTouched={formElement.config.inputElementTouched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} 
            name={formElement.config.name}
            //formErrors ={formElement.config.emailErrors}
            label={formElement.config.label}/>
        ))}
    
        {/* <Link to = "/course-history"><button className="defaultbtn" disabled={!this.state.formIsValid}>Create Account</button></Link>  */}
        <button  className="defaultbtn" disabled={!this.state.formIsValid} onClick={this.onNavigation}>Create Account</button>
        <button className="open-diff-menubtn"><Link to = "/login">Login</Link></button>

      </form>
    );
    
    return(

      //RETURN LOGIN MENU HERE
      <div>
        <div className="menu">
          <h1 className="login-heading">Visual Course Planner</h1>
          {form}     
        </div> 

      </div>

    );
  }
}
CreateAccountMenu.propTypes = {
  history: PropTypes.object,
  invalid: PropTypes.bool,
  shouldBeValidated: PropTypes.object,
  inputElementTouched: PropTypes.bool,

};

export default CreateAccountMenu;

import React, { Component } from 'react';
// import React from 'react';
import '../Login/LoginInterface.css';
import { Link } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';


// const CreateAccountMenu = () => {

class CreateAccountMenu extends Component {

  state = {
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
          required: true
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
          required: true
        },
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
          required: true
        },
        valid: false,
        inputElementTouched: false 
      },
  
    },
    formIsValid: false,
    loading: false
  }
  

  checkValidity(value, rules) {
    let isValid = true;
    //const fieldValidationErrors = this.state.formErrors;
    // const isEmail = name === "email";
    // const isPassword = name === "password";
    // const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    //const validity = this.state.valid;

    
    // this.setState({
    //   formErrors: fieldValidationErrors,
    //   formValidity: validity,
    // },);

    // if(isValid[value]) {
    //   if(isPassword) {
    //     isValid[value] = name.length >= 6; 
    //     fieldValidationErrors[value] = isValid[value] ? '': `${name} should be more than 6 characters long`;
    //   }
    // }

    // if(isEmail) {
    //   isValid[value] = emailTest.test(name);
    //   fieldValidationErrors[value] = isValid[value] ? '' : `${name} should be a valid email address`;
    // }

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    } 
    //value = this.state.value ? 'zeldaisthebest' : `${name} is required and cannot be empty`;


    return isValid;
  }

  handler = ( event ) => {
    //console.log('handler');
    event.preventDefault();
    this.setState( { loading: true } );

    
    //this is log send user input to send to database.
    let formData = new FormData();
    for (let formElementIdentifier in this.state.createAccountMenu) {
      formData.append(formElementIdentifier, this.state.createAccountMenu[formElementIdentifier].value);
    }
    //console.log(formData);
    axios.post( '/api/users', formData )
      .then( response => {
        this.setState( { loading: false } );
        console.log(response);
      } )
      .catch( error => {
        this.setState( { loading: false } );
        console.log(error);
      } );
  
  }

  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value); //prints values to console

    //const {name, value} = event.target;
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
            label={formElement.config.label}/>
        ))}
        
        <Link to = "/course-history"><button className="deafultbtn" disabled={!this.state.formIsValid}>Create Account</button></Link> 
        <Link to = "/login"><button className="open-diff-menubtn" >Login</button></Link>
      </form>
    );
    
    return(

      //RETURN LOGIN MENU HERE
      <div className="menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        {form}     
      </div> 

    );
  }
}


export default CreateAccountMenu;

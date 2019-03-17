import React, { Component } from 'react';
import './LoginInterface.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';

//import { Route, BrowserRouter as Router } from 'react-router-dom';
//port Main from '../../containers/Main';
//import Button from '../Button/button.js';


export class adminInterface extends Component {
 
  state = {
    adminLoginMenu: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        inputElementTouched: false 
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
        },
        valid: false,
        inputElementTouched: false 
      }
    },
    //error state (form validation)
    errors:{
      email: {
        hasError: false
      },
      fName: {
        hasError: false
      },
      lName: {
        hasError: false
      },
      password: {
        hasError: false
      },
      confirmPassword: {
        hasError: false
      },
    },
    formIsValid: false,
    loading: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    

    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      console.log("minlength: " + isValid);
      isValid === false ? this.setError("password", "Password must be longer than 5 characters") : this.removeError("email");
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      //console.log(isValid);
      isValid === false ? this.setError("email", "Please insert a valid email address") : this.removeError("email");

      if (isValid === true){
        axios.get('api/users', this.state.adminLoginMenu.email)
          .then((email) => {
            if (email > 0){
            //email exisits
              this.removeError("email");
            } else {
              //console.log ('email does not exist');
              this.setError("email", "No account is registered with this email");
            }
          });
      }
        
    }

    return isValid;
  }
    
  setError = (element, message) => {
    //console.log("Setting error");
    this.setState(prevState => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [element]: {
            hasError: true,
            message: message
          }
        }
      };
    });
  }

  removeError = (element) => {
    this.setState(prevState => {
      return {
        ...prevState,
        errors: {
          ...prevState.errors,
          [element]: {
            hasError: false,
          }
        }
      };
    });
  }
  
  handler = (e) => {
    e.preventDefault();
    this.setState( { loading: true } );
    
    //this is log send user input to send to database.
    const loginData = {};
    for (let formElementIdentifier in this.state.adminLoginMenu) {
      loginData[formElementIdentifier] = this.state.adminLoginMenu[formElementIdentifier].value;
    }


    axios.post( '/api/users/login', loginData )
      .then(response => {
        this.setState( { loading: false } );
        console.log("no errors::");
        const user = response.data.user;
        console.log(user);
        sessionStorage.setItem("userId", user.id);
        console.log(sessionStorage.getItem("userId"));
        this.props.history.push("/main");
      })
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
        console.log(error);
      } );
  }

  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value); //prints values to console
    const updatedAdminLoginMenu = {
      ...this.state.adminLoginMenu
    };
    const updatedMenuElement = { 
      ...updatedAdminLoginMenu[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
    updatedMenuElement.inputElementTouched = true;
    updatedAdminLoginMenu[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedAdminLoginMenu){
      formIsValid = updatedAdminLoginMenu[inputIdentifier].valid && formIsValid;
    }
    this.setState({adminLoginMenu: updatedAdminLoginMenu, formIsValid: formIsValid});
    
  }

  //LINKS FORM BTN TO PAGE SPECIFED
  onNavigationVCPAdmin = () => {
    this.props.history.push('/admin');
  }


  render() {
    const formElementsArray = [];
    for (let key in this.state.adminLoginMenu) {
      formElementsArray.push({
        id: key,
        config: this.state.adminLoginMenu[key]
      });
    }
    
    //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + adminInterface.CSS
    //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
    let form = (
      <form onSubmit={this.handler}>
        {formElementsArray.map(formElement => (
          <div key={formElement.id}>
            <Input 
              //  key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
              shouldBeValidated={formElement.config.validation.required}
              inputElementTouched={formElement.config.inputElementTouched}
              changed={(event) => this.inputChangeHandler(event, formElement.id)} 
            />
            {this.state.errors[formElement.id].hasError && <p className ="warning-msg">{this.state.errors[formElement.id].message}</p> }
          </div>  
        ))}
        
        <button type="button" className="defaultbtn" disabled={!this.state.formIsValid} onClick={this.onNavigationVCPAdmin}>Login</button>
      </form>
    );


    return (
      //RETURN LOGIN MENU HERE
      <div className="menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        <h3 className="admin-txt">Administrator  Portal</h3>
        <div className= "overlay"></div>
        {form} 
        
            
      </div> 

    );
  }
} //end of class 

adminInterface.propTypes = {
  toggleMenu: PropTypes.func, //MAKE SURE TO ADD . isRequired!!!
  history: PropTypes.object,
};

export default withRouter(adminInterface);   
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
    adminloginMenu: {
      email: {
        elementType: 'input',
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
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        inputElementTouched: false 
      }
    },
    formIsValid: false,
    loading: false
  }

  checkValidity(value, rules) {
    let isValid = true;
    if(!rules){
      return true;
    }
      
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
    } 

    return isValid;
  }

  handler = (e) => {
    e.preventDefault();
    this.setState( { loading: true } );
    
    //this is log send user input to send to database.
    const loginData = {};
    for (let formElementIdentifier in this.state.adminloginMenu) {
      loginData[formElementIdentifier] = this.state.adminloginMenu[formElementIdentifier].value;
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
    const updatedAdminloginMenu = {
      ...this.state.adminloginMenu
    };
    const updatedMenuElement = { 
      ...updatedAdminloginMenu[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
    updatedMenuElement.inputElementTouched = true;
    updatedAdminloginMenu[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedAdminloginMenu){
      formIsValid = updatedAdminloginMenu[inputIdentifier].valid && formIsValid;
    }
    this.setState({adminloginMenu: updatedAdminloginMenu, formIsValid: formIsValid});
    
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.adminloginMenu) {
      formElementsArray.push({
        id: key,
        config: this.state.adminloginMenu[key]
      });
    }
    
    //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + adminInterface.CSS
    //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
    let form = (
      <form>
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
          </div>  
        ))}
        <button type="button" className="defaultbtn" disabled={!this.state.formIsValid} onClick={this.handler}>Login</button>
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
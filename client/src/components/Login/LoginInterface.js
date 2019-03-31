import React, { Component } from 'react';
import './LoginInterface.css';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';

export class LoginInterface extends Component {
 
  state = {
    loginMenu: {
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
    for (let formElementIdentifier in this.state.loginMenu) {
      loginData[formElementIdentifier] = this.state.loginMenu[formElementIdentifier].value;
    }


    axios.post( '/api/users/login', loginData )
      .then(response => {
        this.setState( { loading: false } );
        const user = response.data.user;
        if (user) {
          console.log(user);
          sessionStorage.setItem("userId", user.id);
          if (user.isAdmin) {
            this.props.history.push("/admin");
          } else {
            this.props.history.push("/main");
          }
        } else {
          console.log(response.data.message);
        }
      })
      .catch( error => {
        this.setState( { loading: false } );
        if(error.response){
          console.log(error.response);
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
    const updatedloginMenu = {
      ...this.state.loginMenu
    };
    const updatedMenuElement = { 
      ...updatedloginMenu[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
    updatedMenuElement.inputElementTouched = true;
    updatedloginMenu[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedloginMenu){
      formIsValid = updatedloginMenu[inputIdentifier].valid && formIsValid;
    }
    this.setState({loginMenu: updatedloginMenu, formIsValid: formIsValid});
    
  }

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginMenu) {
      formElementsArray.push({
        id: key,
        config: this.state.loginMenu[key]
      });
    }
    
    //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + LOGININTERFACE.CSS
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
        <Link to = "/signup"><button className="open-diff-menubtn" >Create Account</button></Link>
        {/*    <Link to = "/main"> */}
      </form>
    );


    return (
      //RETURN LOGIN MENU HERE
      <div className="menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        <div className= "overlay"></div>
        {form} 
        
            
      </div> 

    );
  }
} //end of class 

LoginInterface.propTypes = {
  toggleMenu: PropTypes.func, //MAKE SURE TO ADD . isRequired!!!
  history: PropTypes.object,
};

export default withRouter(LoginInterface);
import React, { Component } from 'react';
//import './LoginInterface.css';
// import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';

//import { Route, BrowserRouter as Router } from 'react-router-dom';
//port Main from '../../containers/Main';
//import Button from '../Button/button.js';


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
      }

      if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        //const reg =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
        console.log("valid email: " + isValid);
      }

      return isValid;
    }
    handler = ( event ) => {
      event.preventDefault();
      this.setState( { loading: true } );
      
      //this is log send user input to send to database.
      const menuData = {};
      for (let formElementIdentifier in this.state.loginMenu) {
        menuData[formElementIdentifier] = this.state.loginMenu[formElementIdentifier].value;
      }
      // this needs to be changed to validate user login info... Handling Form Submission Video on udemy.comn 
      const menu = {
        // ingredients: this.props.ingredients,
        // price: this.props.price,
        menuData: menuData
      };

      //AXIO CODE HERE
      axios.get('http://jsonplaceholder.typicode.com/todos', {})
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

    onNavigationVCPMain = () => {
      this.props.history.push('/main');
    }


    render(){
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
        <form onSubmit={this.handler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
              shouldBeValidated={formElement.config.validation}
              inputElementTouched={formElement.config.inputElementTouched}
              changed={(event) => this.inputChangeHandler(event, formElement.id)} />
          ))}
          <button className="defaultbtn" disabled={!this.state.formIsValid} onClick={this.onNavigationVCPMain}>Login</button>
          <Link to = "/create-account"><button className="open-diff-menubtn" >Create Account</button></Link>
          {/*    <Link to = "/main"> */}
        </form>
      );


      return(
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

export default LoginInterface;
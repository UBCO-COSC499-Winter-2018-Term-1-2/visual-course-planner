import React, { Component } from 'react';
import './LoginInterface.css';
// import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../Input/input';
import axios from 'axios';


class LoginInterface extends Component {
 
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
          <button className="deafultbtn" disabled={!this.state.formIsValid}>Login</button> 
          <button className="open-diff-menubtn" ><Link to = "/create-account">Create Account</Link></button> 
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
} //end of class 

LoginInterface.propTypes = {
  toggleMenu: PropTypes.func, //MAKE SURE TO ADD . isRequired!!!
};

export default LoginInterface;


// <div className="menu">
//         <h1 className="login-heading">Visual Course Planner</h1>
//         <form onSubmit= {this.contactSubmit.bind(this)}>
//           <input type="text" name="email" placeholder="Email" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}/>
//           <input type="text" name="pass" placeholder="Password" onChange={this.handleChange.bind(this, "password")} value={this.state.fields["password"]}/>   
//           <button className="loginbtn">Login</button> 
//           <button className="open-diff-menubtn" ><Link to = "/create-account">Create Account</Link></button> 
        
         
//         </form>        
//       </div> 
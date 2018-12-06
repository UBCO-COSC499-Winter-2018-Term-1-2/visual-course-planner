import React, { Component } from 'react';
import './LoginInterface.css';
// import CreateAccountMenu from '../Signup/CreateAccountMenu';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Input from '../Input/input';


class LoginInterface extends Component {
  // state = {
  //   isValidated: false
  // }

  // validateForm = () => {
  //   const formLength = this.formEl.length;

  //   if (this.formEl.checkValidity () === false) {
  //     for(let i=0; i<formLength; i++) {
  //       const element = this.formEl[i];
  //       const errorLabel = element.parentNode.querySelector('.invalid-feedback');

  //       if(errorLabel && element.nodeName.toLowerCase() !== 'button'){
  //         if(!element.validity.valid) {
  //           errorLabel.textContent = element.validationMessage;
  //         } else {
  //           errorLabel.textContent = "";
  //         }
  //       }
  //     }

  //     return false;
  //   } else {
  //     for(let i=0; i<formLength; i++) {
  //       const element = this.formEl[i];
  //       const errorLabel = element.parentNode.querySelector('.invalid-feedback');

  //       if(errorLabel && element.nodeName.toLowerCase() !== 'button') {
  //         errorLabel.textContent = "";
  //       }
  //     }
  //     return true;
  //   }
  // }

  // submitHandle = (event) => {
  //   event.preventDefault();

  //   if(this.validate()) {
  //     this.props.submit();
  //   }
  //   this.setState({isValidated: true});
  // }

  // ----------------------------------
    state = {
      loginMenu: {
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Email'
          },
          value: ''
        },
        password: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Password'
          },
          value: ''
        },
    
      },
      loading: false
    }


    // validateForm(){
    //   let fields = this.state.fields;
    //   let errors = {};
    //   let formIsValid = true;

    //   //EMAIL VALIDATION
    //   if(!fields["email"]){
    //     formIsValid = false;
    //     errors["email"] = "*please provide your email address";
    //   }
    //   if (typeof fields["email"] !=="undefined"){
    //     let atPosition = fields["email"].lastIndexof('@');
    //     let lastPeriodPosition = fields["email"].lastIndexof(".");

    //     if(!(atPosition < lastPeriodPosition && atPosition >0 && fields["email"].lastIndexof('@@') == 1 && atPosition > 2 && (fields["email"].length - lastPeriodPosition) > 2)){
    //       formIsValid = false;
    //       errors["email"] = "EMAIL IS NOT VALID!! ";
    //     }
    //   }
    //   //   //PASSWORD VALIDATION
    //   if(!fields["password"] && !fields["confirmPassword"]){
    //     formIsValid = false;
    //     errors["password"] = "*please enter a password";
    //     errors["confirmPassword"] = "*please confirm your  password";
    //   }
    //   if (typeof fields["password"] !== "undefined") {
    //     if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/) ) {
    //       formIsValid = false;
    //       errors["password"] = "*Please enter secure password.";
    //     }
    //   }

    //   this.setState({errors: errors});
    //   return formIsValid;
    // }
    
    // contactSubmit(e){
    //   e.preventDefault();
    //   if(this.validateForm()){
    //     alert("Form submitted");
    //   }else{
    //     alert("Form has errors.");
    //   }
    
    // }
    
    // handleChange(field, e){    		
    //   let fields = this.state.fields;
    //   fields[field] = e.target.value;        
    //   this.setState({fields});
    // }
    orderHandler = ( event ) => {
      event.preventDefault();
      this.setState( { loading: true } );
      
      //this is log send user input to send to database.
      const menuData = {};
      for (let formElementIdentifier in this.state.loginMenu) {
        menuData[formElementIdentifier] = this.state.loginMenu[formElementIdentifier].value;
      }
      //this needs to be changed to validate user login info... Handling Form Submission Video on udemy.comn 
      //   const order = {
      //     ingredients: this.props.ingredients,
      //     price: this.props.price,
      //     formData: formData
      // }
      // axios.post( '/orders.json', order )
      //     .then( response => {
      //         this.setState( { loading: false } );
      //         this.props.history.push( '/' );
      //     } )
      //     .catch( error => {
      //         this.setState( { loading: false } );
      //     } );
    
    }

    inputChangeHandler = (event, inputIdentifier) => {
      console.log(event.target.value);
      const updatedloginMenu = {
        ...this.state.loginMenu
      };
      const updatedMenuElement = { 
        ...updatedloginMenu[inputIdentifier]
      };
      updatedMenuElement.value = event.target.value;
      updatedloginMenu[inputIdentifier] = updatedMenuElement;
      this.setState({loginMenu: updatedloginMenu});
    }

    render(){
      const formElementsArray = [];
      for (let key in this.state.loginMenu) {
        formElementsArray.push({
          id: key,
          config: this.state.loginMenu[key]
        });
      }
      
      let form = (
        <form onSubmit={this.orderHandler}>
          {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) => this.inputChangeHandler(event, formElement.id)} />
          ))}
          <button className="loginbtn">Login</button> 
          <button className="open-diff-menubtn" ><Link to = "/create-account">Create Account</Link></button> 
        </form>
      );

      return(
        <div className="menu">
          <h1 className="login-heading">Visual Course Planner</h1>
          {form}     
        </div> 

      );
    }
} //end of class 

LoginInterface.propTypes = {
  toggleMenu: PropTypes.func.isRequired,
  // children: PropTypes.node,
  // className: PropTypes.string,
  // submit: PropTypes.func.isRequired
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
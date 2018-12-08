import React, { Component } from 'react';
// import React from 'react';
import '../Login/LoginInterface.css';
import { Link } from 'react-router-dom';
import Input from '../Input/input';


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
        valid: false,
        inputElementTouched: false 
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
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
          type: 'text',
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
    for (let formElementIdentifier in this.state.createAccountMenu) {
      menuData[formElementIdentifier] = this.state.createAccountMenu[formElementIdentifier].value;
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

  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value); //prints values to console
    const updatedCreateAccountMenu = {
      ...this.state.createAccountMenu
    };
    const updatedMenuElement = { 
      ...updatedCreateAccountMenu[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
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
        <button className="create-accountbtn" disabled={!this.state.formIsValid}>Create Account</button> 
        <button className="open-diff-menubtn" ><Link to = "/login">Login Instead</Link></button> 
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


// <div className="menu">
        
// <form onSubmit= {this.sumbitUserCredentials}>
//   <h1 className="login-heading">Visual Course Planner</h1>
    
//   <input className="InputElement" type="text" name="fname" placeholder="* First Name" value={this.state.fields.fName} onChange={this.changeHandler}/>
//   <input className="InputElement" type="text" name="lname" placeholder="* Last Name" value={this.state.fields.lName} onChange={this.changeHandler}/>   
//   <input className="InputElement" type="text" name="email" placeholder="* Email" value={this.state.fields.email} onChange={this.changeHandler}/>
//   <input className="InputElement" type="text" name="password" placeholder="* Password" value={this.state.fields.password} onChange={this.changeHandler}/>   
//   <input className="InputElement" type="text" name="confirmPassword" placeholder="* Confirm Password" value={this.state.fields.confirmPassword} onChange={this.changeHandler}/>
//   <button className="create-accountbtn">Create Account</button> 
//   <button className="open-diff-menubtn" ><Link to = "/login">Login Instead</Link></button> 
// </form> 

// </div>

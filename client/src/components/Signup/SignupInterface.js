import React, { Component } from 'react';
import '../Login/LoginInterface.css';
import { Link, withRouter } from 'react-router-dom';
import Input from '../Input/Input';
import { PropTypes } from 'prop-types';
import axios from 'axios';

class SignupInterface extends Component {
  
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
        },
        errorName: 'Password',
        name: 'password',
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
          matches: 'password',
        },
        errorName: 'Your confirming password',
        name: 'confirmPassword',
        valid: false,
        inputElementTouched: false 
      },
    },
    //error state (form validation)
    errors:{
      email: {
        errors: {}
      },
      fName: {
        errors: {}
      },
      lName: {
        errors: {}
      },
      password: {
        errors: {}
      },
      confirmPassword: {
        errors: {}
      },
    },
    //end of menu

    formIsValid: false,
    loading: false,
  }// end of state


  checkValidity(value, rules, name, errorName) {
    let isValid = true;
    if(!rules){
      return true;
    }
      
    if(rules.required){
      isValid = value.trim() !== '' && isValid;
      //isValid === false ? this.addError("inputRequired", "All fields are required") : this.removeError("inputRequired");
    } 

    if (rules.matches){
      const needsToMatch = this.state.createAccountMenu[rules.matches].value;
      const matches = value === needsToMatch; 
      console.log(value);
      console.log(needsToMatch);
      isValid === !matches ? this.addError(name, "Passwords must match", 'match') : this.removeError(name, 'match');
    }
    
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      isValid === false ? this.addError(name, `${errorName} must be longer than 5 characters`, 'length') : this.removeError(name, 'length');
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
      //console.log(isValid);
      isValid === false ? this.addError("email", "Please insert a valid email address", 'email') : this.removeError("email", 'email');

    }

    return isValid;
  }


addError = (element, message, type) => {
  //console.log("Setting error");
  this.setState(prevState => {
    let elementErrors = prevState.errors[element].errors;
    elementErrors[type] = message;
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        [element]: {
          errors: elementErrors
        }
      }
    };
  });
}

removeError = (element, type) => {
  this.setState(prevState => {
    let elementErrors = prevState.errors[element].errors;
    delete elementErrors[type];
    return {
      ...prevState,
      errors: {
        ...prevState.errors,
        [element]: {
          errors: elementErrors
        }
      }
    };
  });
}

handler = (event) => {
  event.preventDefault();
  
  const formData ={};
  for (let formElementIdentifier in this.state.createAccountMenu) {
    formData[formElementIdentifier] = this.state.createAccountMenu[formElementIdentifier].value;
  }
  console.log(formData);
  
  axios.post( '/api/users/signup', formData )
    .then( response => {
      this.setState( { loading: false } );
      if (response.status === 200) {
        sessionStorage.setItem('userId', response.data.userId);
        this.redirectToConfirmEmail(response.data.email);
      }
      console.log(response);
    })
    .catch( error => {
      this.setState( { loading: false } );
      console.log(error);
    });

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
  updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation, updatedMenuElement.name, updatedMenuElement.errorName);
  updatedMenuElement.inputElementTouched = true;
  updatedCreateAccountMenu[inputIdentifier] = updatedMenuElement;

  
  let formIsValid = true;
  for (let inputIdentifier in updatedCreateAccountMenu){
    formIsValid = updatedCreateAccountMenu[inputIdentifier].valid && formIsValid;
  }
  this.setState({createAccountMenu: updatedCreateAccountMenu, formIsValid: formIsValid});
 
}

//LINKS FORM BTN TO PAGE SPECIFED
redirectToConfirmEmail = (email) => {
  this.props.history.push({
    pathname: '/confirm-email',
    state: {
      email: email
    }
  });
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
        <div key={formElement.id}>
          <Input 
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
            shouldBeValidated={formElement.config.validation.required}
            inputElementTouched={formElement.config.inputElementTouched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} 
            name={formElement.config.name}
            label={formElement.config.label}

          />
          {Object.keys(this.state.errors[formElement.id].errors).length > 0 && <p className ="warning-msg">{Object.values(this.state.errors[formElement.id].errors)[0]}</p> }
        </div>
      ))}
      <button type="button" className="defaultbtn" disabled={!this.state.formIsValid} onClick={this.handler}>Create Account</button>
      <button type="button" className="open-diff-menubtn"><Link to = "/login">Login</Link></button>

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

SignupInterface.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignupInterface);

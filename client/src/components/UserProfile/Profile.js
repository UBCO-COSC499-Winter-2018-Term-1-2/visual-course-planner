import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Input from '../Input/Input';
import './Profile.css';

// NOTES:
// Must change form so every element is not required other than matching input element (ie. newpassword + renter New Password)
//correct formatting

class Profile extends Component {

  state = {
    profileForm: {
      fName: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: '* First Name'
        },
        label: 'MY NAME',
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
      newPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: '* New Password'
        },
        label: 'CHANGE PASSWORD',
        value: '',
        validation: {
          minLength: 5,
          passDiff: true,
        },
        errorName: 'New password',
        name: 'newPassword',
        valid: false,
        inputElementTouched: false 
      },
      confirmNewPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: '* Confirm New Password'
        },
        value: '',
        validation: {
          minLength: 5,
          passDiff: true,
          matches: 'newPassword'
        },
        errorName: 'Your confirming password',
        name: 'confirmNewPassword',
        valid: false,
        inputElementTouched: false 
      },
      currentYear: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: '1', displayValue: '1'},
            {value: '2', displayValue: '2'},
            {value: '3', displayValue: '3'},
            {value: '4', displayValue: '4'}
          ]
        },
        validation: {
          required: false
        },
        label: 'CURRENT YEAR STANDING',
        value: '',
        valid: true,
        inputElementTouched: false 
      },
    
    }, //end of profile menu

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
      newPassword: {
        errors: {}
      },
      confirmNewPassword: {
        errors: {}
      },
      currentYear: {
        errors: {}
      }
    },
    formIsValid: false,
    loading: false
  }
  
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
      const needsToMatch = this.state.profileForm[rules.matches].value;
      const matches = value === needsToMatch; 
      isValid === !matches ? this.addError(name, "Passwords must match", 'match') : this.removeError(name, 'match');
      if (value === '') {
        this.removeError(name, 'match');
      }
    }
    
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
      isValid === false ? this.addError(name, `${errorName} must be longer than 5 characters`, 'length') : this.removeError(name, 'length');
      if (value === '') {
        this.removeError(name, 'length');
      }
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
    console.log(element);

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

  getUserInfo = async() => {
    const userId = sessionStorage.getItem('userId');
    const userResponse = await axios.get(`/api/users/${userId}`);
    const userInfo = userResponse.data;
    this.setState(prevState =>  {
      return {
        ...prevState, 
        profileForm: {
          ...prevState.profileForm,
          fName: {...prevState.profileForm.fName , value : userInfo.firstname },
          lName: {...prevState.profileForm.lName , value : userInfo.lastname },
        }
      };
    });
  }

  async componentDidMount (){
    this.getUserInfo();
  }

  handler = ( event ) => {
    event.preventDefault();
    this.setState( { loading: true } );
    
    const profileData = new FormData();
    for (let formElementIdentifier in this.state.profileForm) {
      profileData.append(formElementIdentifier, this.state.profileForm[formElementIdentifier].value);
    }

    const userId = sessionStorage.getItem('userId');
    axios.post(`/api/users/${userId}/updateUserInfo`, profileData)
      .then( response => {
        this.setState({ loading: false });
        this.props.history.push('/main');
        console.log(response);
      } )
      .catch( error => {
        this.setState({ loading: false });
        console.log(error);
      } );
  }
  
  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    //console.log(event.target.value); //prints values to console
    const updatedprofileForm = {
      ...this.state.profileForm
    };
    const updatedMenuElement = { 
      ...updatedprofileForm[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation, updatedMenuElement.name, updatedMenuElement.errorName);
    updatedMenuElement.inputElementTouched = true;
    updatedprofileForm[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedprofileForm){
      formIsValid = updatedprofileForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({profileForm: updatedprofileForm, formIsValid: formIsValid});
  }
    
  render() {
    const formElementsArray = [];
    for (let key in this.state.profileForm) {
      formElementsArray.push({
        id: key,
        config: this.state.profileForm[key]
      });
    }
    
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
              label={formElement.config.label} />
            {Object.keys(this.state.errors[formElement.id].errors).length > 0 && <p className ="warning-msg">{Object.values(this.state.errors[formElement.id].errors)[0]}</p> }
          </div>
        ))}
        <h4 className="green-title">Change/add courses to current course history</h4>
        <Link to ="course-history"><button className="course-historybtn">My Course History → </button></Link>
        
        <div className="btn-div"> 
          <button type="button" onClick={this.handler} className="green-borderbtn">Submit</button> 
          <button className="exit-green-borderbtn"><Link to = "/main">Exit</Link></button> 
        </div>
      </form>
    );
    
    return (
      <div>
        <div className="profile-menu">
          <h1 className="yellow-title">Profile </h1>
          {form}           
        </div> 
      </div>
    );
  }
}
Profile.propTypes = {
  history: PropTypes.object
};

export default Profile;

import React, { Component } from 'react';
import '../UserProfile/profile.css';
// import '../Login/LoginInterface.css';
import { Link } from 'react-router-dom';
import Input from '../Input/input';

// NOTES:
// Must change form so every element is not required other than matching input element (ie. newpassword + renter New Password)
//correct formatting

class profile extends Component {

    state = {
      profileMenu: {
        fName: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* First Name'
          },
          label: 'USERS NAME',
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
        newpassword: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* New Password'
          },
          label: 'CHANGE PASSWORD',
          value: '',
          validation: {
            required: true
          },
          valid: false,
          inputElementTouched: false 
        },
        confimNewPassword: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: '* Confirm New Password'
          },
          value: '',
          validation: {
            required: true
          },
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
        for (let formElementIdentifier in this.state.profileMenu) {
          menuData[formElementIdentifier] = this.state.profileMenu[formElementIdentifier].value;
        }
      }
    
      //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
      //IE. EMAIL AND PASSWORD.
      inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value); //prints values to console
        const updatedProfileMenu = {
          ...this.state.profileMenu
        };
        const updatedMenuElement = { 
          ...updatedProfileMenu[inputIdentifier]
        };
        updatedMenuElement.value = event.target.value;
        //CHECKS IF EACH STATE HAS A VALUE
        updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
        updatedMenuElement.inputElementTouched = true;
        updatedProfileMenu[inputIdentifier] = updatedMenuElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedProfileMenu){
          formIsValid = updatedProfileMenu[inputIdentifier].valid && formIsValid;
        }
        this.setState({profileMenu: updatedProfileMenu, formIsValid: formIsValid});
       
      }
    
      render(){
        const formElementsArray = [];
        for (let key in this.state.profileMenu) {
          formElementsArray.push({
            id: key,
            config: this.state.profileMenu[key]
          });
        }
        
        //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + LOGININTERFACE.CSS
        //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
        let form = (
          <form onSubmit={this.handler}>
            {formElementsArray.map(formElement => (
              <Input 
                label={formElement.config.label}
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
                shouldBeValidated={formElement.config.validation}
                inputElementTouched={formElement.config.inputElementTouched}
                changed={(event) => this.inputChangeHandler(event, formElement.id)} />
            ))}
            <div className="btn-div">
              <button className="exit-green-borderbtn"><Link to = "/main">Exit</Link></button> 
              <button className="green-borderbtn"><Link to = "/main">Submit</Link></button> 
            </div>
          </form>
        );
        
        return(
    
          //RETURN LOGIN MENU HERE
          <div>
            <div className="profile-menu">
              <h1 className="yellow-title">Users Name </h1>
              {form} 
              
            </div> 
          </div>
    
    
        );
      }
}
    
  
export default profile;

{/* <div>
          <h1 className="yellow-title">Users Name </h1>
          <h4 className="green-title">Users Name </h4>
            <input type="text" name="fname" placeholder="* First Name"/>
            <input type="text" name="lname" placeholder="* Last Name"/>   
            <h4 className="green-title">Change Password</h4>
            <input type="text" name="pass" placeholder="* Password"/> 
            <input type="text" name="pass" placeholder="* Re-Enter Password"/> 
            <h4 className="green-title">Current year standing</h4>
            <h4 className="green-title">link to change which courses a student has taken</h4>
        

            <button className="green-borderbtn">Save + Submit</button> 
          </div> */}

import React, { Component } from 'react';
import '../UserProfile/profile.css';
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
        newpassword: {
          elementType: 'input',
          elementConfig: {
            type: 'password',
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
            type: 'password',
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
            <h4 className="green-title">Change/add courses to current course history</h4>
            <Link to ="course-history"><button className="course-historybtn">My Course History → </button></Link>
           
            <div className="btn-div"> 
              <button className="green-borderbtn"><Link to = "/main">Submit</Link></button> 
              <button className="exit-green-borderbtn"><Link to = "/main">Exit</Link></button> 
            </div>
          </form>
        );
        
        return(
    
          //RETURN LOGIN MENU HERE
          <div>
            <div className="profile-menu">
              <h1 className="yellow-title">Profile </h1>
              {form} 
              
              
            </div> 
          </div>
    
    
        );
      }
}
    
  
export default profile;

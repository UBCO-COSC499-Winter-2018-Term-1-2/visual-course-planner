import React, { Component } from 'react';
import axios from 'axios';
import './DegreeYear.css';
import { Link } from 'react-router-dom';
import Input from '../Input/input';

class DegreeYear extends Component {

  //FORM INITIAL SETUP ::
  state = {
    form: {
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
          required: true
        },
        label: 'CURRENT YEAR STANDING',
        value: '',
        valid: true,
        inputElementTouched: false 
      },
      degree: {
        elementType: 'select',
        elementConfig: {
          options:[
            {value: '1', displayValue: 'Bachelor of Science, Major in Computer Science'},
            {value: '2', displayValue: 'Bachelor of Arts, Major in Computer Science '},
            {value: '3', displayValue: 'Other Degrees'},
            {value: '4', displayValue: 'Other Degrees'}
          ]
        },
        validation: {
          required: true
        },
        label: 'DESIRED DEGREE',
        value: '',
        valid: true,
        inputElementTouched: false 
      },
      
    
    }, //end of profile menu
    formIsValid: false,
    loading: false,
    // selectedDegrees: []
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
    for (let formElementIdentifier in this.state.form) {
      menuData[formElementIdentifier] = this.state.form[formElementIdentifier].value;
    }
  }

  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  inputChangeHandler = (event, inputIdentifier) => {
    console.log(event.target.value); //prints values to console
    const updatedDegreeYear = {
      ...this.state.form
    };
    const updatedMenuElement = { 
      ...updatedDegreeYear[inputIdentifier]
    };
    updatedMenuElement.value = event.target.value;
    //CHECKS IF EACH STATE HAS A VALUE
    updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
    updatedMenuElement.inputElementTouched = true;
    updatedDegreeYear[inputIdentifier] = updatedMenuElement;
    
    let formIsValid = true;
    for (let inputIdentifier in updatedDegreeYear){
      formIsValid = updatedDegreeYear[inputIdentifier].valid && formIsValid;
    }
    this.setState({form: updatedDegreeYear, formIsValid: formIsValid});
    
  }

  handleDeselect(index) {
    var selectedDegrees = this.state.selectedDegrees.slice();
    selectedDegrees.splice(index, 1);
    this.setState({selectedDegrees});
  }
  
  handleSelectionChange = (selectedDegrees) => {
    this.setState({selectedDegrees});
  }

  getDegrees = async () => {
    return axios.get('/api/degrees')
      .then(response => { return response.data; })
      .catch(error => {
        console.error(error);
        return [];
      });
  }

  componentDidMount = async () => {
    let degrees = await this.getDegrees();
    degrees = degrees.map(degree => { return { value: degree.id, displayValue: degree.name};});
    this.setState(prevState => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          degree: {
            ...prevState.form.degree,
            elementConfig: {
              options: degrees
            }
          }
        }
      };
    });

  }
  
  render(){

    //FORUM::
    const formElementsArray = [];
    for (let key in this.state.form) {
      formElementsArray.push({
        id: key,
        config: this.state.form[key]
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
            shouldBeValidated={formElement.config.validation.required}
            inputElementTouched={formElement.config.inputElementTouched}
            changed={(event) => this.inputChangeHandler(event, formElement.id)} />
        ))}


        <div className="btn-div">
          <button className="green-borderbtn"><Link to = "/main">Submit</Link></button> 
        </div>

      </form>
    );

    return(

      //RETURN FORM (CURRENT STANDING YEAR)
      <div>
        <div className="degree-year-menu">
          <h1 className="yellow-title">Degree And Year </h1>
          <label className="green-title">Select All That Apply</label>
          
          <p className="msg-text">
          Please select your current year standing and the desired degree 
          you wish to enroll in at the Univeristy of British Columbia Okanagan Campus.
          </p>

          {form} 
          
        </div> 
      </div>
    );
  }
}
    
  
export default DegreeYear;

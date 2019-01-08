import React, { Component } from 'react';
import '../DegreeYear-NewUser/degree-year.css';
import { Link } from 'react-router-dom';
import Input from '../Input/input';
import FilteredMultiSelect from '../FilterMultiSelect/multiSelectMenu.js';


const CULTURE_SHIPS = [
  {id: 1, name: 'Bachelor of Science, Major Computer Science'},
  {id: 2, name: 'Bachelor of Arts, Major Computer Science'},
  // {id: 249, name: 'Zero Gravitas'},
  // {id: 250, name: 'Zoologist'}
];

class degreeYear extends Component {

  //FORM INITIAL SETUP ::
    state = {
      DegreeYear: {
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
      
      }, //end of profile menu
      formIsValid: false,
      loading: false,
      selectedShips: []
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
        for (let formElementIdentifier in this.state.DegreeYear) {
          menuData[formElementIdentifier] = this.state.DegreeYear[formElementIdentifier].value;
        }
      }
    
      //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
      //IE. EMAIL AND PASSWORD.
      inputChangeHandler = (event, inputIdentifier) => {
        console.log(event.target.value); //prints values to console
        const updatedDegreeYear = {
          ...this.state.DegreeYear
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
        this.setState({DegreeYear: updatedDegreeYear, formIsValid: formIsValid});
       
      }

      handleDeselect(index) {
        var selectedShips = this.state.selectedShips.slice();
        selectedShips.splice(index, 1);
        this.setState({selectedShips});
      }
    
      handleSelectionChange = (selectedShips) => {
        this.setState({selectedShips});
      }
    
      render(){

        //FORUM::
        const formElementsArray = [];
        for (let key in this.state.DegreeYear) {
          formElementsArray.push({
            id: key,
            config: this.state.DegreeYear[key]
          });
        }

        //MULTIFILTER::
        var {selectedShips} = this.state;
        
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

            <label className="green-title-degree-list">Select your desired degree</label> 

            {/* RETURN MULTIFILTER (LIST OF UBCO DEGREES) */}
            <FilteredMultiSelect
              onChange={this.handleSelectionChange}
              options={CULTURE_SHIPS}
              selectedOptions={selectedShips}
              textProp="name"
              valueProp="id"
              buttonText="Add Course"
              placeholder="Course Name.."
              className="ubco-offered-courses-list"
            />
            <div className="added-courses">
              {selectedShips.length === 0 && <p><i>(Nothing selected yet)</i></p>}
              {selectedShips.length > 0 && 
                <ul className="yoshii">
                  {selectedShips.map((ship, i) => 
                    <li key={ship.id}>
                      {`${ship.name} `}
                      <button className="remove-coursebtn" type="button" onClick={() => this.handleDeselect(i)}>
                      &times;
                      </button>
                    </li>)}
                </ul>}
            </div>

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
    
  
export default degreeYear;

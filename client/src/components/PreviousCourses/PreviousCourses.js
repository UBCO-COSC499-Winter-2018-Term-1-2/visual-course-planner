import React, { Component } from 'react';
import '../PreviousCourses/PreviousCourses.css';
// import '../Login/LoginInterface.css';
import { Link } from 'react-router-dom';
// import Input from '../Input/input';
import FilteredMultiSelect from '../PreviousCourses/multiSelectMenu.js';

// NOTES:
// Must change form so every element is not required other than matching input element (ie. newpassword + renter New Password)
//correct formatting


const CULTURE_SHIPS = [
  {id: 1, name: '5*Gelish-Oplule'},
  {id: 2, name: '7*Uagren'},
  {id: 249, name: 'Zero Gravitas'},
  {id: 250, name: 'Zoologist'}
];


class previousCourses extends Component {

  // state = {
  //   courseList: {
  //     listOfAllCourses: {
  //       elementType: 'list',
  //       elementConfig: {
  //         // type: 'ul',

  //         options:[
  //         //HARD CODED FOR NOW... NEEDS LOGIC!
  //           {value: '1', displayValue: 'Course 1'},
  //           {value: '2', displayValue: 'Course 4'},
  //           {value: '3', displayValue: 'Course 3'},
  //           {value: '1', displayValue: 'Course 1'},
  //           {value: '2', displayValue: 'Course 4'},
  //           {value: '3', displayValue: 'Course 3'},
  //           {value: '1', displayValue: 'Course 1'},
  //           {value: '2', displayValue: 'Course 4'},
  //           {value: '3', displayValue: 'Course 3'},
  //           {value: '1', displayValue: 'Course 1'},
  //           {value: '2', displayValue: 'Course 4'},
  //           {value: '3', displayValue: 'Course 3'},
  //           {value: '1', displayValue: 'Course 1'},
  //           {value: '2', displayValue: 'Course 4'},
  //           {value: '3', displayValue: 'Course 3'},
  //         ]
            
  //       },
  //       validation: {
  //         required: false
  //       },
  //       //   label: 'Course History',
  //       value: '',
  //       valid: true,
  //       inputElementTouched: false 
  //     },
      
  //   }, //end of profile menu
  //   formIsValid: false,
  //   loading: false
  // }

    
  // checkValidity(value, rules) {
  //   let isValid = true;
    
  //   if(rules.required){
  //     isValid = value.trim() !== '' && isValid;
  //   }
    
  //   return isValid;
  // }
  //   handler = ( event ) => {
  //     event.preventDefault();
  //     this.setState( { loading: true } );
        
  //     //this is log send user input to send to database.
  //     const menuData = {};
  //     for (let formElementIdentifier in this.state.courseList) {
  //       menuData[formElementIdentifier] = this.state.profcourseListileMenu[formElementIdentifier].value;
  //     }
  //   }
    
  //THIS COPIES THE (DEFAULT) LOGIN MENU, CREATES A 'NEW' ONE WITH VALUES THE USER INSERTED 
  //IE. EMAIL AND PASSWORD.
  // inputChangeHandler = (event, inputIdentifier) => {
  //   console.log(event.target.value); //prints values to console
  //   const updatedCourseList = {
  //     ...this.state.courseList
  //   };
  //   const updatedMenuElement = { 
  //     ...updatedCourseList[inputIdentifier]
  //   };
  //   updatedMenuElement.value = event.target.value;
  //   //CHECKS IF EACH STATE HAS A VALUE
  //   updatedMenuElement.valid = this.checkValidity(updatedMenuElement.value, updatedMenuElement.validation);
  //   updatedMenuElement.inputElementTouched = true;
  //   updatedCourseList[inputIdentifier] = updatedMenuElement;
        
  //   let formIsValid = true;
  //   for (let inputIdentifier in updatedCourseList){
  //     formIsValid = updatedCourseList[inputIdentifier].valid && formIsValid;
  //   }
  //   this.setState({courseList: updatedCourseList, formIsValid: formIsValid});
       
  // }

  //////TESTING HERE-----------------

      state = {selectedShips: []}

      handleDeselect(index) {
        var selectedShips = this.state.selectedShips.slice();
        selectedShips.splice(index, 1);
        this.setState({selectedShips});
      }
    
      handleSelectionChange = (selectedShips) => {
        this.setState({selectedShips});
      }
    
      render(){

        //TO DO: MAKE LIST ITEMS SELECTABLE -------------------

        // const formElementsArray = [];
        // for (let key in this.state.courseList) {
        //   formElementsArray.push({
        //     id: key,
        //     config: this.state.courseList[key]
        //   });
        // }
        
        //THIS IS THE FORM THAT MADE WITH STYLING FROM INPUT.CSS + LOGININTERFACE.CSS
        //ALSO CALLS STATE FOR EACH VALUE IE. EMAIL AND PASSWORD
        // let form = (
        //   <form onSubmit={this.handler}>
        //     {formElementsArray.map(formElement => (
        //       <Input 
        //         label={formElement.config.label}
        //         key={formElement.id}
        //         elementType={formElement.config.elementType}
        //         elementConfig={formElement.config.elementConfig}
        //         value={formElement.config.value}
        //         invalid={!formElement.config.valid} //config is referring to all elements next to a state (ie. email validation, valid, type etc)
        //         shouldBeValidated={formElement.config.validation}
        //         inputElementTouched={formElement.config.inputElementTouched}
        //         changed={(event) => this.inputChangeHandler(event, formElement.id)} />
        //     ))}

        //   </form>
        // );

        var {selectedShips} = this.state;
        
        return(      
          <div>
            
            <div className="course-menu">
              <h1 className="yellow-title">Select All That Apply</h1>
              <label className="green-title">Course History</label>
              
              <p className="msg-text">
              For an accurate Degree Plan, please select all courses 
              you have previously taken and have received credits for.
              </p>
              
              <ol className="course-list">
                {/* {form}  */}
              </ol>
             
              <div className="btn-div">
                <button className="exit-green-borderbtn"><Link to = "/main">Exit</Link></button> 
                <button className="green-borderbtn"><Link to = "/main">Submit</Link></button> 
              </div>


              <p>Multi Select Mene is here</p>
              <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={CULTURE_SHIPS}
                selectedOptions={selectedShips}
                textProp="name"
                valueProp="id"
              />
              {selectedShips.length === 0 && <p>(nothing selected yet)</p>}
              {selectedShips.length > 0 && <ul>
                {selectedShips.map((ship, i) => <li key={ship.id}>
                  {`${ship.name} `}
                  <button type="button" onClick={() => this.handleDeselect(i)}>
                   &times;
                  </button>
                </li>)}
              </ul>}
              
              <p>mario up up </p>
            </div> 
            <div className="right-menu">
            

            </div>
          </div>
    
    
        );
      }
}
    
  
export default previousCourses;
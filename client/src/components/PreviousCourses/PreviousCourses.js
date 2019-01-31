import React, { Component } from 'react';
import '../PreviousCourses/PreviousCourses.css';
import { Link } from 'react-router-dom';
import FilteredMultiSelect from '../FilterMultiSelect/multiSelectMenu.js';

// NOTES:
// Must change form so every element is not required other than matching input element (ie. newpassword + renter New Password)
//correct formatting


const COURSES = [
  {id: 1, name: 'FRENCH 11'},
  {id: 2, name: 'FRENCH 12'},
  {id: 249, name: 'SPANISH 11'},
  {id: 250, name: 'GERMAN 12'}
];


class previousCourses extends Component {

      state = {selectedCourses: []}

      handleDeselect(index) {
        var selectedCourses = this.state.selectedCourses.slice();
        selectedCourses.splice(index, 1);
        this.setState({selectedCourses});
      }
    
      handleSelectionChange = (selectedCourses) => {
        this.setState({selectedCourses});
      }
    
      render(){

        var {selectedCourses} = this.state;
        
        return(      
          <div>
            
            <div className="course-menu">
              <h1 className="yellow-title">Course History</h1>
              <label className="green-title">Select All That Apply</label>
              
              <p className="msg-text">
              For an accurate Degree Plan, please select all courses 
              you have previously taken and have received credits for.
              </p>
              
              {/* <ol className="course-list"> */}
              {/* {form}  */}
              {/* </ol> */}

               
              <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={COURSES}
                selectedOptions={selectedCourses}
                textProp="name"
                valueProp="id"
                buttonText="Add Course"
                placeholder="Course Name.."
                className="ubco-offered-courses-list"
              />
              <div className="added-courses">
                {selectedCourses.length === 0 && <p><i>(Nothing selected yet)</i></p>}
                {selectedCourses.length > 0 && 
                <ul>
                  {selectedCourses.map((ship, i) => 
                    <li key={ship.id}>
                      {`${ship.name} `}
                      <button className="remove-coursebtn" type="button" onClick={() => this.handleDeselect(i)}>
                      &times;
                      </button>
                    </li>)}
                </ul>}
              </div>
                    
              <div className="btn-div">

                <Link to = "/main"><button className="green-borderbtn">Submit</button></Link>
                <Link to = "/main"><button className="exit-green-borderbtn">Exit</button></Link>

              </div>

            </div> 
            <div className="right-menu">
            </div>
          </div>
    
    
        );
      }
}
    
  
export default previousCourses;
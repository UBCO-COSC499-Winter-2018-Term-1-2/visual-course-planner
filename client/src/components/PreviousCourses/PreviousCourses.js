import React, { Component } from 'react';
import '../PreviousCourses/PreviousCourses.css';
import { Link } from 'react-router-dom';
import FilteredMultiSelect from '../FilterMultiSelect/multiSelectMenu.js';

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

        var {selectedShips} = this.state;
        
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
                <button className="exit-green-borderbtn"><Link to = "/main">Exit</Link></button> 
              </div>

            </div> 
            <div className="right-menu">
            </div>
          </div>
    
    
        );
      }
}
    
  
export default previousCourses;
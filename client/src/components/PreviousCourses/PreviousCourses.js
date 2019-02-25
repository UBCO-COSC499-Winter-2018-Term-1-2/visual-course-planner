import React, { Component } from 'react';
import '../PreviousCourses/PreviousCourses.css';
import { Link } from 'react-router-dom';
import FilteredMultiSelect from '../FilterMultiSelect/multiSelectMenu.js';
import axios from 'axios';

class PreviousCourses extends Component {

      state = {
        selectedCourses: [],
        offeredCourses: [
          { code: 'FRENCH 11' },
          { code: 'FRENCH 12' },
          { code: 'SPANISH 11' },
          { code: 'GERMAN 12' }
        ],
        userId: 1
      }

      offeredUniCourses() {
        axios.get(`/api/users/${this.state.userId}/coursehistory`)
          .then(res => {
            const offeredCourses = res.data;
            this.setState({ offeredCourses });
          });
      }

      handleDeselect(index) {
        var selectedCourses = this.state.selectedCourses.slice();
        selectedCourses.splice(index, 1);
        this.setState({selectedCourses});
      }
    
      handleSelectionChange = (selectedCourses) => {
        this.setState({selectedCourses});
      }
    
      handleSubmit = (event) => {
        event.preventDefault();

        const takenCourses = {
          selectedCourses: this.state.selectedCourses,
        };

        axios.post(`/api/users/${this.state.userId}/coursehistory`, { takenCourses })
          .then(res => {
            console.log(res);
            console.log(res.data);
          });

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
               
              <FilteredMultiSelect
                onChange={this.handleSelectionChange}
                options={this.state.offeredCourses}
                selectedOptions={selectedCourses}
                textProp="name"
                valueProp="name"
                buttonText="Add Course"
                placeholder="Course Name.."
                className="ubco-offered-courses-list"
              />
              
              <div className="added-courses">
                <form onSubmit={this.handleSubmit}>
                  {selectedCourses.length === 0 && <p><i>(Nothing selected yet)</i></p>}
                  {selectedCourses.length > 0 && 
                  <ul>
                    {selectedCourses.map((course, i) => 
                      <li key={i}>
                        {`${course.code} `}

                        <button className="remove-coursebtn" type="button" onClick={() => this.handleDeselect(i)}>
                        &times;
                        </button>

                      </li>)}
                  </ul>}
                </form>
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
    
  
export default PreviousCourses;
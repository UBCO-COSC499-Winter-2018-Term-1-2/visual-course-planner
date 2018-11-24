import React, { Component } from 'react';

class StudentInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      name: "Leonardo Smithers"
    }
  }

  render() {
    return (
      <div id="student-info">
        <div className="sidebar-info-area">
          <h3 className="student-name">{this.state.name}</h3>
          <div className="student-buttons">
            <button className="sidebar-button">Log Out</button>
            <button className="sidebar-button">Edit Personal Info</button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
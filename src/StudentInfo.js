import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
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
          <div className="student-buttons-container">
            <button className="sidebar-button">Edit Personal Info</button>
            <button className="sidebar-button">Log Out<FontAwesomeIcon icon="sign-out-alt"/></button>
          </div>
        </div>
      </div>
    );
  }
}

export default StudentInfo;
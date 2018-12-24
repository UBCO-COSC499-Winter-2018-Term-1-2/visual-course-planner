import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

library.add(faSignOutAlt);

class StudentInfo extends Component {

  render() {
    return (
      <div id="student-info">
        <div className="sidebar-info-area">
          <h3 className="student-name">{this.props.user.name}</h3>
          <div className="student-buttons-container">
            <button className="sidebar-button">Edit Personal Info</button>
            <button className="sidebar-button">Log Out<FontAwesomeIcon icon="sign-out-alt" style={{ marginLeft: '0.5em' }}/></button>
          </div>
        </div>
      </div>
    );
  }
}

StudentInfo.propTypes = {
  user: PropTypes.object.isRequired
};

export default StudentInfo;
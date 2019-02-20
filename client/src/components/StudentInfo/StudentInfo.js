import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

class StudentInfo extends Component {

  //LINKS FORM BTN TO PAGE SPECIFED
  onNavigation = () => {
    this.props.history.push('/profile');
  }

  render() {
    return (
      <div id="student-info">
        <div className="sidebar-info-area">
          <h3 className="student-name">{this.props.user.name}</h3>
          <div className="student-buttons-container">
            <button className="sidebar-button" onClick={this.onNavigation}>Edit Personal Info</button>
            <button className="sidebar-button">Log Out<FontAwesomeIcon icon="sign-out-alt" style={{ marginLeft: '0.5em' }}/></button>
          </div>
        </div>
      </div>
    );
  }
}

StudentInfo.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default StudentInfo;
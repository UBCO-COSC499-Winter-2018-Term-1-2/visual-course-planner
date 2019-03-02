import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class StudentInfo extends Component {

  logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userId");
    this.props.history.push('/login');
  }

  render() {
    return (
      <div id="student-info">
        <div className="sidebar-info-area">
          <h3 className="student-name">{this.props.user.name}</h3>
          <div className="student-buttons-container">
            <button className="sidebar-button">Edit Personal Info</button>
            <button onClick={this.logout} className="sidebar-button">Log Out<FontAwesomeIcon icon="sign-out-alt" style={{ marginLeft: '0.5em' }}/></button>
          </div>
        </div>
      </div>
    );
  }
}

StudentInfo.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object
};

export default withRouter(StudentInfo);
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class StudentInfo extends Component {


  //LINKS FORM BTN TO PAGE SPECIFED
  onNavigation = () => {
    this.props.history.push('/profile');
  }

  logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userId");
    this.props.history.push('/login');
  }

  render() {
    return (
      <div id="student-info" style={{textAlign: this.props.align}}>
        <h3 className="student-info-text">User: {this.props.user.firstname}</h3>
        <h4 className="student-info-text">Current standing: {this.props.user.standing}</h4>

        <div className="student-buttons-container">
          <button className="sidebar-button" onClick={this.onNavigation} style={this.props.align === "right"  ? {marginRight: 0, marginLeft: "auto"} : {}}>Edit Personal Info</button>
          <button onClick={this.logout} className="sidebar-button" style={this.props.align === "right"  ? {marginRight: 0, marginLeft: "auto"} : {}}>Log Out<FontAwesomeIcon icon="sign-out-alt" style={{ marginLeft: '0.5em' }}/></button>
        </div>
      </div>
    );
  }
}

StudentInfo.propTypes = {
  user: PropTypes.object.isRequired,
  history: PropTypes.object,
  align: PropTypes.string
};

export default withRouter(StudentInfo);
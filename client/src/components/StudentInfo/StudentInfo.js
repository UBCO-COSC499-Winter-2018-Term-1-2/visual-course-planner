import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import './StudentInfo.css';

class StudentInfo extends Component {

  state = {
    alignClass: "left"
  }
  //LINKS FORM BTN TO PAGE SPECIFED
  onNavigation = () => {
    this.props.history.push('/profile');
  }

  logout = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("userId");
    this.props.history.push('/login');
  }

  componentDidMount = () => {
    this.props.align === "right"  ? this.setState({alignClass: "right"}) : this.setState({alignClass: "left"});
  }

  render() {
    return (
      <div id="student-info" className={this.state.alignClass}>
        <h3 className="student-info-text">User: {this.props.user.firstname}</h3>
        <h4 className="student-info-text">Current standing: {this.props.user.standing}</h4>

        <div className="student-buttons-container">
          <button className="sidebar-button"onClick={this.onNavigation} >Edit Personal Info</button>
          <button onClick={this.logout} className="sidebar-button">Log Out<FontAwesomeIcon icon="sign-out-alt" className="student-info icon"/></button>
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
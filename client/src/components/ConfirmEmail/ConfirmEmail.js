import React, { Component } from 'react';
import './ConfirmEmail.css';
import PropTypes from 'prop-types';

class ConfirmEmail extends Component {
  
  render(){

    return(
      //RETURN LOGIN MENU HERE
      <div className="menu">
        <h1 className="login-heading">Registration Successful</h1>
        <p className='msg-text'>Thank you for registering with the Visual Course Planner!
          An email has been sent out to {this.props.history.location.state.email} </p>
        <p className='msg-text'>Please confirm your email to proceed. </p>
      </div> 

    );
  }
} //end of class 

ConfirmEmail.propTypes = {
  toggleMenu: PropTypes.func,
  history: PropTypes.object
};

export default ConfirmEmail;
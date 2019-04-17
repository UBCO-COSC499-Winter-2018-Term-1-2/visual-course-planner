import React, { Component } from 'react';
import './ConfirmEmail.css';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import axios from 'axios';


class ConfirmEmail extends Component {
  state = {
    message: {}
  }

  async componentWillMount() {
    const parsed = queryString.parse(this.props.history.location.search);
    if (Object.keys(parsed).length === 0 && !this.props.history.location.state) {
      this.props.history.push('/login');
    } else {
      if (parsed.token) {
        const verifyReponse = await axios.post(`/api/users/emailVerification/${parsed.id}/${parsed.token}`);
        if (verifyReponse.data.verified) {
          sessionStorage.setItem('userId', parsed.id);
          this.props.history.push({pathname: '/main', state: {message: "Email confirmed."}});
        } else {
          this.setState({message: 'Unable to verify'});
        }
      } 
    }
  }
  
  render(){

    let message;

    if (Object.keys(this.state.message).length === 0) {
      message = 
        <div>
          <h1 className="login-heading">Registration Successful</h1>
          <p className='msg-text'>Thank you for registering with the Visual Course Planner!
            An email has been sent out to {this.props.history.location.state ? this.props.history.location.state.email : '' }</p>
          <p className='msg-text'>Please confirm your email to proceed.</p>
        </div>;
    } else {
      message = <p>this.state.message</p>;
    }
    
    return(
      <div className="menu">
        {message}
      </div>
    );
  }
} //end of class 

ConfirmEmail.propTypes = {
  toggleMenu: PropTypes.func,
<<<<<<< HEAD
  history: PropTypes.object,
  match: PropTypes.object
=======
  history: PropTypes.object
>>>>>>> c9c2572f803245e51f79ad3b248ef2ec0e0b04eb
};

export default ConfirmEmail;
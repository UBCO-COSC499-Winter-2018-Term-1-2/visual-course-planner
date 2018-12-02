import React, { Component } from 'react';
import './LoginInterface.css';
import PropTypes from 'prop-types';

class LoginInterface extends Component {
  render(){

    return(
      <div className="Menu">
        <h1 className="login-heading">Visual Course Planner</h1>
        <form>
          <input type="text" name="email" placeholder="Email"/>
          <input type="text" name="pass" placeholder="Password"/>   
          <button className="loginbtn">Login</button> 
          <section className = "CreateAccountMenu">
            <button className="openCreateAccountbtn" onClick={this.props.toggleMenu}>Create Account</button> 
          </section>
        </form>        
      </div>
        

    );
  }
}
LoginInterface.propTypes = {
  toggleMenu: PropTypes.func
};

export default LoginInterface;
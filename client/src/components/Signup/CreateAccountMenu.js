import React, { Component } from 'react';
// import React from 'react';
import '../Login/LoginInterface.css';
import { Link } from 'react-router-dom';


// const CreateAccountMenu = () => {

class CreateAccountMenu extends Component {

  render() {
    
    return(
      <div className="Menu">
        
        <form>
          <h1 className="login-heading">Visual Course Planner</h1>
            
          <input type="text" name="fname" placeholder="* First Name"/>
          <input type="text" name="lname" placeholder="* Last Name"/>   
          <input type="text" name="email" placeholder="* Email"/>
          <input type="text" name="pass" placeholder="* Password"/>   
          <input type="text" name="confirmPass" placeholder="* Confirm Password"/>
          <button className="createAccountbtn">Create Account</button> 
          <button className="openDiffMenubtn" ><Link to = "/login">Login Instead</Link></button> 
        </form> 

      </div>

    );
  }
}


export default CreateAccountMenu;



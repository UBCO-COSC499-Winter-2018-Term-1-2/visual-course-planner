import React, { Component } from 'react';
// import React from 'react';
import '../UserProfile/profile.css';
//import { Link } from 'react-router-dom';


class CreateAccountMenu extends Component {

  render() {
      
    return(

      <div>
        <h1 className="yellow-title">Users Name </h1>
        <h4 className="green-title">Users Name </h4>
        <input type="text" name="fname" placeholder="* First Name"/>
        <input type="text" name="lname" placeholder="* Last Name"/>   
        <h4 className="green-title">Change Password</h4>
        <input type="text" name="pass" placeholder="* Password"/> 
        <input type="text" name="pass" placeholder="* Re-Enter Password"/> 
        <h4 className="green-title">Current year standing</h4>
        <h4 className="green-title">link to change which courses a student has taken</h4>
      

        <button className="green-borderbtn">Save + Submit</button> 
      </div>
  
    );
  }
}
  
  
export default CreateAccountMenu;
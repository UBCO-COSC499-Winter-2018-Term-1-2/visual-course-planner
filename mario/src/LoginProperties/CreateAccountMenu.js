import React from 'react';
import '../LoginInterface.css';

const CreateAccountMenu = () => {

    
    return(
        <div className="lMenu">
            <h1>Visual Course Planner</h1>
            <form>
            <input type="text" name="fname" placeholder="* First Name"/>
            <input type="text" name="lname" placeholder="* Last Name"/>   
            <input type="text" name="email" placeholder="* Email"/>
            <input type="text" name="pass" placeholder="* Password"/>   
            <input type="text" name="confirmPass" placeholder="* Confirm Password"/>
            <button className="createAccountbtn2">Create Account</button> 
            </form>
                 

                   
        </div>

    );
}


export default CreateAccountMenu;
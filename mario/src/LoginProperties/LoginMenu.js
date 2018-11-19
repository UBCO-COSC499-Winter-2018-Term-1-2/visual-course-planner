import React from 'react';
import '../LoginInterface.css';

const loginMenu = () => {


    return(
        <div className="lMenu">
            <h1>Visual Course Planner</h1>
            <form>
            <input type="text" name="email" placeholder="Email"/>
            <input type="text" name="pass" placeholder="Password"/>   
            <button className="loginbtn">Login</button> 
            <button className="createAccountbtn">Create Account</button> 
            </form>        
        </div>

    );
}

export default loginMenu;
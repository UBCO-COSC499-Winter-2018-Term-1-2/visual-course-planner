import React, { Component } from 'react';
// import React from 'react';
import '../LoginInterface.css';
import CreateAccountMenu from './CreateAccountMenu';

// const loginMenu = () => {
class loginMenu extends Component {
    render(){

    

    return(
        <div className="Menu">
            <h1>Visual Course Planner</h1>
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

export default loginMenu;
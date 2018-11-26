import React, { Component } from 'react';
// import React from 'react';
import '../LoginInterface.css';


// const CreateAccountMenu = () => {

class CreateAccountMenu extends Component {

    render() {
    
    return(
        <div className="Menu">
{/*             
            // CURRENT COMMENTED OUT CODE MAKES THIS MENU DISAPPER.. ? 
            {this.props.showmenu && 
            <section id = "CreateAccountMenu"> */}
            <form>
            <h1>Visual Course Planner</h1>
            
            <input type="text" name="fname" placeholder="* First Name"/>
            <input type="text" name="lname" placeholder="* Last Name"/>   
            <input type="text" name="email" placeholder="* Email"/>
            <input type="text" name="pass" placeholder="* Password"/>   
            <input type="text" name="confirmPass" placeholder="* Confirm Password"/>
            <button className="createAccountbtn">Create Account</button> 
            </form> 
            {/* </section> */}

            }

        </div>

    );
}
}


export default CreateAccountMenu;



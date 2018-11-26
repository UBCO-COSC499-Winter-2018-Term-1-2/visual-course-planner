import React, { Component } from 'react';
// import React from 'react';
import './ExtraStudentInfo.css';




class ExtraStudentInfoInterface extends Component {

    render() {
    
    return(
        <div >

            <h2 className="yellowMainTitle">SELECT ALL THAT APPLY</h2>
            <h3 className="greenUpperTextTitle" >PROGRAM AND DEGREE</h3>

            <div>
            <ul className="listLayout">
                <li onClick="">Coffee</li>
                 <li>Tea</li>
                 <li>Milk</li>
            </ul> 
            </div>
            
            <h3 className="greenUpperTextTitle">CURRENT YEAR STANDING</h3>
        </div>

    );
}
}


export default ExtraStudentInfoInterface;



import React from 'react';
import './CourseInfoDisplay.css';

const CourseInfoDisplay = (props) => {

    //this functional component needs to use props

    return(
        <div className="courseinfo-wrapper">
            <div className="courseinfo-header-container">
                <h4 id="course-title">
                    COSC 111
                </h4>
            </div>
            <div className="course-info-body-container">
                <p id="course-info-body">
                    This Course is the best course with the best prof Dr.Abdallah.
                </p>
            </div>
        </div>
    );
};

export default CourseInfoDisplay;
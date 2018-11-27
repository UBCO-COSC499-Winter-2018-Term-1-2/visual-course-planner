import React from 'react';
import './CourseSearchBar.css';

const CourseSearchBar = (props) => {
    return(
        <div className="searchbar-container">
            <input 
                type="text" 
                className="course-searchbar" 
                placeholder="Search Course Code"
                onClick={props.click} /> {/* call back func received as a prop*/}
        </div>
    );
}

export default CourseSearchBar;
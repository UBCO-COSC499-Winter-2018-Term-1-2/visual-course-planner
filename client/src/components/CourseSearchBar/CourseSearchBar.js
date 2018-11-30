import React from 'react';
import './CourseSearchBar.css';
import PropTypes from 'prop-types';

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
};

CourseSearchBar.propTypes = {
  click: PropTypes.func,
};

export default CourseSearchBar;
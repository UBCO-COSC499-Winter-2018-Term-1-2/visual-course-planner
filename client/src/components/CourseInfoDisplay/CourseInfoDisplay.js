import React from 'react';
import './CourseInfoDisplay.css';
import PropTypes from 'prop-types';

const CourseInfoDisplay = (props) => {

  return(
    <div className="courseinfo-wrapper">
      <div className="courseinfo-header-container">
        <h4 id="course-title">
          {props.title}
        </h4>
      </div>
      <div className="course-info-body-container">
        <p id="course-info-body">
          {props.info}
        </p>
      </div>
    </div>
  );

};

CourseInfoDisplay.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string
};

export default CourseInfoDisplay;
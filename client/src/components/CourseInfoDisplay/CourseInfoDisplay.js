import React from 'react';
import './CourseInfoDisplay.css';

const CourseInfoDisplay = () => {

  //this functional component needs to use props

  return(
    <div className="courseinfo-wrapper">
      <div className="courseinfo-header-container">
        <h4 className="course-title">
            COSC 111
        </h4>
      </div>
      <div className="course-info-body-container">
        <p className="course-info-body">
            Lorem Ipsum and other spiel
            asdasdoasasduiasgdiasugduiasgdasasdoi
            asoidhaosihdioashdoihasidhiashdoiashd
            asjdoihasoidhasoihdiashdoiahsdoihasd
        </p>
      </div>
    </div>
  );
};

export default CourseInfoDisplay;
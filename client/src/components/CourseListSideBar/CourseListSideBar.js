import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar';
import CloseSideBarBtn from '../CloseSideBarBtn/CloseSideBarBtn';
import CourseInfoDisplay from '../CourseInfoDisplay/CourseInfoDisplay';
import PropTypes from 'prop-types';


const CourseListSideBar = (props) => {
    
    let drawerClasses;
    //Show or hide side bar by changes 
    props.show ? (drawerClasses = 'side-drawer open') : (drawerClasses = 'side-drawer')
    
    return (
      <div className={drawerClasses}>
        <CloseSideBarBtn click={props.close}/>
        
        <CourseSearchBar />
        {/* course search display results component goes here */}
        <div className="sidebar-divider-container">
          <hr id="sidebar-divider"/>
        </div>

        <CourseInfoDisplay 
          title={props.courseTitle}
          info={props.courseInfo}
        />
      </div>
    );
};

export default CourseListSideBar;
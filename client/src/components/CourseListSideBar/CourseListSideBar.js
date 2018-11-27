import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar'
import CloseSideBarBtn from '../CloseSideBarBtn/CloseSideBarBtn'
import CourseInfoDisplay from '../CourseInfoDisplay/CourseInfoDisplay'

const CourseListSideBar = (props) => {
    let drawerClasses = 'side-drawer';
    if (props.show) {
      drawerClasses = 'side-drawer open';
    }
    
    // adding search bar component to the side bar component
    // need to pass call back function as click prop


    
    return (
      <div className={drawerClasses}>
        <CloseSideBarBtn click={props.close}/>
        <CourseSearchBar />
        {/* course search display results component goes here */}
        <hr className="sidebar-divider"/>

        {/* course info component goes here */}
        <CourseInfoDisplay />
      </div>
    );
};

export default CourseListSideBar;
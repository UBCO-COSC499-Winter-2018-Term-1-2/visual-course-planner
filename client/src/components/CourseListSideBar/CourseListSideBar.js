import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar'
import CloseSideBarBtn from '../CloseSideBarBtn/CloseSideBarBtn'
import CourseInfoDisplay from '../CourseInfoDisplay/CourseInfoDisplay'

const CourseListSideBar = (props) => {
    
    let drawerClasses;
    
    //Show or hide side bar by changes 
    props.show ? (drawerClasses = 'side-drawer open') : (drawerClasses = 'side-drawer')
    // adding search bar component to the side bar component
    // need to pass call back function as click prop

    return (
      <div className={drawerClasses}>
        <CloseSideBarBtn click={props.close}/>
        <CourseSearchBar />
        {/* course search display results component goes here */}
        <div className="sidebar-divider-container">
          <hr id="sidebar-divider"/>
        </div>

        {/* course info component goes here */}
        <CourseInfoDisplay />
      </div>
    );
};

export default CourseListSideBar;
import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar';
import CloseSideBarBtn from '../CloseSideBarBtn/CloseSideBarBtn';
import CourseInfoDisplay from '../CourseInfoDisplay/CourseInfoDisplay';
import PropTypes from 'prop-types';
import axios from 'axios';


class CourseListSideBar extends React.Component {

  state = {
    courses: []
  }
  
  getCourseList = async () => {
    let courseList = [];
    try {
      const response = await axios.get('/api/courses');
      courseList = response.data;
      console.log("Received courses: ", courseList);

    } catch(err) {
      console.error("Couldnt retrieve course list." + err.message);
    }
    return courseList;
  }

  componentDidMount = async () => {
    const courses = await this.getCourseList();
    this.setState({courses: courses});
  }

  render() {
    console.log(this.state.courses);
    const courseList = this.state.courses.map(course => {
      <CourseInfoDisplay
        title={course.code}
        info={course.description}
      />;
    });

    return (
      <div className={this.props.show ? 'side-drawer open' : 'side-drawer'}>
        <CloseSideBarBtn click={this.props.close}/>
          
        <CourseSearchBar />
        <div className="sidebar-divider-container">
          <hr id="sidebar-divider"/>
        </div>

        {courseList}
         
      </div>
    );
  }
}

CourseListSideBar.propTypes = {
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default CourseListSideBar;
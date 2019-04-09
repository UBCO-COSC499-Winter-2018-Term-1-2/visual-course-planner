import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar';
import Course from '../Course/Course';
import PropTypes from 'prop-types';
import axios from 'axios';


class CourseListSideBar extends React.Component {

  state = {
    courses: [],
    filteredCourses: []
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
    this.setState({courses: courses, filteredCourses: courses});
  }

  filterList = (e) => {
    let updatedList = this.state.courses;
    let searchString = e.target.value;
    if (searchString === '') {
      this.setState({filteredCourses: updatedList});
      return;
    }
    updatedList = updatedList.filter(item => {
      return item.code.toLowerCase().search(searchString.toLowerCase()) !== -1 || item.year.concat(item.season).toLowerCase().search(searchString.toLowerCase()) !== -1;
    });
    this.setState({filteredCourses: updatedList});
  }

  render() {
    const courseList = this.state.filteredCourses.map(course => {
      return (
        <Course
          key={course.id}
          course={course}
          type={"elective"}
          onDragStart={(e, course) => {this.props.close(); this.props.onCourseDragStart(e, course);}}
        />
      );
    });

    return (
      <div className={this.props.isOpen ? 'side-drawer open' : 'side-drawer'}>
        <div className="closebtn-container">
          <button 
            className="close-sidebarbtn sidebar-button"
            onClick={this.props.close}>
              Close
          </button>
        </div>
          
        <CourseSearchBar onChange={this.filterList}/>
        <div className="sidebar-divider-container">
          <hr id="sidebar-divider"/>
        </div>

        {courseList}
         
      </div>
    );
  }
}

CourseListSideBar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired
};

export default CourseListSideBar;
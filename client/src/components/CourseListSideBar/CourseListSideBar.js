import React from 'react';
import './CourseListSideBar.css';
import CourseSearchBar from '../CourseSearchBar/CourseSearchBar';
import CloseSideBarBtn from '../CloseSideBarBtn/CloseSideBarBtn';
import CourseInfoDisplay from '../CourseInfoDisplay/CourseInfoDisplay';
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
    updatedList = updatedList.filter(item =>
      item.code.toLowerCase().search(e.target.value.toLowerCase()) !== -1 || item.startYear.concat(item.season).toLowerCase().search(e.target.value.toLowerCase()) !== -1
    );
    this.setState({filteredCourses: updatedList});
  }

  render() {
    console.log(this.state.courses);
    const courseList = this.state.filteredCourses.map(course => {
      return (
        <CourseInfoDisplay
          key={course.cid}
          title={course.code}
          info={course.description}
          session={course.startYear.concat(course.season)}
        />
      );
    });

    return (
      <div className={this.props.show ? 'side-drawer open' : 'side-drawer'}>
        <CloseSideBarBtn click={this.props.close}/>
          
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
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default CourseListSideBar;
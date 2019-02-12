import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Semester.css';
import Course from '../Course/Course';

class Semester extends Component {
  //term or year divider style attribute
  termDivider = {
    "borderRight": "1px solid #b7b7b8"
  };

  //using this to add a border to the divs to act as a year/term divider
  isEvenTerm = (this.props.term % 2 == 0);

  coursesContained = this.props.coursesContained;

  //Map containing references to the courses is received as a prop
  courseRefs = this.props.courseRefMap;

  renderCourses = () => {
    return (this.coursesContained.map((course) => {
      return (
        <Course
          key={course}
          code={course}
          type="required"
          sourceTerm={this.props.term}
          onDragStart={this.props.onCourseDragStart}
          courseRef={this.courseRefs.get(course)}
          showXY={this.props.showXY} />
      );
    }
    ));
  }
  render() {  
    return (
      <div className="semester-container" style={this.isEvenTerm ? this.termDivider : null}>
        <h3 className="term-heading"> TERM {this.props.term} </h3>
        <div
          className="courses-container" style={this.isEvenTerm ? null : this.termDivider}
          onDragOver={this.props.onCourseDragOver}
          onDrop={(e) => this.props.onCourseDrop(e, this.props.term)}>

          <this.renderCourses />
        </div>
      </div>
    );
  }
}

Semester.propTypes = {
  term: PropTypes.string.isRequired,
  coursesContained: PropTypes.array.isRequired,
  onCourseDragOver: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired,
  onCourseDrop: PropTypes.func.isRequired,
  courseRefMap: PropTypes.object.isRequired,
  showXY: PropTypes.func.isRequired
};

export default Semester;
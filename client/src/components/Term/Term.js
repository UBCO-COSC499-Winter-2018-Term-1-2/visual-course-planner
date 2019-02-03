import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Term.css';
import Course from '../Course/Course';

class Term extends Component {

  // coursesContained = this.props.coursesContained;
  
  renderCourses = () => {
    return (this.props.coursesContained.map((course) => {
      return (
        <Course
          key={course.id}
          course={course}
          type="required"
          sourceTerm={this.props.term}
          onDragStart={this.props.onCourseDragStart} />
      );
    }
    ));
  }
  render() {
    return (
      <div className="term-container"
        onDragOver={this.props.onCourseDragOver}
        onDrop={(e) => this.props.onCourseDrop(e, this.props.term)}
      >
        <h3 className="term-heading">Term {this.props.term.number}</h3>
        <div className="courses-container">
          <this.renderCourses />
        </div>
      </div>
    );
  }
}

Term.propTypes = {
  term: PropTypes.object.isRequired,
  coursesContained: PropTypes.array.isRequired,
  onCourseDragOver: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired,
  onCourseDrop: PropTypes.func.isRequired
};

export default Term;
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
          sourceTermId={this.props.termId}
          onDragStart={this.props.onCourseDragStart} />
      );
    }
    ));
  }
  render() {
    return (
      <div className="term-container"
        onDragOver={(e) => {
          this.props.onCourseDragOver(e, this.props.termId);
        }}
        onDrop={(e) => this.props.onCourseDrop(e, this.props.termId)}
      >
        <h3 className="term-heading">{this.props.title}</h3>
        <div className="courses-container">
          <this.renderCourses />
        </div>
      </div>
    );
  }
}

Term.propTypes = {
  termId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  coursesContained: PropTypes.array.isRequired,
  onCourseDragOver: PropTypes.func.isRequired,
  onCourseDragStart: PropTypes.func.isRequired,
  onCourseDrop: PropTypes.func.isRequired
};

export default Term;
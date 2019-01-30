import React from 'react';
import './CourseSearchBar.css';
import PropTypes from 'prop-types';

class CourseSearchBar extends React.Component {
  
  render() {
    return(
      <div className="searchbar-container">
        <input 
          type="text" 
          className="course-searchbar focus-element" 
          placeholder="Search for courses..."
          onChange={this.props.onChange}
        />
      </div>
    );
  }
  
}

CourseSearchBar.propTypes = {
  onChange: PropTypes.func.isRequired
};

export default CourseSearchBar;
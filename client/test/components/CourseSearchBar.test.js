import React from 'react';
import ReactDOM from 'react-dom';
import CourseSearchBar from '../../src/components/CourseSearchBar/CourseSearchBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseSearchBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
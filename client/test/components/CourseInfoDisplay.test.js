import React from 'react';
import ReactDOM from 'react-dom';
import CourseInfoDisplay from '../../src/components/CourseInfoDisplay/CourseInfoDisplay';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseInfoDisplay />, div);
  ReactDOM.unmountComponentAtNode(div);
});
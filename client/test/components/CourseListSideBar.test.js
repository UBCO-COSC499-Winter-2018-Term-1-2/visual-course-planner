import React from 'react';
import ReactDOM from 'react-dom';
import CourseListSideBar from '../../src/components/CourseListSideBar/CourseListSideBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CourseListSideBar />, div);
  ReactDOM.unmountComponentAtNode(div);
});
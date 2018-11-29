import React from 'react';
import ReactDOM from 'react-dom';
import SideBarToggleButton from '../../src/components/SideBarToggleButton/SideBarToggleButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SideBarToggleButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
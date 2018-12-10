import React from 'react';
import ReactDOM from 'react-dom';
import CloseSideBarBtn from '../../src/components/CloseSideBarBtn/CloseSideBarBtn';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CloseSideBarBtn />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import AdminPortal from '../../src/components/AdminPortal/AdminPortal';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AdminPortal />, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import AdminPortal from '../../src/components/AdminPortal/AdminPortal';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><AdminPortal /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../src/containers/Main';
import { BrowserRouter } from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><Main /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});

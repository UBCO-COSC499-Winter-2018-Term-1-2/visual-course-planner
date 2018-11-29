import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../../src/components/Backdrop/Backdrop';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Backdrop />, div);
  ReactDOM.unmountComponentAtNode(div);
});
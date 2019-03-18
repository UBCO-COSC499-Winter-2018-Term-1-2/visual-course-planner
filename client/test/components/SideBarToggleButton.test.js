import React from 'react';
import ReactDOM from 'react-dom';
import BackdropButton from '../../src/components/BackdropButton/BackdropButton';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BackdropButton />, div);
  ReactDOM.unmountComponentAtNode(div);
});
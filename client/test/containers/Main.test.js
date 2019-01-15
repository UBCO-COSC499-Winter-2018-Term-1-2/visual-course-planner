import React from 'react';
import ReactDOM from 'react-dom';
import Main from '../../src/containers/Main';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Main />, div);
  ReactDOM.unmountComponentAtNode(div);
});

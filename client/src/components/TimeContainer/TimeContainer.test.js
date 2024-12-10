import React from 'react';
import ReactDOM from 'react-dom';
import TimeContainer from './TimeContainer';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TimeContainer />, div);
  ReactDOM.unmountComponentAtNode(div);
});
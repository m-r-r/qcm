import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';
import { Provider } from 'react-redux';
import { configureStore } from './index';

window.addEventListener('load', () => {
  ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
    document.body.children[0]
  )
});

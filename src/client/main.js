/* @flow */
import React from 'react';
import ReactDOM from 'react-dom';

import Client from './containers/Client';
import {Provider} from 'react-redux';
import {configureStore} from './index';

window.addEventListener('load', () => {
  let elements = document.getElementsByClassName('questionnaire');

  for (let element of elements) {
    try {
      element.classList.remove('questionnaire');
      let uri = element.getAttribute('data-questionnaire-uri');
      let store = configureStore();
      // store.subscribe((object) => console.debug('state', store.getState()));
      ReactDOM.render(
        <Provider store={store}>
          <Client uri={uri} />
        </Provider>,
        element
      );
    } catch (err) {
      console && console.debug(err);
    }
  }
});

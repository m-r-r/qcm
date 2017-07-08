/* @flow */
import React from 'react';
import type {Exercise, State, Action} from './types';
import type {Store} from 'redux';
import createStore from './store/createStore';
import {loadExercise} from './actions';
import Main from './containers/Main';
import {Provider} from 'react-redux';
// $FlowFixMe
import {MuiThemeProvider} from 'material-ui/styles';
import {render} from 'react-dom';

window.QCM = {
  store: null,
  startEditor(element: Element, exercise?: Exercise, url?: string) {
    this.store = createStore();
    if (exercise) {
      this.store.dispatch(loadExercise(exercise, url));
    }
    render(
      <MuiThemeProvider>
        <Provider store={this.store}>
          <Main />
        </Provider>
      </MuiThemeProvider>,
      element
    );
  },
};

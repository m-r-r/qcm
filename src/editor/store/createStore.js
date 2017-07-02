/* @flow */
import type {State, Action} from '../types';
import type {Store} from 'redux';
import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducer';

export default function configureStore(
  initialState?: State
): Store<State, Action> {
  let middlewares = applyMiddleware();
  if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') {
    middlewares = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(middlewares);
  }

  // $FlowFixMe
  const store = createStore(rootReducer, initialState, middlewares);

  if (module.hot) {
    // $FlowFixMe
    module.hot.accept('../reducer', () => {
      const nextRootReducer = require('../reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

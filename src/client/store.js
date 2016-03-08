import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import rootSaga from './sagas';

export function configureStore (initialState) {
  const middleware = applyMiddleware(createSagaMiddleware(rootSaga));
  const store = middleware(createStore)(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducer = require('./reducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}

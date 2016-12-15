import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';
import devTools from 'remote-redux-devtools';

export default function configureStore(initialState) {
  const logger = createLogger();
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, promise, logger),
      devTools({
        name: 'Boilerplate',
        hostname: 'localhost',
        port: 8000,
        realtime:true
      })
  )

  );

  if (module.hot) {
    // Enable hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

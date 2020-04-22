import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import logger from 'redux-logger';
import thunk from 'redux-thunk'

import rootReducer from './root-reducer';

// There might be multiple middleware
const middlewares = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middlewares));

// Persisted version of our store
const persistor = persistStore(store);

// return a store and it's persistor
export { store, persistor };



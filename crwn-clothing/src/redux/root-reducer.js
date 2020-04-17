import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Want to use local storage as my storage
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistCong = {
  key: 'root',
  storage,
  whitelist: ['cart'] // Only reducer we want to see. 
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistCong, rootReducer);

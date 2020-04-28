import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// Want to use local storage as my storage
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';

const persistCong = {
  key: 'root',
  storage,
  whitelist: ['cart'] // Only reducer we want to see. 
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  directory: directoryReducer,
  shop: shopReducer
});

export default persistReducer(persistCong, rootReducer);

import { all, call } from 'redux-saga/effects';

import { fetchCollectionsStart } from './shop/shop.sagas'
import { userSagas } from './user/user.sagas'

export default function* rootSaga() {

  // all - takes an array of sagas, handles running sagas concurrently
  // Want saga to be initialized as soon as possible, initialize on separate task streams

  yield all([call(fetchCollectionsStart), call(userSagas)]);
}
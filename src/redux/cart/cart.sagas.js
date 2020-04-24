import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';
import { clearCart } from './cart.actions';

export function* clearCartOnSignOut() {
  yield put(clearCart());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* cartSagas() {
  yield all([call(onSignOutSuccess)])
}

// Code listening for different things but then handling different ways that we interact
// Components are FREE of the logic that used to be inside of them. 
// Components are MORE presentational
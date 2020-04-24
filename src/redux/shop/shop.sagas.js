import { takeLatest, call, put } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import { fetchCollectionsSuccess, fetchCollectionsFailure } from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync() {
  try {
    const collectionRef = firestore.collection('collections');
    const snapshot = yield collectionRef.get();

    // We want to yield this CALL if it's longer than we expect
    // Use a call method - it's an effect that invokes functions
    // take a method, subsequent is the parameters you put into the method
    // Defer control to saga middleware, in case it needs to cancel
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);

    // Put = method to dispatches out
    yield put(fetchCollectionsSuccess(collectionsMap));
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message));
  }
}

// Run these sagas all concurrently, meaning it wants to run all together that doesn't block execution
// If we had multiple sagas listening for different actions, we might not want code to wait for each of these functions to finish
// We want our app to run if we are waiting for data to come back
// It doesn't need to wait for that request to come back - that would be BLOCKING
// TakeEvery creates a NON BLOCKING CALL, we can cancel tasks
export function* fetchCollectionsStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}


// If we fire an action again, the previous action is still processing - we want to be able CANCEL the previous one
// We dont want to fetch that multiple times. 
// Just want the most recent one that we got
// Yielding control over this saga back to the middleware - with the ability to CANCEL

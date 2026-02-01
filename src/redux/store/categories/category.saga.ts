//import { takeLatest, all, call, put } from 'redux-saga/effects';
// the above line becomes the one as follow due to typeScript
import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import CATEGORIES_ACTION_TYPES from './category.action-types';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase.utils';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailed,
} from './category.action';

//due to saga, every "yield"  becomes "yield*"
// generators respond to actions , the same way reducers do within (switch statements)
export function* fetchCategoriesAsync() {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments); // yield means  wait(await) until something comeback then move to the next yied statement ; or call(getCategoriesAndDocuments,'categories')  if we see/consder "categories" as a parameter
    yield* put(fetchCategoriesSuccess(categoriesArray)); // put replaces dispatch, so an action is dispatched here
  } catch (error) {
    yield* put(fetchCategoriesFailed(error as Error)); // another action is dispatched here
  }
}
//takeLatest or takeEvery are listeners/watchers that trigger SAGA
//the below generator tells SAGA what actions/Watchers to listen to
export function* onFetchCategories() {
  //takeLatest receives as a first argument the "action' and as the second argument, a callback to complete the request
  yield* takeLatest(
    CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, // this action, reveived from a component(shop component) triggers "fetchCategoriesAsync" as all those actions are linked to fetching document API
    fetchCategoriesAsync
  ); // takeLatest ==a listener; if you've heard the same action many times, consider the latest one
}
//agregator function
export function* categoriesSaga() {
  // saga aggregator
  //generator function
  yield* all([call(onFetchCategories)]); // run all in here before moving to something else, the next yield
}

// saga is also for async actions but more powerful than thunk
import { all, call } from 'redux-saga/effects';

import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';
export function* rootSaga() {
  // generator function ES6 feature
  yield all([call(categoriesSaga), call(userSagas)]); // to run multiple sagas at once
}

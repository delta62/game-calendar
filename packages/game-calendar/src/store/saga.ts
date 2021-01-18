import { all } from 'redux-saga/effects'

import { saga as loginSaga } from './user'
import { saga as gamesSaga } from './games'

function* rootSaga() {
  yield all([loginSaga(), gamesSaga()])
}

export default rootSaga

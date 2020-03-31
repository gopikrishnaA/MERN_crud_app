import { takeEvery } from 'redux-saga/effects'

export const createSagaWatcher = (sagas) =>
  Object.keys(sagas).map(
    (type) =>
      function* () {
        yield takeEvery(type, sagas[type])
      }
  )

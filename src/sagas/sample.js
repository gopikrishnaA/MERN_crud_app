import { put, call } from 'redux-saga/effects'
import { createAction } from 'redux-act'
import { push } from 'react-router-redux'

import invokeService from '../services'
import { createSagaWatcher } from './createSagaWatcher'

// Actions
import { onLikeAction, onSucessAction } from '../actions'
export const sampleAction = createAction('SAMPLE_ACTION')

/** --------------------------------------------------
 *
 * Sagas
 *
 */

export const sagas = {
    [sampleAction]: function * () {
      const result = yield call(invokeService, { serviceUrl: 'https://icanhazdadjoke.com' })
      yield put(onSucessAction({
        id: result.id,
        joke: result.joke
      }))
    },
    [onLikeAction]: function * ({ payload }) {
      if (payload.route === 'login') {
        // yield put(onSuccess(payload))
        yield put(push('/login'))
      } else {
        yield put(sampleAction())
        // yield put(onSuccess(payload))
      }
    }
  }
  export const sampleSagaWatcher = createSagaWatcher(sagas)
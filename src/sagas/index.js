
import { sampleSagaWatcher } from './sample'

function * rootSaga () {
  yield [
    ...sampleSagaWatcher
  ]
}

export default rootSaga
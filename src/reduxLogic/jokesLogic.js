import { createLogic } from 'redux-logic'
import * as Actions from '../actions'
import invokeService from '../services'
import { getJokesParser } from '../parsers/jsonParser'
import { push } from 'connected-react-router';
import { baseUrl } from '../services/urls';

const fetchLogic = createLogic({
  type: Actions.DATA_FETCH, // only apply this logic to this type
  cancelType: Actions.DATA_FETCH_CANCEL, // cancel on this type
  latest: true, // only take latest
  process({ action }, dispatch, done) {

    invokeService({
      serviceUrl: action.payload ? `/api/jokes/${action.payload}` : baseUrl
    })
      .then(result => {
        dispatch(Actions.onSucessAction({
        id: result.data ? result.data.id: result.id,
        joke: result.data? result.data.joke: result.joke
      }))
      action.payload && dispatch(push(`/joke/${action.payload}`))
    })
      .catch(err => {
        console.error(err); // log since could be render err
        //    dispatch({ type: DATA_FETCH_CANCEL, payload: err,
        //               error: true })
      })
      .then(() => done());
  }
});

const updateLikes = createLogic({
  type: Actions.UPDATE_LIKE, // only apply this logic to this type
  process({ action }, dispatch, done) {
    if (action.payload.route === 'login') {
      const requestData = {
        status: action.payload.status
      }
      invokeService({
        serviceUrl: `/api/jokes/${action.payload.id}`,
        method: 'PUT',
        requestData
      }).then(res => {
        dispatch(push('/login'))
      }).catch(err => {
        console.error(err); // log since could be render err
      }).then(() => done());
    } else {
      const requestData = {
        id: action.payload.id,
        joke: action.payload.joke,
        status: action.payload.status
      }
      invokeService({
        serviceUrl: '/api/jokes',
        method: 'POST',
        requestData
      }).then(res => {
      dispatch(Actions.fetchJokeData())
      }).catch(err => {
        console.error(err); // log since could be render err
      }).then(() => done());
    }
  }
});

const getItems = createLogic({
  type: Actions.GET_JOKES, // only apply this logic to this type
  process({ action }, dispatch, done) {
    invokeService({
      serviceUrl: '/api/jokes'
    }).then(res => {
      dispatch(Actions.onSucessAction({ items: getJokesParser(res.data) }))
    }).catch(err => {
      console.error(err); // log since could be render err
    }).then(() => done());
  }
});

const deleteJokes = createLogic({
  type: Actions.DELETE_JOKES, // only apply this logic to this type
  process({ action }, dispatch, done) {
    invokeService({
      serviceUrl: `/api/jokes/${action.payload}`,
      method: 'DELETE'
    }).then(res => {
      dispatch(Actions.getJokes())
    }).catch(err => {
      console.error(err); // log since could be render err
    }).then(() => done());
  }
});

const deleteSelectedJokes = createLogic({
  type: Actions.DELETE_SELECTED_JOKES, // only apply this logic to this type
  process({ action }, dispatch, done) {
    const requestData = {
      items: action.payload
    }
    invokeService({
      serviceUrl: 'api/jokes/delete',
      method: 'POST',
      requestData
    }).then(res => {
      dispatch(Actions.getJokes())
    }).catch(err => {
      console.error(err); // log since could be render err
    }).then(() => done());
  }
});



export default [
  deleteJokes,
  deleteSelectedJokes,
  fetchLogic,
  getItems,
  updateLikes
]
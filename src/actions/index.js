import { createAction } from 'redux-act'

// Actions
export const onLikeAction = createAction('LIKE_ACTION')

// Redux logic actions

// fetch the joke data
export const DATA_FETCH = 'DATA_FETCH'
export const DATA_FETCH_CANCEL = 'DATA_FETCH_CANCEL'
export const fetchJokeData = createAction(DATA_FETCH)
export const onSucessAction = createAction('SAMPLE_ACTION_SUCCESS')

// update joke status
export const LIKE_ACTION = 'LIKE_ACTION'
export const UPDATE_LIKE = 'UPDATE_LIKE'
export const updateJoke = createAction(UPDATE_LIKE)

// Get all jokes
export const GET_JOKES = 'GET_JOKES'
export const getJokes = createAction(GET_JOKES)

// Delete jokes
export const DELETE_JOKES = 'DELETE_JOKES'
export const deleteJoke = createAction(DELETE_JOKES)
export const DELETE_SELECTED_JOKES = 'DELETE_SELECTED_JOKES'
export const deleteSelectedJoke = createAction(DELETE_SELECTED_JOKES)

// update comments
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS'
export const updateComment = createAction(UPDATE_COMMENTS)

// get comments
export const GET_COMMENTS = 'GET_COMMENTS'
export const getComments = createAction(GET_COMMENTS)

// Delete jokes
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const deleteComment = createAction(DELETE_COMMENT)

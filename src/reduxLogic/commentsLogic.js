import { createLogic } from "redux-logic";
import * as Actions from "../actions";
import invokeService from "../services";
import { commentsParser } from "../parsers/jsonParser";

const getComments = createLogic({
  type: Actions.GET_COMMENTS, // only apply this logic to this type
  process({ action }, dispatch, done) {
    const { selectedId, isShow } = action.payload;
    const requestData = {
      joke_id: selectedId
    };
    invokeService({
      serviceUrl: `/api/jokes/comments`,
      method: "POST",
      requestData
    })
      .then(res => {
        dispatch(
          Actions.onSucessAction({
            comments: commentsParser(res.data),
            isShow,
            selectedId
          })
        );
      })
      .catch(err => {
        console.error(err); // log since could be render err
      })
      .then(() => done());
  }
});

const updateComments = createLogic({
  type: Actions.UPDATE_COMMENTS, // only apply this logic to this type
  process({ action }, dispatch, done) {
    const { selectedId, commentText } = action.payload;
    const requestData = {
      comment: commentText.trim(),
      joke_id: selectedId
    };
    invokeService({
      serviceUrl: `/api/jokes/addComment`,
      method: "POST",
      requestData
    })
      .then(res => {
        dispatch(Actions.onSucessAction({ isCommentUpload: true }));
        dispatch(
          Actions.getComments({
            selectedId: selectedId,
            isShow: true
          })
        );
      })
      .catch(err => {
        console.error(err); // log since could be render err
      })
      .then(() => done());
  }
});

const deleteComment = createLogic({
  type: Actions.DELETE_COMMENT, // only apply this logic to this type
  process({ action }, dispatch, done) {
    const { id, joke_id } = action.payload;
    const requestData = {
      comment_id: id,
      joke_id: joke_id
    };
    invokeService({
      serviceUrl: `/api/jokes/deleteComment`,
      method: "POST",
      requestData
    })
      .then(res => {
        dispatch(
          Actions.getComments({
            selectedId: joke_id,
            isShow: true
          })
        );
      })
      .catch(err => {
        console.error(err); // log since could be render err
      })
      .then(() => done());
  }
});

export default [deleteComment, getComments, updateComments];

import React from "react";
import { Alert, Button, Modal, InputGroup, FormControl } from "react-bootstrap";
import "./modal.css";
const deleteIcon = require("../../routes/Summary/delete.png");

const CustomModal = props => {
  const {
    comments = [],
    commentText = "",
    deleteComment = () => {}, 
    handleClose = () => {},
    handleSave = () => {},
    handleModalOnChange,
    show
  } = props;

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <FormControl
              required
              as="textarea"
              placeholder="add comments..."
              onChange={handleModalOnChange}
              value={commentText}
              isValid={commentText.trim().length > 2}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={commentText.trim().length < 3}
            variant="primary"
            onClick={handleSave}
          >
            Save
          </Button>
        </Modal.Footer>
        <div className="comment_section">
          {comments.map((item, id) => (
            <Alert key={`${item.id}-${id}`} variant="info" className='alert'>
              <div>{item.comment}</div>
              <img
                className="del_icon"
                src={deleteIcon}
                alt=""
                onClick={() => deleteComment(item)}
              />
            </Alert>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default CustomModal;

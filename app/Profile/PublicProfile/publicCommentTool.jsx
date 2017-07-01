import React from 'react';

const CommentTool = props => {
  const SubmitButton = props.isEditing 
    ? <button
        className="btn btn-small submitEditButton"
        onClick={props.submitEdit}>
        Submit
      </button>
    : null;
  return (
    <span>
      <button
        className="btn btn-small editCommentButton"
        onClick={props.openEditor}>
        Edit
      </button>
      <button
        className="btn btn-small deleteCommentButton"
        onClick={props.deleteComment}>
        Delete
      </button>
      {SubmitButton}
    </span>
  );
};

export default CommentTool;

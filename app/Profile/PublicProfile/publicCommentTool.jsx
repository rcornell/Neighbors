import React from 'react';

const CommentTool = props => {
  const SubmitButton = props.isEditing 
    ? <button
        className="btn btn-small"
        onClick={props.submitEdit}>
        Submit
      </button>
    : null;
  return (
    <span>
      <button
        className="btn btn-small"
        onClick={props.openEditor}>
        Edit
      </button>
      <button
        className="btn btn-small"
        onClick={props.deleteComment}>
        Delete
      </button>
      {SubmitButton}
    </span>
  );
};

export default CommentTool;

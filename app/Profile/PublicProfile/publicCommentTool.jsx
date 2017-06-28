import React from 'react';

const CommentTool = props => {
  const SubmitButton = props.isEditing ? <button onClick={props.submitEdit}>Submit</button> : null;
  return (
    <span>
      <button onClick={props.openEditor}>Edit</button>
      <button onClick={props.deleteComment}>Delete</button>
      {SubmitButton}
    </span>
  );
}
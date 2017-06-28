import React from 'react';

const CommentTool = props => {

  return (
    <span>
      <button onClick={props.editComment}>Edit</button>
      <button onClick={props.deleteComment}>Delete</button>
    </span>
  );
}
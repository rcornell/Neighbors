import React from 'react';

const CommentItem = props => (
  <div>
    <div>{props.comment.sender.fullName}</div>
    <p>{props.comment.message}</p>
  </div>
);

export default CommentItem;
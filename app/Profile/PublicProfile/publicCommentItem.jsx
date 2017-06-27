import React from 'react';

const CommentItem = props => (
  <div>
    <div>{props.fullName}</div>
    <p>{props.comment}</p>
  </div>
);

export default CommentItem;
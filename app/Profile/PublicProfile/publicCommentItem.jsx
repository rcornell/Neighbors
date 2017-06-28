import React from 'react';

const CommentItem = props => (
  <div className="commentItem">
    <div className="commentSubmitter">By {props.comment.sender.fullName} on {props.comment.createdAt.slice(0,10)}</div>
    <p className="commentMessage">{props.comment.message}</p>
  </div>
);

export default CommentItem;
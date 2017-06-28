import React from 'react';
import CommentTool from './publicCommentTool.jsx'

const CommentItem = props => {

  const CommentTool = props.currentUserId === props.comment.sender_id 
    ? <CommentTool /> 
    : null; 
  return (
    <div className="commentItem">
      <div className="commentSubmitter">By {props.comment.sender.fullName} on {props.comment.createdAt.slice(0,10)}</div>
      <p className="commentMessage">{props.comment.message}</p>
      {CommentTool}
    </div>
  );
};

export default CommentItem;
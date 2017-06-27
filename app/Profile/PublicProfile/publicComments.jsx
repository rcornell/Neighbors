import React from 'react';
import CommentItem from './publicCommentItem.jsx';

const Comments = props => {
  if (!props.comments || props.comments.length === 0) {
    return <div>Nobody has commented on this profile yet!</div>
  }
  return props.comments.map(comment => <CommentItem comment={comment} />);
};

export default Comments;
import React from 'react';
import CommentItem from './publicCommentItem.jsx';

let count = 0;
const Comments = props => {
  if (!props.comments || props.comments.length === 0) {
    return <div>Nobody has commented on this profile yet!</div>
  }
  console.log('Rendering comments: ', props.comments);   
  return (
    <div> 
      {
        props.comments.map((comment) => <CommentItem key={count++} comment={comment} />)
      }
    </div>
  )
};

export default Comments;
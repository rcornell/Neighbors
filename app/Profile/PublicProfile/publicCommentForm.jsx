import React from 'react';

const CommentForm = props => (
  <form className="commentForm" onSubmit={props.handleCommentSubmit}>
    <div>Leave a review</div>
    <input type="text" onChange={props.updateComment} />
    <button type="submit">Submit</button>
  </form>
)

export default CommentForm;
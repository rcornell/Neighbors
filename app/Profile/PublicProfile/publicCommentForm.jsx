import React from 'react';

const CommentForm = props => (
  <form className="commentForm" onSubmit={props.handleCommentSubmit}>
    <div>Leave a review</div>
    <input className="commentInput" type="text" onChange={props.updateComment} value={props.currentComment} />
    <button className="commentSubmitButton" type="submit">Submit</button>
  </form>
)

export default CommentForm;
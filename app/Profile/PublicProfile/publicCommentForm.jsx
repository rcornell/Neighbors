import React from 'react';

const CommentForm = props => {
  const { ownerId, borrowerId } = props;
  return (
    <form className="commentForm" onSubmit={(e) => props.handleCommentSubmit(e, ownerId, borrowerId)}>
      <div>Leave a review</div>
      <input
        className="commentInput"
        type="text"
        onChange={props.updateComment}
        value={props.currentComment}
      />
      <button
        className="commentSubmitButton"
        type="submit">
        Submit
      </button>
    </form>
  );
}
  
  

export default CommentForm;
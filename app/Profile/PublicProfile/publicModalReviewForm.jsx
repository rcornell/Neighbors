import React from 'react';

const ModelCommentForm = props => {
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
        className="commentModalSubmitButton"
        type="submit">
        Submit
      </button>
    </form>
  );
}
  
  

export default ModelCommentForm;
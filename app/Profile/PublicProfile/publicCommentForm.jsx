import React from 'react';

const CommentForm = props => (
  <form onSubmit={props.handleCommentSubmit}>
    <input type="text" onChange={props.updateComment} />
    <button type="submit">Submit</button>
  </form>
)

export default CommentForm;
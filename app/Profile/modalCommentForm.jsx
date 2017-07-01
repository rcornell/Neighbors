import React from 'react';

const ModalCommentForm = props => (
  <form className="modalCommentForm" onSubmit={function(e, evt) {props.handleCommentSubmit(e, evt, props.borrowerId)}}>
    <div>Leave a review</div>
    <input className="modalCommentInput" type="text" onChange={props.updateComment} value={props.currentComment} />
    <button className="modalCommentSubmitButton" type="submit">Submit</button>
  </form>
)

export default ModalCommentForm;
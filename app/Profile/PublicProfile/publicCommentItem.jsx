import React from 'react';
import CommentTool from './publicCommentTool.jsx'

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      newComment: ''
    };
    this.submitEdit = this.submitEdit.bind(this);
    this.openEditor = this.openEditor.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
  }
  handleUpdateComment(e) {
    this.setState({newComment: e.target.value});
  }
  openEditor(e) {
    this.setState({isEditing: true});
  }
  submitEdit(e) {
    fetch('/api/comments', {
      method: 'UPDATE',
      body: this.state.newComment
    })
      .then(() => console.log('UPDATE SENT'))
      .catch(err => console.log('Error updating comment'));
  }

  render() {
      const CommentBody = this.state.isEditing 
        ? (<input
            type="text"
            onChange={this.handleUpdateComment}
            value={props.comment.message}
          />)
        : (<p
            className="commentMessage">
            {props.comment.message}
          </p>);

      const CommentTool = props.currentUserId === props.comment.sender_id 
        ? <CommentTool isEditing={this.state.isEditing} /> 
        : null; 

    return (
      <div className="commentItem">
        <div className="commentSubmitter">By {props.comment.sender.fullName} on {props.comment.createdAt.slice(0,10)}</div>
        {CommentBody}
        {CommentTool}
      </div>
    );  
  }  
};

export default CommentItem;
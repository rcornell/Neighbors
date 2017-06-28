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
    this.deleteComment = this.deleteComment.bind(this);
    this.handleUpdateComment = this.handleUpdateComment.bind(this);
  }
  handleUpdateComment(e) {
    this.setState({newComment: e.target.value});
  }
  openEditor(e) {
    this.setState({isEditing: !this.state.isEditing});
  }
  submitEdit(e) {
    fetch('/api/comments', {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        commentId: this.props.comment.id,
        message:this.state.newComment
      })
    })
      .then(() => {
        console.log('UPDATE SENT');
        this.props.getComments();
      })
      .catch(err => console.log('Error updating comment:', err));
  }
  deleteComment(e) {
    const data = {
      commentId: this.props.comment.id
    }
    fetch('/api/comments', {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(data)
    })
      .then(() => {
        console.log('DELETE SENT');
        this.props.getComments();
      })
      .catch(err => console.log('Error deleting comment'));
  }

  render() {
      const CommentBody = this.state.isEditing 
        ? <input
            type="text"
            onChange={this.handleUpdateComment}
            placeholder={this.props.comment.message}
          />
        : <p
            className="commentMessage">
            {this.props.comment.message}
          </p>;

      const Tool = this.props.currentUserId === this.props.comment.sender_id 
        ? <CommentTool 
            openEditor={this.openEditor}
            isEditing={this.state.isEditing}
            deleteComment={this.deleteComment}
            submitEdit={this.submitEdit}
          /> 
        : null; 

    return (
      <div className="commentItem">
        <div 
          className="commentSubmitter">
          By {this.props.comment.sender.fullName} on {this.props.comment.createdAt.slice(0,10)}
        </div>
        {CommentBody}
        {Tool}
      </div>
    );  
  }  
};

export default CommentItem;
/* eslint react/prop-types: 0 */

// Parent compoenent that wraps the profile.
// Checks if the user is looking at their own profile, or someone else's,
// and renders private or public profile accordingly.

const PublicProfile = require('./Profile/PublicProfile/PublicProfile.jsx');
const PrivateProfile = require('./Profile/Profile.jsx');
const React = require('react');
import axios from 'axios';

class ProfileChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], currentComment: '' };
    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }
  getComments() {
    console.log('Entering getComments');
    const profileId = +this.props.params.match.params.id;
    console.log('Getting comments for profile: ', profileId);

    axios.get(`/api/comments?id=${profileId}`)
      .then((results) => {
        console.log('Received getComments results: ', results.data);
        // results.data.reverse();
        this.setState({ 
          comments: results.data
        });
        setTimeout(function() {
          console.log('Comments are now: ', this.state.comments);
        }.bind(this), 1000);
      })
  }
  handleCommentSubmit(e) {
    e.preventDefault();
    this.setState({ currentComment: '' });
    const messageData = {
      submitterId: this.props.id,
      targetId: this.props.params.match.params.id,
      message: this.state.currentComment
    };
    console.log('Sending data: ', messageData);

    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
      body: JSON.stringify(messageData),
    })
    .then(() => this.getComments()); 
  }
  updateComment(e) {
    console.log(`Updating comment to ${e.target.value} with props ${this.props}`);
    this.setState({ currentComment: e.target.value });
  }
  render() {
    if (this.props.id === Number(this.props.params.match.params.id)) {
      console.log('In PrivateProfile return, this.props is: ', this.props);
      return (
        <PrivateProfile
          currentComment={this.currentComment} 
          handleCommentSubmit={this.handleCommentSubmit}
          updateComment={this.updateComment}
          getComments={this.getComments}
          comments={this.state.comments}
          id={this.props.id}
          currentUserId={this.props.id}
        />
      );
    }
    console.log('In PublicProfile return, this.props is: ', this.props);
    return (
      <PublicProfile
        currentComment={this.currentComment} 
        handleCommentSubmit={this.handleCommentSubmit}
        updateComment={this.updateComment}
        getComments={this.getComments}
        comments={this.state.comments}
        id={this.props.params.match.params.id}
        currentUserId={this.props.id}
      />
    );
  }
}

module.exports = ProfileChecker;

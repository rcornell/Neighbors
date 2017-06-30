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
    this.state = { 
      comments: [],
      currentComment: '' // added empty comments array
    };
    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.updateComment = this.updateComment.bind(this);
  }
  getComments() {
    console.log('Entering getComments');
    const profileId = +this.props.params.match.params.id;
    console.log('Getting comments for profile: ', profileId);
    // fetch(`/api/comments?id=${profileId}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-type': 'application/json',
    //   },
    //   credentials: 'same-origin',
    // })
    //   .then((results) => results.json())
    //   .then((results) => {
    //     console.log('Received getComments results: ', results);
    //     results.reverse();
    //     this.setState({ 
    //       comments: results
    //     });
    //   })
    axios.get(`/api/comments?id=${profileId}`)
      .then((results) => {
        let comments = results.data;
        this.setState({ 
          comments
        });
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
    .then(() => this.getComments(this.props.params.match.params.id)); 
  }
  updateComment(e) {
    this.setState({ currentComment: e.target.value });
  }
  render() {
    if (this.props.id === Number(this.props.params.match.params.id)) {
      console.log('In PrivateProfile return, this.props is: ', this.props);
      return (
        <PrivateProfile
          currentComment={this.state.currentComment}
          handleCommentSubmit={this.handleCommentSubmit}
          getComments={this.getComments}
          comments={this.state.comments}
          id={this.props.id}
        />
      );
    }
    console.log('In PublicProfile return, this.props is: ', this.props);
    return (
      <PublicProfile
        updateComment={this.updateComment}
        currentComment={this.state.currentComment}
        handleCommentSubmit={this.handleCommentSubmit}
        getComments={this.getComments}
        comments={this.state.comments}
        id={this.props.params.match.params.id}
        currentUserId={this.props.id}
      />
    );
  }
}

module.exports = ProfileChecker;

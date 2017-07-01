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
      currentComment: '',
      numberOfScrolls: 0
    };
    this.getComments = this.getComments.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  handleScroll(e) {
    // console.log(arguments);
    var node = document.querySelector('.comments');
    if (node.scrollTop + node.clientHeight === node.scrollHeight) {
      console.log('Scrolled to bottom');
      this.setState({numberOfScrolls: this.state.numberOfScrolls + 3});
      this.getMoreComments();
    }
    // console.log('scrollHeight: ', node.scrollHeight);
    // console.log('scrollTop: ', node.scrollTop);
    // console.log('scrolled to: ', node.scrollTop + node.clientHeight);
  }
  getMoreComments() {
    // console.log('Entering getComments');
    const profileId = +this.props.params.match.params.id;
    // console.log('Getting comments for profile: ', profileId);

    axios.get(`/api/comments?id=${profileId}`)
      .then((results) => {
        // const commentsToAdd = results.data.slice(this.state.numberOfScrolls,this.state.numberOfScrolls + 3);
        // this.setState({ 
        //   comments: this.state.comments.concat(commentsToAdd)
        // });
        this.setState({
          comments: results.data.slice(0, this.state.numberOfScrolls + 3)
        });
      })
        // setTimeout(function() {
        //   console.log('Comments are now: ', this.state.comments);
        // }.bind(this), 1000);
  }

  getComments() {
    // console.log('Entering getComments');
    const profileId = +this.props.params.match.params.id;
    // console.log('Getting comments for profile: ', profileId);

    axios.get(`/api/comments?id=${profileId}`)
      .then((results) => {
        // console.log('Received getComments results: ', results.data);
        // results.data.reverse();
        this.setState({ 
          comments: results.data.slice(0,5)
        });
        // setTimeout(function() {
        //   console.log('Comments are now: ', this.state.comments);
        // }.bind(this), 1000);
      })
  }
  handleCommentSubmit(e, evt, borrowerId) {


    // for (var i = 0; i < arguments.length; i+=1) {
    //   console.log('ARGUMENTS: ', arguments[i]);
    // }
    
    console.log('submitterId is: ', this.props.id);
    console.log('borrowerId is: ', borrowerId);
    const targetId = borrowerId ? borrowerId : +this.props.params.match.params.id;
    console.log('targetId is: ', targetId);


    e.preventDefault();
    this.setState({ currentComment: '' });
    const messageData = {
      submitterId: this.props.id,
      targetId: targetId,
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
          handleScroll={this.handleScroll}
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
        handleScroll={this.handleScroll}
        currentComment={this.currentComment} 
        handleCommentSubmit={this.handleCommentSubmit}
        updateComment={this.updateComment}
        getComments={this.getComments}
        comments={this.state.comments}
        id={this.props.params.match.params.id}
        currentUserId={this.props.id}
        self={this.props.id} 
        allProps={this.props}
      />
    );
  }
}

module.exports = ProfileChecker;

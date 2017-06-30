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
    this.state = { comments: [] };
    this.getComments = this.getComments.bind(this);
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
        console.log('Comments is an array: ', Array.isArray(comments));

        console.log('Comments array was: ', JSON.stringify(comments));
        // comments.reverse();
        // console.log('Comments array is:', JSON.stringify(comments));

        this.setState({ 
          comments
        });
      })
  }
  render() {
    if (this.props.id === Number(this.props.params.match.params.id)) {
      console.log('In PrivateProfile return, this.props is: ', this.props);
      return (
        <PrivateProfile
          getComments={this.getComments}
          comments={this.state.comments}
          id={this.props.id}
        />
      );
    }
    console.log('In PublicProfile return, this.props is: ', this.props);
    return (
      <PublicProfile
        getComments={this.getComments}
        comments={this.state.comments}
        id={this.props.params.match.params.id}
        currentUserId={this.props.id}
      />
    );
  }
}

module.exports = ProfileChecker;

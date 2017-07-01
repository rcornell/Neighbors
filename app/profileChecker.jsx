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

/* eslint react/prop-types: 0 */

// Parent compoenent that wraps the profile.
// Checks if the user is looking at their own profile, or someone else's,
// and renders private or public profile accordingly.

const PublicProfile = require('./Profile/PublicProfile/PublicProfile.jsx');
const PrivateProfile = require('./Profile/Profile.jsx');
const React = require('react');

class ProfileChecker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
    this.getComments = this.getComments.bind(this);
  }
  getComments(id) {
    console.log('In getComments, id is: ', id);
    fetch(`/api/comments?id=${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((results) => results.json())
      .then((results) => {
        console.log('Received getComments results: ', results);
        results.reverse();
        this.setState({ 
          comments: results
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

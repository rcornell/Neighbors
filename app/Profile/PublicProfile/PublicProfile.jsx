/*  global fetch:false  */
/* eslint react/prop-types: 0 */
// User Profile Page

const React = require('react');
const PublicProfileBio = require('./publicProfileBio.jsx');
const PublicProfileItemList = require('./publicProfileItemList.jsx');
import CommentForm from './publicCommentForm.jsx';
import Comments from './publicComments.jsx';


class PublicProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      fbId: null,
      fbToken: null,
      image: null,
      name: null,
      email: null,
      password: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      bio: null,
      rating: null,
      ratingCount: null,
      createdAt: null,
      updatedAt: null
    };
    
    
    console.log('In PublicProfile, this.props.comments is: ', this.props.comments);
  }
  componentWillMount() {
    this.populateProfile(this.props.id);
    this.props.getComments(this.props.id);
  }
  // Populate profile populates the profile page by querying the User table by Id.
  // It is passed down to both borrowedItemEntry and UserItemEntry as a click handler.
  populateProfile(profileRoute) {
    fetch(`/api/profile/${profileRoute}`, { credentials: 'same-origin' })
      .then(profile => profile.json())
      .then(json => this.setState(json));
  }
  
  
  render() {
    return (
      <div className="container">
        <div className="col-lg-5 sub-component">
          <img
            className="img-responsive"
            src={this.state.image}
            alt=""
          />
          <section className="spacer" />
          <PublicProfileBio
            fullName={this.state.fullName}
            email={this.state.email}
            bio={this.state.bio}
            rating={this.state.rating}
            city={this.state.city}
            state={this.state.state}
            zip={this.state.zip}
          />
          <div>
          <div>
            <Comments
              getComments={this.props.getComments}
              currentUserId={this.props.currentUserId}
              comments={this.props.comments}
            />
          </div>
          <div>
            <CommentForm
              currentComment={this.props.currentComment} 
              handleCommentSubmit={this.props.handleCommentSubmit}
              updateComment={this.props.updateComment}
            />
          </div>
        </div>
        </div>
        <div className="col-lg-7">
          {this.state.id &&
            <PublicProfileItemList
              populateProfile={this.populateProfile.bind(this)}
              userId={this.state.id}
            />
          }
        </div>
      </div>
    );
  }
}

module.exports = PublicProfile;

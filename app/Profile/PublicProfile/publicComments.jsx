import React from 'react';
import CommentItem from './publicCommentItem.jsx';

let count = 0;
class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAll: false
    }
    this.toggleAll = this.toggleAll.bind(this);
  }

  toggleAll() {
    this.setState({showAll: !this.state.showAll});
  }

  render() {
    if (!this.props.comments || !this.props.comments.length) {
      return <div>Nobody has commented on this profile yet!</div>
    }

    // let showText = this.state.showAll ? 'Read less' : 'Read more';
    // let showButton = 
    //   <p 
    //     className="toggleAllComments"
    //     onClick={this.toggleAll}>{showText}
    //   </p>;
    // const commentsToShow = this.state.showAll ? this.props.comments : this.props.comments.slice(0,3);
    const commentsToShow = this.props.comments;
    return (
      <div className="comments"> 
        {
          commentsToShow.map((comment) =>
            <CommentItem
              getComments={this.props.getComments}
              currentUserId={this.props.currentUserId}
              key={count++}
              comment={comment}
            />
          )
        }
      </div>
    );
  }
}

// const Comments = props => {
//   if (!props.comments || props.comments.length === 0) {
//     return <div>Nobody has commented on this profile yet!</div>
//   }
//   console.log('Rendering comments: ', props.comments);   
//   return (
//     <div className="comments"> 
//       {
//         props.comments.map((comment) =>
//           <CommentItem
//             key={count++}
//             comment={comment}
//           />
//         )
//       }
//     </div>
//   )
// };

export default Comments;
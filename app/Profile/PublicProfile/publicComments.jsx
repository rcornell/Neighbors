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
    this.handleScroll = this.handleScroll.bind(this);
  }

  toggleAll() {
    this.setState({showAll: !this.state.showAll});
  }
  handleScroll(e) {
    // console.log(arguments);
    var node = document.querySelector('.comments');
    console.log('scrollHeight: ', node.scrollHeight);
    console.log('scrollTop: ', node.scrollTop);
    console.log('scrolled to: ', node.scrollTop + node.clientHeight);
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
    // console.log('Rendering comments: ', this.props.comments);
    // const commentsToShow = this.state.showAll ? this.props.comments : this.props.comments.slice(0,3);
    const commentsToShow = this.props.comments;
    return (
      <div
        name="commentsDiv"
        className="comments"
        onScroll={this.handleScroll}> 
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
//{showButton}


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
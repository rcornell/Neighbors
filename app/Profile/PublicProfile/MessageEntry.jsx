import React from 'react';

const MessageEntry = (props) => {
  var classes = props.self === props.eachMessage.user_id ? 'currentUser pull-right col-xs-8' : 'notCurrentUser pull-left col-xs-8';

  return(
    <div>
      <p className={classes}>{props.eachMessage.message}</p>
    </div>
  )
}

module.exports = MessageEntry;

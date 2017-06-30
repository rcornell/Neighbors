import React from 'react';
import io from 'socket.io-client';

class Messages extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    const socket = io.connect();

    // socket.on('connect', function(){ ////////ALSO took this away becuase with this, this.props is undefined 
      console.log('+++socket is on')
      console.log('+++this.props in socket.on: ', this.props)
      socket.emit('findRoom', {self: this.props.self, friend: this.props.friend})
      // socket.emit('findRoom', function() {
      //   var data = {self: this.props.self, friend: this.props.friend} 
      //   console.log('+++Messages.jsx data: ', data)
      //   return data
      // }
        
        // (data) => {
        //   this.setState({
        //     messages: data
        //   })
        //   console.log('this.state.messages: ', this.state.messages)
        // }
      // )

      socket.on('server:messages', 
        (messages) => {
          this.setState({
            messages: messages
          })
        }
      )
    // })
  }

  render(){
    // console.log('this.state.messages: ', this.state.messages)
    console.log('+++this.props in render(): ', this.props)
    return (
      <div>
        <p>sockets page: CHAT HERE</p>   
      </div>
    )
  }
}

module.exports = Messages;
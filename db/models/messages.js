const Sequelize = require('sequelize')
const db = require('./db');
const Room = require('./room.js');
const User = require('./users.js');

const Message = db.define('Message', {
  message: Sequelize.STRING
});

Message.belongsTo(Room, {
  as: 'room',
  foreignKey: 'room_id',
  constraints: false
})

Message.belongsTo(User, {
  as: 'user',
  foreignKey: 'user_id',
  constraints: false
})

Room.hasMany(Message, {foreignKey: 'room_id', constraints: false});
User.hasMany(Message, {foreignKey: 'user_id', constraints: false});

Message.sync();
// Message.sync( {force:true });

module.exports = Message;
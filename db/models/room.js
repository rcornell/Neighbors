const Sequelize = require('sequelize');
const db = require('./db.js');
const User = require('./users');

const Room = db.define('Room', {
  roomId: Sequelize.STRING
})

Room.belongsTo(User, {
  as: 'self',
  foreignKey: 'self_id',
  constraints: false
})

Room.belongsTo(User, {
  as: 'friend',
  foreignKey: 'friend_id',
  constraints: false
})

User.hasMany(Room, { foreignKey: 'self_id', constraints: false });
User.hasMany(Room, { foreignKey: 'friend_id', constraints: false });

Room.sync();
// Room.sync({ force:true });

console.log("started Room.js");

module.exports = Room;
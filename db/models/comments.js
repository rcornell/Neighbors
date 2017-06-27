const Sequelize = require('sequelize');
const db = require('./db');
const User = require('./users');

const Comment = db.define('Comment', {
  text: {
    type: Sequelize.STRING,
  },
  submitter: {
    type: Sequelize.INTEGER,
  },
  target: {
    type: Sequelize.INTEGER,
  },
});

Comment.belongsTo(User, {
  as: 'submitter',
  foreignKey: 'submitter_id',
  constraints: false,
});

Comment.belongsTo(User, {
  as: 'target',
  foreignKey: 'target_id',
  constraints: false
});

User.hasMany(Comment, { foreignKey: 'submitter_id', constraints: false });
User.hasMany(Comment, { foreignKey: 'target_id', constraints: false });

module.exports = Comment;

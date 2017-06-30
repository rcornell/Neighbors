const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const controller = require('./server/controller.js');
const db = require('./db/models/db.js');
const Session = require('./db/models/session.js');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const socket = require('socket.io')
const Room = require('./db/models/room.js');
const Message = require('./db/models/messages.js');

const extendDefaultFields = (defaults, session) => ({ // config for holding session in db
  userId: session.userId,
});
const port = process.env.PORT || 8080;
const app = express();
module.exports = app;

require('./server/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'MrButtonPHDnotMDmaybeDRnotSure',
  store: new SequelizeStore({
    db,
    extendDefaultFields,
    table: 'Session',
  }),
  saveUninitialized: false,
  resave: true,
  proxy: undefined,
  secure: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(controller.publicRoutes, express.static(path.join(__dirname, '/public')));
require('./server/routes.js')(app, passport);

var server = app.listen(port);

// code for socket.io
const io = socket(server);

// Room.findOrCreate({
//   where: {
//     $or: [
//       {
//         self_id: {$eq: 1}
//       },
//       {
//         self_id: {$eq: 3}
//       }
//     ],
//     $or: [
//       {
//         friend_id: {$eq: 1}
//       },
//       {
//         friend_id: {$eq: 3}
//       }
//     ]
//   },
//   defaults: {
//     roomId: 123,
//     self_id: 1,
//     friend_id: 3  
//   } 
// }).then(room => console.log('+++WHAT I AM TESTING FOR: ', room[0]))

// Room.findOrCreate({
//   where: {
//     $or: [
//       {
//         self_id: {$eq: 1}
//       },
//       {
//         self_id: {$eq: 3}
//       }
//     ],
//     $or: [
//       {
//         friend_id: {$eq: 1}
//       },
//       {
//         friend_id: {$eq: 3}
//       }
//     ]
//   },
//   defaults: {
//     roomId: 123,
//     self_id: 1,
//     friend_id: 3  
//   } 
// }).then(room => room[0].get({
//     plain: true
//   })).then(roomObject => console.log('+++!!!!!!!THIS WORKS+++++WHAT I AM TESTING FOR: ', roomObject.roomId))

// // THE BELOW WORKS
// Room.find({
//   where: {roomId: 1}
// }).then(room => console.log('+++room: ', room))

// Room.find({
//   where: {roomId: 1}
// }).then(room => room.get({
//   plain: true
// })).then(roomObject => console.log('+++roomObject.roomId: ', roomObject.roomId))

// then((room) => room.get({ plain:true }))
// .then(roomObject => {
//   socket.join(roomObject.roomId);
//   console.log('roomObject.roomId: ', roomObject.roomId);
// })

// Message.find({
//   where: {room_id: 1}
// }).then(message => message.get({
//   plain: true
// })).then(message => console.log('individual msg room_id: ', message.room_id))

// Room.findAll().then(room => console.log('room: ', room));
// Message.findAll().then(message => console.log('message: ', message.dataValues));

// Room.findAll().then(room => {
//   console.log(room.get({
//     plain: true
//   }))
// })

// Room.findAll(
//   {attributes: ['roomId']}
// ).then(room => console.log(room.get({plain: true})));

////////////////////////////////////////////////////////////
// io.on('connection', function(socket){   
//   // console.log('made socket connection', socket.id);

//   socket.on('findRoom', (data) => {controller.findRoom(data)})
//     .then((roomObject) => {controller.getMessages(roomObject)})
//     .then((messages) => socket.emit('server:message', 
//       {messages}
//     ))
// )

io.on('connection', function(socket) {
  socket.on('findRoom', (data) => {
    controller.findRoom(data)
    .then((roomObject) => controller.getMessages(roomObject))
    .then(messages => io.emit('server:message', messages))
  })
})

console.log(`Neighborly running on: ${port}`);




// socket.on('findRoom', (data, cb) => {
//     console.log('+++CHECK TO SEE IF CB is THERE')
//     console.log('+++DATA: ', data)
//     app.post('/api/findRoom', controller.findRoom,(roomObject) => {
//       socket.join(roomObject.roomId);
//     })
//     // app.get
//     cb(['hi'])
//     }
//   )
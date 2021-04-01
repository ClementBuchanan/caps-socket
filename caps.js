'use strict';

require('dotenv').config();

const port = process.env.PORT || 3000;

//this starts a server on a generic name space 
const io = require('socket.io')(port);
const caps = io.of('/caps');

io.on('connection', (socket) => {
  console.log('connected?', socket.id);
})


// console.log(caps); 
// const drive = io.of('/driver');

// io.on('connection', 'connected!!');


caps.on('connection', (socket) => {
  // step2
  socket.on('pickup', (payload) => {
    socket.broadcast.emit('pickup', payload);
    console.log('heard pickup')
  })
  //Step 4
  socket.on('in-transit', (payload) => {
    socket.emit('in-transit', payload);
    console.log('heard in-transit')
  })
  // Step 6
  socket.on('delivered', (payload) => {
    socket.broadcast.emit('delivered', payload);
    console.log('heard delivered')
  })
  console.log('connected to', socket.id)

})

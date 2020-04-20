const express = require('express')
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// if(process.env.NODE_ENV !== 'production') require('dotenv').config({ path: __dirname + '/.env' });


// const app = express();
// const io = require('socket.io')(3000)
// middleware
app.use(bodyParser.json());
app.use(cors());

const room = require('./routes/room');
app.use('/api/room', room)
app.use('/api/chat', room)

// const chat = require('./routes/chat');

// console.log(process.env.NODE_ENV);

//handle production
// if(process.env.NODE_ENV === 'production'){
//   //static folder to public
//   console.log('in here')
//   app.use(express.static(__dirname + '/public'));
//   //handle single page app
//   app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
// }


const port = process.env.PORT || 8000;

// console.log(process.env.PORT)
// const Port = (process.env.PORT).toString()
// console.log("the port is " + Port)





// const io = require('socket.io')(3000);

io.on('connection', socket => {
  console.log('user connected');
  socket.on('newMessage', (data) => {
    socket.broadcast.emit('newMessageBroadcast', data);
  });
  socket.on('newRoomCreated', () => {
    socket.broadcast.emit('updateRoom');
  });
  socket.on('typing', (data) => {
    // console.log(data)
    socket.broadcast.emit('someonesTyping',data);
  });
  socket.on('hey', () => {
    console.log('its good back here')
    io.emit('rightbackatya')
  });
});

http.listen(port, () => {
  console.log(`server started at ${port}`)
});
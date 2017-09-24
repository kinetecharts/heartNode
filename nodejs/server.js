var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

let startUDP = require('./qrs_client')

var boxes = [];

var clients = [];

server.listen(process.env.PORT || 5000);

app.use(express.static('public'));
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/public/index.html');
// });
//

app.get('/jiggle/:amount', function(req, res) {
  var amount = req.params.amount;
  io.sockets.emit('jiggle', { jiggle: amount });
  res.send('new jiggle amount: ' + amount);
});

io.on('connection', function (socket) {
  console.log('a client connected')
  clients.push(socket)
  // socket.emit('all-boxes', boxes);
  // socket.on('color-box', function (data) {
  //   console.log(data);
  //   boxes.push(data)
  //   socket.broadcast.emit('color-box', data);
  // });
  socket.on('disconnect', ()=>{
    console.log('a client disconnected')
    let idx = clients.indexOf(socket)
    if(idx > -1){
      clients.splice(idx, 1)
      console.log('client removed')
    }
  })
});

let forward = function(msg){
  clients.forEach(c=>c.emit('heart', msg))
}

startUDP(forward)

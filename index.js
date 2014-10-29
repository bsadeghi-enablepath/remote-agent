var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');  
  //res.send('<h1>Hello world</h1>');
});

app.get('/pop', function(req,res) {
  res.send('Console Pop Sent!');
  io.emit('pop', req.query.name);
});

app.get('/pop/:object/:id', function(req,res) {
  res.send('Request Sent to Salesforce to open ' + req.params.object + ' ID: ' + req.params.id);
  io.emit('openRecord',req.params.id);
});

io.on('connection', function(socket){
  console.log('incoming connection');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

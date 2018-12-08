var express = require('express');
const app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server);
const port = process.env.PORT || 3000;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const {Users} = require('./chat.js');

var users = new Users();
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/skychat', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  
  
  
  mongoose.connect('mongodb://localhost:27017/skychat');
  
  

  
  var Message = mongoose.model('Message',{ 
				  name : String, 
				  message : String
			})
  
  // app.get('/messages', (req, res) => {
  // Message.remove({},(err, messages)=> {
	  
	  // console.log('removed');
    
  // })
// })

	
 
  app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})

io.on('connection', (socket) => { 



app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  //message.save((err) =>{
    if(err)
     sendStatus(500);
 
	 var user = users.getUser(socket.id); 
	 
	 io.to(socket.id).emit('message', req.body);
	 console.log(socket.id);
	 
	 res.sendStatus(200);
  //})
})


  



console.log('a user is connected');



});



 server.listen(port, () => {
 console.log(`server is running on port ${port}`);
});

});
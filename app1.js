var express = require('express');
const app = express();
 var bodyParser = require('body-parser');
const http = require('http');
const server = http.createServer(app);
const socketIO = require('socket.io');
var io = socketIO(server);  
const port = process.env.PORT || 3001;
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
const socketioAuth = require("socketio-auth");

// Send current time to all connected clients
function sendTime() {
    io.emit('time', { time: new Date().toJSON() });
}



// Emit welcome message on connection
io.on('connection', function(socket) {
    // Use socket to communicate with this particular client only, sending it it's own id
	
	
    socket.emit('welcome', { message: 'Welcome!', id: socket.id });
	
	io.to(socket.id).emit('message');
	
	socketioAuth(io, {
	authenticate: function (socket, data, callback) {
		
    //get credentials sent by the client
	

    var username1 = data.username;
    var password1 = data.password;
	
	console.log(username1);
	console.log(password1);
 
	}
	  
    });
  
});
	
	
     // socket.on('i am client', function() {
      // console.log('received a message from the client.');
    // });



 server.listen(port, () => {
 console.log(`server is running on port ${port}`);
});


//////////////
// Author: fan00063@algonquinlive.com
// Co.: Algonquin College
// Date:

//1)      Include the Express,
//          the Socket.io,
//          and the HTTP packages using require();  [4pt]

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = 8880;

var connections = 0;


//2)      Set up your express application’s title,
//          and have it route the index.html from the Assets folder to the sites root url. [3pt]

//Give the App a title
app.locals.title = 'Simple Express Site';


// Allow users to have access to the files stored in the Assets folder on our server
app.use(express.static(__dirname + '/Assets'));




// Function called when a get request comes in at site root, so send the index.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/Assets/index.html');
});

//3)      Next, add the http.listen(‘8888’, function(){});
//          at the end of your code to start listening on the chosen port
//              when your application starts.
//          In this function you should give your process a title,
//          and output some initial message to the console indicating that it has started. [3pt]
http.listen(port, function(){
    process.title = 'MAD9023-SIMPLE EXPRESS SITE SERVER';
    process.stdout.write('\033c');
    console.log('--SIMPLE EXPRESS SITE SERVER--');
    console.log('listening on port: ' + port);
});

//4)      Now make an empty io.on(‘connection’) function
//          that you will add the code for steps 5-8 into. [1pt]


//5)      Inside your ‘connection’ function you will create socket.on() functions
//          for each message the client will emit to the server,
//          AND for the built-in socket.on(‘disconnect’, function(){});
//          message when users disconnect.
//           The code inside these function will be outlined in steps 6, 7 and 8. [3pt]
// 6)      When the server detects a new user has logged in correctly emit a welcome message
//      to all connected users,
//      AND write a message to the console indicating a new connection was made. [3pt]

//7)      When a client sends your server a new message
//      you will simply emit their message with their user name to all connected clients. [1pt]

//8)      When a client disconnects from the server
//          you will need to emit a message to the rest of the connected clients
//          that a user has disconnected,
//      AND write a message to the console indicating that a user has disconnected. [2pt]

io.on('connection', function(socket){

    // Increment number of connections
    connections ++;

    // Function that is called when a 'login' message is received
    socket.on('login', function(data){
        // We can access the Javascript variables directly if the message is an object



            // Calculate, and display new user id and ammount of users connected.
            console.log(data.name+" Logged IN (count: " + connections + ")");

            //
            io.emit('broadcast message', { msg: "Let's welcome "+data.name+'!!!' });


    });



    // sent to all connected clients when a user sends messages
    socket.on('new message', function(data){

        // Calculate, and display new user id and ammount of users connected.
        console.log(data.name+" Logged IN (count: " + connections + ")");

        var newMsg=data.userName+": "+data.text+".";
        console.log(newMsg);

        io.emit('broadcast message', { msg: newMsg });



    });





    // Function called if a 'disconnect' message is received from user
    socket.on('disconnect', function(){
        // sent to all connected clients when user disconnects
        io.emit('broadcast message', { msg: 'a usr logout' });

        // Reduce the number of connections and emit
        connections --;
        console.log("User Logged OUT (count: " + connections + ")");

    });
});







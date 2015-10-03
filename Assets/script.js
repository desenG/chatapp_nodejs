//////////////
// Author: lenczes@algonquincollege.com
// Co.: Algonquin College
// Date: 21/11/2014

// Make a temporary object that will be used as our fake login data object
var userObject = {};
var messageObject={};

// A variable to hold our socket.io connection
var socket;


var app = {
    init: function(){
        // The following line connects the user to the server.
        // The connecting client auto-detects the port from the url.
        socket = io();
        document.querySelector("#btnLogin").addEventListener("click", app.login);
        document.querySelector("#btnSendMessage").addEventListener("click", app.sendMessage);
        // The 'socket.on' is triggered when the client recieves a message
        // from the server, in this case the first parameter 'chat message',
        // indicating that we have an incoming text message recieved by the server.
        // The second parameter that the 'socket.on' function takes is a function
        // that is run when the message is recieved so it can be processed
        socket.on('broadcast message', function(msg){

            // In this case the msg variable contains the text message being sent.
            // So we will add this as a new list item in out message list
            document.querySelector("#messages").innerHTML += "<li>" + msg.msg + "</li>";
            // This command will automatically scroll the messages to the bottom
            document.querySelector("#msgDiv").scrollTop = document.querySelector("#msgDiv").scrollHeight;
        });
    },
    login: function(ev){
        document.querySelector("[data-role=modal]").style.display="none";
        document.querySelector("[data-role=overlay]").style.display="none";
        userObject.name=document.querySelector("#txtName").value;
        document.querySelector("#name").value=userObject.name;

        // After connecting we send a custom login message to the server.
        // The 'chat login' is the type of message we are sending. It is
        // a made up name I chose for this example, and could be anything.
        // The "" is a value we can send along, like user name
        socket.emit('login', userObject);


    },
    sendMessage:function(ev){

        // Get the form data for the name and msg text field.
        var name = userObject.name
        var msg = document.querySelector("#msg").value;

        // Do client side validation to make sure neither are empty
        if( name != ""  &&  name != null && msg != ""  &&  msg != null )
        {
            // Make a temporary object to hold the users message data
            var messageObject = {
                userName: name,
                text: msg
            }

            // Send the message object as the message for the 'chat message'.
            socket.emit('new message', messageObject);
            // Clear the msg form field after sending the message.
            document.querySelector("#msg").value = "";
        }
        else
        {
            // Else one of the fields is empty.
            alert("Enter a text for your message");
        }
    }

}

document.addEventListener("DOMContentLoaded", app.init);

document.addEventListener("beforeunload",function(event) {
    socket.close();
});


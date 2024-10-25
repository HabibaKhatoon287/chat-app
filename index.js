//SERVER SIDE
//by programming exprience
const http = require("http");
const express = require("express");
const path = require("path");
const{ Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve("./public")));

app.get("/",(req, res) => {
    return res.sendFile("/public/index.html");
})

//var users = 0;
var roomno = 1;
var full = 0;

io.on("connection" , (socket) => {
    console.log("A new user has connected", socket.id);
    socket.join("room-"+roomno);
    io.sockets.in("room-"+roomno).emit('connectedRoom',"you are connected to room no." +roomno);
    full++;
    if(full >= 2){
        full=0;
        roomno++;
    }
    // users++;
    // //io.sockets.emit('broadcast',{message:users+'users connected'});
    // socket.emit('newuserconnected',{message:' hii ,welcome dear'});
    // socket.broadcast.emit('newuserconnected',{message:users+'users connected'});

    socket.on("disconnect" , () => {
       console.log('A user disconnected');
      // users--;
    //io.sockets.emit('broadcast',{message:users+'users connected'});
    //socket.broadcast.emit('newuserconnected',{message:users+'users connected'});

    });
});


server.listen(9000, ()=>{
    console.log(`Server started at port : 9000`)
})
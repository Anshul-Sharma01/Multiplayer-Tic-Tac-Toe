const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors : "http://localhost:5173"
});

const allUsers = [];




io.on("connection", (socket) => {
    // console.log("New User Joined " + socket.id);
    allUsers.push({
        socket,
        online : true
    });
    socket.on("request_to_play", (data) => {
        console.log(data);
    })
    socket.on("disconnect", function(){
        for(let i = 0; i < allUsers.length; i++){
            const user = allUsers[i];
            if(user.id == socket.id){
                user.online = false;
            }
        }
    })

});







httpServer.listen(3000);

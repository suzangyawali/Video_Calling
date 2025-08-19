import { Server } from "socket.io"


let connections = {}// Users connected per "room" or "call"
let messages = {}//Chat history per room
let timeOnline = {}// Track how long each user has been connected

export const connectToSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            allowedHeaders: ["*"],
            credentials: true
        }
    });


    io.on("connection", (socket) => {

        console.log("SOMETHING CONNECTED")

         
        //The socket.on("join-call") function adds a user to a specific room, notifies all participants of the new user, tracks their join time, and sends the room's chat history to them.
        socket.on("join-call", (path) => {

            if (connections[path] === undefined) {
                connections[path] = []
            }
             connections[path].push(socket.id)
             timeOnline[socket.id] = new Date();//records the current time when a user join
              //socket.id:unique ID given to each connected client by Socket.IO.

            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a]).emit("user-joined", socket.id, connections[path])//Sends a "user-joined" message to every user in the room.
            }
             //When a user joins a room, they get the full chat history 
            if (messages[path] !== undefined) {
                for (let a = 0; a < messages[path].length; ++a) {
                    io.to(socket.id).emit("chat-message", messages[path][a]['data'],
                        messages[path][a]['sender'], messages[path][a]['socket-id-sender'])
                }
            }

        })

        //When one user wants to send a message to another (like for starting a video call), this code passes that message directly to the other user using their socket ID.
        socket.on("signal", (toId, message) => {
            io.to(toId).emit("signal", socket.id, message);
        })


        //This handles incoming chat messages from a user, finds the room (or call path) they belong to, saves the message, and broadcasts it to everyone else in the same room.
        socket.on("chat-message", (data, sender) => {

            const [matchingRoom, found] = Object.entries(connections)
                .reduce(([room, isFound], [roomKey, roomValue]) => {


                    if (!isFound && roomValue.includes(socket.id)) {
                        return [roomKey, true];
                    }

                    return [room, isFound];

                }, ['', false]);

            if (found === true) {
                if (messages[matchingRoom] === undefined) {
                    messages[matchingRoom] = []
                }

                messages[matchingRoom].push({ 'sender': sender, "data": data, "socket-id-sender": socket.id })
                console.log("message", matchingRoom, ":", sender, data)

                connections[matchingRoom].forEach((elem) => {
                    io.to(elem).emit("chat-message", data, sender, socket.id)
                })
            }

        })
        
      //When a user leaves or gets disconnected, this code finds the room they were in, tells everyone else that the user left, removes them from the room, and deletes the room if it's now empty.


        socket.on("disconnect", () => {

            var diffTime = Math.abs(timeOnline[socket.id] - new Date())

            var key

            for (const [k, v] of JSON.parse(JSON.stringify(Object.entries(connections)))) {

                for (let a = 0; a < v.length; ++a) {
                    if (v[a] === socket.id) {
                        key = k

                        for (let a = 0; a < connections[key].length; ++a) {
                            io.to(connections[key][a]).emit('user-left', socket.id)
                        }

                        var index = connections[key].indexOf(socket.id)

                        connections[key].splice(index, 1)


                        if (connections[key].length === 0) {
                            delete connections[key]
                        }
                    }
                }

            }


        })


    })


    return io;
}
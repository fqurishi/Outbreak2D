import 'https://cdn.jsdelivr.net/npm/socket.io-client@3.1.0/dist/socket.io.js';


function Main(){
const socket = io("https://outbreak2d.com:3000", {
    rejectUnauthorized: false,
});

socket.on('chat message', function(msg) {
});

socket.on("connect", () => {
  console.log("connecting");
  socket.emit('connection');
});
}

export{Main};
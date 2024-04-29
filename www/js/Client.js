// import 'https://cdn.jsdelivr.net/npm/socket.io-client@3.1.0/dist/socket.io.js';
// import {game} from './main.js'
// import {Port} from './StartMenu.js'
// export const CLIENT = (() => {
//   class ConnectionClient{
//     socket;
//     game;
//     constructor(){
//     const socket = io("www.outbreak2d.com", {
//         rejectUnauthorized: false,
//     });
//     this.socket = socket;
//     //this.Main = this.Main.bind(this);
//   }

//     Main(){
//     const $this = this;
//     this.socket.on('player joined', function(avatar) {
//       let character = avatar;
//       $this.ghostJoin(character);
//       $this.sendJoinDetails(game.getPlayerAvatar());
//     });

//     this.socket.on('join details', function(avatar) {
//       let character = avatar;
//       $this.ghostJoin(character);
//     });

//     this.socket.on('position for', function(avatar, x, y, d) {
//       $this.updateGhostPosition(avatar, x, y, d);
//     });

//     this.socket.on('texture for', function(avatar, b) {
//       $this.updateGhostTexture(avatar, b);
//     });

//     this.socket.on('send bullet for', function(avatar, x,y,d) {
//       $this.sendBulletDetails(avatar, x,y,d);
//     });

//     this.socket.on('send death for', function(avatar) {
//       $this.playerHasDied(avatar);
//     });

//     this.socket.on('send zombie positions for', function(zombie, x, y, d){
//       console.log("message recieved");
//       $this.updateZombies(zombie, x, y, d);
//     })

//     this.socket.on("connect", () => {
//       console.log("connecting");
//       this.socket.emit('connection');
//       $this.makeZombies(10);
//     });
//   }
//   updateZombies(zombie,x,y,d){
//     game.updateZombieValues(zombie,x,y,d);
//   }
//   updateGhostPosition(a,x,y,d){
//     game.updateGhostAvatarPosition(a,x,y,d);
//   }
//   updateGhostTexture(a,b){
//     game.updateGhostAvatarTexture(a,b);
//   }
//   sendBulletDetails(a,x,y,d){
//     game.shootOtherPlayerGun(a,x,y,d);
//   }
//   ghostJoin(a){
//     game.addGhostAvatar(a);
//   }
//   makeZombies(x){
//     game.createZombies(x);
//   }
//   playerHasDied(a){
//     game.killOtherPlayer(a);
//   }
//   sendJoinMessage(a){
//     this.socket.emit('player joined', a);
//   }
//   sendJoinDetails(a){
//     this.socket.emit('join details', a);
//   }
//   sendPosition(a,x,y,d){
//     this.socket.emit('position for', a,x,y,d);
//   }
//   sendTexture(a,b){
//     this.socket.emit('texture for', a, b);
//   }
//   sendBullet(a,x,y,d){
//     this.socket.emit('send bullet for', a,x,y,d);
//   }
//   sendDeathNote(a){
//     this.socket.emit('send death for', a);
//   }
//   sendZombieValues(z,x,y,d,s){
//     console.log("message sent");
//     this.socket.emit('send zombie positions for', z,x,y,d);
//   }
//   };
//   return {
//     ConnectionClient: ConnectionClient,
//   };

// })();

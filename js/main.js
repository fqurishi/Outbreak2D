import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { Player } from './GameObjects/Player.js';
import { Zombie } from './GameObjects/Zombie.js';
// import {ghostAvatar} from './GhostAvatar.js';
// import {CLIENT} from './Client.js';
import {volume, GameMode, Host} from './StartMenu.js';
import { PlayerController } from './Controllers/PlayerController.js';
import { ZombieController } from './Controllers/ZombieController.js';



let scene, camera, renderer;
let avatar;
//window
window.addEventListener( 'resize', onWindowResize, false ); 
const alexButton = document.getElementById('Rigo');
const jamesButton = document.getElementById('Jaece');
const cyrusButton = document.getElementById('Brayden');
const grimButton = document.getElementById('Grim');
const startButton = document.getElementById('startButton');
alexButton.addEventListener('click', selectAvatar);
jamesButton.addEventListener('click', selectAvatar);
cyrusButton.addEventListener('click', selectAvatar);
grimButton.addEventListener('click', selectAvatar);
startButton.addEventListener('click', init);
alexButton.addEventListener('ontouch', selectAvatar);
jamesButton.addEventListener('ontouch', selectAvatar);
cyrusButton.addEventListener('ontouch', selectAvatar);
grimButton.addEventListener('ontouch', selectAvatar);
startButton.addEventListener('ontouch', init);
let ghostPlayers = new Array();
let zombieObjects = new Array();
let lastRender = 0;
let p = 0;
let z = 0;
let b = 0;
let gP = 0;
//spawn points for zombies later on in game when zombies appear from off screen
let spawnPoint = [-21, 21];

//Audio
const audioLoader = new THREE.AudioLoader();
const listener = new THREE.AudioListener();
const bgm = new THREE.Audio(listener);
const s1 = new THREE.Audio(listener);
const s2 = new THREE.Audio(listener);
const s3 = new THREE.Audio(listener);
const s4 = new THREE.Audio(listener);


//misc textures initializing
const tex1 = new THREE.TextureLoader().load( './resources/OBbackground.png' );
const tex2 = new THREE.TextureLoader().load( './resources/OBbackground2.png' );
const tex3 = new THREE.TextureLoader().load( './resources/OBbackground3.png' );
const tex4 = new THREE.TextureLoader().load( './resources/OBbackground4.png' );


// bullet controllers
let bulletControllers = [];

// zombies and zombie controllers
let zombies = [];
let zombieControllers = [];

// player and controller
let player1, player1Controller;

function init() {
    const overlay = document.getElementById( 'overlay' );
    overlay.remove();

    //camera and scene init
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x0000 );
    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 800 );
    camera.position.set( 15, 0, 0 );
    camera.lookAt( scene.position );


    // Audio setup
    camera.add(listener);
    loadAndConfigureAudio(bgm, './resources/Song.mp3', true, volume);
    loadAndConfigureAudio(s1, './resources/Walking1.wav', false, volume);
    loadAndConfigureAudio(s2, './resources/Walking2.wav', false, volume);
    loadAndConfigureAudio(s3, './resources/GunShot.wav', false, volume);
    loadAndConfigureAudio(s4, './resources/Ladder.wav', false, volume);

    //render
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );


    //sprite loading
    const mBackground = new THREE.SpriteMaterial( {map: tex1} );


    const bgSprite = new THREE.Sprite(mBackground);
    bgSprite.scale.set(48,36,1);

    //load player
    player1 = new Player(avatar, scene, bulletControllers)

    //controls
    player1Controller = new PlayerController(player1, audioLoader, listener);

    // load zombies + controller
    for (let i = 0; i < 6; i++){
        let zombie = new Zombie(scene);
        let zombieController = new ZombieController(zombie)
        zombies.push(zombie);
        zombieControllers.push(zombieController)
    }


    //add to scene
    scene.add(bgSprite);
    scene.add(player1.getSprite());
    for (let zombie of zombies){
        scene.add(zombie.getSprite())
    }

const frameRate = 8; // 8 frames per second
const frameInterval = 1000 / frameRate; // Interval in milliseconds
let currentRound = 1;
let lastRoundStartTime = 0;
let roundDuration = 75 * 1000; // 1.25 minutes in milliseconds
const backgrounds = [tex1, tex2, tex3, tex4];
let currentBackgroundIndex = 0;


let lastFrameTime = 0;

const animate = function (timestamp) {
    if (!lastRoundStartTime) lastRoundStartTime = timestamp; // Initialize on first frame

    if (timestamp - lastRoundStartTime >= roundDuration) {
        // Move to the next background
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgrounds.length;
        bgSprite.material.map = backgrounds[currentBackgroundIndex];

        // If we're back at the first background, increment the round and add zombies
        if (currentBackgroundIndex === 0) {
            currentRound++;
            addZombies(5); // Assuming you have a function to add 5 zombies
        }

        lastRoundStartTime = timestamp; // Reset the start time for the next round
    }
    if (timestamp - lastFrameTime >= frameInterval) {
        player1Controller.update();
        // zombie collision
        for (let i = 0; i < zombieControllers.length; i++) {
            for (let j = i + 1; j < zombieControllers.length; j++) {
                if (checkZombieCollision(zombieControllers[i].zombie, zombieControllers[j].zombie, 1.75)) {
                    // Calculate overlap
                    let overlap = 1.75 - calculateDistance(zombieControllers[i].zombie, zombieControllers[j].zombie);

                    // Reposition zombies
                    if (areFacingEachOther(zombieControllers[i], zombieControllers[j])) {
                        zombieControllers[i].turnAround();
                        zombieControllers[j].turnAround();
                    }
                    resolveCollision(zombieControllers[i].zombie, zombieControllers[j].zombie, overlap);
                }
            }
        }
        // zombie position         
        for (let controller of zombieControllers){
            controller.updatePlayerPos(player1, player1Controller);
            controller.update();
            if(controller.checkDeath()){
                zombieControllers.splice(zombieControllers.indexOf(controller), 1);
            }
        }      
        renderer.render(scene, camera);
        lastFrameTime = timestamp;
        for (let i = 0; i < bulletControllers.length; i++) {
            const bulletController = bulletControllers[i];
            if (!bulletController.checkDeath()) {
                bulletController.update();
                // Check for collision with each zombie
                for (let j = 0; j < zombieControllers.length; j++) {
                    const zombieController = zombieControllers[j];
                    const zombie = zombieController.zombie;
                    const zombieX = zombie.getX();
                    const zombieY = zombie.getY();
                    const bulletX = bulletController.bullet.getX(); 
                    const bulletY = bulletController.bullet.getY(); 
                    const distance = Math.sqrt((zombieX - bulletX) ** 2 + (zombieY - bulletY) ** 2);
                    console.log(distance)
                    if (distance <= 3.5) {
                        // Trigger code in bulletController.js to setLife() to false
                        bulletController.bullet.setLife(false);
                        // Trigger code in zombieController.js to set its state to Hit
                        zombieController.hit()
                    }
                }
            } else {
                bulletControllers.splice(i, 1);
            }
        }
        if (!player1.getLife()){
            gameOver();
        }
    }

    updateHUD(currentRound, player1)

    requestAnimationFrame(animate);
};

animate(0); // Start the animation
}

  
// export const game = (function() {
//     return {
//         addGhostAvatar(a){
//             console.log("a player has joined your game");
//             let newPlayer = new ghostAvatar.GhostAvatar(a);
//             newPlayer.getSprite().position.set( 1, 0, 0);
//             newPlayer.getSprite().scale.set(5,4,1);
//             newPlayer.setTexture(newPlayer.tex3);
//             scene.add(newPlayer.getSprite());
//             ghostPlayers.push(newPlayer);
//         },
//         getPlayerAvatar(){
//             return avatar;
//         },
//         updateGhostAvatarPosition(a,x,y,d){
//             for (let object of ghostPlayers){
//                 if (object.getAvatar() == a){
//                     object.setX(x);
//                     object.setY(y);
//                     object.setTextureDirection(d);
//                 }
//             }
//         },
//         updateGhostAvatarTexture(a,b){
//             for(let object of ghostPlayers){
//                 if(object.getAvatar() == a){
//                     object.setTexture(object.setTextureState(b));
//                 }
//             }
//         },
//         shootOtherPlayerGun(a,x,y,d){
//             for(let object of ghostPlayers){
//                 if(object.getAvatar() == a){
//                     let bullet2 = new bullet.Bullet(x,y);
//                     bullet2.getSprite().position.setX(1);
//                     bullet2.getSprite().scale.set(0.2,0.1,1);
//                     bullet2.setTexture(tex2);
//                     bulletObjects.push(bullet2);
//                     scene.add(bullet2.getSprite());
//                     if (d == 'right'){
//                         bullet2.setRight(1);
//                     }
//                     else if (d == 'left'){
//                         bullet2.setLeft(1);
//                     }
//                     bullet2.update();
//                 }
//             }
//         },
//         createZombies(x){
//             for(let i=0;i<x;i++){
//                 zombie1 = new zombie.Zombie();
//                 //give zombies their texture
//                 zombie1.getSprite().position.setX(1);
//                 zombie1.getSprite().scale.set(5,4,1);
//                 zombie1.setName("Zombie" + i.toString());
//                 //make sure zombies dont spawn on players position
//                 if(zombie1.getX() == player1.getX() && zombie1.getY() == player1.getY()){
//                     zombie1.setX(Math.floor(Math.random() * 43)-21.5);
//                 }
//                 //put the zombies into the zombie list
//                 zombieObjects.push(zombie1);
//                 scene.add(zombie1.getSprite());
//             }
//         },
//         killOtherPlayer(a){
//             for(let object of ghostPlayers){
//                 if(object.getAvatar() == a){
//                     object.setLife(false);
//                 }
//             }
//         },
//         updateZombieValues(zombieID,x,y,d){
//             console.log("grabbing values");
//             for(let zombie of zombieObjects) {
//                 if(zombie.getName() == zombieID){
//                     zombie.setX(x);
//                     zombie.setY(y);
//                     zombie.setLeft(d);
//                 }
//             }
//         }

//     };
// })();
// selecting player's avatar
function selectAvatar() {
    const selectSreen = document.getElementById( 'CharacterSelect' );
    selectSreen.remove();
    avatar = this.id.toLowerCase();
}

// selecting audio
function loadAndConfigureAudio(audioSource, url, loop, volume) {
    audioLoader.load(url, function(buffer) {
        audioSource.setBuffer(buffer);
        audioSource.setLoop(loop);
        audioSource.setVolume(volume * 0.05);
        if (audioSource == bgm){
            audioSource.play();
        }
    });
}

function gameOver() {
    document.getElementById("gameover").style.display = "block";
    }

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function checkZombieCollision(entity1, entity2, radius) {
    const x1 = entity1.getX();
    const y1 = entity1.getY();
    const x2 = entity2.getX();
    const y2 = entity2.getY();

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    return distance < radius;
}

function calculateDistance(zombie1, zombie2) {
    const dx = zombie1.getX() - zombie2.getX();
    const dy = zombie1.getY() - zombie2.getY();
    return Math.sqrt(dx * dx + dy * dy);
}

function resolveCollision(zombie1, zombie2, overlap) {
    const dx = zombie1.getX() - zombie2.getX();
    const dy = zombie1.getY() - zombie2.getY();
    const distance = calculateDistance(zombie1, zombie2);
    
    // Normalize the difference in positions
    const nx = dx / distance;
    const ny = dy / distance;
    
    // Move each zombie half of the overlap distance away from each other
    zombie1.setX(zombie1.getX() + nx * overlap / 2);
    zombie1.setY(zombie1.getY() + ny * overlap / 2);
    zombie2.setX(zombie2.getX() - nx * overlap / 2);
    zombie2.setY(zombie2.getY() - ny * overlap / 2);
}

function areFacingEachOther(zombie1, zombie2) {
    const left1 = zombie1.state.Left
    const left2 = zombie2.state.Left;
    const right1 = zombie1.state.Right;
    const right2 = zombie2.state.Right;
    
    // This is a simple example for zombies moving horizontally;
    return (left1 === right2) ||
           (left2 === right1)
}

function addZombies(number) {
    for (let i = 0; i < number; i++) {
        let zombie = new Zombie(scene);
        let zombieController = new ZombieController(zombie)
        zombies.push(zombie);
        zombieControllers.push(zombieController)
        scene.add(zombie.getSprite())
    }
}

function updateHUD(currentRound, player1) {
    const roundElement = document.getElementById('round');
    const healthElement = document.getElementById('health');
    const ammoElement = document.getElementById('ammo');

    roundElement.innerHTML = `Round: ${currentRound}`;
    const healthPercentage = Math.round((player1.getHealth() / 15) * 100);
    healthElement.innerHTML = `Health: ${healthPercentage}%`; // Assuming 'player1' is your player object
    ammoElement.innerHTML = `Ammo: ${player1.getAmmo()}`;
}


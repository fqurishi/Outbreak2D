import * as MAIN from './main.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

let MenuButton;
const enterButton = document.getElementById('text');
const StartMenu = document.getElementById('title');
const menuSelect = document.getElementById('title2');
const singleButton = document.getElementById('SINGLE PLAYER');
const multiButton = document.getElementById('MULTI PLAYER');
const optionButton = document.getElementById('OPTIONS');
const characterSelect = document.getElementById('CharacterSelect');
const startSelect = document.getElementById('overlay');
menuSelect.style.display = 'none';
characterSelect.style.display = 'none';
startSelect.style.display = 'none';
enterButton.addEventListener('click', playSound);
enterButton.addEventListener('ontouchend', playSound);
singleButton.addEventListener('click', selectMenu);
singleButton.addEventListener('ontouchend', selectMenu);
multiButton.addEventListener('click', selectMenu);
multiButton.addEventListener('ontouchend', selectMenu);
optionButton.addEventListener('click', selectMenu);
optionButton.addEventListener('ontouchend', selectMenu);

const camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 800 );
//audio
// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const bgm = new THREE.Audio( listener );
// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( './resources/Enter.wav', function( buffer ) {
    bgm.setBuffer( buffer );
    bgm.setLoop( false );
    bgm.setVolume( 0.5 );
    //bgm.play();
}
);

function playSound(){
    bgm.play();
    enterButton.remove();
    StartMenu.remove();
    menuSelect.style.display = 'flex';
}
function selectMenu(){
    menuSelect.remove();
    MenuButton = this.id;
    switch (MenuButton) {
        case "SINGLE PLAYER":
            characterSelect.style.display = 'flex';
            startSelect.style.display = 'flex';
           //MAIN();
            break;
        case "MULTI PLAYER":
            characterSelect.style.display = 'flex';
            startSelect.style.display = 'flex';
            //MAIN();
            break;
        case "OPTIONS":
            break;
        default:
    }
}

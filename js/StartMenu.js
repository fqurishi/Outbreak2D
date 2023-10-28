import * as MAIN from './main.js';
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

let MenuButton;

const enterButton = document.getElementById('text');
const menuButtons = {
  single: document.getElementById('SINGLE PLAYER'),
  multi: document.getElementById('MULTI PLAYER'),
  options: document.getElementById('OPTIONS')
};

const startMenu = document.getElementById('title');
const menuSelect = document.getElementById('title2');
const characterSelect = document.getElementById('CharacterSelect');
const startSelect = document.getElementById('overlay');
const backButton = document.getElementById('backButton');
const optionText = document.getElementById('options');
const volume = document.getElementById('volume');
const serverSelect = document.getElementById('ServerSelect');
const serverButtons = {
  server1: document.getElementById('server1'),
  server2: document.getElementById('server2'),
  server3: document.getElementById('server3'),
  server4: document.getElementById('server4')
};
const joinOrHostSelect = document.getElementById('hostOrJoinSelect');
const hostButton = document.getElementById('host');
const joinButton = document.getElementById('join');

let volumeValue = volume.value;
let modeValue;
let serverValue;
let hostOrJoin;

menuSelect.style.display = 'none';
characterSelect.style.display = 'none';
joinOrHostSelect.style.display = 'none';
startSelect.style.display = 'none';
optionText.style.display = 'none';
backButton.style.display = 'none';
serverSelect.style.display = 'none';

const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 800);

const listener = new THREE.AudioListener();
camera.add(listener);

const bgm = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load('./resources/Enter.wav', function (buffer) {
  bgm.setBuffer(buffer);
  bgm.setLoop(false);
  bgm.setVolume(0.5);
});

function playSound() {
  bgm.play();
  enterButton.remove();
  startMenu.remove();
  menuSelect.style.display = 'flex';
}

function selectMenu() {
  menuSelect.style.display = 'none';
  const buttonId = this.id;
  MenuButton = buttonId;

  switch (buttonId) {
    case 'SINGLE PLAYER':
      characterSelect.style.display = 'flex';
      startSelect.style.display = 'flex';
      modeValue = 0;
      break;
    case 'MULTI PLAYER':
      modeValue = 1;
      joinOrHostSelect.style.display = 'flex';
      break;
    case 'OPTIONS':
      backButton.style.display = 'flex';
      optionText.style.display = 'flex';
      break;
    default:
  }
}

function backButtonFunction() {
  menuSelect.style.display = 'flex';
  backButton.style.display = 'none';
  optionText.style.display = 'none';
  console.log(volumeValue);
}

function joinOrHostButton() {
  joinOrHostSelect.style.display = 'none';
  serverSelect.style.display = 'flex';
  const select = this.id;
  hostOrJoin = select === 'host' ? 1 : 0;
}

function serverButtonFunction() {
  serverSelect.style.display = 'none';
  const server = this.id;

  switch (server) {
    case 'server1':
    case 'server2':
    case 'server3':
    case 'server4':
      characterSelect.style.display = 'flex';
      startSelect.style.display = 'flex';
      serverValue = 49152 + Number(server.charAt(6));
      break;
    default:
  }
}

enterButton.addEventListener('click', playSound);
enterButton.addEventListener('ontouchend', playSound);
menuButtons.single.addEventListener('click', selectMenu);
menuButtons.single.addEventListener('ontouchend', selectMenu);
menuButtons.multi.addEventListener('click', selectMenu);
menuButtons.multi.addEventListener('ontouchend', selectMenu);
menuButtons.options.addEventListener('click', selectMenu);
menuButtons.options.addEventListener('ontouchend', selectMenu);
backButton.addEventListener('click', backButtonFunction);
backButton.addEventListener('ontouchend', backButtonFunction);
serverButtons.server1.addEventListener('click', serverButtonFunction);
serverButtons.server1.addEventListener('ontouchend', serverButtonFunction);
serverButtons.server2.addEventListener('click', serverButtonFunction);
serverButtons.server2.addEventListener('ontouchend', serverButtonFunction);
serverButtons.server3.addEventListener('click', serverButtonFunction);
serverButtons.server3.addEventListener('ontouchend', serverButtonFunction);
serverButtons.server4.addEventListener('click', serverButtonFunction);
serverButtons.server4.addEventListener('ontouchend', serverButtonFunction);
hostButton.addEventListener('click', joinOrHostButton);
hostButton.addEventListener('ontouchend', joinOrHostButton);
joinButton.addEventListener('click', joinOrHostButton);
joinButton.addEventListener('ontouchend', joinOrHostButton);

export { volumeValue as volume, modeValue as GameMode, serverValue as Port, hostOrJoin as Host };

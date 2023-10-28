import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GameObject } from './GameObject.js';

export class Player extends GameObject {
  #left;
  #right;
  #up;
  #down;
  #width;
  #height;
  #ammo;
  #health;
  #isLeft;
  #isRight;
  #pain;
  #pressedKeys;
  #shotFlag;
  #bulletR;
  #tex7;
  #tex8;

  constructor() {
    super();
    this.#left = true;
    this.#right = false;
    this.#up = false;
    this.#down = false;
    this.#width = null;
    this.#height = null;
    this.#ammo = 16;
    this.#health = 15;
    this.#pressedKeys = { left: false, right: false, up: false, down: false, space: false };
    this.setX(1);
    this.setY(0);
    this.setName("Player");
    this.setR(0.4);
    this.setBulletR(2);
    this.setPain(0);
  }

  getBulletR() {
    return this.#bulletR;
  }

  setBulletR(a) {
    this.#bulletR = a;
  }

  getPain() {
    return this.#pain;
  }

  getKeyPressRight() {
    return this.#pressedKeys['right'];
  }

  getKeyPressUp() {
    return this.#pressedKeys['up'];
  }

  getKeyPressDown() {
    return this.#pressedKeys['down'];
  }

  getKeyPressLeft() {
    return this.#pressedKeys['left'];
  }

  getKeyPressSpace() {
    return this.#pressedKeys['space'];
  }

  getLeft() {
    return this.#left;
  }

  getRight() {
    return this.#right;
  }

  getUp() {
    return this.#up;
  }

  getDown() {
    return this.#down;
  }

  getWidth() {
    return this.#width;
  }

  getHeight() {
    return this.#height;
  }

  getAmmo() {
    return this.#ammo;
  }

  getHealth() {
    return this.#health;
  }

  getTex7(){
    return this.#tex7;
  }

  getTex8(){
    return this.#tex8;
  }

  setLeft(a) {
    this.#left = a;
    this.#right = !a;
    this.#up = !a;
    this.#down = !a;
    this.#isRight = !a;
    this.#isLeft = a;
  }

  setRight(a) {
    this.#left = !a;
    this.#right = a;
    this.#up = !a;
    this.#down = !a;
    this.#isLeft = !a;
    this.#isRight = a;
  }

  setUp(a) {
    this.#left = !a;
    this.#right = !a;
    this.#up = a;
    this.#down = !a;
  }

  setDown(a) {
    this.#left = !a;
    this.#right = !a;
    this.#up = !a;
    this.#down = a;
  }

  setPain(a) {
    this.#pain = a;
  }

  setTex7(a){
    this.#tex7 = a;
  }

  setTex8(a){
    this.#tex8 = a;
  }

  shootGun() {
    this.#pressedKeys['space'] = true;
    this.#ammo = this.getAmmo() - 1;
  }

  damaged() {
    if (this.getPain() <= 0) {
      this.setPain(3);
    }
    this.#health = this.#health - 1;
    if (this.getHealth() <= 0) {
      this.setLife(false);
    }
    console.log(this.#health);
  }

  shotGun() {
    this.#pressedKeys['space'] = false;
    this.#shotFlag = true;
  }

  isShooting() {
    return this.#shotFlag;
  }

  setKeysOff() {
    this.#pressedKeys['right'] = false;
    this.#pressedKeys['left'] = false;
    this.#pressedKeys['down'] = false;
    this.#pressedKeys['up'] = false;
  }

  holster() {
    this.#shotFlag = false;
  }
}


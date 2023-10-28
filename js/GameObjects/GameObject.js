import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class GameObject {
  #x;
  #y;
  #R;
  #life;
  #name;
  #sprite;

  constructor() {
    this.#R = null;
    this.#life = 1;
    this.#name = null;
    this.#sprite = new THREE.Sprite();
    this.#x = null;
    this.#y = null;
  }

  getX() {
    this.#x = this.getSprite().position.z;
    return this.#x;
  }

  getY() {
    this.#y = this.getSprite().position.y;
    return this.#y;
  }

  getR() {
    return this.#R;
  }

  getLife() {
    return this.#life;
  }

  getSprite() {
    return this.#sprite;
  }

  getName() {
    return this.#name;
  }

  translateX(a) {
    this.getSprite().translateZ(a);
  }

  translateY(a) {
    this.getSprite().translateY(a);
  }

  setX(a) {
    this.getSprite().position.setZ(a);
  }

  setY(a) {
    this.getSprite().position.setY(a);
  }

  setR(a) {
    this.#R = a;
  }

  setLife(a) {
    this.#life = a;
  }

  setName(a) {
    this.#name = a;
  }

  getTexture(){
    return this.#sprite.material.map;
    }

  setTexture(t) {
    this.getSprite().material.map = t;
  }

  update() {
    // Define custom update logic for GameObject
  }

  updateDirection() {
    // Define custom updateDirection logic for GameObject
  }
}

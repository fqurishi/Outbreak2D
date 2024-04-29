import {TextureLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GameObject } from './GameObject.js';
import { Bullet } from './Bullet.js';
import { BulletController } from '../Controllers/BulletController.js';

export class Player extends GameObject {
  #characterTextures = {
    jaece: {
      Stand: 'Character_01/Stand.png',
      Gun_Stand: 'Character_01/Gun_Stand.png',
      Gun_Walk: 'Character_01/Gun_Walk.png',
      Climbing_01: 'Character_01/Climbing_01.png',
      Climbing_02: 'Character_01/Climbing_02.png',
      Walk: 'Character_01/Walk.png',
      Damage_01: 'Character_01/Damage_01.png',
      Damage_02: 'Character_01/Damage_02.png',
      Death_01: 'Character_01/Death_01.png',
      Death_02: 'Character_01/Death_02.png',
      Death_03: 'Character_01/Death_03.png',
      Death_04: 'Character_01/Death_04.png',
      Death_05: 'Character_01/Death_05.png',
    },
    rigo: {
      Stand: 'Character_02/Stand.png',
      Gun_Stand: 'Character_02/Gun_Stand.png',
      Gun_Walk: 'Character_02/Gun_Walk.png',
      Climbing_01: 'Character_02/Climbing_01.png',
      Climbing_02: 'Character_02/Climbing_02.png',
      Walk: 'Character_02/Walk.png',
      Damage_01: 'Character_02/Damage_01.png',
      Damage_02: 'Character_02/Damage_02.png',
      Death_01: 'Character_02/Death_01.png',
      Death_02: 'Character_02/Death_02.png',
      Death_03: 'Character_02/Death_03.png',
      Death_04: 'Character_02/Death_04.png',
      Death_05: 'Character_02/Death_05.png',
    },
    brayden: {
      Stand: 'Character_03/Stand.png',
      Gun_Stand: 'Character_03/Gun_Stand.png',
      Gun_Walk: 'Character_03/Gun_Walk.png',
      Climbing_01: 'Character_03/Climbing_01.png',
      Climbing_02: 'Character_03/Climbing_02.png',
      Walk: 'Character_03/Walk.png',
      Damage_01: 'Character_03/Damage_01.png',
      Damage_02: 'Character_03/Damage_02.png',
      Death_01: 'Character_03/Death_01.png',
      Death_02: 'Character_03/Death_02.png',
      Death_03: 'Character_03/Death_03.png',
      Death_04: 'Character_03/Death_04.png',
      Death_05: 'Character_03/Death_05.png',
    },
    grim: {
      Stand: 'Character_04/Stand.png',
      Gun_Stand: 'Character_04/Gun_Stand.png',
      Gun_Walk: 'Character_04/Gun_Walk.png',
      Climbing_01: 'Character_04/Climbing_01.png',
      Climbing_02: 'Character_04/Climbing_02.png',
      Walk: 'Character_04/Walk.png',
      Damage_01: 'Character_04/Damage_01.png',
      Damage_02: 'Character_04/Damage_02.png',
      Death_01: 'Character_04/Death_01.png',
      Death_02: 'Character_04/Death_02.png',
      Death_03: 'Character_04/Death_03.png',
      Death_04: 'Character_04/Death_04.png',
      Death_05: 'Character_04/Death_05.png',
    },
  };
  #left;
  #right;
  #up;
  #down;
  #width;
  #height;
  #ammo;
  #health;
  #pain;
  #shotFlag;
  #bulletR;
  #isClimbing;

  constructor(characterName, scene, bulletControllers) {
    super();
    const textures = this.#characterTextures[characterName];
    if (!textures) {
      throw new Error('Character not found in textures.');
    }
    this.scene = scene
    this.bulletControllers = bulletControllers
    // Initialize the textures for the chosen character
    this.#initializeTextures(textures);
    this.#left = true;
    this.#right = false;
    this.#up = false;
    this.#down = false;
    this.#width = null;
    this.#height = null;
    this.#ammo = 16;
    this.#health = 15;
    this.setName("Player");
    this.setR(0.4);
    this.setBulletR(2);
    this.setPain(0);
    this.setTexture(this.Stand);
    this.setLeft(true);
    this.getSprite().position.set( 1, 0, 0);
    this.getSprite().scale.set(4,4,4);
    this.setX(1);
    this.setY(-0.2);
    this.setIsClimbing(false);
  }

  makeBullet(){
    const offset = this.getRight() ? -1.25 : 1.25;
    const bullet = new Bullet(this.getX()+offset, this.getY() + 0.6, this.getRight(), this.scene);
    this.scene.add(bullet.getSprite());
    let bulletController = new BulletController(bullet);
    this.bulletControllers.push(bulletController);

  }

  getIsClimbing(){
    return this.#isClimbing;
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

  setIsClimbing(a){
    this.#isClimbing = a;
  }

  setLeft(a) {
    this.#left = a;
    this.#right = !a;
    this.#up = !a;
    this.#down = !a;
  }

  setRight(a) {
    this.#left = !a;
    this.#right = a;
    this.#up = !a;
    this.#down = !a;
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

  shootGun() {
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
    this.#shotFlag = true;
  }

  isShooting() {
    return this.#shotFlag;
  }

  holster() {
    this.#shotFlag = false;
  }

  #initializeTextures(textures){
    for (const key in textures) {
      this[key] = new TextureLoader().load(`./resources/${textures[key]}`);
    }
  }
}


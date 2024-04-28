import {TextureLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import { GameObject } from './GameObject.js';

export class Zombie extends GameObject {
    #zombieTextures = {
        zombie1: {
            Stand: 'Zombie_01/Stand.png',
            Walk: 'Zombie_01/Walk.png',
            Attack_01: 'Zombie_01/Attack_01.png',
            Attack_02: 'Zombie_01/Attack_02.png',
            Attack_03: 'Zombie_01/Attack_03.png',
            Climbing_01: 'Zombie_01/Climbing_01.png',
            Climbing_02: 'Zombie_01/Climbing_02.png',
            Damage_01: 'Zombie_01/Damage_01.png',
            Damage_02: 'Zombie_01/Damage_02.png',
            Death_01: 'Zombie_01/Death_01.png',
            Death_02: 'Zombie_01/Death_02.png',
            Death_03: 'Zombie_01/Death_03.png',
            Death_04: 'Zombie_01/Death_04.png',
            Death_05: 'Zombie_01/Death_05.png',
            Death_06: 'Zombie_01/Death_06.png',
        },
        zombie2: {
            Stand: 'Zombie_02/Stand.png',
            Walk: 'Zombie_02/Walk.png',
            Attack_01: 'Zombie_02/Attack_01.png',
            Attack_02: 'Zombie_02/Attack_02.png',
            Attack_03: 'Zombie_02/Attack_03.png',
            Climbing_01: 'Zombie_02/Climbing_01.png',
            Climbing_02: 'Zombie_02/Climbing_02.png',
            Damage_01: 'Zombie_02/Damage_01.png',
            Damage_02: 'Zombie_02/Damage_02.png',
            Death_01: 'Zombie_02/Death_01.png',
            Death_02: 'Zombie_02/Death_02.png',
            Death_03: 'Zombie_02/Death_03.png',
            Death_04: 'Zombie_02/Death_04.png',
            Death_05: 'Zombie_02/Death_05.png',
            Death_06: 'Zombie_02/Death_06.png',
        },
        zombie3: {
            Stand: 'Zombie_03/Stand.png',
            Walk: 'Zombie_03/Walk.png',
            Attack_01: 'Zombie_03/Attack_01.png',
            Attack_02: 'Zombie_03/Attack_02.png',
            Attack_03: 'Zombie_03/Attack_03.png',
            Climbing_01: 'Zombie_03/Climbing_01.png',
            Climbing_02: 'Zombie_03/Climbing_02.png',
            Damage_01: 'Zombie_03/Damage_01.png',
            Damage_02: 'Zombie_03/Damage_02.png',
            Death_01: 'Zombie_03/Death_01.png',
            Death_02: 'Zombie_03/Death_02.png',
            Death_03: 'Zombie_03/Death_03.png',
            Death_04: 'Zombie_03/Death_04.png',
            Death_05: 'Zombie_03/Death_05.png',
            Death_06: 'Zombie_03/Death_06.png',
        },
        zombie4: {
            Stand: 'Zombie_04/Stand.png',
            Walk: 'Zombie_04/Walk.png',
            Attack_01: 'Zombie_04/Attack_01.png',
            Attack_02: 'Zombie_04/Attack_02.png',
            Attack_03: 'Zombie_04/Attack_03.png',
            Climbing_01: 'Zombie_04/Climbing_01.png',
            Climbing_02: 'Zombie_04/Climbing_02.png',
            Damage_01: 'Zombie_04/Damage_01.png',
            Damage_02: 'Zombie_04/Damage_02.png',
            Death_01: 'Zombie_04/Death_01.png',
            Death_02: 'Zombie_04/Death_02.png',
            Death_03: 'Zombie_04/Death_03.png',
            Death_04: 'Zombie_04/Death_04.png',
            Death_05: 'Zombie_04/Death_05.png',
            Death_06: 'Zombie_04/Death_06.png',
        },
        zombie5: {
            Stand: 'Zombie_05/Stand.png',
            Walk: 'Zombie_05/Walk.png',
            Attack_01: 'Zombie_05/Attack_01.png',
            Attack_02: 'Zombie_05/Attack_02.png',
            Attack_03: 'Zombie_05/Attack_03.png',
            Climbing_01: 'Zombie_05/Climbing_01.png',
            Climbing_02: 'Zombie_05/Climbing_02.png',
            Damage_01: 'Zombie_05/Damage_01.png',
            Damage_02: 'Zombie_05/Damage_02.png',
            Death_01: 'Zombie_05/Death_01.png',
            Death_02: 'Zombie_05/Death_02.png',
            Death_03: 'Zombie_05/Death_03.png',
            Death_04: 'Zombie_05/Death_04.png',
            Death_05: 'Zombie_05/Death_05.png',
            Death_06: 'Zombie_05/Death_06.png',
        },
        zombie6: {
            Stand: 'Zombie_06/Stand.png',
            Walk: 'Zombie_06/Walk.png',
            Attack_01: 'Zombie_06/Attack_01.png',
            Attack_02: 'Zombie_06/Attack_02.png',
            Attack_03: 'Zombie_06/Attack_03.png',
            Climbing_01: 'Zombie_06/Climbing_01.png',
            Climbing_02: 'Zombie_06/Climbing_02.png',
            Damage_01: 'Zombie_06/Damage_01.png',
            Damage_02: 'Zombie_06/Damage_02.png',
            Death_01: 'Zombie_06/Death_01.png',
            Death_02: 'Zombie_06/Death_02.png',
            Death_03: 'Zombie_06/Death_03.png',
            Death_04: 'Zombie_06/Death_04.png',
            Death_05: 'Zombie_06/Death_05.png',
            Death_06: 'Zombie_06/Death_06.png',
        },
    };
    #left;
    #right;
    #up;
    #down;
    #respawn;
    #width;
    #height;
    #speed;
    #ammo;
    #health;
    #pain;
    #Y_POSITIONS;

    constructor(scene) {
        super();
        const textures = this.#zombieTextures[this.#randomName()];
        if (!textures) {
        throw new Error('Zombie not found in textures.');
        }
        this.scene = scene
        // Initialize the textures for the chosen character
        this.#initializeTextures(textures);
        this.Y_POSITIONS = [-14, -7, -0.3, 6.5, 13.2];
        this.#left = true;
        this.#right = false;
        this.#up = false;
        this.#down = false;
        this.#width = null;
        this.#height = null;
        this.#ammo = 16;
        this.#health = 15;
        this.getSprite().position.set( 1, 0, 0);
        this.getSprite().scale.set(4,4,4);
        this.setName("Zombie");
        this.setTexture(this.Stand);
        this.setR(2);
        this.setY(this.Y_POSITIONS[Math.floor(Math.random() * 5)])
        this.setLeft(Math.floor(Math.random() * 2));
        this.setSpeed(0.5);
        this.setRespawn(0);
        this.setX(Math.floor(Math.random() * 43)-21.5);
    }

    getRespawn(){
        return this.#respawn;
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

    getSpeed(){
        return this.#speed;
    }

    setSpeed(a){
        this.#speed = a;
    }

    setRespawn(a){
        this.#respawn = a;
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

    #initializeTextures(textures){
        for (const key in textures) {
        this[key] = new TextureLoader().load(`./resources/${textures[key]}`);
        }
    }

    #randomName(){
        const randomNumber = Math.floor(Math.random() * 6) + 1;
        return `zombie${randomNumber}`;
    }
}
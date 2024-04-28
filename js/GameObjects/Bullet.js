import { GameObject } from './GameObject.js';
import {TextureLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class Bullet extends GameObject {
    #left;
    #right;
    constructor(a,b,c, scene){
        super();
        this.scene = scene
        this.setX(a);
        this.setY(b);
        this.setName("Bullet");
        this.setR(0.2);
        this.getSprite().position.setX(1);
        this.getSprite().scale.set(0.2,0.1,1);
        this.setTexture(new TextureLoader().load(`./resources/bullet.png`));
        this.setRight(c);
    }

    getLeft(){
        return this.#left;
    }
    getRight(){
        return this.#right;
    }
    setLeft(a){
        this.#left = a;
        this.#right = !a;
    }
    setRight(a){
        this.#right = a;
        this.#left = !a;
    }

    kill(){
        this.scene.remove(this.getSprite())
    }

}
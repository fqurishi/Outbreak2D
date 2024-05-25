import { GameObject } from './GameObject.js';
import {TextureLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class HealthBox extends GameObject {
    #textures = {
        Health1: 'Items/Health1.png',
        Health2: 'Items/Health2.png',
        Health3: 'Items/Health3.png',
        Health4: 'Items/Health4.png',
        Health5: 'Items/Health5.png',
        Health6: 'Items/Health6.png',
        Health7: 'Items/Health7.png',
        Health8: 'Items/Health8.png'
      }
    constructor(scene){
        super();
        const textures = this.#textures;
        if (!textures) {
        throw new Error('Character not found in textures.');
        }
        this.scene = scene
        this.#initializeTextures(textures);
        this.setR(2);
        this.setName("HealthBox");
        this.getSprite().position.set( 1, 0, 0);
        this.getSprite().scale.set(2,2,2);
        this.setTexture(this.Health1);
        this.setX(Math.floor(Math.random() * 43)-21.5);
        this.Y_POSITIONS = [-14, -7, -0.3, 6.5, 13.2];
        this.setY(this.Y_POSITIONS[Math.floor(Math.random() * 5)])
        this.enter();
    }

    kill(){
        this.scene.remove(this.getSprite())
    }

    enter(){
        switch (this.getTexture()) {
            case this.Health1:
                this.setTexture(this.Health2);
                break;
            case this.Health2:
                this.setTexture(this.Health3);
                break;
            case this.Health3:
                this.setTexture(this.Health4);
                break;
            case this.Health4:
                this.setTexture(this.Health5);
                break;
            case this.Health5:
                this.setTexture(this.Health6);
                break;
            case this.Health6:
                this.setTexture(this.Health7);
                break;
            case this.Health7:
                this.setTexture(this.Health8);
                break;
            default:
                this.setTexture(this.Health1);
        }
    }

    #initializeTextures(textures){
        for (const key in textures) {
          this[key] = new TextureLoader().load(`./resources/${textures[key]}`);
        }
    }

}
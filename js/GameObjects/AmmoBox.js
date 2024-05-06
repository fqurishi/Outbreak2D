import { GameObject } from './GameObject.js';
import {TextureLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export class AmmoBox extends GameObject {
    #textures = {
        Ammo1: 'Items/Ammo1.png',
        Ammo2: 'Items/Ammo2.png',
        Ammo3: 'Items/Ammo3.png',
        Ammo4: 'Items/Ammo4.png',
        Ammo5: 'Items/Ammo5.png',
        Ammo6: 'Items/Ammo6.png',
        Ammo7: 'Items/Ammo7.png',
        Ammo8: 'Items/Ammo8.png'
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
        this.setName("AmmoBox");
        this.getSprite().position.set( 1, 0, 0);
        this.getSprite().scale.set(2,2,2);
        this.setTexture(this.Ammo1);
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
            case this.Ammo1:
                this.setTexture(this.Ammo2);
                break;
            case this.Ammo2:
                this.setTexture(this.Ammo3);
                break;
            case this.Ammo3:
                this.setTexture(this.Ammo4);
                break;
            case this.Ammo4:
                this.setTexture(this.Ammo5);
                break;
            case this.Ammo5:
                this.setTexture(this.Ammo6);
                break;
            case this.Ammo6:
                this.setTexture(this.Ammo7);
                break;
            case this.Ammo7:
                this.setTexture(this.Ammo8);
                break;
            default:
                this.setTexture(this.Ammo1);
        }
    }

    #initializeTextures(textures){
        for (const key in textures) {
          this[key] = new TextureLoader().load(`./resources/${textures[key]}`);
        }
    }

}
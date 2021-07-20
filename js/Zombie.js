import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {gameobject} from './GameObject.js';


export const zombie = (() => {
    class Zombie extends gameobject.GameObject{
        #left;
        #right;
        #up;
        #down;
        #respawn;
        #width;
        #height;
        #speed;
        #isLeft;
        #isRight;
        #textures;
        #state;
        #RightOrLeft
        constructor(){
            super();
            //zombie 1 texture loading
            const zomb1Tex1 = new THREE.TextureLoader().load( './resources/Zombie_01/Stand.png' );
            const zomb1Tex2 = new THREE.TextureLoader().load( './resources/Zombie_01/Walk.png' );
            //zombie 2 texture loading
            const zomb2Tex1 = new THREE.TextureLoader().load( './resources/Zombie_02/Stand.png' );
            const zomb2Tex2 = new THREE.TextureLoader().load( './resources/Zombie_02/Walk.png' );
            //zombie 3 texture loading
            const zomb3Tex1 = new THREE.TextureLoader().load( './resources/Zombie_03/Stand.png' );
            const zomb3Tex2 = new THREE.TextureLoader().load( './resources/Zombie_03/Walk.png' );
            //zombie 4 texture loading
            const zomb4Tex1 = new THREE.TextureLoader().load( './resources/Zombie_04/Stand.png' );
            const zomb4Tex2 = new THREE.TextureLoader().load( './resources/Zombie_04/Walk.png' );
            //zombie 5 texture loading
            const zomb5Tex1 = new THREE.TextureLoader().load( './resources/Zombie_05/Stand.png' );
            const zomb5Tex2 = new THREE.TextureLoader().load( './resources/Zombie_05/Walk.png' );
            //zombie 5 texture loading
            const zomb6Tex1 = new THREE.TextureLoader().load( './resources/Zombie_06/Stand.png' );
            const zomb6Tex2 = new THREE.TextureLoader().load( './resources/Zombie_06/Walk.png' );
            // zombie 6 texture loading
            const zomb7Tex1 = new THREE.TextureLoader().load( './resources/Zombie_01/Stand.png' );
            const zomb7Tex2 = new THREE.TextureLoader().load( './resources/Zombie_01/Walk.png' );

            let floor = [-7, -0.3, 6.5, 13.2, -14];
            this.#textures = [zomb1Tex1, zomb1Tex2, zomb2Tex1, zomb2Tex2,
                            zomb3Tex1, zomb3Tex2, zomb4Tex1, zomb4Tex2,
                            zomb5Tex1, zomb5Tex2, zomb6Tex1, zomb6Tex2];
            this.setName("Zombie");
            this.setR(2);
            this.setY(floor[Math.floor(Math.random() * 5)])
            this.setLeft(Math.floor(Math.random() * 2));
            this.#RightOrLeft = Math.floor(Math.random() * 2);
            this.setSpeed(0.5);
            this.setRespawn(0);
            this.setX(Math.floor(Math.random() * 43)-21.5);
            this.setState(0);
            this.setTexture(this.#textures[Math.floor(Math.random() * 12)]);
        }
        getRightOrLeft(){
            return this.#RightOrLeft;
        }
        getState(){
            return this.#state;
        }
        getLeft(){
            return this.#left;
        }
        getRight(){
            return this.#right;
        }
        getUp(){
            return this.#up;
        }
        getDown(){
            return this.#down;
        }
        getRespawn(){
            return this.#respawn;
        }
        getWidth(){
            return this.#width;
        }
        getHeight(){
            return this.#height;
        }
        getSpeed(){
            return this.#speed;
        }
        setLeft(a){
            this.#left = a;
            this.#right = !a;
            this.#up = !a;
            this.#down = !a;
            this.#isLeft = a;
            this.#isRight = !a;

        }
        setRight(a){
            this.#left = !a;
            this.#right = a;
            this.#up = !a;
            this.#down = !a;
            this.#isLeft = !a;
            this.#isRight = a;

        }
        setUp(a){
            this.#left = !a;
            this.#right = !a;
            this.#up = a;
            this.#down = !a;

        }
        setDown(a){
            this.#left = !a;
            this.#right = !a;
            this.#up = !a;
            this.#down = a;

        }
        setLadderOff(){
            this.#up = false;
            this.#down = false;
        }
        setSpeed(a){
            this.#speed = a;
        }
        setRespawn(a){
            this.#respawn = a;
        }
        setState(a){
            this.#state = a;
        }
        setSpawnPoint(){
            let floor = [-7, -0.3, 6.5, 13.2, -14];
            let entry = [22, -22];
            this.setX(entry[Math.floor(Math.random() * 2)]);
            if(this.getX() == 22){
                this.setRight(1);
            }
            else{
                this.setLeft(1);
            }
            this.setY(floor[Math.floor(Math.random() * 5)]);
        }
        update(){
            if(this.getLeft()){
                if(this.getX() < 23){
                    this.translateX(this.getSpeed());
                }
                else{
                    this.setRespawn(1);
                }
            }
            else if(this.getRight()){
                if(this.getX() > -23){
                    this.translateX(-(this.getSpeed()));
                }
                else{
                    this.setRespawn(1);
                }
            }
            else if(this.getUp()){
                this.translateY(this.getSpeed());
            }
            else if(this.getDown()){
                this.translateY(-(this.getSpeed()));
            }
            //zombie 1
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[0] || this.getTexture() == this.#textures[1])){
                this.setTexture(this.#textures[0]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[0] || this.getTexture() == this.#textures[1])){
                this.setTexture(this.#textures[1]);
            }
            //zombie 2
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[2] || this.getTexture() == this.#textures[3])){
                this.setTexture(this.#textures[2]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[2] || this.getTexture() == this.#textures[3])){
                this.setTexture(this.#textures[3]);
            }
            //zombie 3
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[4] || this.getTexture() == this.#textures[5])){
                this.setTexture(this.#textures[4]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[4] || this.getTexture() == this.#textures[5])){
                this.setTexture(this.#textures[5]);
            }
            //zombie 4
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[6] || this.getTexture() == this.#textures[7])){
                this.setTexture(this.#textures[6]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[6] || this.getTexture() == this.#textures[7])){
                this.setTexture(this.#textures[7]);
            }
            //zombie 5
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[8] || this.getTexture() == this.#textures[9])){
                this.setTexture(this.#textures[8]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[8] || this.getTexture() == this.#textures[9])){
                this.setTexture(this.#textures[9]);
            }
            //zombie 6
            if((this.getState() == 0) && 
            (this.getTexture() == this.#textures[10] || this.getTexture() == this.#textures[11])){
                this.setTexture(this.#textures[10]);
            }
            else if ((this.getState() == 1) &&
             (this.getTexture() == this.#textures[10] || this.getTexture() == this.#textures[11])){
                this.setTexture(this.#textures[11]);
            }
        }
        updateDirection(){
            if(this.getLeft()){
                this.getTexture().center.set( 0.5, 0.5 );
                this.getTexture().repeat.set( 1, 1 );
            }
            else if(this.getRight()){
                this.getTexture().center.set( 0.5, 0.5 );
                this.getTexture().repeat.set( -1, 1 );
            }
        }

    };
    return {
        Zombie: Zombie,
    };
})();
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
        #RightOrLeft;
        #attack;
        #attackTextures;
        #deathTextures;
        #climbingTextures;
        #damageTextures;
        #attackFlag;
        #health;
        #pain;
        #ONEtextures;
        #TWOtextures;
        #THREEtextures;
        #FOURtextures;
        #FIVEtextures;
        #SIXtextures;
        #deathFlag;
        constructor(){
            super();
            //zombie 1 texture loading
            const zomb1Tex1 = new THREE.TextureLoader().load( './resources/Zombie_01/Stand.png' );
            const zomb1Tex2 = new THREE.TextureLoader().load( './resources/Zombie_01/Walk.png' );
            const zomb1Tex3 = new THREE.TextureLoader().load( './resources/Zombie_01/Attack_01.png' );
            const zomb1Tex4 = new THREE.TextureLoader().load( './resources/Zombie_01/Attack_02.png' );
            const zomb1Tex5 = new THREE.TextureLoader().load( './resources/Zombie_01/Attack_03.png' );
            const zomb1Tex6 = new THREE.TextureLoader().load( './resources/Zombie_01/Climbing _01.png' );
            const zomb1Tex7 = new THREE.TextureLoader().load( './resources/Zombie_01/Climbing _02.png' );
            const zomb1Tex8 = new THREE.TextureLoader().load( './resources/Zombie_01/Damage_01.png' );
            const zomb1Tex9 = new THREE.TextureLoader().load( './resources/Zombie_01/Damage_02.png' );
            const zomb1Tex10 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_01.png' );
            const zomb1Tex11 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_02.png' );
            const zomb1Tex12 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_03.png' );
            const zomb1Tex13 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_04.png' );
            const zomb1Tex14 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_05.png' );
            const zomb1Tex15 = new THREE.TextureLoader().load( './resources/Zombie_01/Death_06.png' );
            //zombie 2 texture loading
            const zomb2Tex1 = new THREE.TextureLoader().load( './resources/Zombie_02/Stand.png' );
            const zomb2Tex2 = new THREE.TextureLoader().load( './resources/Zombie_02/Walk.png' );
            const zomb2Tex3 = new THREE.TextureLoader().load( './resources/Zombie_02/Attack_01.png' );
            const zomb2Tex4 = new THREE.TextureLoader().load( './resources/Zombie_02/Attack_02.png' );
            const zomb2Tex5 = new THREE.TextureLoader().load( './resources/Zombie_02/Attack_03.png' );
            const zomb2Tex6 = new THREE.TextureLoader().load( './resources/Zombie_02/Climbing _01.png' );
            const zomb2Tex7 = new THREE.TextureLoader().load( './resources/Zombie_02/Climbing _02.png' );
            const zomb2Tex8 = new THREE.TextureLoader().load( './resources/Zombie_02/Damage_01.png' );
            const zomb2Tex9 = new THREE.TextureLoader().load( './resources/Zombie_02/Damage_02.png' );
            const zomb2Tex10 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_01.png' );
            const zomb2Tex11 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_02.png' );
            const zomb2Tex12 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_03.png' );
            const zomb2Tex13 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_04.png' );
            const zomb2Tex14 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_05.png' );
            const zomb2Tex15 = new THREE.TextureLoader().load( './resources/Zombie_02/Death_06.png' );
            //zombie 3 texture loading
            const zomb3Tex1 = new THREE.TextureLoader().load( './resources/Zombie_03/Stand.png' );
            const zomb3Tex2 = new THREE.TextureLoader().load( './resources/Zombie_03/Walk.png' );
            const zomb3Tex3 = new THREE.TextureLoader().load( './resources/Zombie_03/Attack_01.png' );
            const zomb3Tex4 = new THREE.TextureLoader().load( './resources/Zombie_03/Attack_02.png' );
            const zomb3Tex5 = new THREE.TextureLoader().load( './resources/Zombie_03/Attack_03.png' );
            const zomb3Tex6 = new THREE.TextureLoader().load( './resources/Zombie_03/Climbing _01.png' );
            const zomb3Tex7 = new THREE.TextureLoader().load( './resources/Zombie_03/Climbing _02.png' );
            const zomb3Tex8 = new THREE.TextureLoader().load( './resources/Zombie_03/Damage_01.png' );
            const zomb3Tex9 = new THREE.TextureLoader().load( './resources/Zombie_03/Damage_02.png' );
            const zomb3Tex10 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_01.png' );
            const zomb3Tex11 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_02.png' );
            const zomb3Tex12 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_03.png' );
            const zomb3Tex13 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_04.png' );
            const zomb3Tex14 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_05.png' );
            const zomb3Tex15 = new THREE.TextureLoader().load( './resources/Zombie_03/Death_06.png' );
            //zombie 4 texture loading
            const zomb4Tex1 = new THREE.TextureLoader().load( './resources/Zombie_04/Stand.png' );
            const zomb4Tex2 = new THREE.TextureLoader().load( './resources/Zombie_04/Walk.png' );
            const zomb4Tex3 = new THREE.TextureLoader().load( './resources/Zombie_04/Attack_01.png' );
            const zomb4Tex4 = new THREE.TextureLoader().load( './resources/Zombie_04/Attack_02.png' );
            const zomb4Tex5 = new THREE.TextureLoader().load( './resources/Zombie_04/Attack_03.png' );
            const zomb4Tex6 = new THREE.TextureLoader().load( './resources/Zombie_04/Climbing _01.png' );
            const zomb4Tex7 = new THREE.TextureLoader().load( './resources/Zombie_04/Climbing _02.png' );
            const zomb4Tex8 = new THREE.TextureLoader().load( './resources/Zombie_04/Damage_01.png' );
            const zomb4Tex9 = new THREE.TextureLoader().load( './resources/Zombie_04/Damage_02.png' );
            const zomb4Tex10 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_01.png' );
            const zomb4Tex11 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_02.png' );
            const zomb4Tex12 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_03.png' );
            const zomb4Tex13 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_04.png' );
            const zomb4Tex14 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_05.png' );
            const zomb4Tex15 = new THREE.TextureLoader().load( './resources/Zombie_04/Death_06.png' );
            //zombie 5 texture loading
            const zomb5Tex1 = new THREE.TextureLoader().load( './resources/Zombie_05/Stand.png' );
            const zomb5Tex2 = new THREE.TextureLoader().load( './resources/Zombie_05/Walk.png' );
            const zomb5Tex3 = new THREE.TextureLoader().load( './resources/Zombie_05/Attack_01.png' );
            const zomb5Tex4 = new THREE.TextureLoader().load( './resources/Zombie_05/Attack_02.png' );
            const zomb5Tex5 = new THREE.TextureLoader().load( './resources/Zombie_05/Attack_03.png' );
            const zomb5Tex6 = new THREE.TextureLoader().load( './resources/Zombie_05/Climbing _01.png' );
            const zomb5Tex7 = new THREE.TextureLoader().load( './resources/Zombie_05/Climbing _02.png' );
            const zomb5Tex8 = new THREE.TextureLoader().load( './resources/Zombie_05/Damage_01.png' );
            const zomb5Tex9 = new THREE.TextureLoader().load( './resources/Zombie_05/Damage_02.png' );
            const zomb5Tex10 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_01.png' );
            const zomb5Tex11 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_02.png' );
            const zomb5Tex12 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_03.png' );
            const zomb5Tex13 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_04.png' );
            const zomb5Tex14 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_05.png' );
            const zomb5Tex15 = new THREE.TextureLoader().load( './resources/Zombie_05/Death_06.png' );
            //zombie 6 texture loading
            const zomb6Tex1 = new THREE.TextureLoader().load( './resources/Zombie_06/Stand.png' );
            const zomb6Tex2 = new THREE.TextureLoader().load( './resources/Zombie_06/Walk.png' );
            const zomb6Tex3 = new THREE.TextureLoader().load( './resources/Zombie_06/Attack_01.png' );
            const zomb6Tex4 = new THREE.TextureLoader().load( './resources/Zombie_06/Attack_02.png' );
            const zomb6Tex5 = new THREE.TextureLoader().load( './resources/Zombie_06/Attack_03.png' );
            const zomb6Tex6 = new THREE.TextureLoader().load( './resources/Zombie_06/Climbing _01.png' );
            const zomb6Tex7 = new THREE.TextureLoader().load( './resources/Zombie_06/Climbing _02.png' );
            const zomb6Tex8 = new THREE.TextureLoader().load( './resources/Zombie_06/Damage_01.png' );
            const zomb6Tex9 = new THREE.TextureLoader().load( './resources/Zombie_06/Damage_02.png' );
            const zomb6Tex10 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_01.png' );
            const zomb6Tex11 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_02.png' );
            const zomb6Tex12 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_03.png' );
            const zomb6Tex13 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_04.png' );
            const zomb6Tex14 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_05.png' );
            const zomb6Tex15 = new THREE.TextureLoader().load( './resources/Zombie_06/Death_06.png' );
            
            let floor = [-7, -0.3, 6.5, 13.2, -14];
            this.#textures =    [
                                zomb1Tex1, zomb1Tex2, zomb2Tex1, zomb2Tex2,
                                zomb3Tex1, zomb3Tex2, zomb4Tex1, zomb4Tex2,
                                zomb5Tex1, zomb5Tex2, zomb6Tex1, zomb6Tex2
                                ];
            this.#attackTextures =  [
                                    zomb1Tex3, zomb1Tex4, zomb1Tex5, 
                                    zomb2Tex3, zomb2Tex4, zomb2Tex5,
                                    zomb3Tex3, zomb3Tex4, zomb3Tex5,
                                    zomb4Tex3, zomb4Tex4, zomb4Tex5,
                                    zomb5Tex3, zomb5Tex4, zomb5Tex5,
                                    zomb6Tex3, zomb6Tex4, zomb6Tex5
                                    ];
            this.#climbingTextures = [
                                    zomb1Tex6, zomb1Tex7,
                                    zomb2Tex6, zomb2Tex7,
                                    zomb3Tex6, zomb3Tex7,
                                    zomb4Tex6, zomb4Tex7,
                                    zomb5Tex6, zomb5Tex7,
                                    zomb6Tex6, zomb6Tex7
                                    ];
            this.#damageTextures = [
                                    zomb1Tex8, zomb1Tex9,
                                    zomb2Tex8, zomb2Tex9,
                                    zomb3Tex8, zomb3Tex9,
                                    zomb4Tex8, zomb4Tex9,
                                    zomb5Tex8, zomb5Tex9,
                                    zomb6Tex8, zomb6Tex9
                                    ];
            this.#deathTextures = [zomb1Tex10, zomb1Tex11, zomb1Tex12, zomb1Tex13, zomb1Tex14, zomb1Tex15,
                                    zomb2Tex10, zomb2Tex11, zomb2Tex12, zomb2Tex13, zomb2Tex14, zomb2Tex15,
                                    zomb3Tex10, zomb3Tex11, zomb3Tex12, zomb3Tex13, zomb3Tex14, zomb3Tex15,
                                    zomb4Tex10, zomb4Tex11, zomb4Tex12, zomb4Tex13, zomb4Tex14, zomb4Tex15,
                                    zomb5Tex10, zomb5Tex11, zomb5Tex12, zomb5Tex13, zomb5Tex14, zomb5Tex15,
                                    zomb6Tex10, zomb6Tex11, zomb6Tex12, zomb6Tex13, zomb6Tex14, zomb6Tex15
                                    ];
            this.#ONEtextures = [zomb1Tex1, zomb1Tex2, zomb1Tex3,
                                zomb1Tex4, zomb1Tex5, zomb1Tex6,
                                zomb1Tex7, zomb1Tex8, zomb1Tex9];
            this.#TWOtextures = [zomb2Tex1, zomb2Tex2, zomb2Tex3,
                                zomb2Tex4, zomb2Tex5, zomb2Tex6,
                                zomb2Tex7, zomb2Tex8, zomb2Tex9];
            this.#THREEtextures = [zomb3Tex1, zomb3Tex2, zomb3Tex3,
                                zomb3Tex4, zomb3Tex5, zomb3Tex6,
                                zomb3Tex7, zomb3Tex8, zomb3Tex9];
            this.#FOURtextures = [zomb4Tex1, zomb4Tex2, zomb4Tex3,
                                zomb4Tex4, zomb4Tex5, zomb4Tex6,
                                zomb4Tex7, zomb4Tex8, zomb4Tex9];
            this.#FIVEtextures = [zomb5Tex1, zomb5Tex2, zomb5Tex3,
                                zomb5Tex4, zomb5Tex5, zomb5Tex6,
                                zomb5Tex7, zomb5Tex8, zomb5Tex9];
            this.#SIXtextures = [zomb6Tex1, zomb6Tex2, zomb6Tex3,
                                zomb6Tex4, zomb6Tex5, zomb6Tex6,
                                zomb6Tex7, zomb6Tex8, zomb6Tex9];
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
            this.setAttack(0);
            this.setHealth(3);
            this.setSpawnPoint(0);
            this.setPain(0);
            this.setDeathFlag(0);
        }
        isAttacking(){
            if (this.getAttack() <=4 && this.getAttack() > 0)
                return true;
            else
                return false;
        }
        attacking(){
            //zombie 1
            if(this.getTexture() == this.#textures[0] || this.getTexture() == this.#textures[1]){
                this.setTexture(this.#attackTextures[0]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[0]){
                this.setTexture(this.#attackTextures[1]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[1]){
                this.setTexture(this.#attackTextures[2]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[2]){
                this.setAttackFlag(0);
                this.setTexture(this.#textures[0]);
            }
            //zombie 2
            if(this.getTexture() == this.#textures[2] || this.getTexture() == this.#textures[3]){
                this.setTexture(this.#attackTextures[3]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[3]){
                this.setTexture(this.#attackTextures[4]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[4]){
                this.setTexture(this.#attackTextures[5]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[5]){
                this.setTexture(this.#textures[2]);
                this.setAttackFlag(0);
            }
            //zombie 3
            if(this.getTexture() == this.#textures[4] || this.getTexture() == this.#textures[5]){
                this.setTexture(this.#attackTextures[6]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[6]){
                this.setTexture(this.#attackTextures[7]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[7]){
                this.setTexture(this.#attackTextures[8]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[8]){
                this.setTexture(this.#textures[4]);
                this.setAttackFlag(0);
            }
            //zombie 4
            if(this.getTexture() == this.#textures[6] || this.getTexture() == this.#textures[7]){
                this.setTexture(this.#attackTextures[9]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[9]){
                this.setTexture(this.#attackTextures[10]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[10]){
                this.setTexture(this.#attackTextures[11]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[11]){
                this.setTexture(this.#textures[6]);
                this.setAttackFlag(0);
            }
            //zombie 5
            if(this.getTexture() == this.#textures[8] || this.getTexture() == this.#textures[9]){
                this.setTexture(this.#attackTextures[12]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[12]){
                this.setTexture(this.#attackTextures[13]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[13]){
                this.setTexture(this.#attackTextures[14]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[14]){
                this.setTexture(this.#textures[8]);
                this.setAttackFlag(0);
            }
            //zombie 6
            if(this.getTexture() == this.#textures[10] || this.getTexture() == this.#textures[11]){
                this.setTexture(this.#attackTextures[15]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[15]){
                this.setTexture(this.#attackTextures[16]);
                this.setAttackFlag(0);
            }
            else if (this.getTexture() == this.#attackTextures[16]){
                this.setTexture(this.#attackTextures[17]);
                this.setAttackFlag(1);
            }
            else if (this.getTexture() == this.#attackTextures[17]){
                this.setTexture(this.#textures[10]);
                this.setAttackFlag(0);
            }
        }
        startAttack(){
            if (this.getAttack() <= 0){
                this.setAttack(4);
            }
        }
        getAttackFlag(){
            return this.#attackFlag;
        }
        getAttack(){
            return this.#attack;
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
        getHealth(){
            return this.#health;
        }
        getPain(){
            return this.#pain;
        }
        setPain(a){
            this.#pain = a;
        }
        setHealth(a){
            this.#health = a;
        }
        setAttackFlag(a){
            this.#attackFlag = a;
        }
        setAttack(a){
            this.#attack = a;
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
            this.climbing();
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
                if(this.getX() < 22.5){
                    this.translateX(this.getSpeed());
                }
                else{
                    this.setRespawn(1);
                }
                this.walking();
            }
            else if(this.getRight()){
                if(this.getX() > -22.5){
                    this.translateX(-(this.getSpeed()));
                }
                else{
                    this.setRespawn(1);
                }
                this.walking();
            }
            else if(this.getUp()){
                this.translateY(this.getSpeed());
                this.climbing();
            }
            else if(this.getDown()){
                this.translateY(-(this.getSpeed()));
                this.climbing();
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
        walking(){
            //zombie 1
            if((this.getState() == 0) && (this.getTexture() != this.#textures[0]) && this.getZombieNumber() == "01"){
                this.setTexture(this.#textures[0]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[1]) && this.getZombieNumber() == "01"){
                this.setTexture(this.#textures[1]);
            }
            //zombie 2
            if((this.getState() == 0) && (this.getTexture() != this.#textures[2]) && this.getZombieNumber() == "02"){
                this.setTexture(this.#textures[2]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[3]) && this.getZombieNumber() == "02"){
                this.setTexture(this.#textures[3]);
            }
            //zombie 3
            if((this.getState() == 0) && (this.getTexture() != this.#textures[4]) && this.getZombieNumber() == "03"){
                this.setTexture(this.#textures[4]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[5]) && this.getZombieNumber() == "03"){
                this.setTexture(this.#textures[5]);
            }
            //zombie 4
            if((this.getState() == 0) && (this.getTexture() != this.#textures[6]) && this.getZombieNumber() == "04"){
                this.setTexture(this.#textures[6]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[7]) && this.getZombieNumber() == "04"){
                this.setTexture(this.#textures[7]);
            }
            //zombie 5
            if((this.getState() == 0) && (this.getTexture() != this.#textures[8]) && this.getZombieNumber() == "05"){
                this.setTexture(this.#textures[8]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[9]) && this.getZombieNumber() == "05"){
                this.setTexture(this.#textures[9]);
            }
            //zombie 6
            if((this.getState() == 0) && (this.getTexture() != this.#textures[10]) && this.getZombieNumber() == "06"){
                this.setTexture(this.#textures[10]);
            }
            else if ((this.getState() == 1) && (this.getTexture() != this.#textures[11]) && this.getZombieNumber() == "06"){
                this.setTexture(this.#textures[11]);
            }

        }
        climbing(){
            if(this.getUp() || this.getDown()){
                //zombie 1
                if(this.getZombieNumber() == "01" && this.getTexture() != this.#climbingTextures[0]){
                    this.setTexture(this.#climbingTextures[0]);

                }
                else if (this.getTexture() == this.#climbingTextures[0]){
                    this.setTexture(this.#climbingTextures[1]);

                }
                //zombie 2
                if(this.getZombieNumber() == "02" && this.getTexture() != this.#climbingTextures[2]){
                    this.setTexture(this.#climbingTextures[2]);

                }
                else if (this.getTexture() == this.#climbingTextures[2]){
                    this.setTexture(this.#climbingTextures[3]);

                }
                //zombie 3
                if(this.getZombieNumber() == "03" && this.getTexture() != this.#climbingTextures[4]){
                    this.setTexture(this.#climbingTextures[4]);

                }
                else if (this.getTexture() == this.#climbingTextures[4]){
                    this.setTexture(this.#climbingTextures[5]);
                }
                //zombie 4
                if(this.getZombieNumber() == "04" && this.getTexture() != this.#climbingTextures[6]){
                    this.setTexture(this.#climbingTextures[6]);

                }
                else if (this.getTexture() == this.#climbingTextures[6]){
                    this.setTexture(this.#climbingTextures[7]);

                }
                //zombie 5
                if(this.getZombieNumber() == "05" && this.getTexture() != this.#climbingTextures[8]){
                    this.setTexture(this.#climbingTextures[8]);

                }
                else if (this.getTexture() == this.#climbingTextures[8]){
                    this.setTexture(this.#climbingTextures[9]);

                }
                //zombie 6
                if(this.getZombieNumber() == "06" && this.getTexture() != this.#climbingTextures[10]){
                    this.setTexture(this.#climbingTextures[10]);

                }
                else if (this.getTexture() == this.#climbingTextures[10]){
                    this.setTexture(this.#climbingTextures[11]);

                }

            }
        }

        activateDamage(){
            if(this.getPain() <= 0){
                this.setPain(3);
            }
            this.#health = this.#health - 1;
        }

        damage(){
            if(this.getHealth() <= 0){
                this.setLife(false);
            }
            //zombie 1
            if(this.getZombieNumber() == "01" && (this.getTexture() != this.#damageTextures[0] 
            && this.getTexture() != this.#damageTextures[1])){
                this.setTexture(this.#damageTextures[0]);

            }
            else if (this.getTexture() == this.#damageTextures[0]){
                this.setTexture(this.#damageTextures[1]);

            }
            else if (this.getTexture() == this.#damageTextures[1]){
                this.setTexture(this.#textures[0]);

            }
            //zombie 2
            if(this.getZombieNumber() == "02" && (this.getTexture() != this.#damageTextures[2] 
            && this.getTexture() != this.#damageTextures[3])){
                this.setTexture(this.#damageTextures[2]);

            }
            else if (this.getTexture() == this.#damageTextures[2]){
                this.setTexture(this.#damageTextures[3]);

            }
            else if (this.getTexture() == this.#damageTextures[3]){
                this.setTexture(this.#textures[2]);

            }
            //zombie 3
            if(this.getZombieNumber() == "03" && (this.getTexture() != this.#damageTextures[5] 
            && this.getTexture() != this.#damageTextures[4])){
                this.setTexture(this.#damageTextures[4]);

            }
            else if (this.getTexture() == this.#damageTextures[4]){
                this.setTexture(this.#damageTextures[5]);
            
            }
            else if (this.getTexture() == this.#damageTextures[5]){
                this.setTexture(this.#textures[4]);

            }
            //zombie 4
            if(this.getZombieNumber() == "04" && (this.getTexture() != this.#damageTextures[6] 
            && this.getTexture() != this.#damageTextures[7])){
                this.setTexture(this.#damageTextures[6]);

            }
            else if (this.getTexture() == this.#damageTextures[6]){
                this.setTexture(this.#damageTextures[7]);
            
            }
            else if (this.getTexture() == this.#damageTextures[7]){
                this.setTexture(this.#textures[6]);

            }
            //zombie 5
            if(this.getZombieNumber() == "05" && (this.getTexture() != this.#damageTextures[8] 
            && this.getTexture() != this.#damageTextures[9])){
                this.setTexture(this.#damageTextures[8]);

            }
            else if (this.getTexture() == this.#damageTextures[8]){
                this.setTexture(this.#damageTextures[9]);

            }
            else if (this.getTexture() == this.#damageTextures[9]){
                this.setTexture(this.#textures[8]);

            }
            //zombie 6
            if(this.getZombieNumber() == "06" && (this.getTexture() != this.#damageTextures[10] 
            && this.getTexture() != this.#damageTextures[11])){
                this.setTexture(this.#damageTextures[10]);

            }
            else if (this.getTexture() == this.#damageTextures[10]){
                this.setTexture(this.#damageTextures[11]);

            }
            else if (this.getTexture() == this.#damageTextures[11]){
                this.setTexture(this.#textures[10]);

            }
            this.setPain(this.getPain() - 1);
        }

        death(){
            //zombie 1
            if(this.getZombieNumber() == "01" && this.getTexture() != this.#deathTextures[0]){
                this.setTexture(this.#deathTextures[0]);

            }
            else if (this.getTexture() == this.#deathTextures[0]){
                this.setTexture(this.#deathTextures[1]);

            }
            else if (this.getTexture() == this.#deathTextures[1]){
                this.setTexture(this.#deathTextures[2]);

            }
            else if (this.getTexture() == this.#deathTextures[2]){
                this.setTexture(this.#deathTextures[3]);

            }
            else if (this.getTexture() == this.#deathTextures[3]){
                this.setTexture(this.#deathTextures[4]);

            }
            else if (this.getTexture() == this.#deathTextures[4]){
                this.setTexture(this.#deathTextures[5]);
                this.setDeathFlag(1);
            }
            //zombie 2
            if(this.getZombieNumber() == "02" && this.getTexture() != this.#deathTextures[6]){
                this.setTexture(this.#deathTextures[6]);

            }
            else if (this.getTexture() == this.#deathTextures[6]){
                this.setTexture(this.#deathTextures[7]);

            }
            else if (this.getTexture() == this.#deathTextures[7]){
                this.setTexture(this.#deathTextures[8]);

            }
            else if (this.getTexture() == this.#deathTextures[8]){
                this.setTexture(this.#deathTextures[9]);

            }
            else if (this.getTexture() == this.#deathTextures[9]){
                this.setTexture(this.#deathTextures[10]);

            }
            else if (this.getTexture() == this.#deathTextures[10]){
                this.setTexture(this.#deathTextures[11]);
                this.setDeathFlag(1);
            }
            //zombie 3
            if(this.getZombieNumber() == "03" && this.getTexture() != this.#deathTextures[12]){
                this.setTexture(this.#deathTextures[12]);

            }
            else if (this.getTexture() == this.#deathTextures[12]){
                this.setTexture(this.#deathTextures[13]);

            }
            else if (this.getTexture() == this.#deathTextures[13]){
                this.setTexture(this.#deathTextures[14]);

            }
            else if (this.getTexture() == this.#deathTextures[14]){
                this.setTexture(this.#deathTextures[15]);

            }
            else if (this.getTexture() == this.#deathTextures[15]){
                this.setTexture(this.#deathTextures[16]);

            }
            else if (this.getTexture() == this.#deathTextures[16]){
                this.setTexture(this.#deathTextures[17]);
                this.setDeathFlag(1);
            }
            //zombie 4
            if(this.getZombieNumber() == "04" && this.getTexture() != this.#deathTextures[18]){
                this.setTexture(this.#deathTextures[18]);

            }
            else if (this.getTexture() == this.#deathTextures[18]){
                this.setTexture(this.#deathTextures[19]);

            }
            else if (this.getTexture() == this.#deathTextures[19]){
                this.setTexture(this.#deathTextures[20]);

            }
            else if (this.getTexture() == this.#deathTextures[20]){
                this.setTexture(this.#deathTextures[21]);

            }
            else if (this.getTexture() == this.#deathTextures[21]){
                this.setTexture(this.#deathTextures[22]);

            }
            else if (this.getTexture() == this.#deathTextures[22]){
                this.setTexture(this.#deathTextures[23]);
                this.setDeathFlag(1);
            }
            //zombie 5
            if(this.getZombieNumber() == "05" && this.getTexture() != this.#deathTextures[24]){
                this.setTexture(this.#deathTextures[24]);

            }
            else if (this.getTexture() == this.#deathTextures[24]){
                this.setTexture(this.#deathTextures[25]);

            }
            else if (this.getTexture() == this.#deathTextures[25]){
                this.setTexture(this.#deathTextures[26]);

            }
            else if (this.getTexture() == this.#deathTextures[26]){
                this.setTexture(this.#deathTextures[27]);

            }
            else if (this.getTexture() == this.#deathTextures[27]){
                this.setTexture(this.#deathTextures[28]);

            }
            else if (this.getTexture() == this.#deathTextures[28]){
                this.setTexture(this.#deathTextures[29]);
                this.setDeathFlag(1);
            }
            //zombie 6
            if(this.getZombieNumber() == "06" && this.getTexture() != this.#deathTextures[30]){
                this.setTexture(this.#deathTextures[30]);

            }
            else if (this.getTexture() == this.#deathTextures[30]){
                this.setTexture(this.#deathTextures[31]);

            }
            else if (this.getTexture() == this.#deathTextures[31]){
                this.setTexture(this.#deathTextures[32]);

            }
            else if (this.getTexture() == this.#deathTextures[32]){
                this.setTexture(this.#deathTextures[33]);

            }
            else if (this.getTexture() == this.#deathTextures[33]){
                this.setTexture(this.#deathTextures[34]);

            }
            else if (this.getTexture() == this.#deathTextures[34]){
                this.setTexture(this.#deathTextures[35]);
                this.setDeathFlag(1);
            }

        }

        setDeathFlag(a){
            this.#deathFlag = a;
        }
        getDeathFlag(){
            return this.#deathFlag;
        }

        getZombieNumber(){
            for (let tex of this.#ONEtextures){
                if (this.getTexture() == tex)
                    return "01";
            }
            for (let tex of this.#TWOtextures){
                if (this.getTexture() == tex)
                    return "02";
            }
            for (let tex of this.#THREEtextures){
                if (this.getTexture() == tex)
                    return "03";
            }
            for (let tex of this.#FOURtextures){
                if (this.getTexture() == tex)
                    return "04";
            }
            for (let tex of this.#FIVEtextures){
                if (this.getTexture() == tex)
                    return "05";
            }
            for (let tex of this.#SIXtextures){
                if (this.getTexture() == tex)
                    return "06";
            }
        }

    };
    return {
        Zombie: Zombie,
    };
})();
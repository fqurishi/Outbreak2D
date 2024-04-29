import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import {gameobject} from './GameObject.js';

export const ghostAvatar = (() => {

    class GhostAvatar extends gameobject.GameObject{
        #postion;
        #avatar;
        #health;
        #bulletR;
        tex3; tex4; tex5; tex6; tex7; tex8; tex9; tex10; tex11; tex12; tex13; tex14; tex15;
        //rigo
        grimTex1; grimTex2; grimTex3; grimTex4; grimTex5; grimTex6; grimTex7;
        grimTex8; grimTex9; grimTex10; grimTex11; grimTex12; grimTex13;
        //jaece
        grimTex1; grimTex2; grimTex3; grimTex4; grimTex5; grimTex6; grimTex7;
        grimTex8; grimTex9; grimTex10; grimTex11; grimTex12; grimTex13;
        //brayden
        grimTex1; grimTex2; grimTex3; grimTex4; grimTex5; grimTex6; grimTex7;
        grimTex8; grimTex9; grimTex10; grimTex11; grimTex12; grimTex13;
        //grim
        grimTex1; grimTex2; grimTex3; grimTex4; grimTex5; grimTex6; grimTex7;
        grimTex8; grimTex9; grimTex10; grimTex11; grimTex12; grimTex13;
        constructor(avatar){
            super();
            this.setAvatar(avatar);
            //rigo
            this.alexTex1 = new THREE.TextureLoader().load( './resources/Character_02/Stand.png' );
            this.alexTex3 = new THREE.TextureLoader().load( './resources/Character_02/Gun_Stand.png' );
            this.alexTex4 = new THREE.TextureLoader().load( './resources/Character_02/Gun_Walk.png' );
            this.alexTex5 = new THREE.TextureLoader().load( './resources/Character_02/Climbing _01.png' );
            this.alexTex6 = new THREE.TextureLoader().load( './resources/Character_02/Climbing _02.png' );
            this.alexTex2 = new THREE.TextureLoader().load( './resources/Character_02/Walk.png' );
            this.alexTex7 = new THREE.TextureLoader().load( './resources/Character_02/Damage_01.png' );
            this.alexTex8 = new THREE.TextureLoader().load( './resources/Character_02/Damage_02.png' );
            this.alexTex9 = new THREE.TextureLoader().load( './resources/Character_02/Death_01.png' );
            this.alexTex10 = new THREE.TextureLoader().load( './resources/Character_02/Death_02.png' );
            this.alexTex11 = new THREE.TextureLoader().load( './resources/Character_02/Death_03.png' );
            this.alexTex12 = new THREE.TextureLoader().load( './resources/Character_02/Death_04.png' );
            this.alexTex13 = new THREE.TextureLoader().load( './resources/Character_02/Death_05.png' ); 
            //jaece
            this.jamesTex1 = new THREE.TextureLoader().load( './resources/Character_01/Stand.png' );
            this.jamesTex3 = new THREE.TextureLoader().load( './resources/Character_01/Gun_Stand.png' );
            this.jamesTex4 = new THREE.TextureLoader().load( './resources/Character_01/Gun_Walk.png' );
            this.jamesTex5 = new THREE.TextureLoader().load( './resources/Character_01/Climbing _01.png' );
            this.jamesTex6 = new THREE.TextureLoader().load( './resources/Character_01/Climbing _02.png' );
            this.jamesTex2 = new THREE.TextureLoader().load( './resources/Character_01/Walk.png' );
            this.jamesTex7 = new THREE.TextureLoader().load( './resources/Character_01/Damage_01.png' );
            this.jamesTex8 = new THREE.TextureLoader().load( './resources/Character_01/Damage_02.png' );
            this.jamesTex9 = new THREE.TextureLoader().load( './resources/Character_01/Death_01.png' );
            this.jamesTex10 = new THREE.TextureLoader().load( './resources/Character_01/Death_02.png' );
            this.jamesTex11 = new THREE.TextureLoader().load( './resources/Character_01/Death_03.png' );
            this.jamesTex12 = new THREE.TextureLoader().load( './resources/Character_01/Death_04.png' );
            this.jamesTex13 = new THREE.TextureLoader().load( './resources/Character_01/Death_05.png' );
            //grim
            this.grimTex1 = new THREE.TextureLoader().load( './resources/Character_04/Stand.png' );
            this.grimTex3 = new THREE.TextureLoader().load( './resources/Character_04/Gun_Stand.png' );
            this.grimTex4 = new THREE.TextureLoader().load( './resources/Character_04/Gun_Walk.png' );
            this.grimTex5 = new THREE.TextureLoader().load( './resources/Character_04/Climbing _01.png' );
            this.grimTex6 = new THREE.TextureLoader().load( './resources/Character_04/Climbing _02.png' );
            this.grimTex2 = new THREE.TextureLoader().load( './resources/Character_04/Walk.png' );
            this.grimTex7 = new THREE.TextureLoader().load( './resources/Character_04/Damage_01.png' );
            this.grimTex8 = new THREE.TextureLoader().load( './resources/Character_04/Damage_02.png' );
            this.grimTex9 = new THREE.TextureLoader().load( './resources/Character_04/Death_01.png' );
            this.grimTex10 = new THREE.TextureLoader().load( './resources/Character_04/Death_02.png' );
            this.grimTex11 = new THREE.TextureLoader().load( './resources/Character_04/Death_03.png' );
            this.grimTex12 = new THREE.TextureLoader().load( './resources/Character_04/Death_04.png' );
            this.grimTex13 = new THREE.TextureLoader().load( './resources/Character_04/Death_05.png' );
            //brayden
            this.cyrusTex1 = new THREE.TextureLoader().load( './resources/Character_03/Stand.png' );
            this.cyrusTex3 = new THREE.TextureLoader().load( './resources/Character_03/Gun_Stand.png' );
            this.cyrusTex4 = new THREE.TextureLoader().load( './resources/Character_03/Gun_Walk.png' );
            this.cyrusTex5 = new THREE.TextureLoader().load( './resources/Character_03/Climbing _01.png' );
            this.cyrusTex6 = new THREE.TextureLoader().load( './resources/Character_03/Climbing _02.png' );
            this.cyrusTex2 = new THREE.TextureLoader().load( './resources/Character_03/Walk.png' );
            this.cyrusTex7 = new THREE.TextureLoader().load( './resources/Character_03/Damage_01.png' );
            this.cyrusTex8 = new THREE.TextureLoader().load( './resources/Character_03/Damage_02.png' );
            this.cyrusTex9 = new THREE.TextureLoader().load( './resources/Character_03/Death_01.png' );
            this.cyrusTex10 = new THREE.TextureLoader().load( './resources/Character_03/Death_02.png' );
            this.cyrusTex11 = new THREE.TextureLoader().load( './resources/Character_03/Death_03.png' );
            this.cyrusTex12 = new THREE.TextureLoader().load( './resources/Character_03/Death_04.png' );
            this.cyrusTex13 = new THREE.TextureLoader().load( './resources/Character_03/Death_05.png' );
            this.setTextures();
            this.setBulletR(2);

            
        }
        getBulletR(){
            return this.#bulletR;
        }
        setBulletR(a){
            this.#bulletR = a;
        }

        getPosition(){
            return this.#postion;
        }
        setPosition(a){
            this.#postion = a;
        }
        getHealth(){
            return this.#health;
        }
        setHealth(a){
            this.#health = a;
        }
        getAvatar(){
            return this.#avatar;
        }
        setAvatar(a){
            this.#avatar = a;
        }
        setTextures(){
            switch(this.getAvatar()){
                case "Rigo":
                    this.tex3 = this.alexTex1;
                    this.tex4 = this.alexTex2;
                    this.tex5 = this.alexTex3;
                    this.tex6 = this.alexTex4;
                    this.tex7 = this.alexTex5;
                    this.tex8 = this.alexTex6;
                    this.tex9 = this.alexTex7
                    this.tex10 = this.alexTex8
                    this.tex11 = this.alexTex9
                    this.tex12 = this.alexTex10
                    this.tex13 = this.alexTex11
                    this.tex14 = this.alexTex12
                    this.tex15 = this.alexTex13
                    break;
                case "Jaece":
                    this.tex3 = this.jamesTex1;
                    this.tex4 = this.jamesTex2;
                    this.tex5 = this.jamesTex3;
                    this.tex6 = this.jamesTex4;
                    this.tex7 = this.jamesTex5;
                    this.tex8 = this.jamesTex6;
                    this.tex9 = this.jamesTex7;
                    this.tex10 = this.jamesTex8;
                    this.tex11 = this.jamesTex9;
                    this.tex12 = this.jamesTex10;
                    this.tex13 = this.jamesTex11;
                    this.tex14 = this.jamesTex12;
                    this.tex15 = this.jamesTex13;
                  break;
                case "Grim":
                    this.tex3 = this.grimTex1;
                    this.tex4 = this.grimTex2;
                    this.tex5 = this.grimTex3;
                    this.tex6 = this.grimTex4;
                    this.tex7 = this.grimTex5;
                    this.tex8 = this.grimTex6;
                    this.tex9 = this.grimTex7;
                    this.tex10 = this.grimTex8;
                    this.tex11 = this.grimTex9;
                    this.tex12 = this.grimTex10;
                    this.tex13 = this.grimTex11;
                    this.tex14 = this.grimTex12;
                    this.tex15 = this.grimTex13;
                    break;
                case "Brayden":
                    this.tex3 = this.cyrusTex1;
                    this.tex4 = this.cyrusTex2;
                    this.tex5 = this.cyrusTex3;
                    this.tex6 = this.cyrusTex4;
                    this.tex7 = this.cyrusTex5;
                    this.tex8 = this.cyrusTex6;
                    this.tex9 = this.cyrusTex7;
                    this.tex10 = this.cyrusTex8;
                    this.tex11 = this.cyrusTex9;
                    this.tex12 = this.cyrusTex10;
                    this.tex13 = this.cyrusTex11;
                    this.tex14 = this.cyrusTex12;
                    this.tex15 = this.cyrusTex13;
                    break;
                default:
                  // code block
            }
        }
        setTextureState(a){
            switch(a){
                case 1:
                    return this.tex3;
                case 2:
                    return this.tex4;
                case 3:
                    return this.tex5;
                case 4:
                    return this.tex6;
                case 5:
                    return this.tex7;
                case 6:
                    return this.tex8;
                case 7:
                    return this.tex9;
                case 8:
                    return this.tex10;
                case 9:
                    return this.tex11;
                case 10:
                    return this.tex12;
                case 11:
                    return this.tex13;
                case 12:
                    return this.tex14;
                case 13:
                    return this.tex15;
                default:
            }
        }
        setTextureDirection(a){
            if(a == "left"){
                this.getTexture().center.set( 0.5, 0.5 );
                this.getTexture().repeat.set( 1, 1 );
            }
            else if(a == "right"){
                this.getTexture().center.set( 0.5, 0.5 );
                this.getTexture().repeat.set( -1, 1 );
            }
        }


    };
    return {
        GhostAvatar: GhostAvatar,
    };
})();
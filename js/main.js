import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {player} from './Player.js'
import {bullet} from './Bullet.js'
import {zombie} from './Zombie.js'
import {gamefunctions} from './Functions.js'
import * as CLIENT from './Client.js'

            let scene, camera, renderer;
            let avatar;
            //window
            window.addEventListener( 'resize', onWindowResize, false ); 
            CLIENT.Main();
            const alexButton = document.getElementById('Alex');
            const jamesButton = document.getElementById('James');
            const cyrusButton = document.getElementById('Cyrus');
            const grimButton = document.getElementById('Grim');
            const startButton = document.getElementById('startButton');
            alexButton.addEventListener('click', selectAvatar);
            jamesButton.addEventListener('click', selectAvatar);
            cyrusButton.addEventListener('click', selectAvatar);
            grimButton.addEventListener('click', selectAvatar);
            startButton.addEventListener('click', init);
            let player1 = new player.Player();
            let bullet1;
            let zombie1;
            let bulletObjects = new Array();
            let zombieObjects = new Array();
            let lastRender = 0;
            let p = 0;
            let z = 0;
            let b = 0;
            let red = new THREE.Color(0xFF0000);
            let white = new THREE.Color(0xFFFFFF);
            //spawn points for zombies later on in game when zombies appear from off screen
            let spawnPoint = [-21, 21];
            //controller inputs
            let spaceUp = true;

            //misc textures initializing
            const tex1 = new THREE.TextureLoader().load( './resources/OBbackground.png' );
            const tex2 = new THREE.TextureLoader().load( './resources/bullet.png' );
            let tex3, tex4, tex5, tex6, tex7, tex8, tex9, tex10, tex11, tex12, tex13, tex14, tex15;
            
            // character 1 texture initializing
            const jamesTex1 = new THREE.TextureLoader().load( './resources/Character_01/Stand.png' );
            const jamesTex3 = new THREE.TextureLoader().load( './resources/Character_01/Gun_Stand.png' );
            const jamesTex4 = new THREE.TextureLoader().load( './resources/Character_01/Gun_Walk.png' );
            const jamesTex5 = new THREE.TextureLoader().load( './resources/Character_01/Climbing _01.png' );
            const jamesTex6 = new THREE.TextureLoader().load( './resources/Character_01/Climbing _02.png' );
            const jamesTex2 = new THREE.TextureLoader().load( './resources/Character_01/Walk.png' );
            const jamesTex7 = new THREE.TextureLoader().load( './resources/Character_01/Damage_01.png' );
            const jamesTex8 = new THREE.TextureLoader().load( './resources/Character_01/Damage_02.png' );
            const jamesTex9 = new THREE.TextureLoader().load( './resources/Character_01/Death_01.png' );
            const jamesTex10 = new THREE.TextureLoader().load( './resources/Character_01/Death_02.png' );
            const jamesTex11 = new THREE.TextureLoader().load( './resources/Character_01/Death_03.png' );
            const jamesTex12 = new THREE.TextureLoader().load( './resources/Character_01/Death_04.png' );
            const jamesTex13 = new THREE.TextureLoader().load( './resources/Character_01/Death_05.png' );
                            
            // character 2 Texture initializing
            const alexTex1 = new THREE.TextureLoader().load( './resources/Character_02/Stand.png' );
            const alexTex3 = new THREE.TextureLoader().load( './resources/Character_02/Gun_Stand.png' );
            const alexTex4 = new THREE.TextureLoader().load( './resources/Character_02/Gun_Walk.png' );
            const alexTex5 = new THREE.TextureLoader().load( './resources/Character_02/Climbing _01.png' );
            const alexTex6 = new THREE.TextureLoader().load( './resources/Character_02/Climbing _02.png' );
            const alexTex2 = new THREE.TextureLoader().load( './resources/Character_02/Walk.png' );
            const alexTex7 = new THREE.TextureLoader().load( './resources/Character_02/Damage_01.png' );
            const alexTex8 = new THREE.TextureLoader().load( './resources/Character_02/Damage_02.png' );
            const alexTex9 = new THREE.TextureLoader().load( './resources/Character_02/Death_01.png' );
            const alexTex10 = new THREE.TextureLoader().load( './resources/Character_02/Death_02.png' );
            const alexTex11 = new THREE.TextureLoader().load( './resources/Character_02/Death_03.png' );
            const alexTex12 = new THREE.TextureLoader().load( './resources/Character_02/Death_04.png' );
            const alexTex13 = new THREE.TextureLoader().load( './resources/Character_02/Death_05.png' );
            
            //character 3 texture initializing
            const cyrusTex1 = new THREE.TextureLoader().load( './resources/Character_03/Stand.png' );
            const cyrusTex3 = new THREE.TextureLoader().load( './resources/Character_03/Gun_Stand.png' );
            const cyrusTex4 = new THREE.TextureLoader().load( './resources/Character_03/Gun_Walk.png' );
            const cyrusTex5 = new THREE.TextureLoader().load( './resources/Character_03/Climbing _01.png' );
            const cyrusTex6 = new THREE.TextureLoader().load( './resources/Character_03/Climbing _02.png' );
            const cyrusTex2 = new THREE.TextureLoader().load( './resources/Character_03/Walk.png' );
            const cyrusTex7 = new THREE.TextureLoader().load( './resources/Character_03/Damage_01.png' );
            const cyrusTex8 = new THREE.TextureLoader().load( './resources/Character_03/Damage_02.png' );
            const cyrusTex9 = new THREE.TextureLoader().load( './resources/Character_03/Death_01.png' );
            const cyrusTex10 = new THREE.TextureLoader().load( './resources/Character_03/Death_02.png' );
            const cyrusTex11 = new THREE.TextureLoader().load( './resources/Character_03/Death_03.png' );
            const cyrusTex12 = new THREE.TextureLoader().load( './resources/Character_03/Death_04.png' );
            const cyrusTex13 = new THREE.TextureLoader().load( './resources/Character_03/Death_05.png' );
        
            //character 4 texture initializing
            const grimTex1 = new THREE.TextureLoader().load( './resources/Character_04/Stand.png' );
            const grimTex3 = new THREE.TextureLoader().load( './resources/Character_04/Gun_Stand.png' );
            const grimTex4 = new THREE.TextureLoader().load( './resources/Character_04/Gun_Walk.png' );
            const grimTex5 = new THREE.TextureLoader().load( './resources/Character_04/Climbing _01.png' );
            const grimTex6 = new THREE.TextureLoader().load( './resources/Character_04/Climbing _02.png' );
            const grimTex2 = new THREE.TextureLoader().load( './resources/Character_04/Walk.png' );
            const grimTex7 = new THREE.TextureLoader().load( './resources/Character_04/Damage_01.png' );
            const grimTex8 = new THREE.TextureLoader().load( './resources/Character_04/Damage_02.png' );
            const grimTex9 = new THREE.TextureLoader().load( './resources/Character_04/Death_01.png' );
            const grimTex10 = new THREE.TextureLoader().load( './resources/Character_04/Death_02.png' );
            const grimTex11 = new THREE.TextureLoader().load( './resources/Character_04/Death_03.png' );
            const grimTex12 = new THREE.TextureLoader().load( './resources/Character_04/Death_04.png' );
            const grimTex13 = new THREE.TextureLoader().load( './resources/Character_04/Death_05.png' );

            // selecting player's avatar
            function selectAvatar() {
                const selectSreen = document.getElementById( 'CharacterSelect' );
				selectSreen.remove();
                avatar = this.id;
                console.log(avatar);
            }
            
            function init() {
                const overlay = document.getElementById( 'overlay' );
				overlay.remove();


                //camera and scene init
			    scene = new THREE.Scene();
                scene.background = new THREE.Color( 0x0000 );
			    camera = new THREE.PerspectiveCamera( 100, window.innerWidth / window.innerHeight, 1, 800 );
                camera.position.set( 15, 0, 0 );
			    camera.lookAt( scene.position );

                //audio
                // create an AudioListener and add it to the camera
                const listener = new THREE.AudioListener();
                camera.add( listener );

                // create a global audio source
                const bgm = new THREE.Audio( listener );
                // create more sound sources
                const s1 = new THREE.Audio( listener );
                const s2 = new THREE.Audio( listener );
                const s3 = new THREE.Audio( listener );
                const s4 = new THREE.Audio( listener );

                // load a sound and set it as the Audio object's buffer
                const audioLoader = new THREE.AudioLoader();
                audioLoader.load( './resources/Song.mp3', function( buffer ) {
	                bgm.setBuffer( buffer );
	                bgm.setLoop( true );
	                bgm.setVolume( 0.5 );
	                bgm.play();
                }
                );
                audioLoader.load( './resources/Walking1.wav', function( buffer ) {
	                s1.setBuffer( buffer );
	                s1.setLoop( false );
	                s1.setVolume( 0.5 );
                }
                );
                audioLoader.load( './resources/Walking2.wav', function( buffer ) {
	                s2.setBuffer( buffer );
	                s2.setLoop( false );
	                s2.setVolume( 0.5 );
                }
                );
                audioLoader.load( './resources/GunShot.wav', function( buffer ) {
	                s3.setBuffer( buffer );
	                s3.setLoop( false );
	                s3.setVolume( 0.5 );
                }
                );
                audioLoader.load( './resources/Ladder.wav', function( buffer ) {
	                s4.setBuffer( buffer );
	                s4.setLoop( false );
	                s4.setVolume( 0.5 );
                }
                );

                //render
			    renderer = new THREE.WebGLRenderer();
			    renderer.setSize( window.innerWidth, window.innerHeight );
			    document.body.appendChild( renderer.domElement );


                //sprite loading
                const mBackground = new THREE.SpriteMaterial( {map: tex1} );
                const bgSprite = new THREE.Sprite(mBackground);
                bgSprite.scale.set(48,36,1);

                //load player
                setPlayerTextures(avatar);
                player1.setLeft(1);
                player1.getSprite().position.set( 1, 0, 0);
                player1.getSprite().scale.set(5,4,1);
                player1.setTexture(tex3);
                scene.add(bgSprite);
                scene.add(player1.getSprite());

                //load zombies
                //create zombies and set them up
                for(let i=0;i<10;i++){
                    zombie1 = new zombie.Zombie();
		            //give zombies their texture
                    zombie1.getSprite().position.setX(1);
                    zombie1.getSprite().scale.set(5,4,1);
		            //make sure zombies dont spawn on players position
                    if(zombie1.getX() == player1.getX() && zombie1.getY() == player1.getY()){
                        zombie1.setX(Math.floor(Math.random() * 43)-21.5);
                    }
		            //put the zombies into the zombie list
                    zombieObjects.push(zombie1);
                    scene.add(zombie1.getSprite());
                }


                window.addEventListener( 'keydown', function ( event ) {
                    switch ( event.key) {
                        case 'w': // w
                        case 'W':
                        case 'ArrowUp': //up
                            if(gamefunctions.ladderUpCollision(player1.getSprite().position.z,player1.getSprite().position.y) == true){
                                player1.setUp(1);
                                player1.update();
                            }
                            break;
                        case 'a': // a
                        case 'A':
                        case 'ArrowLeft': //left
                            if(gamefunctions.usingLadder(player1.getSprite().position.y) == false){
                                player1.setLeft(1);
                                player1.update();
                            }
                            break;
                        case 's': // s
                        case 'S':
                        case 'ArrowDown': //down
                            if(gamefunctions.ladderDownCollision(player1.getSprite().position.z,player1.getSprite().position.y) == true){
                                player1.setDown(1);
                                player1.update();
                            }
                            break;
                        case 'd': // d
                        case 'D':
                        case 'ArrowRight': //right
                            if(gamefunctions.usingLadder(player1.getSprite().position.y) == false){
                                player1.setRight(1);
                                player1.update()
                            }
                            break;
                        case ' ': //space
                            if(player1.getAmmo() != 0 && spaceUp == true && s3.isPlaying != true
                            && gamefunctions.usingLadder(player1.getSprite().position.y) == false
                            && (player1.getTexture() != tex7 && player1.getTexture() != tex8)){
                                spaceUp = false;
                                player1.shootGun();
                            }


                    }
                }
                );
                window.addEventListener( 'keyup', function ( event ) {
                    switch ( event.key) {
                        case ' ': // space
                            spaceUp = true;
                            break;
                    }
                }
                );

            //game tick
            const tick = function(progress){
                p += progress;
                z += progress;
                b += progress;
                if (b > 15){
                    for(let object of bulletObjects){
                        object.update();
                    }
                    b = 0;
                }
                if(z > 180){
                    for(let object of zombieObjects){
                    if(object.getLife()){
                        if(gamefunctions.ladderUpCollision(object.getSprite().position.z,object.getSprite().position.y) == true
                            && player1.getY() > object.getY() ){
                            object.setUp(1);
                            object.update();
                        }
                        else if(gamefunctions.ladderDownCollision(object.getSprite().position.z,object.getSprite().position.y) == true 
                            && player1.getY() < object.getY() ){
                            object.setDown(1);
                            object.update();
                        }
                        else{
                            if(gamefunctions.isSpriteOnFloor(object.getY())){
                                object.setLadderOff();
                                if (gamefunctions.sameFloor(object,player1) && object.getX() > player1.getX() && player1.getLife()){
                                    object.setRight(1);
                                    object.setSpeed(0.85);
           
                                }
                                else if (gamefunctions.sameFloor(object,player1) && object.getX() < player1.getX() && player1.getLife()){
                                    object.setLeft(1);
                                    object.setSpeed(0.85);
        
                                }
                                else{
                                    object.setLeft(object.getRightOrLeft());
                                    object.setSpeed(0.5);
                                }
                            }
                            if((!gamefunctions.isCollide(player1,object) || !player1.getLife()
                            || object.isAttacking() == false)
                            && (object.getPain() <= 0)){
                                object.update();
                            }
                            object.setState(!object.getState());
                            if(object.getRespawn() == 1){
                                object.setSpawnPoint();
                                object.setRespawn(0);
                            }
                            if(object.isAttacking() == true){
                                object.attacking();
                                object.setAttack(object.getAttack() - 1);
                            }
                            if(object.getPain() <= 3 && object.getPain() > 0)
                                object.damage();
                        }
                        object.updateDirection();
                    }
                    else{
                        object.death();
                        if(gamefunctions.isSpriteOnFloor(object.getSprite().position.y) == false){
                            object.translateY(-1);
                        }
                    }
                    z = 0;
                    }
                }
                if(p > 120 && player1.getLife()){
                    if(player1.getKeyPressRight()){
                        if (player1.getTexture() == tex3 || player1.getTexture() == tex5){
                            player1.setTexture(tex4);
                            s1.play();
                        }else{
                            player1.setTexture(tex3);
                            s2.play();
                        }
                        player1.translateX(-1);
                        player1.setKeysOff();
                    }
                    else if(player1.getKeyPressLeft()){
                        if (player1.getTexture() == tex3 || player1.getTexture() == tex5){
                            player1.setTexture(tex4);
                            s1.play();
                        }else{
                            player1.setTexture(tex3);
                            s2.play();
                        }
                        player1.translateX(1);
                        player1.setKeysOff();
                    }
                    else if(player1.getKeyPressUp()){
                        player1.translateY(1);
                        if (player1.getTexture() != tex7){
                            player1.setTexture(tex7);
                        }else{
                            player1.setTexture(tex8);
                        }
                        s4.play();
                        player1.setKeysOff();
                    }
                    else if(player1.getKeyPressDown()){
                        player1.translateY(-1);
                        if (player1.getTexture() != tex7){
                            player1.setTexture(tex7);
                        }else{
                            player1.setTexture(tex8);
                        }
                        s4.play();
                        player1.setKeysOff();
                    }
                    else if(player1.getKeyPressSpace()){
                        let y;
                        if(player1.getTexture() == tex3 || player1.getTexture() == tex5){
                            player1.setTexture(tex5);
                            y = 0.65;
                        }
                        else if(player1.getTexture() == tex4 || player1.getTexture() == tex6
                        || player1.getTexture() == tex9 || player1.getTexture() == tex10){
                            player1.setTexture(tex6);
                            y = 0.6;
                        }
                        if(player1.getRight()){
                            player1.shotGun();
                            s3.play();
                            bullet1 = new bullet.Bullet(player1.getSprite().position.z-1.25,player1.getSprite().position.y+y);
                            bullet1.getSprite().position.setX(1);
                            bullet1.getSprite().scale.set(0.2,0.1,1);
                            bullet1.setTexture(tex2);
                            bulletObjects.push(bullet1);
                            scene.add(bullet1.getSprite());
                            bullet1.setRight(1);
                            bullet1.update();

                        }
                        else if(player1.getLeft){
                            player1.shotGun();
                            s3.play();
                            bullet1 = new bullet.Bullet(player1.getSprite().position.z+1.25,player1.getSprite().position.y+y);
                            bullet1.getSprite().position.setX(1);
                            bullet1.getSprite().scale.set(0.2,0.1,1);
                            bullet1.setTexture(tex2);
                            bulletObjects.push(bullet1);
                            scene.add(bullet1.getSprite());
                            bullet1.setLeft(1);
                            bullet1.update();
                        }
                    }
                    for (let object of zombieObjects){
                        if(gamefunctions.isCollide(player1,object)){
                            object.startAttack();
                            if(object.getAttackFlag() == 1)
                                player1.damaged();
                        }
                    }
                    if(player1.getPain() <= 3 && player1.getPain() > 0){
                        if(player1.getTexture() == tex3 || player1.getTexture() == tex4
                        || player1.getTexture() == tex8 || player1.getTexture() == tex7
                        || player1.getTexture() == tex5 || player1.getTexture() == tex6
                        && !player1.isShooting())
                            player1.setTexture(tex9);
                        else if (player1.getTexture() == tex9 && !player1.isShooting())
                            player1.setTexture(tex10);
                        else
                            if (player1.isShooting())
                                player1.setTexture(tex5);
                            else
                                player1.setTexture(tex3);
                        player1.setPain(player1.getPain() - 1);
                    }
                    else{
                        if(player1.getTexture() == tex9 || player1.getTexture() == tex10)
                            player1.setTexture(tex4);
                    }
                    player1.holster();
                    player1.updateDirection();
                    p = 0;
                }else if ( p > 120 && !player1.getLife()){
                    if (player1.getTexture() != tex11 && player1.getTexture() != tex12
                        && player1.getTexture() != tex13 && player1.getTexture() != tex14
                        && player1.getTexture() != tex15)
                        player1.setTexture(tex11);
                    else if (player1.getTexture() == tex11)
                        player1.setTexture(tex12);
                    else if (player1.getTexture() == tex12)
                        player1.setTexture(tex13);
                    else if (player1.getTexture() == tex13)
                        player1.setTexture(tex14);
                    else if (player1.getTexture() == tex14)
                        player1.setTexture(tex15);
                    p = 0;
                    if(gamefunctions.isSpriteOnFloor(player1.getSprite().position.y) == false){
                        player1.translateY(-1);
                    }
                }
            }

            //animate
            const animate = function (timestamp) {
                let progress = timestamp - lastRender;
                for(let object of bulletObjects){
                    for (let zObject of zombieObjects){
                        if(gamefunctions.isCollide(object,zObject) && zObject.getLife()){
                            object.setLife(0);
                            zObject.activateDamage();
                        }
                    }
                    if(object.getLife() == false){
                        scene.remove(object.getSprite());
                        object.getSprite().material.dispose();
                        for( let i = 0; i < bulletObjects.length; i++){ 
                            if ( bulletObjects[i] == object) { 
                                bulletObjects.splice(i, 1); 
                            }
                        
                        }
                    }
                }
                for (let object of zombieObjects){
                    gamefunctions.setSpriteFloor(object.getSprite(),object.getY());
                    if(object.getLife() == false && object.getDeathFlag()){
                        for( let i = 0; i < zombieObjects.length; i++){ 
                            if ( zombieObjects[i] == object) { 
                                zombieObjects.splice(i, 1); 
                            }
                        }
                    }
                }
                if(player1.getLife() == false){
                    gameOver();
                }
                
                tick(progress);
                lastRender = timestamp;
                gamefunctions.setSpriteFloor(player1.getSprite(),player1.getSprite().position.y);
				renderer.render( scene, camera );
                requestAnimationFrame(animate);
			};
            animate(1);
        }

        function setPlayerTextures(id){
            switch(id) {
                case "Alex":
                    tex3 = alexTex1;
                    tex4 = alexTex2;
                    tex5 = alexTex3;
                    tex6 = alexTex4;
                    tex7 = alexTex5;
                    tex8 = alexTex6;
                    tex9 = alexTex7
                    tex10 = alexTex8
                    tex11 = alexTex9
                    tex12 = alexTex10
                    tex13 = alexTex11
                    tex14 = alexTex12
                    tex15 = alexTex13
                    break;
                case "James":
                    tex3 = jamesTex1;
                    tex4 = jamesTex2;
                    tex5 = jamesTex3;
                    tex6 = jamesTex4;
                    tex7 = jamesTex5;
                    tex8 = jamesTex6;
                    tex9 = jamesTex7;
                    tex10 = jamesTex8;
                    tex11 = jamesTex9;
                    tex12 = jamesTex10;
                    tex13 = jamesTex11;
                    tex14 = jamesTex12;
                    tex15 = jamesTex13;
                  break;
                case "Grim":
                    tex3 = grimTex1;
                    tex4 = grimTex2;
                    tex5 = grimTex3;
                    tex6 = grimTex4;
                    tex7 = grimTex5;
                    tex8 = grimTex6;
                    tex9 = grimTex7;
                    tex10 = grimTex8;
                    tex11 = grimTex9;
                    tex12 = grimTex10;
                    tex13 = grimTex11;
                    tex14 = grimTex12;
                    tex15 = grimTex13;
                    break;
                case "Cyrus":
                    tex3 = cyrusTex1;
                    tex4 = cyrusTex2;
                    tex5 = cyrusTex3;
                    tex6 = cyrusTex4;
                    tex7 = cyrusTex5;
                    tex8 = cyrusTex6;
                    tex9 = cyrusTex7;
                    tex10 = cyrusTex8;
                    tex11 = cyrusTex9;
                    tex12 = cyrusTex10;
                    tex13 = cyrusTex11;
                    tex14 = cyrusTex12;
                    tex15 = cyrusTex13;
                    break;
                default:
                  // code block
            }
        }

        function gameOver() {
            document.getElementById("gameover").style.display = "block";
          }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        
            renderer.setSize( window.innerWidth, window.innerHeight );
        
        }

		

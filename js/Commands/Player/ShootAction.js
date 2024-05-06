import {Audio} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class ShootAction
{
    constructor(player, state, audioLoader, listener){
        this.player = player;
        this.state = state;
        this.audioLoader = audioLoader;
        this.s3 = new Audio(listener);
        this.s4 = new Audio(listener);
        this.loadAndConfigureAudio(this.s3, './resources/GunShot.wav', false, 5);
        this.loadAndConfigureAudio(this.s4, './resources/Misfire.wav', false, 5);

    }

    shoot(){
        switch (this.player.getTexture()) {
            case this.player.Stand:
            case this.player.Gun_Stand:
                this.player.setTexture(this.player.Gun_Stand);
                if (this.player.getAmmo() > 0){
                    this.player.shootGun()
                    this.player.makeBullet()
                    this.s3.play()
                }
                else{
                    this.s4.play()
                }
            break;
            case this.player.Walk:
            case this.player.Gun_Walk:
                this.player.setTexture(this.player.Gun_Walk);
                if (this.player.getAmmo() > 0){
                    this.player.shootGun()
                    this.player.makeBullet()
                    this.s3.play()
                }
                else{
                    this.s4.play()
                }
            break;
            // Add more cases as needed
            default:
            // Handle other cases or do nothing
            break;
        }
    }

    enter(activeActions){
        this.shoot();
    }

    loadAndConfigureAudio(audioSource, url, loop, volume) {
        this.audioLoader.load(url, function(buffer) {
            audioSource.setBuffer(buffer);
            audioSource.setLoop(loop);
            audioSource.setVolume(volume * 0.05);
        });
    }
}
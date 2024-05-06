import {Audio} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class ShootAction
{
    constructor(player, state, audioLoader, listener){
        this.player = player;
        this.state = state;
        this.audioLoader = audioLoader;
        this.s3 = new Audio(listener);
        this.loadAndConfigureAudio(this.s3, './resources/Reload.wav', false, 5);


    }

    reload(){
        this.s3.play();
        this.player.setAmmo(16);
        this.state.Reload = false;
    }

    enter(activeActions){
        this.reload();
    }

    loadAndConfigureAudio(audioSource, url, loop, volume) {
        this.audioLoader.load(url, function(buffer) {
            audioSource.setBuffer(buffer);
            audioSource.setLoop(loop);
            audioSource.setVolume(volume * 0.05);
        });
    }
}
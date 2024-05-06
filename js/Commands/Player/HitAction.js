import {Audio} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
export default class HitAction
{
    constructor(player, state, audioLoader, listener){
        this.player = player;
        this.state = state;
        this.audioLoader = audioLoader;
        this.s3 = new Audio(listener);
        this.loadAndConfigureAudio(this.s3, './resources/Hurt.wav', false, 5);
    }

    enter(activeActions){
        this.state.Left = false;
        this.state.Right = false;
        this.state.Up = false;
        this.state.Down = false;
        switch (this.player.getTexture()) {
            case this.player.Damage_01:
                this.player.setTexture(this.player.Damage_02);
                this.s3.play()
                break;
            case this.player.Damage_02:
                this.state.Hit = false;
                this.player.setTexture(this.player.Stand);
                break;
            default:
                this.player.setTexture(this.player.Damage_01);
        }
    }

    loadAndConfigureAudio(audioSource, url, loop, volume) {
        this.audioLoader.load(url, function(buffer) {
            audioSource.setBuffer(buffer);
            audioSource.setLoop(loop);
            audioSource.setVolume(volume * 0.05);
        });
    }
}
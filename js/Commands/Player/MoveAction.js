import {Audio} from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

export default class MoveAction {
    constructor(player, state, audioLoader, listener) {
        this.player = player;
        this.state = state;
        this.audioLoader = audioLoader;
        this.XBOUND = 21;
        this.NEGXBOUND = -21;
        this.Y_POSITIONS = [-14, -7, -0.3, 6.5, 13.2];
        this.onLadder = false; // Indicates if the player is on a ladder
        this.ladderPositions = [
            { xRange: [2.8, 4.8], yRange: [-14, -7] },   // ladder1
            { xRange: [-11, -9.8], yRange: [-7, -0.3] }, // ladder2
            { xRange: [17.8, 19], yRange: [-7, -0.3] },  // ladder3
            { xRange: [7, 8], yRange: [-0.3, 6.5] },    // ladder4
            { xRange: [-21, -19.8], yRange: [-0.3, 6.5] }, // ladder5
            { xRange: [-7, -5], yRange: [6.5, 13.2] },   // ladder6
            { xRange: [14, 16], yRange: [6.5, 13.2] },   // ladder7
        ];
        this.s1 = new Audio(listener);
        this.s2 = new Audio(listener);
        this.s4 = new Audio(listener);
        this.loadAndConfigureAudio(this.s1, './resources/Walking1.wav', false, 5);
        this.loadAndConfigureAudio(this.s2, './resources/Walking2.wav', false, 5);
        this.loadAndConfigureAudio(this.s4, './resources/Ladder.wav', false, 5);
    }
  
    canClimbUp() {
      return this.ladderPositions.some(ladder => {
        const { xRange, yRange } = ladder;
        const x = this.player.getX();
        const y = this.player.getY();
        this.onLadder = x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y < yRange[1];
        return x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y < yRange[1];
      });
    }
  
    canClimbDown() {
      return this.ladderPositions.some(ladder => {
        const { xRange, yRange } = ladder;
        const x = this.player.getX();
        const y = this.player.getY();
        this.onLadder = x >= xRange[0] && x <= xRange[1] && y > yRange[0] && y <= yRange[1];
        return x >= xRange[0] && x <= xRange[1] && y > yRange[0] && y <= yRange[1];
      });
    }
  
    move(direction) {
        switch (direction) {
          case 'Left':
            if (this.player.getX() < this.XBOUND)
              this.player.translateX(0.6);
            this.player.setTexture(this.player.getTexture() === this.player.Stand || this.player.getTexture() === this.player.Gun_Stand  ? this.player.Walk : this.player.Stand);
            this.player.setLeft(true);
            this.player.setIsClimbing(false);
            this.player.getTexture() === this.player.Stand || this.player.getTexture() === this.player.Gun_Stand  ? this.s1.play() : this.s2.play();
            break;
          case 'Right':
            if (this.player.getX() > this.NEGXBOUND)
              this.player.translateX(-0.6);
            this.player.setTexture(this.player.getTexture() === this.player.Stand || this.player.getTexture() === this.player.Gun_Stand  ? this.player.Walk : this.player.Stand);
            this.player.setRight(true);
            this.player.setIsClimbing(false);
            this.player.getTexture() === this.player.Stand || this.player.getTexture() === this.player.Gun_Stand  ? this.s1.play() : this.s2.play();
            break;
          case 'Up':
            if (this.canClimbUp()){
                this.player.translateY(0.6);
                this.player.setIsClimbing(true);
                this.player.setTexture(this.player.getTexture() !== this.player.Climbing_01 ? this.player.Climbing_01 : this.player.Climbing_02);
                this.s4.play();
            }
            break;
          case 'Down':
            if (this.canClimbDown()){
                this.player.translateY(-0.6);
                this.player.setIsClimbing(true);
                this.player.setTexture(this.player.getTexture() !== this.player.Climbing_01 ? this.player.Climbing_01 : this.player.Climbing_02);
                this.s4.play();
            }
            break;
        }

      if(!this.onLadder){
        this.snapToNearestYPosition();
      }

    }

    snapToNearestYPosition() {
      const y = this.player.getY();
      const nearestY = this.Y_POSITIONS.reduce((closest, current) => {
            return Math.abs(current - y) < Math.abs(closest - y) ? current : closest;
      });
      this.player.setY(nearestY);
    }
  

    enter(activeActions, direction) {
        this.move(direction);
    }

    loadAndConfigureAudio(audioSource, url, loop, volume) {
        this.audioLoader.load(url, function(buffer) {
            audioSource.setBuffer(buffer);
            audioSource.setLoop(loop);
            audioSource.setVolume(volume * 0.05);
        });
    }
}
  
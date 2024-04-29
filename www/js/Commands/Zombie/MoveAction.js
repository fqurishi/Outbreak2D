export default class MoveAction
{
    constructor(zombie, state){
        this.zombie = zombie;
        this.state = state;
        this.XBOUND = 21;
        this.NEGXBOUND = -21;
        this.Y_POSITIONS = [-14, -7, -0.3, 6.5, 13.2];
        this.onLadder = false; // Indicates if the zombie is on a ladder
        this.ladderPositions = [
            { xRange: [3.2, 3.6], yRange: [-14, -7] },   // ladder1
            { xRange: [-10.9, -10.5], yRange: [-7, -0.3] }, // ladder2
            { xRange: [18, 18.4], yRange: [-7, -0.3] },  // ladder3
            { xRange: [7.5, 7.9], yRange: [-0.3, 6.5] },    // ladder4
            { xRange: [-20.2, -19.8], yRange: [-0.3, 6.5] }, // ladder5
            { xRange: [-6.2, -5.8], yRange: [6.5, 13.2] },   // ladder6
            { xRange: [15.2, 15.6], yRange: [6.5, 13.2] },   // ladder7
        ];
        this.climbingUp = false;
        this.climbingDown = false;
    }

    canClimbUp() {
        return this.ladderPositions.some(ladder => {
          const { xRange, yRange } = ladder;
          const x = this.zombie.getX();
          const y = this.zombie.getY();
          this.onLadder = x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y < yRange[1];
          return x >= xRange[0] && x <= xRange[1] && y >= yRange[0] && y < yRange[1];
        });
    }
    
    canClimbDown() {
        return this.ladderPositions.some(ladder => {
            const { xRange, yRange } = ladder;
            const x = this.zombie.getX();
            const y = this.zombie.getY();
            this.onLadder = x >= xRange[0] && x <= xRange[1] && y > yRange[0] && y <= yRange[1];
            return x >= xRange[0] && x <= xRange[1] && y > yRange[0] && y <= yRange[1];
        });
    }

    handleClimbing() {
        if (this.shouldClimbUp()) {
            this.startClimbing('Up');
        } else if (this.shouldClimbDown()) {
            this.startClimbing('Down');
        }
        
        if (this.isClimbing() && !this.canClimb()) {
            this.handleClimbCompletion();
        }
    }
    
    shouldClimbUp() {
        return this.canClimbUp() && !this.climbingDown && Math.random() < 0.5;
    }
    
    shouldClimbDown() {
        return this.canClimbDown() && !this.climbingUp && Math.random() < 0.5;
    }
    
    isClimbing() {
        return this.climbingUp || this.climbingDown;
    }
    
    canClimb() {
        return this.canClimbUp() || this.canClimbDown();
    }    

    startClimbing(direction) {
        this.climbingUp = direction === 'Up';
        this.climbingDown = direction === 'Down';
        this.state.Up = this.climbingUp;
        this.state.Down = this.climbingDown;
        this.state.Right = false;
        this.state.Left = false;
    }

    handleClimbCompletion() {
        this.climbingUp = false;
        this.climbingDown = false;

        if (Math.random() < 0.5) {
            this.state.Right = true;
            this.state.Left = false;
        } else {
            this.state.Right = false;
            this.state.Left = true;
        }
    }
    
    move(direction) {
        if (direction === null || direction === undefined) {
            const randomChoice = Math.floor(Math.random() * 2);
            this.state.Right = randomChoice === 0 ? true : false;
            this.state.Left = randomChoice === 1 ? true : false;
        } 
        switch (direction) {
            case 'Left':
                this.zombie.translateX(0.5);
                this.zombie.setTexture(this.zombie.getTexture() === this.zombie.Stand ? this.zombie.Walk : this.zombie.Stand);
                this.zombie.setLeft(true);
                if (this.zombie.getX() > this.XBOUND) {
                    // Hit left boundary, change direction to 'Right'
                    this.state.Right = true;
                    this.state.Left = false;
                }
                break;
            case 'Right':
                this.zombie.translateX(-0.5);
                this.zombie.setTexture(this.zombie.getTexture() === this.zombie.Stand ? this.zombie.Walk : this.zombie.Stand);
                this.zombie.setRight(true);
                if (this.zombie.getX() < this.NEGXBOUND) {
                    // Hit right boundary, change direction to 'Left'
                    this.state.Right = false;
                    this.state.Left = true;
                }
                break;
            case 'Up':
                if (this.climbingUp) {
                    this.zombie.translateY(0.5);
                    this.zombie.setTexture(this.zombie.getTexture() !== this.zombie.Climbing_01 ? this.zombie.Climbing_01 : this.zombie.Climbing_02);
                }else{
                    this.climbingUp = true;
                }
                break;
            case 'Down':
                if (this.climbingDown){
                    this.zombie.translateY(-0.5);
                    this.zombie.setTexture(this.zombie.getTexture() !== this.zombie.Climbing_01 ? this.zombie.Climbing_01 : this.zombie.Climbing_02);
                }else{
                    this.climbingDown = true;
                }
                break;
        }

        if (!this.onLadder) {
            this.snapToNearestYPosition();
        }

        this.handleClimbing();

    }
  
    snapToNearestYPosition() {
    const y = this.zombie.getY();
    const nearestY = this.Y_POSITIONS.reduce((closest, current) => {
            return Math.abs(current - y) < Math.abs(closest - y) ? current : closest;
    });
    this.zombie.setY(nearestY);
    }

    enter(activeActions, direction) {
        this.move(direction);
    }


}
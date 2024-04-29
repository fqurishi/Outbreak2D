export default class IdleAction
{
    constructor(zombie, state){
        this.zombie = zombie;
        this.state = state;
    }

    move(){
        this.zombie.translateX(0);
        this.player.translateY(0);
    }

    enter(activeActions){
        this.move();
    }
}
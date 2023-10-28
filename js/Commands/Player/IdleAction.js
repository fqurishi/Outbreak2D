export default class IdleAction
{
    constructor(player, state){
        this.player = player;
        this.state = state;
    }

    move(){
        this.player.translateX(0);
        this.player.translateY(0);
    }

    enter(activeActions){
        this.move();
    }
}
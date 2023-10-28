export default class RightAction
{
    constructor(player, state){
        this.player = player;
        this.state = state;
    }

    move(){
        this.player.translateX(-0.1);
    }

    enter(activeActions){
        this.move();
    }
}
export default class HitAction
{
    constructor(player, state){
        this.player = player;
        this.state = state;
    }

    enter(activeActions){
        this.state.Left = false;
        this.state.Right = false;
        this.state.Up = false;
        this.state.Down = false;
        switch (this.player.getTexture()) {
            case this.player.Damage_01:
                this.player.setTexture(this.player.Damage_02);
                break;
            case this.player.Damage_02:
                this.state.Hit = false;
                this.player.setTexture(this.player.Stand);
                break;
            default:
                this.player.setTexture(this.player.Damage_01);
        }
    }
}
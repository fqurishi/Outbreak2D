export default class DeathAction
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
        this.state.Attack = false;
        switch (this.player.getTexture()) {
            case this.player.Stand:
                this.player.setTexture(this.player.Death_01);
                break;
            case this.player.Death_01:
                this.player.setTexture(this.player.Death_02);
                break;
            case this.player.Death_02:
                this.player.setTexture(this.player.Death_03);
                break;
            case this.player.Death_03:
                this.player.setTexture(this.player.Death_04);
                break;
            case this.player.Death_04:
                this.player.setTexture(this.player.Death_05);
                break;
            case this.player.Death_05:
                    this.player.setTexture(this.player.Death_06);
                    break;
            case this.player.Death_06:
                this.player.setTexture(this.player.Death_06);
                break;
            default:
                this.state.Attack = false;
                this.player.setTexture(this.player.Death_01);
        }
    }
}
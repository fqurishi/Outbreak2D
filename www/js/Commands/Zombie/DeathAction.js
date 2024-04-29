export default class DeathAction
{
    constructor(zombie, state){
        this.zombie = zombie;
        this.state = state;
    }

    enter(activeActions){
        this.state.Left = false;
        this.state.Right = false;
        this.state.Up = false;
        this.state.Down = false;
        this.state.Attack = false;
        switch (this.zombie.getTexture()) {
            case this.zombie.Stand:
                this.zombie.setTexture(this.zombie.Death_01);
                break;
            case this.zombie.Death_01:
                this.zombie.setTexture(this.zombie.Death_02);
                break;
            case this.zombie.Death_02:
                this.zombie.setTexture(this.zombie.Death_03);
                break;
            case this.zombie.Death_03:
                this.zombie.setTexture(this.zombie.Death_04);
                break;
            case this.zombie.Death_04:
                this.zombie.setTexture(this.zombie.Death_05);
                break;
            case this.zombie.Death_05:
                    this.zombie.setTexture(this.zombie.Death_06);
                    break;
            case this.zombie.Death_06:
                this.zombie.setTexture(this.zombie.Death_06);
                break;
            default:
                this.state.Attack = false;
                this.zombie.setTexture(this.zombie.Death_01);
        }
    }
}
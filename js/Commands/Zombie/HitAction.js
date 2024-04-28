export default class HitAction
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
        switch (this.zombie.getTexture()) {
            case this.zombie.Damage_01:
                this.zombie.setTexture(this.zombie.Damage_02);
                break;
            case this.zombie.Damage_02:
                this.state.Hit = false;
                this.zombie.setTexture(this.zombie.Stand);
                break;
            default:
                this.zombie.setTexture(this.zombie.Damage_01);
        }
    }
}
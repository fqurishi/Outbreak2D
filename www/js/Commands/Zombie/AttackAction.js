export default class AttackAction
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
            case this.zombie.Stand:
                this.zombie.setTexture(this.zombie.Attack_01);
                break;
            case this.zombie.Attack_01:
                this.zombie.setTexture(this.zombie.Attack_02);
                break;
            case this.zombie.Attack_02:
                this.zombie.setTexture(this.zombie.Attack_03);
                break;
            case this.zombie.Attack_03:
                this.state.Attack = false;
                this.zombie.setTexture(this.zombie.Stand);
                break;
            default:
                this.state.Attack = false;
                this.zombie.setTexture(this.zombie.Stand);
        }
    }
}
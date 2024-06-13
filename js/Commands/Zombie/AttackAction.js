export default class AttackAction {
    constructor(zombie, state) {
        this.zombie = zombie;
        this.state = state;
    }

    enter(activeActions, playerPosY) {
        this.state.Left = false;
        this.state.Right = false;
        this.state.Up = false;
        this.state.Down = false;

        // Determine if the player is above or below the zombie
        const zombieY = this.zombie.getY();

        if (playerPosY > zombieY) { // Player is above the zombie
            this.state.AttackUp = true;
            this.state.AttackDown = false;
            this.handleLadderAttack('up');
        } else if (playerPosY < zombieY) { // Player is below the zombie
            this.state.AttackUp = false;
            this.state.AttackDown = true;
            this.handleLadderAttack('down');
        }
        else {
            this.handleGroundAttack();
        }
    }

    handleGroundAttack() {
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

    handleLadderAttack(direction) {
        if (direction === 'up') {
            switch (this.zombie.getTexture()) {
                case this.zombie.Climbing_01:
                case this.zombie.Climbing_02:
                    this.zombie.setTexture(this.zombie.AttackUp_01);
                    break;
                case this.zombie.AttackUp_01:
                    this.zombie.setTexture(this.zombie.AttackUp_02);
                    break;
                case this.zombie.AttackUp_02:
                    this.zombie.setTexture(this.zombie.AttackUp_03);
                    break;
                case this.zombie.AttackUp_03:
                    this.state.Attack = false;
                    this.zombie.setTexture(this.zombie.Climbing_01);
                    break;
                default:
                    this.state.Attac = false;
                    this.zombie.setTexture(this.zombie.Climbing_01);
            }
        } else if (direction === 'down') {
            switch (this.zombie.getTexture()) {
                case this.zombie.Climbing_01:
                case this.zombie.Climbing_02:
                    this.zombie.setTexture(this.zombie.AttackDown_01);
                    break;
                case this.zombie.AttackDown_01:
                    this.zombie.setTexture(this.zombie.AttackDown_02);
                    break;
                case this.zombie.AttackDown_02:
                    this.zombie.setTexture(this.zombie.AttackDown_03);
                    break;
                case this.zombie.AttackDown_03:
                    this.state.Attack = false;
                    this.zombie.setTexture(this.zombie.Climbing_01);
                    break;
                default:
                    this.state.Attack = false;
                    this.zombie.setTexture(this.zombie.Climbing_01);
            }
        }
    }
}

import IdleAction from "../Commands/Zombie/IdleAction.js";
import MoveAction from "../Commands/Zombie/MoveAction.js";
import AttackAction from "../Commands/Zombie/AttackAction.js";
import HitAction from "../Commands/Zombie/HitAction.js";
import DeathAction from "../Commands/Zombie/DeathAction.js";

export class ZombieController {
    constructor(zombie, audioLoader, listener) {
        this.zombie = zombie;
        this.audioLoader = audioLoader;
        this.listener = listener;
        this.state = {
        Right: false,
        Left: true,
        Up: true,
        Down: false,
        Death: false,
        Hit: false,
        Shoot: false,
        Reload: false,
        Idle: false,
        };
        this.actions = {
            Hit: new HitAction(this.zombie, this.state),
            Death: new DeathAction(this.zombie, this.state),
            Move: new MoveAction(this.zombie, this.state, this.audioLoader, this.listener),
            Attack: new AttackAction(this.zombie, this.state, this.audioLoader, this.listener),
            Idle: new IdleAction(this.zombie, this.state)

        };
        this.playerPosX;
        this.playerPosY;
        this.closestPlayer;

    }

    enterState(name, activeActions, direction)
	{
        this.currentState = this.actions[name];
        this.currentState.enter(activeActions, direction);
	}

    setState(a)
	{
        this.state = a;
	}

	getState()
	{
        return this.state;
	}

    update() {
        let activeActions = []
        switch (true){
            case this.state.Death:
                this.enterState('Death', activeActions)
            break;
            case this.state.Hit:
                this.enterState('Hit', activeActions)
            break;
            case this.state.Attack:
                this.enterState('Attack', activeActions)
            break;
            case this.state.Right:
                this.enterState('Move', activeActions, 'Right')
            break;
            case this.state.Left:
                this.enterState('Move', activeActions, 'Left')
            break;
            case this.state.Down:
                this.enterState('Move', activeActions, 'Down')
            break;
            case this.state.Up:
                this.enterState('Move', activeActions, 'Up')
            break;
            default:
                this.enterState('Move',activeActions);
            break;
        }
        this.updateDirection();
        this.attackPlayer();
    }
  
    updateDirection() {
        if (this.zombie.getLeft()) {
        this.zombie.getTexture().center.set(0.5, 0.5);
        this.zombie.getTexture().repeat.set(1, 1);
        } else if (this.zombie.getRight()) {
        this.zombie.getTexture().center.set(0.5, 0.5);
        this.zombie.getTexture().repeat.set(-1, 1);
        }
    }

    turnAround() {
        if (this.state.Right) {
            this.state.Right = false;
            this.state.Left = true;
        } else if (this.state.Left) {
            this.state.Right = true;
            this.state.Left = false;
        }
    }

    updatePlayerPos(player, PlayerController){
        this.playerPosX = player.getX();
        this.playerPosY = player.getY();
        this.closestPlayer = PlayerController;
    }

    hit(){
        this.zombie.damaged();
        this.state.Hit = true;
        if(!this.zombie.getLife()){
            this.state.Death = true;
        }
    }

    checkDeath() {
        if (this.zombie.getTexture() == this.zombie.Death_06)
            return true;
        else
            return false;
    }

    attackPlayer() {
        const zombieX = this.zombie.getX();
        const zombieY = this.zombie.getY();
        const playerX = this.playerPosX; 
        const playerY = this.playerPosY; 
        const attackRadius = 1.75; // Adjust the radius as needed
        const distanceRadius = 25;
        const deltaX = playerX - zombieX;
        const deltaY = playerY - zombieY;
    
        // Calculate the distance between the zombie and the player
        const distance = Math.sqrt((zombieX - playerX) ** 2 + (zombieY - playerY) ** 2);
    
        if (distance <= attackRadius && !this.closestPlayer.state.Death) {
            this.state.Attack = true;
            if (this.zombie.getTexture() == this.zombie.Attack_03)
                this.closestPlayer.hit()
        }
        if (distance <= distanceRadius && Math.abs(deltaY) <= 1 && !this.closestPlayer.state.Death){
            // Calculate the angle between the zombie and the player
            const angle = Math.atan2(deltaY, deltaX);
            if (Math.abs(angle) < Math.PI / 2) {
                this.zombie.setLeft(1)
                this.state.Left = true;
                this.state.Right = false;

            } else {
                // Player is on the left side of the zombie
                this.zombie.setRight(1)
                this.state.Left = false;
                this.state.Right = true;
            }
        }
    }

    stopMovement(otherZombie) {
        // Calculate the direction of the other zombie relative to this one
        const otherX = otherZombie.zombie.getX();
        const otherY = otherZombie.zombie.getY();
        const thisX = this.zombie.getX();
        const thisY = this.zombie.getY();
        const deltaX = otherX - thisX;
        const deltaY = otherY - thisY;

        // Determine which way to stop movement based on the relative position
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // Collision is horizontal
            if (deltaX > 0) {
                // Other zombie is to the right; stop moving right
                this.state.Right = false;
            } else {
                // Other zombie is to the left; stop moving left
                this.state.Left = false;
            }
        } else {
            // Collision is vertical
            if (deltaY > 0) {
                // Other zombie is below; stop moving down
                this.state.Down = false;
            } else {
                // Other zombie is above; stop moving up
                this.state.Up = false;
            }
        }

    }
    
}
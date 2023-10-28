import { gamefunctions } from "../Functions.js";
import RightAction from "../Commands/Player/RightAction.js";
import IdleAction from "../Commands/Player/IdleAction.js";

export class PlayerController {
    constructor(player) {
        this.player = player;
        this.state = {
        Right: false,
        Left: false,
        Up: false,
        Down: false,
        Death: false,
        Hit: false,
        Shoot: false,
        Reload: false,
        Idle: false,
        };
        this.actions = {
            //Hit: new HitAction(this.player, this.state),
            //Death: new DeathAction(this.player, this.state),
            Right: new RightAction(this.player, this.state),
            //Left: new LeftAction(this.player, this.state),
            //Down: new DownAction(this.player, this.state),
            //Up: new UpAction(this.player, this.state),
            //Reload: new ReloadAction(this.player, this.state),
            //Shoot: new ShootAction(this.player, this.state),
            Idle: new IdleAction(this.player, this.state)

        };
        this.spaceUp = true;

        this.setupKeyListeners();
    }

    setupKeyListeners(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    handleKeyDown(event) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.state.Up = true;
            break;
            case 'a':
            case 'ArrowLeft':
                this.state.Left = true;
            break;
            case 's':
            case 'ArrowDown':
                this.state.Down = true;
            break;
            case 'd':
            case 'ArrowRight':
                this.state.Right = true;
            break;
            case ' ':
                this.state.Shoot = true;
            break;
        }
    }

    handleKeyUp(event) {
        switch (event.key) {
            case 'w':
            case 'ArrowUp':
                this.state.Up = false;
            break;
            case 'a':
            case 'ArrowLeft':
                this.state.Left = false;
            break;
            case 's':
            case 'ArrowDown':
                this.state.Down = false;
            break;
            case 'd':
            case 'ArrowRight':
                this.state.Right = false;
            break;
            case ' ':
                this.state.Shoot = false;
            break;
        }
    }

    enterState(name, activeActions)
	{
        this.currentState = this.actions[name];
        this.currentState.enter(activeActions);
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
            case this.state.Right:
                this.enterState('Right', activeActions)
            break;
            default:
                this.enterState('Idle',activeActions);
            break;
        }
        if (this.player.getRight()) {
        if (this.player.getX() > -21) {
            this.player.setKeysOff();
            this.player.setRight(true);
        }
        } else if (this.player.getLeft()) {
        if (this.player.getX() < 21) {
            this.player.setKeysOff();
            this.player.setLeft(true);
        }
        } else if (this.player.getUp()) {
        this.player.setKeysOff();
        this.player.setUp(true);
        } else if (this.player.getDown()) {
        this.player.setKeysOff();
        this.player.setDown(true);
        }
    }
  
    updateDirection() {
        if (this.player.getLeft()) {
        this.player.getTexture().center.set(0.5, 0.5);
        this.player.getTexture().repeat.set(1, 1);
        } else if (this.player.getRight()) {
        this.player.getTexture().center.set(0.5, 0.5);
        this.player.getTexture().repeat.set(-1, 1);
        }
    }
}
  
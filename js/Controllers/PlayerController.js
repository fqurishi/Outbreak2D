import { gamefunctions } from "../Functions.js";
import IdleAction from "../Commands/Player/IdleAction.js";
import MoveAction from "../Commands/Player/MoveAction.js";
import ShootAction from "../Commands/Player/ShootAction.js";
import HitAction from "../Commands/Player/HitAction.js";
import DeathAction from "../Commands/Player/DeathAction.js";
import ReloadAction from "../Commands/Player/ReloadAction.js"
export class PlayerController {
    constructor(player, audioLoader, listener) {
        this.player = player;
        this.audioLoader = audioLoader;
        this.listener = listener;
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
            Hit: new HitAction(this.player, this.state, this.audioLoader, this.listener),
            Death: new DeathAction(this.player, this.state),
            Move: new MoveAction(this.player, this.state, this.audioLoader, this.listener),
            Reload: new ReloadAction(this.player, this.state, this.audioLoader, this.listener),
            Shoot: new ShootAction(this.player, this.state, this.audioLoader, this.listener),
            Idle: new IdleAction(this.player, this.state)

        };
        this.spaceUp = true;

        document.getElementById('hud').style.display = 'flex';

        this.setupKeyListeners();
        if (/Mobi|Android/i.test(navigator.userAgent)) {
            document.getElementById('mobileControls').style.display = 'flex';
            document.getElementById('hud').style.left = '10%';
            document.getElementById('hud').style.fontSize = '8px';
            this.setupTouchListeners();
        }
    }

    setDirectionState(direction, value) {
        this.state[direction] = value;
    }

    setupKeyListeners(){
        document.addEventListener("keydown", this.handleKeyDown.bind(this));
        document.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    setupTouchListeners(){
        // Prevent text selection on specific elements
        document.getElementById('up').style.userSelect = 'none';
        document.getElementById('down').style.userSelect = 'none';
        document.getElementById('left').style.userSelect = 'none';
        document.getElementById('right').style.userSelect = 'none';
        document.getElementById('shootButton').style.userSelect = 'none';
        document.getElementById('dpad').addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
        document.getElementById('shootButton').addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
        document.getElementById('up').addEventListener('touchstart', () => { this.setDirectionState('Up', true); });
        document.getElementById('down').addEventListener('touchstart', () => { this.setDirectionState('Down', true); });
        document.getElementById('left').addEventListener('touchstart', () => { this.setDirectionState('Left', true); });
        document.getElementById('right').addEventListener('touchstart', () =>{ this.setDirectionState('Right', true); });
        document.getElementById('shootButton').addEventListener('touchstart', () => { 
            if (this.spaceUp){
                this.spaceUp = false;
                this.state.Shoot = true;
                setTimeout(() => {
                    this.state.Shoot = false;
                }, 100);
            }else{
                this.state.Shoot = false;
            }
        });
        // Attach event listeners for touchend (button release)
        document.getElementById('up').addEventListener('touchend', () => { this.setDirectionState('Up', false); });
        document.getElementById('down').addEventListener('touchend', () => { this.setDirectionState('Down', false); });
        document.getElementById('left').addEventListener('touchend', () => { this.setDirectionState('Left', false); });
        document.getElementById('right').addEventListener('touchend', () => { this.setDirectionState('Right', false); });
        document.getElementById('shootButton').addEventListener('touchend', () => {
            this.state.Shoot = false;
            this.spaceUp = true;
        });
    }

    handleKeyDown(event) {
        switch (event.key.toLowerCase()) {
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
                if (this.spaceUp){
                    this.spaceUp = false;
                    this.state.Shoot = true;
                    setTimeout(() => {
                        this.state.Shoot = false;
                    }, 100);
                }else{
                    this.state.Shoot = false;
                }
            break;
        }
    }

    handleKeyUp(event) {
        switch (event.key.toLowerCase()) {
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
                this.spaceUp = true;
            break;
        }
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

    hit(){
        this.player.damaged();
        this.state.Hit = true;
        if(!this.player.getLife()){
            this.state.Death = true;
        }
    }

    reload(){
        this.state.Reload = true;
    }

    heal(){
        this.player.heal();
    }

    update() {
        let activeActions = []
        switch (true){
            case this.state.Death:
                this.enterState('Death', activeActions);
            break;
            case this.state.Hit:
                this.enterState('Hit', activeActions);
            break;
            case this.state.Reload:
                this.enterState('Reload', activeActions);
            case this.state.Right:
                this.enterState('Move', activeActions, 'Right');
            break;
            case this.state.Left:
                this.enterState('Move', activeActions, 'Left');
            break;
            case this.state.Down:
                this.enterState('Move', activeActions, 'Down');
            break;
            case this.state.Up:
                this.enterState('Move', activeActions, 'Up');
            break;
            case this.state.Shoot:
                this.enterState('Shoot', activeActions);
            break;
            default:
                this.enterState('Move',activeActions);
            break;
        }
        this.updateDirection();
        this.fallToNearestYPosition();
    }
  
    updateDirection() {
        if (this.player.getLeft() && !this.state.Death) {
        this.player.getTexture().center.set(0.5, 0.5);
        this.player.getTexture().repeat.set(1, 1);
        } else if (this.player.getRight() && !this.state.Death) {
        this.player.getTexture().center.set(0.5, 0.5);
        this.player.getTexture().repeat.set(-1, 1);
        }
    }

    fallToNearestYPosition() {
        if (this.player.getIsClimbing()) {
            return;
        }
    
        const y = this.player.getY();
        const Y_POSITIONS = [-14, -7, -0.3, 6.5, 13.2];
        const pace = 0.8; // Adjust the pace as needed
    
        if (Y_POSITIONS.includes(y)) {
            // Player is already on one of the Y positions, no need to fall
            return;
        }
    
        const nearestYBelow = Y_POSITIONS.filter((position) => position < y).reduce(
            (closest, current) => (y - current < y - closest ? current : closest),
            -14
        );
    
        if (!Number.isNaN(nearestYBelow)) {
            // Gradually move towards the nearest Y position below the player (falling)
            this.player.setY(Math.max(y - pace, nearestYBelow));
        }
    }
     
    
}
  
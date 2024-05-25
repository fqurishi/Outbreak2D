export class HealthBoxController {
    constructor(healthbox) {
        this.healthbox = healthbox;
    }
  
    checkDeath() {
        if (this.healthbox.getLife()) {
            return false;
        }
        
        this.healthbox.kill();
        return true;
    }

    update(){
        this.healthbox.enter();
    }
    
}
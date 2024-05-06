export class AmmoBoxController {
    constructor(ammobox) {
        this.ammobox = ammobox;
    }
  
    checkDeath() {
        if (this.ammobox.getLife()) {
            return false;
        }
        
        this.ammobox.kill();
        return true;
    }

    update(){
        this.ammobox.enter();
    }
    
}
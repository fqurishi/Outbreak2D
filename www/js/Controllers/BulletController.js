export class BulletController {
    constructor(bullet) {
        this.bullet = bullet;
    }
  
    update(){
        const x = this.bullet.getRight() ? -3.5 : 3.5;
        this.bullet.translateX(x)
        if (this.bullet.getX() >= 22 || this.bullet.getX() <= -22){
            this.bullet.setLife(false);
        }
    }

    checkDeath() {
        if (this.bullet.getLife()) {
            return false;
        }
        
        this.bullet.kill();
        return true;
    }
    
}
class Enemy {
    constructor(){
        
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
        this.speed = document.getElementById('monkeySpeed');
        console.log(this.speed);
    }
    update(deltaTime){
        //movement
        // þar að breyta hrað svo óvinir hreyfast með bakgrunni s.s. +this.game.speed
        this.x -= this.speedX;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }
        // check if off screen
        if (this.x +this.width <0) this.markedForDeletion = true;
    }
    draw(context){
        //hitbox enemies
        context.strokeRect(this.x, this.y, this.width, this.height);

        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y,this.width,this.height)
        //context.drawImage(this.image, this.frameX * this.width,100,1000,100,)
        //context.strokeRect(this.frameX * this.width,100,1000,100)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 266;
        this.height = 188;
        this.x = this.game.width +Math.random() *this.game.width *0.05;
        // random speed between 1-2px +Math.random() *this.game.width *0.05;
        this.y = Math.random() *this.game.height * 0.2;
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = enemyFlyer;
    }
    update(deltaTime){
        super.update(deltaTime);
    }

}

export class SnakeEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 79;
        this.height = 60;
        this.x = this.game.width;
        // random speed between 1-2px +Math.random() *this.game.width *0.05;
        this.y = 697;
        this.speedX = 1;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = enemySnake;
}
    update(deltaTime){
    super.update(deltaTime);
    }
}

export class BossEnemy extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.width = 292;
        this.height = 410;
        this.x = 900;
        // random speed between 1-2px +Math.random() *this.game.width *0.05;
        this.y = 360;
        this.speedX = 0.1;
        this.speedY = 0;
        this.maxFrame = 7;
        this.image = enemyBoss;
}
    update(deltaTime){
    super.update(deltaTime);
    }
}
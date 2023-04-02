// Get locations of all platforms for enemy placement
import { platformLocations, PlatformHandler } from "./platforms.js";


class Enemy {
    constructor(game){
        // Franz Edit START //
        this.game = game;
        this.playerStartX = this.game.player.x;
        // Starting Y of background to detect when falling down so enemies will change accordingly
        this.backgroundStartY = this.game.layer.y; 
        // Finding the differnece in order to offset Y on enemies
        this.enemyOffsetY = 0;
        
        this.playerDistanceFromLastPointX = 0;
        this.playerDistanceFromLastPointY = 0;
        
        
        // Franz Edit STOP //
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;

    }
    update(deltaTime){
        // See if Player has moved on X since enemy spawned Franz edit
        if(this.game.player.x !== this.playerStartX){
            this.playerDistanceFromLastPointX = this.game.player.x - this.playerStartX;
            this.playerStartX = this.game.player.x;
        } else {
            this.playerDistanceFromLastPointX = 0;
        }

        if(this.backgroundStartY !== this.game.layer.y){
            this.enemyOffsetY = this.game.player.y - this.backgroundStartY;
            this.backgroundStartY = this.game.player.y;
            this.y -= this.enemyOffsetY;
        } else {
            this.enemyOffsetY = 0;
        }
        // Add speed difference of Player to enemies Franz edit
        // Movement        
        if(this.x <= this.minX-this.game.player.x && this.direction === 'left'){
            // this.x = this.minX-this.game.player.x;
            this.direction = 'right';
        } 
        else if(this.x+this.width >= this.maxX-this.game.player.x && this.direction === 'right'){
            // this.x = this.maxX;
            this.direction = 'left';
        }

        if(this.direction === 'right') this.x += this.speedX - this.playerDistanceFromLastPointX;
        else if(this.direction === 'left') this.x -= this.speedX + this.playerDistanceFromLastPointX;

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }


        // check if enemy is off screen
        if (this.x +this.width < -this.game.width || this.x > this.game.width*2) this.markedForDeletion = true;
    }
    draw(context){
        //hitbox enemies
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y,this.width,this.height)
    }
}

export class FlyingEnemy extends Enemy {
    constructor(game){
        // Passa game class item til Super til að accessa Player Franz Edit //
        super(game);
        this.direction = 'left';
        this.game = game;
        this.width = 266;
        this.height = 188;
        this.x = this.game.width + Math.random() *this.game.width *0.05; 
        this.y = Math.random() *this.game.height * 0.2;
        this.speedX = 5;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = enemyFlyer;
    }
    update(deltaTime){
        
        super.update(deltaTime);
    }

}

export class SnakeEnemy extends Enemy { // Ormanir
    constructor(game){
        // Passa game class item til Super til að accessa Player Franz Edit //
        super(game);
        this.game = game;
        this.width = 160.6; // Original 79
        this.height = 120; // Original 60
        this.speedX = 5;
        this.speedY = 0;
        this.maxFrame = 5;
        this.image = enemySnake;

        this.direction = 'left';

        // Max and Min X for enemy
        this.maxX;
        this.minX;
        // Player Location
        this.playerStartLocationX = this.game.player.x;
        this.playerCurrentLocationX = this.playerStartLocationX;
        
        // Find platform for enemy //
        this.x = Math.floor(Math.random()*this.game.width+this.game.width);
        this.y = 0;
        this.counter = 0;
        for(let platformIndex = 0; platformIndex < platformLocations.length; platformIndex++){
            // Start of Platform //
            this.minX = platformLocations[platformIndex].x;
            //  End of Platform  //
            this.maxX = platformLocations[platformIndex].x + platformLocations[platformIndex].width;

            // Check if enemy is on same X as a platform
            if(this.minX < (this.x+this.playerCurrentLocationX) && (this.maxX) > (this.x+this.playerCurrentLocationX+this.width)){
                // Put enemy on same Y as platform if it's not the bottom platform (under the canvas)
                if(platformLocations[platformIndex].y-this.height < this.game.player.mainGround && platformLocations[platformIndex].width > 200){
                    this.y = platformLocations[platformIndex].y-this.height;
                    // console.log("y"+this.game.totalEnemies+" => "+(this.y));
                    break;
                } 
            } 
            // If no Platform was found, then change this.x and try again
            if(platformIndex === platformLocations.length-1 && this.y === 0 && this.counter < 25){
                // alert(this.y);
                this.counter++;
                this.x = Math.floor(Math.random()*this.game.width+this.game.width);
                platformIndex = 0;
            }
        }
        
}
    update(deltaTime){
        super.update(deltaTime);
    }
}

export class BossEnemy extends Enemy {
    constructor(game){
        // Passa game class item til Super til að accessa Player Franz Edit //
        super(game);
        this.game = game;
        this.width = 292;
        this.height = 410;
        this.x = 900;
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
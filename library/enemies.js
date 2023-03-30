// Get locations of all platforms for enemy placement
import { platformLocations, PlatformHandler } from "./platforms.js";


class Enemy {
    constructor(game){
        // Franz Edit START //
        this.game = game;
        this.playerStartX = this.game.player.x;
        this.playerDistanceFromLastPoint = 0;
        
        
        // Franz Edit STOP //
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;

    }
    update(deltaTime){
        // See if Player has moved since enemy spawned Franz edit
        if(this.game.player.x !== this.playerStartX){
            this.playerDistanceFromLastPoint = this.game.player.x - this.playerStartX;
            this.playerStartX = this.game.player.x;
        } else {
            this.playerDistanceFromLastPoint = 0;
        }

        // Add speed difference of Player to enemies Franz edit
        // Movement
        /*
        console.log(this.playerCurrentLocationX+this.x);
        console.log("min => "+this.minX);
        console.log("max => "+this.maxX);
        console.log("x => "+(this.x + this.playerDistanceFromLastPoint));
        console.log('direction => '+this.direction);
        console.log('distance => '+ this.playerDistanceFromLastPoint)/*
        // console.log("maxX" + this.maxX-this.playerCurrentLocationX);
        // console.log("minX" + this.minX-this.playerCurrentLocationX);
        
        if(this.x <= this.minX){
            // this.x = this.minX;
            this.direction = 'right';
        } else if(this.x >= this.maxX){
            // this.x = this.maxX;
            this.direction = 'left';
        }

        if(this.direction === 'right') this.x += this.speedX + this.playerDistanceFromLastPoint;
        else if(this.direction === 'left') this.x -= this.speedX + this.playerDistanceFromLastPoint;
*/

        this.x -= this.speedX + this.playerDistanceFromLastPoint;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        }
        else {
            this.frameTimer += deltaTime;
        }


        // check if enemy is off screen
        // if (this.x +this.width <0) this.markedForDeletion = true;
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
        // Passa game class item til Super til að accessa Player Franz Edit //
        super(game);
        /////////////////////////
        this.game = game;
        this.width = 266;
        this.height = 188;
        this.x = this.game.width +Math.random() *this.game.width *0.05; 
        // random speed between 1-2px +Math.random() *this.game.width *0.05;
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

export class SnakeEnemy extends Enemy {
    constructor(game){
        // Passa game class item til Super til að accessa Player Franz Edit //
        super(game);
        // this.enemyOnGround = true;
        /////////////////////////
        this.game = game;
        this.width = 160.6; // Original 79
        this.height = 120; // Original 60
        // this.x = this.game.width; // TESTING ???
        // this.y = game.height-this.height; // TESTING ???
        this.speedX = 1;
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
        // this.y;
        this.x = Math.floor(Math.random()*this.game.width+this.game.width);//+this.game.monkeyX;
        this.y = 0;
        this.counter = 0;
        for(let platformIndex = 0; platformIndex < platformLocations.length; platformIndex++){
             
            this.minX = platformLocations[platformIndex].x;
            this.maxX = platformLocations[platformIndex].x + platformLocations[platformIndex].width;

            if(this.minX < (this.x+this.playerCurrentLocationX) && (this.maxX) > (this.x+this.playerCurrentLocationX+this.width)){
                console.log();
                this.y = platformLocations[platformIndex].y-this.height;
                this.minX = platformLocations[platformIndex].x;
                this.maxX = platformLocations[platformIndex].x + platformLocations[platformIndex].width;
                // console.log(platformIndex + ' => ' + platformLocations.length + " yEnd="+this.y);
                // console.log(this.minX);
                console.log(this.y);
                break;
            } 
            // console.log(platformIndex + ' => ' + platformLocations.length + " y="+this.y);
            // If no Platform was found, then change this.x and try again
            if(platformIndex === platformLocations.length-1 && this.y === 0 && this.counter < 3){
                // alert(this.y);
                this.counter++;
                this.x = Math.floor(Math.random()*this.game.width+this.game.width);
                platformIndex = 0;
            }
            console.log(this.x);
            console.log(this.y);
            // console.log(platformLocations[platformIndex].x);
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
        /////////////////////////
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
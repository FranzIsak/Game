/** @type {HTMLCanvasElement} **/

import { Idle, RunningRight, JumpingRight, FallingRight } from './mainMonkeyStates.js';

export class Player{
    constructor(game){
        // this.cropY = {idle: 0,
        //     jumpLeft: 350,
        //     jumpRight: 742,
        //     runLeft: 1134,
        //     runRight: 1502,}
        this.game = game;
        this.width = 392;
        this.height = 392;
        this.x = 0;
        this.y = this.game.height-this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 0.5;
        this.image = mainMonkeySprite;
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame;
        this.fps = 60;
        // Calculate the actual FPS
        this.frameInterval = 1000/this.fps;
        // this.frameTimer will cycle through frameInterval then return to 0
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 20;
        this.states = [new Idle(this), new RunningRight(this), new JumpingRight(this), new FallingRight(this)];
        this.currentState = this.states[0];
        this.currentState.enter();

        // TEMP ANIMATION //
        this.infiniteLoop;
        // TEMP ANIMATION //

    }
    update(input, deltaTime){
        
        // Check current input to see if it matches the current state
        this.currentState.handleInput(input);
        // Horizontal Movement
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;

        // Make Player unable to go offscreen
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        // Vertical Movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
        // sprite animation

        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else if(this.infiniteLoop)this.frameX = 0;
            else console.log(this.infiniteLoop);
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
    }
}







































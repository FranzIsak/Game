/** @type {HTMLCanvasElement} **/

import { Idle, RunningRight, JumpingRight, FallingRight } from './mainMonkeyStates.js';
import { ChangeFps, ChangeMonkeySpeed, ChangeMonkeyWeight } from "./htmlHandler.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 294;
        this.height = 294;
        this.x = 0;
        this.y = this.game.height-this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 2;
        this.image = mainMonkeySprite;
        this.frameX = 0;
        this.frameY = 2;
        this.maxFrame;
        this.fps = 20;
        // Calculate the actual FPS
        this.frameInterval = 1000/this.fps;
        // this.frameTimer will cycle through frameInterval then return to 0
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 20;
        this.states = [new Idle(this), new RunningRight(this), new JumpingRight(this), new FallingRight(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.mainGround = this.game.height - this.height - this.game.groundMargin;
        this.currentGround = this.mainGround;
        // Change fps with option input
        this.changeFps = new ChangeFps(this);
        // Change monkey speed
        this.changeMonkeySpeed = new ChangeMonkeySpeed(this);
        // Change monkey weight
        this.changeMonkeySpeed = new ChangeMonkeyWeight(this);
        // Determine if frames (frameX) should refresh in the end of animation
        this.infiniteLoop;
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
        // if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        
        // Vertical Movement
        this.y += this.vy;
        if(!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        // sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else if(this.infiniteLoop)this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, /*this.x*/150, this.y, this.width, this.height);
    }
    onGround(){
        return this.y >= this.currentGround;
    }
    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
    }
}







































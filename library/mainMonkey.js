/** @type {HTMLCanvasElement} **/

import { Idle, Running, JumpingRight, FallingRight, Crouching, GivingBanana, ThrowingBanana, Die } from './mainMonkeyStates.js';
import { ChangeMonkeyFps, ChangeMonkeySpeed, ChangeMonkeyWeight } from "./htmlHandler.js";

export class Player{
    constructor(game){
        this.game = game;
        this.width = 294;
        this.height = 294;
        this.x = 150; // For moving everything except for the monkey 
        this.monkeyX = this.x;
        this.y = this.game.height-this.height - this.game.groundMargin;
        this.vy = 0;
        this.weight = 2;
        this.image = upperMonkeySprite;
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
        this.states = [new Idle(this), new Running(this), new JumpingRight(this), new FallingRight(this), 'Landing Placeholder', new Crouching(this), 'Swinging Placeholder', new GivingBanana(this), new ThrowingBanana(this), new Die(this)];
        this.currentState = this.states[0];
        this.currentState.enter();
        this.mainGround = this.game.height - this.height;// - this.game.groundMargin;
        this.currentGround = this.mainGround;
        // Change fps with option input
        this.changeFps = new ChangeMonkeyFps(this);
        // Change monkey speed
        this.changeMonkeySpeed = new ChangeMonkeySpeed(this);
        // Change monkey weight
        this.changeMonkeySpeed = new ChangeMonkeyWeight(this);
        // Determine if frames (frameX) should refresh in the end of animation
        this.infiniteLoop;
        this.direction = 'right';
    }
    update(input, deltaTime){
        console.log(this.currentState.state);
        // Check if monkey is Dying
        if(this.currentState.state === 'DIE'){
            // Check if monkey is dead
            if(this.frameX >= this.maxFrame){
                alert('Monkey is dead');
            }
        } 
        // Check current input to see if it matches the current state if monkey is alive
        else{
            this.currentState.handleInput(input);
        }
        
        // Horizontal Movement
        this.x += this.speed;
        // console.log(this.currentState.state);
        if( this.currentState.state !== 'CROUCHING' && 
            this.currentState.state !== 'DIE' 
            
            ){
            if (input.includes('ArrowRight') && !input.includes('ArrowLeft')) this.speed = this.maxSpeed;
            else if (input.includes('ArrowLeft') && !input.includes('ArrowRight')) this.speed = -this.maxSpeed;
            else this.speed = 0;
        }

        // Make Player unable to go offscreen
        if (this.x < 0) this.x = 0;

        // Vertical Movement
        this.y += this.vy;
        if(!this.onGround()){
            this.vy += this.weight;
        } else{
            this.y = this.currentGround;
            this.vy = 0;
        } 
        
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
        if(this.direction === 'left'){
            context.save();
            context.translate(this.monkeyX+this.width+150 , 0);
            context.scale(-1, 1);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.monkeyX , this.y, this.width, this.height);
        if(this.direction==='left') context.restore();
    }
    onGround(){
        return this.y >= this.currentGround ;
    }
    setState(state){
        this.currentState = this.states[state]
        this.currentState.enter();
    }
}







































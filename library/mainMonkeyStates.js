const states = {
    IDLE: 0,
    RUNNING_RIGHT: 1,
    JUMPING_RIGHT: 2,
    FALLING_RIGHT: 3,
    // Landing Placeholder //
    CROUCHING: 5,
    // Swinging Placeholder //
    GIVING_BANANA: 7,

}

class State {
    constructor(state){
        this.state = state;
    }
}

export class Idle extends State {
    constructor(player){
        super('IDLE');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = true;
        this.player.image = upperMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 7;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING_RIGHT);
        } else if (input.includes('ArrowDown')){
            this.player.setState(states.CROUCHING);
        }
    }
}

export class RunningRight extends State {
    constructor(player){
        super('RUNNING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = true;
        this.player.image = upperMonkeySprite;
        this.player.maxFrame = 9;
        this.player.frameX = 0;
        this.player.frameY = 1;
    }
    handleInput(input){
        if (input.includes('ArrowDown')){
            this.player.setState(states.IDLE);
        } else if (input.includes('ArrowUp')){
            this.player.setState(states.JUMPING_RIGHT);
        }
        if (!input.includes('ArrowLeft') && !input.includes('ArrowRight')){
            this.player.setState(states.IDLE);
        }
    }
}

export class JumpingRight extends State { 
    constructor(player){
        super('JUMPING_RIGHT');
        this.player = player;
    }
    enter(){
        if (this.player.onGround()) this.player.vy -= 36 ;
        this.player.infiniteLoop = false;
        this.player.image = upperMonkeySprite;
        this.player.maxFrame = 5;
        this.player.frameX = 0;
        this.player.frameY = 2;
    }
    handleInput(input){
        if (this.player.vy > this.player.weight){
            this.player.setState(states.FALLING_RIGHT);
        }
    }
}

export class FallingRight extends State {
    constructor(player){
        super('FALLING_RIGHT');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = true;
        this.player.image = upperMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 0;
        this.player.frameY = 3;
    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.RUNNING_RIGHT);
        }
    }
}

export class Crouching extends State {
    constructor(player){
        super('CROUCHING');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = false;
        this.player.image = lowerMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 0;
    }
    handleInput(input){

        if(!input.includes('ArrowDown')){
            this.player.setState(states.IDLE);
        }
    }
}

export class GivingBanana extends State {
    constructor(player){
        super('GIVING_BANANA');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = false;
        this.player.image = lowerMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 0;
    }
    handleInput(input){
        if(!input.includes('ArrowDown')){
            this.player.setState(states.IDLE);
        }
        console.log(input);
    }
}
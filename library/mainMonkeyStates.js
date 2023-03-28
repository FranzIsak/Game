const states = {
    IDLE: 0,
    RUNNING: 1,
    JUMPING_RIGHT: 2,
    FALLING_RIGHT: 3,
    // Landing Placeholder //
    CROUCHING: 5,
    // Swinging Placeholder //
    GIVING_BANANA: 7,
    THROWING_BANANA: 8,
    DIE: 9,

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
        if (input.includes('ArrowUp')) this.player.setState(states.JUMPING_RIGHT);
        else if (input.includes('ArrowLeft') || input.includes('ArrowRight')) this.player.setState(states.RUNNING);
        else if (input.includes('ArrowDown')) this.player.setState(states.CROUCHING);
        else if (input.includes('b')) this.player.setState(states.GIVING_BANANA);
        else if (input.includes(' ')) this.player.setState(states.THROWING_BANANA);
        else if (input.includes('d')) this.player.setState(states.DIE);
    }
}

export class Running extends State {
    constructor(player){
        super('RUNNING');
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
        if (input.includes('ArrowUp')) this.player.setState(states.JUMPING_RIGHT);
        if (input.includes(' ')) this.player.setState(states.THROWING_BANANA);
        // Passa að apinn snúi í rétta átt
        if (!input.includes('ArrowLeft') && !input.includes('ArrowRight')){
            this.player.setState(states.IDLE);
        } else {
            for (let i = 0; i < input.length; i++){
                if(input[i] === 'ArrowRight'){
                    this.player.direction = 'right';
                    break;
                } 
                else if(input[i] === 'ArrowLeft'){
                    this.player.direction = 'left';
                    break;
                }
            }
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
        if (this.player.onGround()) this.player.setState(states.RUNNING);
        
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
        if(!input.includes('ArrowDown')) this.player.setState(states.IDLE);
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
        this.player.frameY = 2;
    }
    handleInput(input){
        if(input.includes('b') && this.player.frameX === this.player.maxFrame) this.player.frameX = 0;
        else if(this.player.frameX >= this.player.maxFrame) this.player.setState(states.IDLE);
        
    }
}

export class ThrowingBanana extends State {
    constructor(player){
        super('THROWING_BANANA');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = false;
        this.player.image = lowerMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 8;
        this.player.frameY = 3;
    }
    handleInput(input){
        if(input.includes(' ') && this.player.frameX === this.player.maxFrame) this.player.frameX = 0;
        if(this.player.frameX >= this.player.maxFrame) this.player.setState(states.IDLE);
    }
}

export class Die extends State {
    constructor(player){
        super('DIE');
        this.player = player;
    }
    enter(){
        this.player.infiniteLoop = false;
        this.player.image = lowerMonkeySprite;
        this.player.frameX = 0;
        this.player.maxFrame = 10;
        this.player.frameY = 4;
    }
    handleInput(input){
        // if(input.includes(' ') && this.player.frameX === this.player.maxFrame) this.player.frameX = 0;
        // if(this.player.frameX >= this.player.maxFrame) this.player.setState(states.IDLE);
    }
}
const states = {
    IDLE: 0,
    RUNNING_RIGHT: 1,
    JUMPING_RIGHT: 2,
    FALLING_RIGHT: 3,
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
        this.player.maxFrame = 7;
        this.player.frameY = 0;
    }
    handleInput(input){
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.player.setState(states.RUNNING_RIGHT);
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
        this.player.maxFrame = 4;
        this.player.frameX = 0;
        this.player.frameY = 3;
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
        this.player.frameX = 0;
        this.player.maxFrame = 0;
        this.player.frameY = 4;

    }
    handleInput(input){
        if (this.player.onGround()){
            this.player.setState(states.RUNNING_RIGHT);
        }
    }
}


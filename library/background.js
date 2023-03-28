export class Layer {
    constructor(game) {
        this.game = game;
        this.canvasWidth = this.game.width;
        this.canvasHeight = this.game.height;
        // Player information
        this.player = this.game.player;
        this.playerX = this.player.x;
        this.playerY = this.player.y;
        this.playerWidth = this.player.width;
        this.playerHeight = this.player.height;
        
        // Start Location of background image
        this.x = this.player.x;
        this.y = -550;

        this.mainBackground = MainBackground;
        this.pinkBackground = PinkBackground;
        this.cliffBackground = CliffBackground;
        
    }
    update(){
        // If Player is falling on the end of level 1 then move background and Player
        if(this.player.x > 9055 && this.player.y >= 480 && this.y >= -1058){
            this.y-= this.player.vyDefault;
            this.player.y+= this.player.weight*5;
            if(this.player.x > 13000){
                
            } else {
                this.playerX = -this.player.x;
            }
        } else {
            this.playerX = -this.player.x;
            this.playerY = -this.player.y;
        }
    }
    draw(context){
        this.context = context;
        // Ef Apinn er ekki búinn að hoppa niður í enda level 1
        if(this.player.x < 13000){
            this.context.drawImage(this.cliffBackground, this.playerX, this.y);
        } 
        // Ef apinn er búinn að hoppa niður þá festist background
        else {
            this.context.drawImage(this.cliffBackground, -13000, this.y);
        }
        // if(this.player.x < 9055){
        //     this.context.drawImage(this.cliffBackground, this.playerX, this.y);
        // } 
        // // Ef apinn er búinn að hoppa niður þá festist background
        // else {
        //     this.context.drawImage(this.cliffBackground, -9055, this.y);
        // }
    }
}

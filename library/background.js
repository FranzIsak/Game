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
        
        // End of background
        this.endOfLevel = 13000;

        this.mainBackground = MainBackground;
        this.pinkBackground = PinkBackground;
        this.cliffBackground = CliffBackground;
        
    }
    update(){
        // console.log(this.playerX);
        // If Player is falling on the end of level 1 then move background and Player
        if(this.player.x > 9055 && this.player.y >= 480 && this.y >= -1158){//-1158){
            this.y-= this.player.vyDefault;
            if(this.y > -1158){
                this.player.y+= this.player.weight*5;
            } else{
                this.player.y = 446;
            }
            if(this.player.x > this.endOfLevel){
                
            } else {
                this.playerX = -this.player.x;
            }
        } else {
            this.playerX = -this.player.x;
            this.playerY = -this.player.y;
        }
        
        console.log(this.playerX);

        if(this.playerX < -14250){
            window.location.href = "https://verkefni.franzisak.is/pages/gameOver.html";
        }
    }
    draw(context){
        this.context = context;
        // Ef Apinn er ekki búinn að hoppa niður í enda level 1
        if(this.player.x < this.endOfLevel){
            this.context.drawImage(this.cliffBackground, this.playerX, this.y);
        } 
        // Ef apinn er búinn að hoppa niður þá festist background
        else {
            this.context.drawImage(this.cliffBackground, -this.endOfLevel, this.y);
        }
    }
    getYMovement() {
        if (this.player.x > 9055 && this.player.y >= 480 && this.y >= -1158) {
            return -this.player.vyDefault+1;
        }
        return 0;
    }
}

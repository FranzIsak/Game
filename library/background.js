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
        this.x = this.player;
        this.y = -550;

        this.mainBackground = MainBackground;
        this.pinkBackground = PinkBackground;
        this.cliffBackground = CliffBackground;
        
    }
    update(){
        this.playerX = -this.player.x;
        this.playerY = -this.player.y;
    }
    draw(context){
        this.context = context;
        // this.context.drawImage(this.pinkBackground, this.playerX, -230);
        // this.context.drawImage(this.mainBackground, this.playerX, -230);
        this.context.drawImage(this.cliffBackground, this.playerX, this.y);
    }
}

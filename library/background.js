export class Layer {
    constructor(game){//, width, height, speedModifier, image){
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
        this.x = this.pl;
        this.y = 0;

        this.mainBackground = MainBackground;
        
    }
    update(){
        this.playerX = -this.player.x;
        this.playerY = -this.player.y;
        console.log(this.playerX);
        console.log(this.playerY);
    }
    draw(context){
        this.context = context;
        this.context.drawImage(this.mainBackground, this.playerX, -250);
    }
}

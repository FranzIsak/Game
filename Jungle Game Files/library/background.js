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
        this.x = this.player;
        this.y = 0;

        this.mainBackground = MainBackground;
        this.pinkBackground = PinkBackground;
        
    }
    update(){
        // console.log(this.player.x);
        // if(this.player.x >=-200){
            this.playerX = -this.player.x;
        // }
        this.playerY = -this.player.y;
    }
    draw(context){
        this.context = context;
        this.context.drawImage(this.pinkBackground, this.playerX, -230);
    }
}

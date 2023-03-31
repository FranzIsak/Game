export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 50;
        this.fontFamily = 'Nanum Brush Script';
        
        
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = "left";
        context.fillStyle = this.game.fontColor;
        //drawing score to left of game
        context.fillText("Score: "+this.game.score/19, 20,50);
    }
}

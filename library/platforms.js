/** @type {HTMLCanvasElement} **/

// Export to main.js to use it when defining a class item for PlatformHandler
export const platformLocations = [
    {
        x: 500,
        y: 500,
        width: 500,
    },
    {
        x: 5500,
        y: 600,
        width: 500,
    },
    {
        x: 6700,
        y: 500,
        width: 500,
    },
    {
        x: 6000,
        y: 400,
        width: 500,
    },
    {
        x: 7500,
        y: 300,
        width: 500,
    },
]



// Pull each item inside platformLocations from main.js that was exported from platforms.js
export class PlatformHandler{
    constructor(game, ctx, player, platformInfo){
        this.game = game;
        this.ctx = ctx
        this.player = player;
        this.lineWidth = 5;
        this.x = platformInfo.x;
        this.y = platformInfo.y;
        this.width = platformInfo.width;
    }
    update(){
        this.drawX = - this.player.x + this.x;
        this.drawEndX = this.drawX + this.width
        
        this.playerOffsetX = 92; // Hitbox width  = 294 - 92*2 = 110px
        this.playerOffsetY = 30; // Hitbox height = 294 -  30  = 264px
        this.playerStartX = this.player.monkeyX + this.playerOffsetX;
        this.playerStartY = this.player.y + this.playerOffsetY; // Byrja hitbox 30px fyrir neðan animation frame
        this.playerWidth = this.player.width - this.playerOffsetX*2;
        this.playerHeight = this.player.height - this.playerOffsetY; 
        console.log(this.playerWidth);
        this.playerEndX = this.playerStartX + this.playerWidth;
        this.playerFeetLocation = this.playerStartY + this.playerHeight;

        if(this.playerEndX > this.drawX && this.playerStartX < this.drawEndX && this.playerStartX+this.playerWidth){
            if(this.y >= this.playerFeetLocation){
                this.player.currentGround = this.y - this.playerHeight;
                return true;
            }
        } 
    

    }
    draw(){
        // Rectangle around monkey
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.startY = this.player.y;
        // this.realY = this.player.y+this.player.height;
        this.ctx.rect(this.playerStartX, this.playerStartY, this.playerWidth, this.playerHeight);
        this.ctx.stroke();

        // Platforms
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(this.drawX, this.y);
        this.ctx.lineTo(this.drawEndX, this.y);
        this.ctx.stroke();
    }
}
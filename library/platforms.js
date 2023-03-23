// Export to main.js to use it when defining a class item for PlatformHandler
export const platformLocations = [
    // {
    //     x: 100,
    //     y: 100,
    //     width: 500,
    // },
    // {
    //     x: 100,
    //     y: 200,
    //     width: 500,
    // },
    {
        x: 100,
        y: 500,
        width: 500,
    },
]



// Pull each item inside platformLocations from main.js that was exported from platforms.js
export class PlatformHandler{
    constructor(ctx, player, platformInfo){
        this.ctx = ctx
        this.player = player;
        this.lineWidth = 5;
        this.x = platformInfo.x;
        this.y = platformInfo.y;
        this.width = platformInfo.width;
        // this.endX = this.x + this.width;
    }
    update(){
        this.drawX = - this.player.x + this.x;
        this.drawEndX = this.drawX + this.width
        this.playerX = this.player.x;
        this.playerY = this.player.y;


        if(this.playerX >= this.drawX && this.playerX <= this.drawEndX && this.playerY >= this.y) this.player.currentGround = this.y;
        // else this.player.currentGround = this.player.mainGround;
        
        

        console.log(this.drawX); 
    }
    draw(){
        this.ctx.beginPath();
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.moveTo(this.drawX, this.y);
        this.ctx.lineTo(this.drawEndX, this.y);
        this.ctx.stroke();
    }
}
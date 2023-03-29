/** @type {HTMLCanvasElement} **/

// ???
import { Layer } from './background.js';
// ???

// Pull each item inside platformLocations from main.js that was exported from platforms.js
export class PlatformHandler{
    constructor(game, ctx, player, platformInfo, background){
        // ???
        this.background = background;
        // ???

        this.game = game;
        this.ctx = ctx
        this.player = player;
        this.lineWidth = 5;
        this.x = platformInfo.x;
        this.y = platformInfo.y;
        this.highestGround = 0;
        this.width = platformInfo.width;
        this.platformColor = platformInfo.color;
    }
    update(){
        this.y += this.background.getYMovement();
        this.drawX = - this.player.x + this.x;
        this.drawEndX = this.drawX + this.width
        
        this.playerOffsetX = 92; // Hitbox width  = 294 - 92*2 = 110px
        this.playerOffsetY = 30; // Hitbox height = 294 -  30  = 264px
        this.playerStartX = this.player.monkeyX + this.playerOffsetX;
        this.playerStartY = this.player.y + this.playerOffsetY; // Byrja hitbox 30px fyrir neðan animation frame
        this.playerWidth = this.player.width - this.playerOffsetX*2;
        this.playerHeight = this.player.height - this.playerOffsetY; 
        this.playerEndX = this.playerStartX + this.playerWidth;
        this.playerFeetLocation = this.playerStartY + this.playerHeight;

        // Check if Player hitbox x coordinates is within platform
        if(this.playerEndX > this.drawX && this.playerStartX < this.drawEndX && this.playerStartX+this.playerWidth){
            // Check if Player hitbox y coordinates is within platform
            if(this.y >= this.playerFeetLocation){
                // If Player hitbox is above platform and within x coordinates
                let currentGroundCheck = this.y - this.playerHeight - this.playerOffsetY
                if(currentGroundCheck > this.highestGround){
                    this.player.currentGround = this.y - this.playerHeight - this.playerOffsetY;
                    return true;
                }
            }
        } 
    

    }
    draw(){
        // Rectangle around monkey
        // this.ctx.beginPath();
        // // this.ctx.strokeStyle = 'Purple';
        // this.ctx.lineWidth = this.lineWidth;
        // this.startY = this.player.y;
        // // this.realY = this.player.y+this.player.height;
        // this.ctx.rect(this.playerStartX, this.playerStartY, this.playerWidth, this.playerHeight);
        // this.ctx.stroke();

        // // Platforms
        // this.ctx.beginPath();
        // // this.ctx.strokeStyle = this.platformColor;
        // this.ctx.lineWidth = this.lineWidth;
        // this.ctx.moveTo(this.drawX, this.y);
        // this.ctx.lineTo(this.drawEndX, this.y);
        // this.ctx.stroke();
    }
}

// Export to main.js to use it when defining a class item for PlatformHandler
export const platformLocations = [ // Write platforms with same X values from top Y to bottom Y
    ///////////////
    // Section 1 //
    ///////////////
    {
        x: 2120,
        y: 740,
        width: 1315,
        color: 'red',
    },
    {
        x: 0,
        y: 620,
        width: 1200,
        color: 'red',
    },
    {
        x: 1820,
        y: 565,
        width: 310,
        color: 'red',
    },
    {
        x: 3320,
        y: 415,
        width: 365,
        color: 'red',
    },
    {
        x: 2640,
        y: 345,
        width: 195,
        color: 'red',
    },
    ///////////////
    // Section 2 //
    ///////////////
    {
        x: 4220,
        y: 410,
        width: 245,
        color: 'blue',
    },
    {
        x: 3915,
        y: 515,
        width: 225,
        color: 'blue',
    },
    {
        x: 4535,
        y: 600,
        width: 460,
        color: 'blue',
    },
    {
        x: 5160,
        y: 450,
        width: 190,
        color: 'blue',
    },
    {
        x: 5535,
        y: 350,
        width: 190,
        color: 'blue',
    },
    ////////////////////////////
    // Section 4 (DOWNSTAIRS) //
    ////////////////////////////
    {
        x: 9035,
        y: 1330,
        width: 4450,
        color: 'orange',
    },
    {
        x: 14085,
        y: 1330,
        width: 4450,
        color: 'orange',
    },
    {
        x: 9035,
        y: 1300,
        width: 3000,
        color: 'orange',
    },
    ///////////////
    // Section 3 //
    ///////////////
    {
        x: 6497,
        y: 750,
        width: 1315,
        color: '#ffc0cb',
    },
    {
        x: 6162,
        y: 565,
        width: 355,
        color: '#ffc0cb',
    },
    {
        x: 8269,
        y: 520,
        width: 220,
        color: '#ffc0cb',
    },
    {
        x: 7677,
        y: 415,
        width: 365,
        color: '#ffc0cb',
    },
    {
        x: 8572,
        y: 415,
        width: 725,
        color: '#ffc0cb',
    },
    {
        x: 7002,
        y: 345,
        width: 195,
        color: '#ffc0cb',
    },
    ////////////////////////////
    // Section 4 (DOWNSTAIRS) //
    ////////////////////////////
]


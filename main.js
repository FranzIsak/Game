// import (MainMonkey) from 
import { Player } from "./library/mainMonkey.js";
import { InputHandler } from "./library/input.js";
import { Layer } from "./library/background.js";
import { platformLocations, PlatformHandler } from "./library/platforms.js";
import { ChangeGameFps } from "./library/htmlHandler.js";



window.addEventListener('load', function(){
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400; // Adjust canvas width with the #mainCanvas
    canvas.height = 788; // Adjust canvas height with the #mainCanvas
    
    class Game {
        constructor(width, height){
            this.width = canvas.width;
            this.height = canvas.height;
            this.groundMargin = 600; // eins og #player { margin-bottom: 74px;}
            this.player = new Player(this);
            // Draw background class item //
            this.layer = new Layer(this);
            this.input = new InputHandler(this);
            this.gameFps = 50;
            this.changeGameFps = new ChangeGameFps(this)
            this.allPlatforms = [];
            platformLocations.forEach(platform => {
                this.allPlatforms.push(new PlatformHandler(this, ctx, this.player, platform));
            });
            // console.log(this.allPlatforms);
        }
        update(deltaTime){
            let tempArray = [];
            this.allPlatforms.forEach(platform => {
                tempArray.push(platform.update());
            });
            if(!tempArray.includes(true)) this.player.currentGround = this.player.mainGround;
            this.player.update(this.input.keys, deltaTime);
            // Draw background //
            this.layer.update();
        }
        draw(context){
            // Draw background //
            this.layer.draw(ctx);

            this.allPlatforms.forEach(platform => {
                platform.draw();
            });
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // FPS control
    let lastTime = 0;
    
    function animate(timeStamp){
        // FPS control        
        const deltaTime = timeStamp - lastTime;
        if(deltaTime >= 1000 / game.gameFps){
            ctx.clearRect(0,0,canvas.width, canvas.height);
            game.update(deltaTime);
            game.draw(ctx);
            lastTime = timeStamp;
            const fps = Math.round(1000 / deltaTime);
            document.getElementById("fpsValue").innerText = fps;
        } 
        requestAnimationFrame(animate);
    }
    animate(0);
});
// import (MainMonkey) from 
import { Player } from "./library/mainMonkey.js";
import { InputHandler } from "./library/input.js";
import { Layer } from "./library/background.js";
import { platformLocations, PlatformHandler } from "./library/platforms.js";
import { ChangeGameFps } from "./library/htmlHandler.js";
// console.log(platformLocations[0].test);



window.addEventListener('load', function(){
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400; // Adjust canvas width with the #mainCanvas
    canvas.height = 788; // Adjust canvas height with the #mainCanvas
    
    class Game {
        constructor(width, height){
            
            // console.log(this.allPlatforms);
            this.width = canvas.width;
            this.height = canvas.height;
            this.groundMargin = 30; // eins og #player { margin-bottom: 74px;}
            this.player = new Player(this);
            this.input = new InputHandler(this);
            // Test background //
            this.layer = new Layer(this);
            // Test background //
            this.gameFps = 50;
            this.changeGameFps = new ChangeGameFps(this)
            this.allPlatforms = [];
            platformLocations.forEach(platform => {
                this.allPlatforms.push(new PlatformHandler(this, ctx, this.player, platform));
            })
        }
        update(deltaTime){
            // console.log(this.gameFps)
            let tempArray = [];
            this.allPlatforms.forEach(platform => {
                tempArray.push(platform.update());
            });
            if(!tempArray.includes(true)) this.player.currentGround = this.player.mainGround;
            this.player.update(this.input.keys, deltaTime);
            // Test background update //
            this.layer.update();
            // Test background update //
        }
        draw(context){
            // Test background draw //
            this.layer.draw(ctx);
            // Test background draw //
            this.allPlatforms.forEach(platform => {
                platform.draw();
            });
            // console.log(this.allPlatforms);

            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // FPS control
    let lastTime = 0;
    
    function animate(timeStamp){
        // FPS control        
        const deltaTime = timeStamp - lastTime;
        // console.log(deltaTime)
        // console.log(1000 / game.gameFps)
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
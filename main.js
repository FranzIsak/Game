// import (MainMonkey) from 
import { Player } from "./library/mainMonkey.js";
import { InputHandler } from "./library/input.js";
import { Layer } from "./library/background.js";

window.addEventListener('load', function(){
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400; // Adjust canvas width with the #mainCanvas
    canvas.height = 788; // Adjust canvas height with the #mainCanvas
    
    class Game {
        constructor(width, height){
            this.width = canvas.width;
            this.height = canvas.height;
            this.groundMargin = 74; // eins og #player { margin-bottom: 74px;}
            this.player = new Player(this);
            this.input = new InputHandler(this);
            // Test background //
            // this.layer = new Layer(this);
            // Test background //
        }
        update(deltaTime){
            this.player.update(this.input.keys, deltaTime);
            // Test background update //
            // this.layer.update();
            // Test background update //
        }
        draw(context){
            // Test background draw //
            // this.layer.draw(ctx);
            // Test background draw //

            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);
    // TEST ?
    // TEST ?

    // FPS control
    let lastTime = 0;

    function animate(timeStamp){
        // FPS control
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        
        ctx.clearRect(0,0,canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});
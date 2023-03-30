// import (MainMonkey) from 
import { Player } from "./library/mainMonkey.js";
import { InputHandler } from "./library/input.js";
import { Layer } from "./library/background.js";
import { platformLocations, PlatformHandler } from "./library/platforms.js";
//import enemy types from enemies (Lexi-Edit)
import { FlyingEnemy, BossEnemy, SnakeEnemy } from "./library/enemies.js";
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
            //add enemis in array(Lexi-Edit)
            this.enemies = [];
            this.enemyTimer = 0;
            //enemy spawn timer(Lexi-Edit)
            this.enemyInterval = 2000;
            this.layer = new Layer(this);

            this.enemyCounter = 0;
            console.log("wtf"+this.enemyCounter);
            // Test background //

            this.allPlatforms = [];
            platformLocations.forEach(platform => {
                this.allPlatforms.push(new PlatformHandler(this, ctx, this.player, platform));
            })
            
        }
        update(deltaTime){
            let tempArray = [];
            this.allPlatforms.forEach(platform => {
                tempArray.push(platform.update());
            });
            if(!tempArray.includes(true)) this.player.currentGround = this.player.mainGround;
            this.player.update(this.input.keys, deltaTime);
            // Test background update //
            this.layer.update();
            // Test background update //

            //handle enemies (lexa-edit)
            if (this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            } else {
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{
                enemy.update(deltaTime);
                //delete enemy
                if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 1);

            })

        }
        draw(context){
            // Test background draw //
            this.layer.draw(ctx);
            // Test background draw //
            this.allPlatforms.forEach(platform => {
                platform.draw();
            });
            //Draw enemies on canvas (Lexi-Edit)
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            // console.log(this.allPlatforms);

            this.player.draw(context);
            
            
        }
        //add enemies to list (Lexi-Edit)
        addEnemy(){
            let enemyType = Math.floor(Math.random() * 2);
            console.log(enemyType);
        
                if (enemyType === 1){
                    this.enemies.push(new FlyingEnemy(this));
                }
                else{
                    this.enemies.push(new SnakeEnemy(this));
                }
                
           
        console.log(this.enemies);
        }



        //l
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
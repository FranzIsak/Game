// import (MainMonkey) from 
import { Player } from "./library/mainMonkey.js";
import { InputHandler } from "./library/input.js";
import { Layer } from "./library/background.js";
import { platformLocations, PlatformHandler } from "./library/platforms.js";
import { ChangeGameFps } from "./library/htmlHandler.js";
//import enemy types from enemies (Lexi-Edit)
import { FlyingEnemy, BossEnemy, SnakeEnemy } from "./library/enemies.js";
import { UI } from "./library/UI.js";
localStorage['myScore'] = '0'; // only strings


window.addEventListener('load', function(){
    const canvas = document.getElementById('mainCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 1400; // Adjust canvas width with the #mainCanvas
    canvas.height = 788; // Adjust canvas height with the #mainCanvas
    
    class Game {
        constructor(width, height){
            this.totalEnemies = 0;
            this.width = canvas.width;
            this.height = canvas.height;
            this.groundMargin = 600; // eins og #player { margin-bottom: 74px;}
            // Draw background class item //
            this.player = new Player(this);
            this.layer = new Layer(this);
            this.input = new InputHandler(this);
            //Lexa-Edit
            this.UI = new UI(this);


            this.score = 0;
           
            this.fontColor = "black";


            //add enemis in array(Lexi-Edit)
            this.enemies = [];
            this.enemyTimer = 0;
            //enemy spawn timer(Lexi-Edit)
            this.enemyInterval = 2000;
            // this.layer = new Layer(this);

            this.enemyCounter = 0;
            // console.log("wtf"+this.enemyCounter);

            this.gameFps = 50;
            this.changeGameFps = new ChangeGameFps(this)
            this.allPlatforms = [];
            platformLocations.forEach(platform => {
            // ???
            this.allPlatforms.push(new PlatformHandler(this, ctx, this.player, platform, this.layer));
            // ???
            // this.allPlatforms.push(new PlatformHandler(this, ctx, this.player, platform));
            });
            // console.log(this.allPlatforms);
            // /// TESTING ONE ENEMY ///
            // this.enemies.push(new SnakeEnemy(this));
            // /// TESTING ONE ENEMY ///
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

            // handle enemies (lexa-edit) START // 
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
            // handle enemies (lexa-edit) STOP //
        }
        draw(context){
            // Draw background //
            this.layer.draw(ctx);

            this.allPlatforms.forEach(platform => {
                platform.draw();
            });
            this.player.draw(context, this.layer);
            //Draw UI on canvas (Lexi-Edit)
            

            //Draw enemies on canvas (Lexi-Edit)
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            });
            this.UI.draw(context);
        }
        // add enemies to list (Lexi-Edit) START //
        addEnemy(){
            
            if(this.player.x <= 9050-this.width){
                this.totalEnemies++;
                let enemyType = Math.floor(Math.random() * 2);
                // console.log(enemyType);
                // console.log(enemyType);
                
                if (enemyType === 1){
                    this.enemies.push(new FlyingEnemy(this));
                }
                else{
                    this.enemies.push(new SnakeEnemy(this));
                }
            }
            
            // console.log('enemy number '+this.totalEnemies+' spawned');
            // 
            
            
        }
        // add enemies to list (Lexi-Edit) STOP //
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


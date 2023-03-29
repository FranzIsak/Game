
export class ChangeGameFps{
    constructor(game){
        this.deltaTime;
        console.log(game.gameFps);
        document.getElementById("fpsValue").innerText = game.gameFps;
        function changeFpsValue(event){
            game.gameFps = document.getElementById("myRange").value;
            document.getElementById("fpsValue").innerText = game.gameFps;
            // alert(game.gameFps)
            // alert('test')
        }
        this.game = game;
        this.fpsButtonClicked = document.getElementById('changeFpsButton')
        this.fpsButtonClicked.addEventListener('click', changeFpsValue, false);
        // game.gameFps = parseInt(inputText); 
        // this.fps = parseInt(inputText);
            
          
    }
}
export class ChangeMonkeyFps{
    constructor(player){
        this.player = player;
        document.getElementById('fpsOptions').onchange = function() {
            var index = this.selectedIndex;
            var inputText = this.children[index].innerHTML.trim();
            player.frameInterval = 1000 / parseInt(inputText);
          }
    }
}

export class ChangeMonkeySpeed{
    constructor(player){
        this.player = player;
        document.getElementById('monkeySpeed').onchange = function() {
            var index = this.selectedIndex;
            var inputText = this.children[index].innerHTML.trim();
            player.maxSpeed = parseInt(inputText);
          }
    }
}

export class ChangeMonkeyWeight{
    constructor(player){
        this.player = player;
        document.getElementById('monkeyWeight').onchange = function() {
            var index = this.selectedIndex;
            var inputText = this.children[index].innerHTML.trim();
            player.weight = parseInt(inputText);
          }
    }
}
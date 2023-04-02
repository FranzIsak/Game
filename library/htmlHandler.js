
export class ChangeGameFps{
    constructor(game){
        this.deltaTime;
        document.getElementById("fpsValue").innerText = game.gameFps;
        function changeFpsValue(event){
            game.gameFps = document.getElementById("myRange").value;
            document.getElementById("fpsValue").innerText = game.gameFps;
        }
        this.game = game;
        this.fpsButtonClicked = document.getElementById('changeFpsButton')
        this.fpsButtonClicked.addEventListener('click', changeFpsValue, false);
            
          
    }
}

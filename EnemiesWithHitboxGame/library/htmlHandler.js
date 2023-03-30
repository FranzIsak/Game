
export class ChangeFps{
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
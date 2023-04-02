// Geyma score fyrir gameOver.html
const score = localStorage.getItem('score');

window.addEventListener('load', function(){
    document.body.style.backgroundImage = "url('../images/Background/aiBackgrounds/victoryBackgroundwebp.webp')";
    const currentScore = score;
    scorePrint = document.getElementById('userScore');
    scorePrint.readOnly = true;
    scorePrint.value = "Your score was "+currentScore;

    this.slideSound = new Audio("../audio/gameComplete.wav");
    this.slideSound.volume = 1;
    this.slideSound.addEventListener("loadedmetadata", () => {
        this.slideSound.play();
    });

});    

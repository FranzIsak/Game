
const highScore = {
    };
console.log(highScore.score);

function submitUserName(){
    
    user = document.getElementById('userName').value;
    console.log(user);
    highScore[currentScore] = user;
    console.log(highScore);
}


function onLoadBody() {
    const currentScore = 50;
    scorePrint = document.getElementById('userScore');
    scorePrint.readOnly = true;
    scorePrint.value = "Your score was "+currentScore;


} 
console.log(highScore);



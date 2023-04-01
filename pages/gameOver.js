// Franz Edit
const score = localStorage.getItem('score');
// Franz Edit


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
    const currentScore = score;
    scorePrint = document.getElementById('userScore');
    scorePrint.readOnly = true;
    // Franz Edit
    scorePrint.value = "Your score was "+currentScore;
    // Franz Edit


} 
console.log(highScore);



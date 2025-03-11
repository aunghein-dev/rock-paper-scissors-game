const rockElement = document.querySelector('.rock');
const paperElement = document.querySelector('.paper');
const scissorsElement = document.querySelector('.scissors');
const resetScoreElement = document.querySelector('.score-reset');

let result = '';

const score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  loses: 0,
  ties: 0
}

rockElement.addEventListener('click',()=>{
  playGame('rock');
})

paperElement.addEventListener('click',()=>{
  playGame('paper');
})

scissorsElement.addEventListener('click',()=>{
  playGame('scissors');
})

resetScoreElement.addEventListener('click',()=>{
  resetScore(score);
})



function makeComputerMove(){
  let computerMove = '';
  let randomNumber = Math.floor((Math.random()) * 3) ;
  if(randomNumber===0){
    computerMove = 'rock'
  } else if (randomNumber === 1){
    computerMove = 'paper'
  } else if (randomNumber === 2){
    computerMove = 'scissors'
  }
  return computerMove;
}

function playGame(playerMove){
  let computerMove = '';
  computerMove = makeComputerMove();
  if(computerMove===playerMove){
    result = 'Tie.'
  }else {
    if(playerMove === 'rock'){
      if(computerMove === 'paper'){
        result = 'You Lose.'
      }else if (computerMove === 'scissors'){
        result = 'You Win.'
      }
    } else if (playerMove === 'paper'){
      if(computerMove === 'rock'){
        result = 'You Win.'
      } else if (computerMove === 'scissors'){
        result = 'You Lose.'
      }
    } else if (playerMove === 'scissors'){
      if(computerMove==='rock'){
        result = 'You Lose.'
      } else if (computerMove === 'paper'){
        result = 'You Win.'
      }
    }
  }

  showScore(result);
  showResult();
  showMoves(computerMove, playerMove);
}

function resetScore(score){
  score.wins = 0;
  score.loses = 0;
  score.ties = 0;
  document.querySelector('.score-text').textContent = 'Wins: 0, Loses: 0, Ties: 0';
}

function showScore(result){
  if(result==='You Win.'){
    score.wins ++;
  } else if (result === 'You Lose.'){
    score.loses ++;
  } else if (result === 'Tie.'){
    score.ties ++;
  }
  document.querySelector('.score-text').textContent = `Wins: ${score.wins}, Loses: ${score.loses}, Ties: ${score.ties}`;

  storeScoreLocalStorage();
}

function storeScoreLocalStorage(){
  localStorage.setItem('score',JSON.stringify(score));
}

function showResult(){
  document.querySelector('.result').textContent = result;
}

function showMoves(computerMove, playerMove){
  document.querySelector('.game-move-container').innerHTML =
  `You
  <img src="game-images/${playerMove}-emoji.png" />
  <img src="game-images/${computerMove}-emoji.png" />
  Computer`
}
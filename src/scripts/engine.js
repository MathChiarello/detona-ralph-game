const state = {
  view: {
    squares: document.querySelectorAll('.square'),
    emeny: document.querySelector('.enemy'),
    timeLeft: document.querySelector('#time-left'),
    score: document.querySelector('#score'),
    timeGame: document.querySelector('#time-game'),
    startGame: document.querySelector('#start-game'),
    result: document.querySelector('#result'),
    lifePlayer: document.querySelector('#life-player'),
  },
  values: {
    timerId: null,
    timerGame: null,
    hitPosition: 0,
    time: 60,
    startTime: 0,
  },
}

// Função que gera um número aleatório e adiciona a classe enemy a um quadrado
function randomSquare() {
  const squares = state.view.squares;
  
  // Remove a classe enemy de todos os quadrados
  squares.forEach((square) => {
    square.classList.remove('enemy');
  });
  
  // Gera um número aleatório e adiciona a classe enemy ao quadrado correspondente
  let randomNumber = Math.floor(Math.random() * squares.length);
  squares[randomNumber].classList.add('enemy');
  // state.values.hitPosition = randomNumber + 1;
  state.values.hitPosition = squares[randomNumber].id;
  
}

// Função que toca um som de acordo com o parâmetro passado
function playSound(audioPath) {
  const audio = new Audio(`src/audios/${audioPath}.mp3`);
  audio.volume = 0.2;
  audio.play();
}

// Função que incrementa o score ao clicar no quadrado correto
function addListenerHitBox() {
  squares = state.view.squares;
  score = state.view.score;

  squares.forEach((square) => {
    square.addEventListener('mousedown', () => {
      if (square.id == state.values.hitPosition) {
        playSound('hit');
        score.textContent = parseInt(score.textContent) + 1;
        state.values.hitPosition = null;
      }
    });
  })}

// Função que decrementa o tempo
function countDown() {
  state.values.time--;
  state.view.timeLeft.textContent = state.values.time;

  if (state.values.time === 0) {    
    stopGame();
  }
  
}

// Função que inicia o jogo
function startGame() {
  state.values.timerId = setInterval(randomSquare, 1000);
  state.values.timerGame = setInterval(countDown, 1000);
 
  addListenerHitBox();  
  state.view.timeLeft.textContent = state.values.time;
  state.view.score.textContent = 0;
  state.view.result.textContent = '';
}

// Função que para o jogo
function stopGame() {
  clearInterval(state.values.timerGame);
  clearInterval(state.values.timerId);  

  if(state.values.startTime === state.view.score.textContent) {
    state.view.result.textContent = 'You win!';
    state.view.result.style.color = 'green';
    playSound('win');
  } else {
    state.view.result.textContent = 'You lose!';
    state.view.result.style.color = 'red';
    playSound('gameOver');

    state.view.lifePlayer.textContent = parseInt(state.view.lifePlayer.textContent) - 1;
  }
  
  state.view.squares.forEach((square) => {
    square.classList.remove('enemy');
  });
}

// Função que inicializa o jogo
function init() {
  state.view.startGame.addEventListener('click', () => {
    if(state.view.timeGame.value == 0) {
      alert('Please, insert a time');
      return;
    }
    
    state.values.time = parseInt(state.view.timeGame.value) + 1;
    state.values.startTime = state.view.timeGame.value;
    startGame();    
  })
}
  
init();
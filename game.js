// Iteration 1: Declare variables required for this game
const gameArea = document.getElementById("game-body");
let playerLives = 4;
let gameTime = 60;
let zombieID = 0;
let zombieElement;
let progressBarWidth = 100;

// Iteration 1.2: Add shotgun sound
let shotgunSound = new Audio("assets/shotgun.wav");
gameArea.onclick = () => {
  shotgunSound.pause();
  shotgunSound.currentTime = 0;
  shotgunSound.play();
};

// Iteration 1.3: Add background sound
let bgmSound = new Audio("assets/bgm.mp3");
bgmSound.play();
bgmSound.loop = true;

// Iteration 1.4: Add lives
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// Iteration 2: Write a function to make a zombie
function createZombie() {
    let zombieType = getRandomNumber(1, 7);
    gameArea.innerHTML += `<img src="assets/zombie-${zombieType}.png" class='zombie-image' id='zombieID${zombieID}'>`;
    zombieElement = document.getElementById(`zombieID${zombieID}`);
    let animationTime = getRandomNumber(2, 6);
    zombieElement.style.animationDuration = `${animationTime}s`;
    zombieElement.style.transform = `translateX(${getRandomNumber(20, 80)}vw)`;
    zombieElement.onclick = () => eliminateZombie(zombieElement);
  }

// Iteration 3: Write a function to check if the player missed a zombie
function checkZombieEscape(zombie) {
    if (zombie.getBoundingClientRect().top <= 0) {
      playerLives--;
      progressBarWidth -= 25;
      document.getElementById("lives").style.width = `${progressBarWidth}%`;
      eliminateZombie(zombie);
    }
  }

// Iteration 4: Write a function to destroy a zombie when it is shot or missed
function eliminateZombie(zombie) {
    zombie.style.display = "none";
    zombieID++;
    createZombie();
  }

// Iteration 5: Creating timer
setInterval(updateTimer, 1000);
function updateTimer() {
  if (gameTime < 0 || playerLives <= 0) {
    location.href = playerLives <= 0 ? "game-over.html" : "win.html";
  } else {
    gameTime--;
    let timerDisplay = document.getElementById("timer");
    timerDisplay.innerHTML = gameTime;
    checkZombieEscape(zombieElement);
  }
}

// Iteration 6: Write a code to start the game by calling the first zombie
createZombie();

// Iteration 7: Write the helper function to get random integer

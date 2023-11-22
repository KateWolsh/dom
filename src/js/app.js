// TODO: write code here
document.addEventListener("DOMContentLoaded", function () {
  class GameLogic {
    constructor(game) {
      this.game = game;
      this.score = 0;
      this.missedAttempts = 0;

      this.scoreDisplay = document.querySelector(".score");
      this.game.monster.addEventListener("click", () =>
        this.handleMonsterClick()
      );
      this.initGameBoardClickHandler();
      this.initMonsterHover();
      this.updateScoreDisplay();
    }

    getRandomCell() {
      const cells = this.game.gameBoard.getElementsByClassName("cell");
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      return randomCell;
    }

    setMonsterRandomPosition() {
      const randomCell = this.getRandomCell();
      randomCell.appendChild(this.game.monster);
    }

    handleMonsterClick() {
      this.score += 1;
      this.updateScoreDisplay();
      this.resetMissedAttempts();

      this.game.monster.parentNode.removeChild(this.game.monster);
      this.setMonsterRandomPosition();
    }

    handleGameBoardClick() {
      this.missedAttempts += 1;

      if (this.missedAttempts >= 5) {
        this.endGame();
      }
    }

    resetMissedAttempts() {
      this.missedAttempts = 0;
    }

    initGameBoardClickHandler() {
      const cells = this.game.gameBoard.getElementsByClassName("cell");

      for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => this.handleGameBoardClick());
      }
    }

    initMonsterHover() {
      this.game.monster.addEventListener("mouseover", () => {
        this.game.monster.style.cursor = "pointer"; // Используем встроенный курсор pointer
      });

      this.game.monster.addEventListener("mouseout", () => {
        this.game.monster.style.cursor = "auto";
      });
    }

    updateScoreDisplay() {
      this.scoreDisplay.textContent = "Score: " + this.score;
    }

    endGame() {
      alert("Game Over! Your final score is: " + this.score);
      location.reload();
    }
  }

  class Game {
    constructor() {
      this.gameBoard = document.getElementsByClassName("game-board")[0];
      this.monster = document.getElementsByClassName("monster")[0];

      this.logic = new GameLogic(this);
      this.init();
    }

    init() {
      this.logic.setMonsterRandomPosition();
      setInterval(() => this.logic.setMonsterRandomPosition(), 1000);
    }
  }

  const gameInstance = new Game();
});

// comment this to pass build
// const unusedVariable = "variable";

// for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");

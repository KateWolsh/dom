// TODO: write code here
// document.addEventListener("DOMContentLoaded", function () {
//   const gameBoard = document.querySelector(".game-board");
//   const monster = document.querySelector(".monster");

//   // Функция для генерации случайной позиции внутри игрового поля
//   function getRandomCell() {
//     const cells = gameBoard.getElementsByClassName("cell");
//     const randomCell = cells[Math.floor(Math.random() * cells.length)];
//     return randomCell;
//   }
//   // Функция для установки монстра в случайную позицию
//   function setMonsterRandomPosition() {
//     const randomCell = getRandomCell();
//     randomCell.appendChild(monster);
//   }
//   // Вызываем функцию для установки монстра на случайную позицию при загрузке страницы
//   setMonsterRandomPosition();
//   // Запускаем перемещение монстра с интервалом
//   setInterval(setMonsterRandomPosition, 1000);
// });

// document.addEventListener("DOMContentLoaded", function () {
//   class Game {
//     constructor() {
//       this.gameBoard = document.getElementsByClassName("game-board")[0];
//       this.monster = document.getElementsByClassName("monster")[0];

//       this.init();
//     }

//     getRandomCell() {
//       const cells = this.gameBoard.getElementsByClassName("cell");
//       const randomCell = cells[Math.floor(Math.random() * cells.length)];
//       return randomCell;
//     }

//     setMonsterRandomPosition() {
//       const randomCell = this.getRandomCell();
//       randomCell.appendChild(this.monster);
//     }

//     init() {
//       this.setMonsterRandomPosition();
//       setInterval(() => this.setMonsterRandomPosition(), 1000);
//     }
//   }

//   const gameInstance = new Game();
// });

document.addEventListener("DOMContentLoaded", function () {
  class GameLogic {
    constructor(game) {
      this.game = game;
      this.score = 0;
      this.missedAttempts = 0; // Новое свойство для отслеживания промахов

      this.scoreDisplay = document.querySelector(".score");
      this.game.monster.addEventListener("click", () =>
        this.handleMonsterClick()
      );
      this.initGameBoardClickHandler(); // Добавим обработчик для кликов по ячейкам
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
      this.resetMissedAttempts(); // Сбрасываем количество промахов

      // Убираем монстра из текущей ячейки
      this.game.monster.parentNode.removeChild(this.game.monster);

      // Устанавливаем монстра в новую случайную позицию
      this.setMonsterRandomPosition();
    }

    handleGameBoardClick() {
      this.missedAttempts += 1;

      // Проверяем, не промахнулся ли игрок 5 раз подряд
      if (this.missedAttempts >= 5) {
        this.endGame();
      }
    }

    resetMissedAttempts() {
      this.missedAttempts = 0;
    }

    initGameBoardClickHandler() {
      const cells = this.game.gameBoard.getElementsByClassName("cell");

      // Добавляем обработчик клика для каждой ячейки
      for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => this.handleGameBoardClick());
      }
    }

    updateScoreDisplay() {
      this.scoreDisplay.textContent = "Score: " + this.score;
    }

    endGame() {
      alert("Game Over! Your final score is: " + this.score);
      location.reload(); // Перезагружаем страницу после окончания игры
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
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");

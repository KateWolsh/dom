// TODO: write code here

window.addEventListener("DOMContentLoaded", function () {
  // Класс, отвечающий за логику игры
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
      this.startMonsterInterval();
    }

    // Получение случайной ячейки из игрового поля
    getRandomCell() {
      const cells = this.game.gameBoard.getElementsByClassName("cell");
      const randomCell = cells[Math.floor(Math.random() * cells.length)];
      return randomCell;
    }

    // Установка гоблина в случайную позицию на игровом поле
    setMonsterRandomPosition() {
      const randomCell = this.getRandomCell();
      randomCell.appendChild(this.game.monster);
    }

    // Обработка клика по гоблину
    handleMonsterClick() {
      this.score += 1;
      this.updateScoreDisplay();
      this.resetMissedAttempts();
    }

    // Обработка клика по игровому полю
    handleGameBoardClick() {
      this.missedAttempts += 1;

      if (this.missedAttempts >= 5) {
        this.endGame();
      }
    }

    // Сброс счетчика промахов
    resetMissedAttempts() {
      this.missedAttempts = 0;
    }

    // Инициализация обработчика клика для каждой ячейки игрового поля
    initGameBoardClickHandler() {
      const cells = this.game.gameBoard.getElementsByClassName("cell");

      for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => this.handleGameBoardClick());
      }
    }

    // Инициализация обработчика наведения для гоблина
    initMonsterHover() {
      this.game.monster.addEventListener("mouseover", () => {
        this.game.monster.style.cursor = "pointer"; // Используем встроенный курсор pointer
      });

      this.game.monster.addEventListener("mouseout", () => {
        this.game.monster.style.cursor = "auto";
      });
    }

    // Запуск интервала для перемещения гоблина
    startMonsterInterval() {
      // Используем setTimeout с рекурсивным вызовом
      const moveMonster = () => {
        this.setMonsterRandomPosition();
        setTimeout(moveMonster, 1000);
      };

      // Запускаем первый вызов интервала
      moveMonster();
    }

    // Обновление отображения счета
    updateScoreDisplay() {
      this.scoreDisplay.textContent = "Score: " + this.score;
    }

    // Завершение игры
    endGame() {
      alert("Game Over! Your final score is: " + this.score);
      location.reload();
    }
  }

  // Класс, представляющий саму игру
  class Game {
    constructor() {
      this.gameBoard = document.getElementsByClassName("game-board")[0];
      this.monster = document.getElementsByClassName("monster")[0];

      this.logic = new GameLogic(this);
    }
  }

  // Создание экземпляра игры
  const gameInstance = new Game();
});

// const unusedVariable = "variable";

// Экспорт для демонстрационных целей
export default function demo(value) {
  return `Demo: ${value}`;
}

// Вывод в консоль для проверки подключения файла
console.log("app.js included");

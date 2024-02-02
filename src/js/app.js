// Определение класса Goblin
class Goblin {
  constructor(element) {
    this.element = element;
    this.initHover();
  }

  // Инициализация обработчика наведения на гоблина
  initHover() {
    this.element.addEventListener("mouseover", () => {
      this.element.style.cursor = "pointer"; // Используем встроенный курсор pointer
    });

    this.element.addEventListener("mouseout", () => {
      this.element.style.cursor = "auto";
    });
  }
}

// Определение класса Field
class Field {
  constructor(cells) {
    this.cells = cells;
    this.initClickHandlers();
  }

  // Инициализация обработчиков клика для ячеек поля
  initClickHandlers() {
    for (let i = 0; i < this.cells.length; i++) {
      this.cells[i].addEventListener("click", () => this.handleCellClick());
    }
  }
}

// Определение класса GameLogic
class GameLogic {
  constructor(field, goblin, scoreDisplay) {
    this.field = field;
    this.goblin = goblin;
    this.score = 0;
    this.scoreDisplay = scoreDisplay;

    this.initMonsterInterval();
    this.initMonsterClick();
  }

  // Инициализация интервала для перемещения гоблина
  initMonsterInterval() {
    setInterval(() => {
      // Установка гоблина в случайную позицию на игровом поле
      const randomCell =
        this.field.cells[Math.floor(Math.random() * this.field.cells.length)];
      randomCell.appendChild(this.goblin.element);
    }, 1000);
  }

  // Инициализация обработчика клика по гоблину
  initMonsterClick() {
    this.goblin.element.addEventListener("click", () => {
      this.score += 1;
      this.updateScoreDisplay();
    });
  }

  // Обновление отображения счета
  updateScoreDisplay() {
    this.scoreDisplay.textContent = "Score: " + this.score;
  }
}

// Ожидание загрузки DOM
document.addEventListener("DOMContentLoaded", function () {
  const cells = document.querySelectorAll(".cell");
  const scoreDisplay = document.querySelector(".score");
  const goblinElement = document.querySelector(".monster");

  // Создание экземпляра гоблина
  const goblin = new Goblin(goblinElement);
  // Создание экземпляра поля
  const field = new Field(cells);
  // Создание экземпляра логики игры
  const gameLogic = new GameLogic(field, goblin, scoreDisplay);
  goblinElement.classList.remove("hidden");
});

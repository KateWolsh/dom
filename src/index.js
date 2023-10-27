import "./css/style.css";

import "./js/app";

// TODO: write your code in app.js
document.addEventListener("DOMContentLoaded", function () {
  const gameBoard = document.querySelector(".game-board");
  const monster = document.querySelector(".monster");

  // Функция для генерации случайной позиции внутри игрового поля
  function getRandomCell() {
    const cells = gameBoard.getElementsByClassName("cell");
    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    return randomCell;
  }
  // Функция для установки монстра в случайную позицию
  function setMonsterRandomPosition() {
    const randomCell = getRandomCell();
    randomCell.appendChild(monster);
  }
  // Функция для скрытия монстра и установки его на другую позицию
  function hideAndMoveMonster() {
    monster.style.display = "none";
    setMonsterRandomPosition();
    monster.style.display = "block";
  }
  // Вызываем функцию для установки монстра на случайную позицию при загрузке страницы
  setMonsterRandomPosition();
  // Запускаем перемещение монстра с интервалом
  setInterval(hideAndMoveMonster, 2000);
});

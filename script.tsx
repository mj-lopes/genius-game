let order: number[] = [];
let clickedOrder: number[] = [];
let score = 0;
let time = 0;

/* 
  0 - verde
  1 - vermelho
  2 - amarelo
  3 - azul
*/

const blue = document.querySelector(".blue") as HTMLDivElement;
const red = document.querySelector(".red") as HTMLDivElement;
const yellow = document.querySelector(".yellow") as HTMLDivElement;
const green = document.querySelector(".green") as HTMLDivElement;

const getRandomColor = (): void => {
  const randomColor = Math.floor(Math.random() * 4);
  order.push(randomColor);
  startRound();
};

function selectColorEl(elementIndex: Number): HTMLDivElement {
  let el;

  switch (elementIndex) {
    case 0:
      el = green;
      break;
    case 1:
      el = red;
      break;
    case 2:
      el = yellow;
      break;
    case 3:
      el = blue;
      break;
    default:
      el = green;
  }

  return el;
}

function startRound() {
  clickedOrder = [];
  for (let index in order) {
    let elementColor = selectColorEl(order[index]);
    lightColor(elementColor, Number.parseInt(index) + 1);
  }
}

function lightColor(element: HTMLDivElement, time: number) {
  time = time * 1000;
  setTimeout(() => {
    element.classList.add("selected");
  }, time - 400);

  setTimeout(() => {
    element.classList.remove("selected");
  }, time);
}

function checkOrder() {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length === order.length) {
    nextLevel();
  }
}

function playerClick(colorNum: number) {
  clickedOrder.push(colorNum);
  const colorEl = selectColorEl(colorNum);
  colorEl.classList.add("selected");

  setTimeout(() => {
    colorEl.classList.remove("selected");
    checkOrder();
  }, 250);
}

function gameOver() {
  alert(`Fim de jogo!\n Pontuação: ${score}`);
  startGame();
}

function nextLevel() {
  score++;
  alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
  getRandomColor();
}

function startGame() {
  order = [];
  clickedOrder = [];
  getRandomColor();
}

green.addEventListener("click", () => playerClick(0));
red.addEventListener("click", () => playerClick(1));
yellow.addEventListener("click", () => playerClick(2));
blue.addEventListener("click", () => playerClick(3));

startGame();

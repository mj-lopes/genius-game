"use strict";
const game = {
    order: [],
    clickedOrder: [],
    score: 0,
};
const blue = document.querySelector(".blue");
const red = document.querySelector(".red");
const yellow = document.querySelector(".yellow");
const green = document.querySelector(".green");
const getRandomColor = () => {
    const randomColor = Math.floor(Math.random() * 4);
    game.order.push(randomColor);
    startRound();
};
function selectColorEl(elementIndex) {
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
    game.clickedOrder = [];
    for (let index in game.order) {
        let elementColor = selectColorEl(game.order[index]);
        lightColor(elementColor, Number.parseInt(index) + 1);
    }
}
function lightColor(element, time) {
    time = time * 1000;
    setTimeout(() => {
        element.classList.add("selected");
    }, time - 400);
    setTimeout(() => {
        element.classList.remove("selected");
    }, time);
}
function checkOrder() {
    for (let i in game.clickedOrder) {
        if (game.clickedOrder[i] !== game.order[i]) {
            gameOver();
            break;
        }
    }
    if (game.clickedOrder.length === game.order.length) {
        nextLevel();
    }
}
function playerClick(colorNum) {
    game.clickedOrder.push(colorNum);
    const colorEl = selectColorEl(colorNum);
    colorEl.classList.add("selected");
    setTimeout(() => {
        colorEl.classList.remove("selected");
        checkOrder();
    }, 250);
}
function gameOver() {
    alert(`Fim de jogo!\n Pontuação: ${game.score}`);
    startGame();
}
function nextLevel() {
    game.score++;
    alert(`Pontuação: ${game.score}\nVocê acertou! Iniciando próximo nível!`);
    getRandomColor();
}
function startGame() {
    game.order = [];
    game.clickedOrder = [];
    getRandomColor();
}
green.addEventListener("click", () => playerClick(0));
red.addEventListener("click", () => playerClick(1));
yellow.addEventListener("click", () => playerClick(2));
blue.addEventListener("click", () => playerClick(3));
startGame();

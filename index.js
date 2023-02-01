import { Poligono, Jogador, Bola } from './classes.js';
import { collisionDetector, winnerAndResetRound } from './functionalitys.js';
import './style.css';

//Definicioes basicas do canvas e o adicionador de pontos
export const canvas = document.getElementById('canvas');
export const ctx = canvas.getContext('2d');
export const canvasWidth = 640;
export const canvasHeight = 480;
export const adicionaPonto = 1;

//Instanciamento das classe para definir os objetos e seus valores
export const tela = new Poligono(0, 0, canvasWidth, canvasHeight, 'black');
export const bola = new Bola(320, 240, 10, 10, 'white', 3, 2);
export const player1 = new Jogador(10, 240, 20, 60, '#FD0E35', 0, 0);
export const player2 = new Jogador(610, 240, 20, 60, '#00468C', 0, 0);
ctx.strokeStyle = 'red';
ctx.lineWidth = 5;

gameLoop();

function draw() {
  tela.desenhaNaTela();
  player1.desenhaNaTela();
  player2.desenhaNaTela();
  bola.desenhaNaTela();
}

function update() {
  tela.clearCanvas();
  player1.updateObjectMovement();
  player2.updateObjectMovement();
  bola.updateObjectMovement();
  collisionDetector();
  winnerAndResetRound();
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

player1.movementUpDown('w', 's');
player1.stopMovement('w', 's');
player2.movementUpDown('o', 'l');
player2.stopMovement('o', 'l');

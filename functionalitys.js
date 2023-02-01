import {
  player1,
  player2,
  bola,
  canvasWidth,
  canvasHeight,
  adicionaPonto,
  ctx,
} from './index.js';

export function collisionDetector() {
  if (
    bola.posX > player2.posX - player2.width / 2 &&
    bola.posY > player2.posY &&
    bola.posY < player2.posY + player2.height
  ) {
    bola.velX *= -1;
    bola.velY *= 1;
  }
  if (
    bola.posX < player1.posX + player1.width &&
    bola.posY > player1.posY &&
    bola.posY < player1.posY + player1.height
  ) {
    bola.velX *= -1;
    bola.velY *= 1;
  }
  if (bola.posY > canvasHeight - bola.width || bola.posY < 0) {
    bola.velX *= 1;
    bola.velY *= -1;
  }
}

export function winnerAndResetRound() {
  if (bola.posX > canvasWidth) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bola.posX = 320;
    bola.posY = 240;
    player1.posX = 10;
    player1.posY = 240;
    player2.posX = 610;
    player2.posY = 240;
    bola.velX = -1 * 5;
    bola.velY = Math.floor(Math.random() * (2 - 2) + 2);
    player1.pontoJogador += adicionaPonto;
  } else if (bola.posX < 0) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bola.posX = 320;
    bola.posY = 240;
    player1.posX = 10;
    player1.posY = 240;
    player2.posX = 610;
    player2.posY = 240;
    bola.velX = 5;
    bola.velY = Math.floor(Math.random() * (2 - 2) + 2);
    player2.pontoJogador += adicionaPonto;
  }
}

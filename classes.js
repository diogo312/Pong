import { ctx, player1, player2, canvasWidth, canvasHeight } from './index.js';

export class Poligono {
  constructor(posX, posY, width, height, color) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  clearCanvas() {
    ctx.clearRect(this.posX, this.posY, this.width, this.height);
  }

  desenhaNaTela() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(
      this.posX,
      this.posY,
      (canvas.width = this.width),
      (canvas.height = this.height)
    );
    ctx.closePath();

    ctx.beginPath();
    ctx.font = '50px monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`${player1.pontoJogador}`, 270, 50);
    ctx.fillText(`${player2.pontoJogador}`, 370, 50);
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(canvasWidth / 2, 0);
    ctx.lineTo(canvasWidth / 2, canvasHeight);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 5;
    ctx.stroke();
  }
}

export class Jogador extends Poligono {
  constructor(posX, posY, width, height, color, velY, pontoJogador) {
    super(velY, pontoJogador);
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velY = velY;
    this.pontoJogador = pontoJogador;
  }

  movementUpDown(commandUp, commandDown) {
    window.addEventListener('keydown', (e) => {
      if (e.key === commandUp) {
        this.velY = -3;
      }
      if (e.key === commandDown) {
        this.velY = 3;
      }
    });
  }

  stopMovement(commandUp, commandDown) {
    window.addEventListener('keyup', (e) => {
      if (e.key === commandUp) {
        this.velY = 0;
      }
      if (e.key === commandDown) {
        this.velY = 0;
      }
    });
  }

  updateObjectMovement() {
    this.posY += this.velY;
  }

  desenhaNaTela() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.closePath();
  }
}

export class Bola extends Poligono {
  constructor(posX, posY, width, height, color, velX, velY) {
    super(velX, velY);
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velX = velX;
    this.velY = velY;
  }

  desenhaNaTela() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.closePath();
  }

  updateObjectMovement() {
    this.posX += this.velX;
    this.posY += this.velY;
  }
}

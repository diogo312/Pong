// Import stylesheets
import './style.css';

//Pega o objeto canvas do no html
const canvas = document.getElementById('canvas');

//Pega o contexto do canvas
const ctx = canvas.getContext('2d');

//Define a largura e altura do canvas
const canvasWidth = 640;
const canvasHeight = 480;

//Aplica a largura e altura no canvas
canvas.width = canvasWidth;
canvas.height = canvasHeight;

class Poligono {
  constructor(posX, posY, width, height, color) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
  }

  criaTela() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.closePath();
  }

  playerInfo() {
    ctx.beginPath();
    ctx.font = '30px monospace';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(
      `${player1.nome ?? 'Jogador 1'}: ${player1.pontoJogador}`,
      100,
      50
    );
    ctx.fillText(
      `${player2.nome ?? 'Jogador 2'}: ${player2.pontoJogador}`,
      540,
      50
    );
    ctx.closePath();
  }
}

class Jogador extends Poligono {
  constructor(posX, posY, width, height, color, velY, pontoJogador, nome) {
    super(velY, pontoJogador);
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.color = color;
    this.velY = velY;
    this.pontoJogador = pontoJogador;
    this.nome = nome;
  }

  desenharJogador() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.closePath();
  }
}

class Bola extends Poligono {
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

  desenharBola() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.fillRect(this.posX, this.posY, this.width, this.height);
    ctx.closePath();
  }
}

const tela = new Poligono(0, 0, canvasWidth, canvasHeight, 'black');
const player1 = new Jogador(
  10,
  240,
  20,
  60,
  '#FD0E35',
  0,
  0,
  prompt('Nome do primeiro jogador')
);
const player2 = new Jogador(
  610,
  240,
  20,
  60,
  '#00468C',
  0,
  0,
  prompt('nome do segundo jogador')
);
const bola = new Bola(320, 240, 10, 10, 'white', 3, 2);
const adicionaPonto = 1;

function draw() {
  tela.criaTela();
  tela.playerInfo();
  player1.desenharJogador();
  player2.desenharJogador();
  bola.desenharBola();
}

function update() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
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
  if (bola.posX > canvasWidth) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    bola.posX = 320;
    bola.posY = 240;
    player1.posX = 10;
    player1.posY = 240;
    player2.posX = 610;
    player2.posY = 240;
    bola.velX = -1 * Math.floor(Math.random() * (5 - 4) + 4);
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
    bola.velX = Math.floor(Math.random() * (5 - 2) + 2);
    bola.velY = Math.floor(Math.random() * (2 - 2) + 2);
    player2.pontoJogador += adicionaPonto;
  }

  player1.posY += player1.velY;
  player2.posY += player2.velY;
  bola.posX += bola.velX;
  bola.posY += bola.velY;
}
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}
gameLoop();

window.addEventListener('keydown', (e) => {
  console.log(e);
  if (e.key === 'w') {
    player1.velY = -3;
  }
  if (e.key === 's') {
    player1.velY = 3;
  }
  if (e.key === 'o') {
    player2.velY = -3;
  }
  if (e.key === 'l') {
    player2.velY = 3;
  }
  e.preventDefault();
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'w') {
    player1.velY = 0;
  }
  if (e.key === 's') {
    player1.velY = 0;
  }
  if (e.key === 'o') {
    player2.velY = 0;
  }
  if (e.key === 'l') {
    player2.velY = 0;
  }
  e.preventDefault();
});

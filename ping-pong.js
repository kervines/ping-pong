const canvasEl = document.querySelector('canvas'),
  canvasCtx = canvasEl.getContext('2d'),
  gapX = 10;

const mouse = { x: 0, y: 0 };

const field = {
  width: window.innerWidth,
  height: window.innerHeight,
  draw: function () {
    //desenha campo
    canvasCtx.fillStyle = '#6A5ACD';
    canvasCtx.fillRect(0, 0, this.width, this.height);
  },
};

const line = {
  width: 15,
  height: field.height,
  draw: function () {
    //desenha linha central do campo
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(
      field.width / 2 - this.width / 2,
      0,
      this.width,
      this.height
    );
  },
};

const leftPaddle = {
  x: gapX,
  y: 0,
  width: line.width,
  height: 200,
  _move: function () {
    this.y = mouse.y - this.height / 2;
  },
  draw: function () {
    //desenha raquete esquerda
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(this.x, this.y, this.width, this.height);

    this._move();
  },
};

const rightPaddle = {
  x: field.width - line.width - gapX,
  y: 0,
  width: line.width,
  height: 200,
  speed: 5,
  _move: function () {
    if (this.y + this.height / 2 < ball.y + ball.r) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  },
  speedUp: function () {
    this.speed += 2;
  },
  draw: function () {
    //desenha raquete direita
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(this.x, this.y, this.width, this.height);

    this._move();
  },
};

const score = {
  human: 0,
  computer: 0,
  increaseHuman: function () {
    this.human++;
  },
  increaseComputer: function () {
    this.computer++;
  },
  draw: function () {
    //desenha placar
    canvasCtx.font = 'bold 72px sans-serif';
    canvasCtx.textAlign = 'center';
    canvasCtx.textBaseline = 'top';
    canvasCtx.fillStyle = '#483D8B';
    canvasCtx.fillText(this.human, field.width / 4, 50);
    canvasCtx.fillText(this.computer, field.width / 4 + field.width / 2, 50);
  },
};

const ball = {
  x: 0,
  y: 0,
  r: 20,
  speed: 5,
  directionX: 1,
  directionY: 1,
  _calcPosition: function () {
    // verifica se o jogador 1 fez um ponto (x > largura do campo)
    if (this.x > field.width - this.r - rightPaddle.width - gapX) {
      //verifica se a raquete direita esta na posição y da bola
      if (
        this.y + this.r > rightPaddle.y &&
        this.y - this.r < rightPaddle.y + rightPaddle.height
      ) {
        //rebate a bola invertendo o sinal de x
        this._reverseX();
      } else {
        // pontuar jogador 1
        score.increaseHuman();
        this._pointUp();
      }
    }

    //verificar se o jogador 2 fez um ponto (X < 0)
    if (this.x < this.r + leftPaddle.width + gapX) {
      //verifica se a raquete esquerda esta na posição y da bola
      if (
        this.y + this.r > leftPaddle.y &&
        this.y - this.r < leftPaddle.y + leftPaddle.height
      ) {
        //rebate a boa invertendo o sinal de x
        this._reverseX();
      } else {
        score.increaseComputer();
        this._pointUp();
      }
    }

    // verifica as laterais superiores e inferiores do campo
    if (
      (this.y - this.r < 0 && this.directionY < 0) ||
      (this.y > field.height - this.r && this.directionY > 0)
    ) {
      // rebate a bola invertendo o sinal do eixo Y
      this._reverseY();
    }
  },
  _reverseX: function () {
    this.directionX *= -1;
  },
  _reverseY: function () {
    this.directionY *= -1;
  },
  _speedUp: function () {
    this.speed += 3;
  },
  _pointUp: function () {
    this._speedUp();

    this.x = field.width / 2;
    this.y = field.height / 2;
  },
  _move: function () {
    this.x += this.directionX * this.speed;
    this.y += this.directionY * this.speed;
  },
  draw: function () {
    //desenha bolinha
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    canvasCtx.fill();

    this._calcPosition();
    this._move();
  },
};

function setup() {
  canvasEl.width = canvasCtx.width = field.width;
  canvasEl.height = canvasCtx.height = field.height;
}

function draw() {
  field.draw();
  line.draw();
  leftPaddle.draw();
  rightPaddle.draw();
  score.draw();
  ball.draw();
}

window.animateFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      return window.setTimeout(callback, 1000 / 60);
    }
  );
})();

function main() {
  animateFrame(main);
  draw();
}

setup();
main();

canvasEl.addEventListener('mousemove', function (event) {
  mouse.x = event.pageX;
  mouse.y = event.pageY;
});

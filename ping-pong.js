const canvasEl = document.querySelector('canvas'),
  canvasCtx = canvasEl.getContext('2d'),
  gapX = 10;

const lineWidth = 15;
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
  width: lineWidth,
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
  y: 250,
  width: line.width,
  height: 200,
  _move: function () {
    this.y = ball.y;
  },
  draw: function () {
    //desenha raquete direita
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.fillRect(this.x, this.y, this.width, this.height);

    this._move();
  },
};

const score = {
  human: 1,
  computer: 2,
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
  x: 330,
  y: 100,
  r: 20,
  speed: 6,
  _move: function () {
    this.x += 1 * this.speed;
    this.y += 1 * this.speed;
  },
  draw: function () {
    //desenha bolinha
    canvasCtx.fillStyle = '#ffffff';
    canvasCtx.beginPath();
    canvasCtx.arc(this.x, this.y, this.r, 2 * Math.PI, false);
    canvasCtx.fill();

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

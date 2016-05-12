var Game = require("./game.js");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.keys = {
    "LEFT": 37,
    "RIGHT": 39,
    "ENTER": 13,
    "SPACE": 32
  };
}

GameView.prototype.start = function() {
  this.lastTime = 0;
  document.addEventListener("keydown", keyDownHandler.bind(this));
  document.addEventListener("keyup", keyUpHandler.bind(this));

  this.game.initialize();
  this.animate(this.animate.bind(this));
};

var keyDownHandler = function(event) {
  if (event.keyCode === this.keys["LEFT"]) {
    this.game.koala.move("left");
  } else if (event.keyCode === this.keys["RIGHT"]) {
    this.game.koala.move("right");
  } else if (event.keyCode === this.keys["SPACE"]) {
    if (this.game.started === false) {
      this.game.started = true;
    } else {
      if (this.game.gameOver) {
        this.game = new Game();
        location.reload();
      }
    }
  }
};

var keyUpHandler = function(event) {
  if (event.keyCode === this.keys["LEFT"]) {
    this.game.koala.move("stop");
  } else if (event.keyCode === this.keys["RIGHT"]) {
    this.game.koala.move("stop");
  }
};

GameView.prototype.animate = function(time) {
  if (this.game.gameOver) {
    this.game.endDraw(this.ctx);
  } else {
    var timeDelta = time - this.lastTime;
    this.game.step();
    this.game.draw(this.ctx);
    this.lastTime = time;

    requestAnimationFrame(this.animate.bind(this));
  }
};


module.exports = GameView;

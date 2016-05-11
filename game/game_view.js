var Game = require("./game.js");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
  this.keys = {
    "LEFT": 37,
    "RIGHT": 39,
    "ENTER": 13,
  };
}

GameView.prototype.start = function() {
  this.lastTime = 0;
  document.addEventListener("keydown", keyDownHandler.bind(this));
  document.addEventListener("keyup", keyUpHandler.bind(this));

  this.game.drawBoard(this.ctx);
  this.game.initialize();
  this.animate(this.animate.bind(this));
};

var keyDownHandler = function(event) {
  if (event.keyCode === this.keys["LEFT"]) {
    this.game.kangaroo.move("left");
  } else if (event.keyCode === this.keys["RIGHT"]) {
    this.game.kangaroo.move("right");
  // } else if (event.keyCode === this.keys["ENTER"]) {

  }
};

var keyUpHandler = function(event) {
  if (event.keyCode === this.keys["LEFT"]) {
    this.game.kangaroo.move("stop");
  } else if (event.keyCode === this.keys["RIGHT"]) {
    this.game.kangaroo.move("stop");
  }
};

GameView.prototype.animate = function(time) {
  var timeDelta = time - this.lastTime;

  this.game.step();
  this.game.draw(this.ctx);
  this.lastTime = time;
  requestAnimationFrame(this.animate.bind(this));
};


// GameView.prototype.bindKeyHandlers = function() {
//   key('a', function(){ alert('you pressed a!') });
// };

module.exports = GameView;

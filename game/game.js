var Kangaroo = require('./kangaroo.js');
var Platform = require('./platform.js');

function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 600;
  this.gameScore = 0;

  this.kangaroo = new Kangaroo({ x: this.DIM_X/2, y: 480, game: this});
  this.platforms = [];
  this.enemies = [];
  this.canCollide = true;

  this.screenOffset = 0; //determines how much to move the screen up by
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  ctx.font = "24px arial";
  ctx.fillText("Score:", 15, 30);
  ctx.fillText(Math.floor(this.gameScore / 50), 93, 30);
  this.kangaroo.draw(ctx);


  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw(ctx);
  }

  if (this.gameOver()) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.font = "24px arial";
    ctx.fillText("Game Over", this.DIM_X / 2 - 60, this.DIM_Y / 2 - 50);
    ctx.fillText("Your Result:" + this.gameScore, this.DIM_X / 2 - 60, this.DIM_Y / 2 - 30);
    ctx.fillText("Click to play again");
  }
};

Game.prototype.rerenderPlatforms = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.y < this.DIM_Y/2) {
      if (this.kangaroo.vel[1] > 0) {
        platforms[i].y += this.kangaroo.vel[1];
        this.gameScore += this.kangaroo.vel[1];
        // this.kangaroo.y = this.kangaroo.y - this.DIM_Y/2;
      }
    }
  }
};

Game.prototype.initialize = function() {
  this.platforms.push(new Platform({x: this.DIM_X/2, y: 484}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(0, 100)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(-200, -100)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(-300, -200)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(100, 200)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(200, 300)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(300, 400)}));
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(100, 500)}));
};

Game.prototype.addPlatform = function() {
  this.platforms.push(new Platform({x: randomInt(5, 460), y:randomInt(100, 200)}));
};

Game.prototype.checkCollisions = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.isCollided(platforms[i]) ) {
      this.kangaroo.vel[1] = 13;
      this.kangaroo.jump();
      this.resetCollisions();
    }
  }
};

Game.prototype.resetCollisions = function() {
  this.canCollide = false;
};

Game.prototype.step = function() {
  this.rerenderPlatforms();
  this.kangaroo.jump();
  this.kangaroo.vel[1] -= 0.5;
  if (this.kangaroo.vel[1] <= 0) {
    this.kangaroo.falling = true;
  }
  this.checkCollisions();
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].y > this.DIM_Y) {
      this.platforms.splice(i, 1);
      this.addPlatform();
    }
  }
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Game.prototype.drawBoard = function(ctx) {
  var canvasWidth = this.DIM_X;
  var canvasHeight = this.DIM_Y;
  var p = 10;
  for (var i = 0; i < canvasWidth; i+=20) {
    ctx.moveTo(0.5 + i +p, p);
    ctx.lineTo(0.5 + i + p, p);
  }

  for (var j = 0; j < canvasHeight; j+=20) {
    ctx.moveTo(0.5 + j + p, p);
    ctx.lineTo(0.5 + j + p, p);
  }

  ctx.strokeStyle = "black";
  ctx.stroke();
};


Game.prototype.gameOver = function() {
  if (this.kangaroo.y > this.DIM_Y + 5) {
    return true;
  } else {
    return false;
  }
};

module.exports = Game;

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
  this.started = false;
  this.gameOver = false;
}

Game.prototype.draw = function(ctx) {
  if (this.started) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.fillStyle = "black";
    ctx.font = "24px arial";
    ctx.fillText("Score:", 15, 30);
    ctx.fillText(Math.floor(this.gameScore / 50), 93, 30);
    this.kangaroo.draw(ctx);
    var platforms = this.platforms;
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].draw(ctx);
    }


  } else {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.kangaroo.draw(ctx);
    ctx.fillStyle = "black";
    ctx.font = "50px arial";
    ctx.fillText(
      "KOALA JUMP",
      this.DIM_X / 2 - 155,
      this.DIM_Y / 2 - 170
    );

    ctx.font = "24px arial";
    ctx.fillText(
      "Press left and right arrow keys to move",
      this.DIM_X / 2 - 205,
      this.DIM_Y / 2 - 30
    );

    ctx.fillText(
      "Press space bar to start",
      this.DIM_X / 2 - 130,
      this.DIM_Y / 2 + 40
    );
  }
};

Game.prototype.endDraw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "white";
  ctx.font = "24px arial";
  ctx.fillText("Game Over", this.DIM_X / 2 - 60, this.DIM_Y / 2 - 50);
  ctx.fillText(
    "Your Score:" + Math.floor(this.gameScore / 50),
    this.DIM_X / 2 - 60,
    this.DIM_Y / 2 - 30
  );
  ctx.fillText(
    "Press space to play again",
    this.DIM_X / 2 - 60,
    this.DIM_Y / 2 - 10
  );
};

Game.prototype.rerenderPlatforms = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.y < this.DIM_Y/2) {
      if (this.kangaroo.vel[1] > 0) {
        platforms[i].y += this.kangaroo.vel[1];
        this.gameScore += this.kangaroo.vel[1];
      }
    }
  }
};


Game.prototype.addPlatform = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (platforms[i].y > this.DIM_Y) {
      this.platforms.splice(i, 1);
      this.platforms.push(
        new Platform({x: randomInt(5, 460), y:randomInt(100, 200)})
      );
    }
  }

};

Game.prototype.checkCollisions = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.isCollided(platforms[i]) ) {
      this.kangaroo.vel[1] = 10;
      this.kangaroo.jump();
    }
  }
};

Game.prototype.step = function() {
  if (this.started) {
    this.rerenderPlatforms();
    this.kangaroo.jump();
    this.kangaroo.vel[1] -= 0.3;
    if (this.kangaroo.vel[1] <= 0) {
      this.kangaroo.falling = true;
    }
    this.checkCollisions();
    this.addPlatform();
    this.gameOverChecker();
  }
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

Game.prototype.drawBoard = function(ctx) {
  var instructions = document.getElementById("instructions");

};


Game.prototype.gameOverChecker = function() {
  if (this.kangaroo.y > this.DIM_Y + 5) {
    this.gameOver = true;
  }
};

Game.prototype.initialize = function() {
  this.gameOver = false;
    this.platforms.push(new Platform({x: this.DIM_X/2, y: 484}));
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(0, 100)})
    );
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(-200, -100)})
    );
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(100, 200)})
    );
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(200, 300)})
    );
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(300, 400)})
    );
    this.platforms.push(
      new Platform({x: randomInt(5, 460), y:randomInt(100, 500)})
    );
};

module.exports = Game;

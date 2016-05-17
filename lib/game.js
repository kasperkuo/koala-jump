var Koala = require('./koala.js');
var Platform = require('./platform.js');

function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 600;
  this.gameScore = 0;

  this.koala = new Koala({ x: this.DIM_X/2, y: 480, game: this});
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
    ctx.font = '24px "Coming Soon"';
    this.koala.draw(ctx);
    var platforms = this.platforms;
    for (var i = 0; i < platforms.length; i++) {
      platforms[i].draw(ctx);
    }

    this.drawBoard(ctx);
    ctx.fillText("Score:", 15, 30);
    ctx.fillText(Math.floor(this.gameScore / 50), 93, 30);

  } else {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.koala.draw(ctx);
    ctx.fillStyle = "black";
    ctx.font = '100px "Amatic SC"';
    ctx.fillText(
      "KOALA JUMP",
      this.DIM_X / 2 - 155,
      this.DIM_Y / 2 - 140
    );

    ctx.font = '24px "Coming Soon"';
    ctx.fillText(
      "Press left and right arrow keys to move",
      this.DIM_X / 2 - 220,
      this.DIM_Y / 2 - 30
    );

    ctx.font = '16px "Coming Soon"';

    ctx.fillText(
      "Get the highest score you can without falling to the bottom",
      this.DIM_X / 2 - 220,
      this.DIM_Y / 2
    );

    ctx.font = '14px "Coming Soon"';
    ctx.fillStyle = "red";
    ctx.fillText(
      "Be careful of going into trees as it can hinder your sight!",
      this.DIM_X / 2 - 190,
      this.DIM_Y / 2 + 50
    );

    ctx.fillText(
      "Koalas are lazy--if you slow down Mr. Koala will get stuck!",
      this.DIM_X / 2 - 190,
      this.DIM_Y / 2 + 74
    );


    ctx.font = '24px "Coming Soon"';
    ctx.fillStyle = "black";
    ctx.fillText(
      "Press space bar to start",
      this.DIM_X / 2 - 130,
      this.DIM_Y / 2 + 250
    );
  }
};

Game.prototype.endDraw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, this.DIM_X, this.DIM_Y);
  ctx.fillStyle = "white";
  ctx.font = '50px "Coming Soon"';
  ctx.fillText("Game Over", this.DIM_X / 2 - 125, this.DIM_Y / 2 - 90);
  ctx.font = '24px "Coming Soon"';
  ctx.fillText(
    "Your Score:   " + Math.floor(this.gameScore / 50),
    this.DIM_X / 2 - 90,
    this.DIM_Y / 2
  );
  ctx.fillText(
    "Press space to play again",
    this.DIM_X / 2 - 140,
    this.DIM_Y / 2 + 80
  );

  var cryingKoala = document.getElementById("crying-koala");
  ctx.drawImage(cryingKoala, this.DIM_X / 2, this.DIM_Y /2 + 150);
};

Game.prototype.rerenderPlatforms = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.koala.y < 271) {
      if (this.koala.vel[1] > 0) {
        platforms[i].y += this.koala.vel[1];
        this.gameScore += this.koala.vel[1];
        if (this.koala.falling === false) {
          this.koala.y = 270;
        }
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
    if (this.koala.isCollided(platforms[i]) ) {
      this.koala.vel[1] = 10;
      this.koala.jump();
    }
  }
};

Game.prototype.step = function() {
  if (this.started) {
    this.rerenderPlatforms();
    this.koala.jump();
    this.koala.vel[1] -= 0.3;
    if (this.koala.vel[1] <= 0) {
      this.koala.falling = true;
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
  if (this.started) {
    var treetop = document.getElementById("treetop");
    ctx.drawImage(treetop, 0, -50);
  }
};


Game.prototype.gameOverChecker = function() {
  if (this.koala.y > this.DIM_Y + 5) {
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

var Kangaroo = require('./kangaroo.js');
var Platform = require('./platform.js');

function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 600;

  this.kangaroo = new Kangaroo({ x: this.DIM_X/2, y: 480, game: this});
  this.platforms = [];
  this.enemies = [];
  this.canCollide = true;

  this.screenOffset = 0; //determines how much to move the screen up by
}

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.kangaroo.draw(ctx);

  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw(ctx);
  }
};

Game.prototype.rerenderPlatforms = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.y < this.DIM_Y/2) {
      if (this.kangaroo.vel[1] > 0) {
        platforms[i].y += this.kangaroo.vel[1];
        // this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(300, 400)}));
      }
    }
  }
};

Game.prototype.initialize = function() {
  this.platforms.push(new Platform({x: this.DIM_X/2, y: 484}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(0, 100)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(-50, 0)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(-100, -50)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(-200, -100)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(-300, -200)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(100, 200)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(200, 300)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(300, 400)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(100, 500)}));
  this.platforms.push(new Platform({x: randomInt(5, 480), y:randomInt(500, 600)}));
};

Game.prototype.addPlatform = function() {
  var x = randomInt(5, 480);
  var y = randomInt(100, 200);
};

Game.prototype.checkCollisions = function() {
  var platforms = this.platforms;
  for (var i = 0; i < platforms.length; i++) {
    if (this.kangaroo.isCollided(platforms[i]) ) {
      this.kangaroo.vel[1] = 18;
      this.kangaroo.jump();
      this.resetCollisions();
    }
  }
};

Game.prototype.resetCollisions = function() {
  this.canCollide = false;
};

// Game.prototype.resetCollisions = function() {
//   for (var i = 0; i < this.platforms.length; i++) {
//     if (this.platforms[i]
//   }
// }

Game.prototype.step = function() {
  // this.initialize();
  this.rerenderPlatforms();
  this.kangaroo.jump();
  this.kangaroo.vel[1] -= 1;
  if (this.kangaroo.vel[1] <= 0) {
    this.kangaroo.falling = true;
  }
  this.checkCollisions();
  // console.log(this.checkCollisions());
};

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
module.exports = Game;

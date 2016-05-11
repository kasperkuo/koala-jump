/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(4);

	(function() {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  var game = new Game();

	  canvas.width = game.DIM_X;
	  canvas.height = game.DIM_Y;
	  var ctx = canvas.getContext("2d");

	  var gameView = new GameView(game, ctx);

	  gameView.start();
	}());


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Kangaroo = __webpack_require__(2);
	var Platform = __webpack_require__(3);

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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Kangaroo = function(args) {
	  this.x = args.x;
	  this.y = args.y;
	  this.vel = args.vel || [0, 13];
	  // this.width = 25;
	  // this.height = 25;
	  this.radius = 10;
	  this.dead = false;
	  this.game = args.game;
	  this.falling = false;
	};

	Kangaroo.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
	  ctx.lineWidth = 3;
	  ctx.strokeStyle = '#111';
	  ctx.fillStyle = "#111";
	  ctx.fill();
	};

	Kangaroo.prototype.jump = function() {
	  this.falling = false;
	  this.x += this.vel[0];
	  this.y -= this.vel[1];


	  if (this.x >= 500) {
	    this.x = 0;
	  } else if (this.x < 0) {
	    this.x = 500;
	  }
	  //can alter y velocity for power ups later;
	};

	Kangaroo.prototype.move = function(direction) {
	  this.vel[0] = 0;
	  if (direction === "left") {
	    if ( this.vel[0] > -20 ){
	      this.x -= this.vel[0] ;
	      this.vel[0] -= 8;
	    }
	  } else if (direction === "right") {
	    if (this.vel[0] < 20) {
	      this.x += this.vel[0];
	      this.vel[0] += 8;
	    }
	  } else {
	    this.vel[0] = 0;
	    this.x;

	  }
	};

	Kangaroo.prototype.isCollided = function(otherObject) {
	  var dy = (this.y - this.radius);
	  if ((dy <= otherObject.y + otherObject.height/2 + 10) &&
	        (dy > otherObject.y - 10) &&
	        (this.x > otherObject.x - this.radius) &&
	          (this.x <= otherObject.x + otherObject.width + this.radius) &&
	            this.falling === true ) {
	            return true;
	          } else {
	          return false;
	        }
	};

	module.exports = Kangaroo;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Platform = function(args) {
	  this.x = args.x;
	  this.y = args.y;
	  this.width = 60;
	  this.height = 10;
	  this.type = args.type;
	};

	Platform.prototype.draw = function(ctx) {
	  ctx.beginPath();
	  // ctx.fillStyle = '#008080';
	  ctx.fillRect(this.x, this.y, this.width, this.height);
	  ctx.rect(this.x, this.y, this.width, this.height);
	  ctx.lineWidth = 1;
	  ctx.strokeStyle = "black";
	  ctx.stroke();
	};

	module.exports = Platform;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);

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


/***/ }
/******/ ]);
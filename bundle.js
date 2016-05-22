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

	document.addEventListener("DOMContentLoaded", function() {
	  var canvas = document.getElementsByTagName("canvas")[0];
	  var game = new Game();

	  canvas.width = game.DIM_X;
	  canvas.height = game.DIM_Y;
	  var ctx = canvas.getContext("2d");
	  // ctx.font = '24px "Coming Soon"';
	  var gameView = new GameView(game, ctx);
	  gameView.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Koala = __webpack_require__(2);
	var Platform = __webpack_require__(3);

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
	  this.initialized = true;
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
	    ctx.fillText(Math.floor(this.gameScore / 25), 93, 30);
	    if (this.gameOver) {
	      this.endDraw(ctx);
	    }

	    if (this.initialized) {
	      this.initialize();
	      this.initialized = false;
	    }
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
	    "Your Score:   " + Math.floor(this.gameScore / 25),
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
	        new Platform({x: randomInt(5, 460), y:125})
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Koala = function(args) {
	  this.x = args.x;
	  this.y = args.y;
	  this.vel = args.vel || [0, 10];
	  this.radius = 10;
	  this.game = args.game;
	  this.falling = false;
	};

	Koala.prototype.draw = function(ctx) {
	  var koala = document.getElementById("koala");
	  ctx.drawImage(koala, this.x - 30, this.y -35);
	};

	Koala.prototype.jump = function() {
	  this.falling = false;
	  this.x += this.vel[0];
	  this.y -= this.vel[1];

	  if (this.x >= 500) {
	    this.x = 0;
	  } else if (this.x < 0) {
	    this.x = 500;
	  }
	};

	Koala.prototype.move = function(direction) {
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

	Koala.prototype.isCollided = function(otherObject) {
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

	module.exports = Koala;


/***/ },
/* 3 */
/***/ function(module, exports) {

	var Platform = function(args) {
	  this.x = args.x;
	  this.y = args.y;
	  this.width = 60;
	  this.height = 16;
	  this.type = args.type;
	};

	Platform.prototype.draw = function(ctx) {
	  var platform = document.getElementById("platform");
	  ctx.drawImage(platform, this.x, this.y);
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
	    "SPACE": 32
	  };
	}

	GameView.prototype.start = function() {
	  this.lastTime = 0;
	  document.addEventListener("keydown", keyDownHandler.bind(this));
	  document.addEventListener("keyup", keyUpHandler.bind(this));


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
	    var timeDelta = time - this.lastTime;
	    this.game.step();
	    this.game.draw(this.ctx);
	    this.lastTime = time;

	    requestAnimationFrame(this.animate.bind(this));
	};


	module.exports = GameView;


/***/ }
/******/ ]);
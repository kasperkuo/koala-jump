var Game = require('./game.js');
var GameView = require('./game_view.js');

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

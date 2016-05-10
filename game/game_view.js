var Game = require("./game.js");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}
//

GameView.MOVES = {
  "left": [ -1, 0],
  "right": [ 1,  0]
};

GameView.prototype.start = function() {
  this.bindKeyHandlers();
  var platforms = this.game.platforms;
  for (var i = 0; i < platforms.length; i++) {
    platforms[i].draw();
  }

  this.game.initialize();

  setInterval(function (){
    this.game.step();
    this.game.draw(this.ctx);
  }.bind(this), 20);
};

GameView.prototype.bindKeyHandlers = function () {
  var kangaroo = this.game.kangaroo;

  Object.keys(GameView.MOVES).forEach(function (k) {
    var move = GameView.MOVES[k];
    key(k, function () { kangaroo.move(k, move); });
  });

};
// GameView.prototype.bindKeyHandlers = function() {
//   key('a', function(){ alert('you pressed a!') });
// };

module.exports = GameView;

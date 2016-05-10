var Game = require("./game.js");

function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}
//
GameView.prototype.start = function() {
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

// GameView.prototype.bindKeyHandlers = function() {
//   key('a', function(){ alert('you pressed a!') });
// };

module.exports = GameView;

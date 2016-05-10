var Char = require('./char.js');
var Platform = require('./platform.js');

function Game() {
  this.DIM_X = 500;
  this.DIM_Y = 800;

  this.char = new Char({ pos:[0, this.DIM_Y/2], game: this});
}


var MovingObject = function(args) {
  this.game = args.game;
  this.pos = args.pos;
  this.vel = args.vel;
  this.radius = args.radius;
};

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(100, 75, 50, 0, 2 * Math.PI);
};

MovingObject.prototype.move = function() {
  this.pos += this.vel;
};

module.exports = MovingObject;

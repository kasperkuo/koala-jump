var Kangaroo = function(args) {
  this.x = args.x;
  this.y = args.y;
  this.vel = args.vel || [0, 18];
  // this.width = 25;
  // this.height = 25;
  this.radius = 5;
  this.dead = false;
  this.game = args.game;
  this.falling = false;
};

Kangaroo.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 10, 0, 2 * Math.PI);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#111';
  ctx.fill();
};

Kangaroo.prototype.jump = function() {
  this.falling = false;
  this.x += this.vel[0];
  this.y -= this.vel[1];


  if (this.x > 500) {
    this.x = -25;
  } else if (this.x < 0) {
    this.x = 500;
  }
  //can alter y velocity for power ups later;
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

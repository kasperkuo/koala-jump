var Koala = function(args) {
  this.x = args.x;
  this.y = args.y;
  this.vel = args.vel || [0, 10];
  this.radius = 10;
  this.dead = false;
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
  //can alter y velocity for power ups later;
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

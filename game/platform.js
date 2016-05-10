var Platform = function(args) {
  this.x = args.x;
  this.y = args.y;
  this.width = 40;
  this.height = 8;
  // this.type = args.type; will add different platform types later
};

Platform.prototype.draw = function(ctx) {
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.fillStyle = '#080800';
};

module.exports = Platform;

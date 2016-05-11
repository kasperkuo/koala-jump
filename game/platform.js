var Platform = function(args) {
  this.x = args.x;
  this.y = args.y;
  this.width = 60;
  this.height = 10;
  this.type = args.type;
};

Platform.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.fillStyle = '#D3FFCE';
  ctx.fillRect(this.x, this.y, this.width, this.height);
  ctx.rect(this.x, this.y, this.width, this.height);
  ctx.lineWidth = 1;
  ctx.strokeStyle = "black";
  ctx.stroke();
};

module.exports = Platform;

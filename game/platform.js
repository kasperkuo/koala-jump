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

var Enemy = function(args) {
  this.type = args.type;
  this.x = args.x;
  this.y = args.y;
  this.vel = args.vel || [0, 0];
  // this.right = true; (used for monsters going back and forth)
};

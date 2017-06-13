// Inherit from Obj
Building = function () {
  Obj.apply(this, arguments);
}
Building.prototype = Object.create(Obj.prototype);
Building.prototype.constructor = Building;

// Override init - so far not needed
Building.prototype.init = function (x, y, kind) {
  var res = Obj.prototype.init.apply(this, arguments);

  // add some cement in front of the building
  var y = this.y + this.h;
  for (var x = this.x; x < this.x + this.w; x++) {
    this.baseGame.tilesprite = this.baseGame.game.add.tileSprite(
      x * this.baseGame.map.delta, y * this.baseGame.map.delta,
      this.baseGame.map.delta, this.baseGame.map.delta,
      'gbc_cement_tile',
    );
  }
  return res;
};

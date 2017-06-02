// Inherit from Obj
Unit = function () {
  Obj.apply(this, arguments);
}
Unit.prototype = Object.create(Obj.prototype);
Unit.prototype.constructor = Unit;

// Override init
Unit.prototype.init = function (x, y, species) {
  this.destination = { 'x': undefined, 'y': undefined };
  this.findingPath = false;
  return Obj.prototype.init.apply(this, arguments);
};

Unit.prototype.moveTowards = function (x, y) {
  if (this.findingPath) {
    return;
  }
  this.findingPath = true;

  this.destination.x = Math.floor(x/this.baseGame.map.delta);
  this.destination.y = Math.floor(y/this.baseGame.map.delta);
  // this.obj.rotation = game.physics.arcade.angleToXY(this.obj, x, y);

  // obtain a tilemap
  var tm = this.baseGame.map.getCurrentTilemap();
  // set up A*
  var easystar = new EasyStar.js();
  easystar.setGrid(tm);
  easystar.setAcceptableTiles([0]);
  // easystar.enableDiagonals();
  easystar.enableCornerCutting();

  var self = this;
  easystar.findPath(
    self.x,
    self.y,
    self.destination.x,
    self.destination.y,
    function( path ) {
      self.findingPath = false;
      // if no path found, try to get close
      if (path === null || path.length === 0) {
        // move south of the object if you are not there
        if (!(self.destination.x === self.x
            && (self.destination.y === self.y
                || self.destination.y+1 === self.y))) {
          // these below are pixel distances, they come from clicks
          self.moveTowards(x, y + self.baseGame.map.delta);
        }
      } else {
        // update object coordinates
        self.x = self.destination.x;
        self.y = self.destination.y;

        // create animation for step by step movement
        var tweens = [];
        tweens.push(self.baseGame.game.add.tween(self.obj)
          .to({ x: path[0].x*self.baseGame.map.delta,
                y: path[0].y*self.baseGame.map.delta },
              10,
              "Linear"));

        for (var j = 1; j < path.length; j++) {
          tweens.push(self.baseGame.game.add.tween(self.obj)
            .to({ x: path[j].x*self.baseGame.map.delta,
                  y: path[j].y*self.baseGame.map.delta },
                10,
                "Linear"));
          tweens[j-1].chain(tweens[j]);
        }

        tweens[0].start();
      }
    });
  easystar.calculate();
};

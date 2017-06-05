
Map = function (baseGame) {
  this.baseGame = baseGame;
  this.init();
};

Map.prototype.init = function () {
  this.width = this.baseGame.game.width;
  this.height = this.baseGame.game.height;
  this.delta = this.baseGame.game.delta; // must divide gcd(width, height)

  // setting background (should be a "loadlevel" function)
  this.baseGame.tilesprite = this.baseGame.game.add.tileSprite(0, 0, this.width, this.height, 'gbc_grass_tile');
};

// should maybe be caching, run on 'update' and then return that.
Map.prototype.getCurrentTilemap = function (cb) {
  var tilemap = new Array(this.height/this.delta);
  for (var j = 0; j < tilemap.length; j++) {
    tilemap[j] = new Array(this.width/this.delta);
    tilemap[j].fill(0);
  }

  for (var id in this.baseGame.units) {
    var x = Math.floor(this.baseGame.units[id].obj.x/this.delta);
    var y = Math.floor(this.baseGame.units[id].obj.y/this.delta);
    // assuming 1-tile sprite
    tilemap[y][x] = 1;
  }

  for (var id in this.baseGame.buildings) {
    var x = Math.floor(this.baseGame.buildings[id].obj.x/this.delta);
    var y = Math.floor(this.baseGame.buildings[id].obj.y/this.delta);
    var w = Math.floor(this.baseGame.buildings[id].obj.width/this.delta);
    var h = Math.floor(this.baseGame.buildings[id].obj.height/this.delta);
    for (var i = 0; i < w; i++) {
      for (var j = 0; j < h; j++) {
        tilemap[y+j][x+i] = 1;
      }
    }
  }

  if (cb) {
    cb(tilemap);
  }
  return tilemap;
};

Map.prototype.printMap = function () {
  this.getCurrentTilemap(function (tm) {
    for (var row = 0; row < tm.length; row++) {
      var line = "";
      for (var col = 0; col < tm[row].length; col++) {
        line += " "+tm[row][col];
      }
    }
  });
};

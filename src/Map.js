
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

Map.prototype.getCurrentTilemap = function (cb) {
  var tilemap = new Array(this.height/this.delta);
  for (var j = 0; j < tilemap.length; j++) {
    tilemap[j] = new Array(this.width/this.delta);
    tilemap[j].fill(0);
  }

  for (var id in this.baseGame.units) { // should be done over all physical sprites, and implementing sizes
    if (this.baseGame.units[id] === this.baseGame.hero) {
      // hero does not appear in tilemap, otherwise it could not move!
      continue;
    }
    var x = Math.floor(this.baseGame.units[id].obj.x/this.delta);
    var y = Math.floor(this.baseGame.units[id].obj.y/this.delta);
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
    console.log();
    for (var row = 0; row < tm.length; row++) {
      var line = "";
      for (var col = 0; col < tm[row].length; col++) {
        line += " "+tm[row][col];
      }
      console.log(line);
    }
    console.log();
  });
};

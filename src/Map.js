
Map = function (baseGame) {
  this.baseGame = baseGame;
  this.init();
};

Map.prototype.tiles = {
  'grass': '0',
  'flowers': '1',
  'cement': '2',
}

Map.prototype.init = function () {
  this.cols = this.baseGame.game.cols;
  this.rows = this.baseGame.game.rows;
  this.delta = this.baseGame.game.delta;
  console.log("area: " + (this.rows * this.cols))

  // use the bitmap data as the texture for the sprite
  var tilemap = "";
  for (var y = 0; y < this.rows; y++) {
    for (var x = 0; x < this.cols; x++) {
      tilemap += (this.baseGame.mt.rnd() < 0.65 ? this.tiles.grass : this.tiles.flowers) + ",";
    }
    tilemap += "\n";
  }

  this.baseGame.game.load.tilemap('baseMap', null, tilemap, Phaser.Tilemap.CSV);

  //  Because we're loading CSV map data we have to specify the tile size here or we can't render it
  this.baseMap = this.baseGame.game.add.tilemap('baseMap', 64, 64);

  //  Now add in the tileset
  this.baseMap.addTilesetImage('gbc_tileset');

  //  Create our layer
  this.baseLayer = this.baseMap.createLayer(0);
  // this.baseLayer.resizeWorld();

};

// should maybe be caching, run on 'update' and then return that.
Map.prototype.getCurrentTilemap = function (cb) {
  var tilemap = new Array(this.rows);
  for (var j = 0; j < tilemap.length; j++) {
    tilemap[j] = new Array(this.cols);
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

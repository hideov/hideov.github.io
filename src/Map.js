
Map = function () {
    this.init();
};

Map.prototype.init = function () {
    this.width = 800;
    this.height = 600;
    this.delta = 20; // must divide gcd(width, height)
    
    // setting background (should be a "loadlevel" function)
    tilesprite = game.add.tileSprite(0, 0, 800, 600, 'grass_tile');
};

Map.prototype.getCurrentTilemap = function (cb) {
    var tilemap = new Array(this.height/this.delta);
    for (var j = 0; j < tilemap.length; j++) {
        tilemap[j] = new Array(this.width/this.delta);
        tilemap[j].fill(0);
    }
    
    for (var id in units) { // should be done over all physical sprites, and implementing sizes
        var x = Math.floor(units[id].obj.x/this.delta);
        var y = Math.floor(units[id].obj.y/this.delta);
        tilemap[y][x] = 1;
    }
    
    for (var id in buildings) {
        var x = Math.floor(buildings[id].obj.x/this.delta);
        var y = Math.floor(buildings[id].obj.y/this.delta);
        var w = Math.floor(buildings[id].obj.width/this.delta);
        var h = Math.floor(buildings[id].obj.height/this.delta);
        for (var i = 0; i <= w/2+1; i++) {
            for (var j = 0; j <= h/2+1; j++) {
                tilemap[y-j][x-i] = 1;
                tilemap[y-j][x+i] = 1;
                tilemap[y+j][x-i] = 1;
                tilemap[y+j][x+i] = 1;
            }
        }
    }
    
    if (cb) {
        cb(tilemap);
    }
    return tilemap;
};


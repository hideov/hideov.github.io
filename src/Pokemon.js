
Pokemon = function () {
    // return this.init.call(this, arguments);
    return this.init(arguments[0], arguments[1], arguments[2]);
};

Pokemon.prototype.init = function (x, y, species) {
    this.id = randId();
    var self = this;
    var poke = pokedex[species];
    this.name = poke.name;
    this.selected = false;
    this.destination = { 'x': undefined, 'y': undefined };
    
    // now the phaser part
    this.obj = game.add.sprite(x,y,poke.sprite, undefined, unitsGrp);
    this.obj.immovable = false;
    this.obj.anchor.set(0.5);
    this.obj.inputEnabled = true;
    this.obj.events.onInputDown.add(function () { return self.onClick(); }, this);
    this.obj.logicalPtr = this;
    game.physics.arcade.enable(this.obj);
    
    // pathfinder
    this.findingPath = false;
    
    // returns
    units[this.id] = this;
    return this.id;
};


Pokemon.prototype.moveTowards = function (x, y) {
    if (this.findingPath) {
        return;
    }
    this.findingPath = true;
    
    this.destination.x = x;
    this.destination.y = y;
    this.obj.rotation = game.physics.arcade.angleToXY(this.obj, x, y);
    
    // obtain a tilemap
    var tm = map.getCurrentTilemap();
    // set up A*
    var easystar = new EasyStar.js();
    easystar.setGrid(tm);
    easystar.setAcceptableTiles([0]);
    easystar.enableDiagonals();    
    easystar.enableCornerCutting();
        
    
    var self = this;
    easystar.findPath(
        Math.floor(this.obj.x/map.delta), 
        Math.floor(this.obj.y/map.delta), 
        Math.floor(x/map.delta), 
        Math.floor(y/map.delta),
        function( path ) {
            if (path === null) {
                var tween = game.add.tween(self.obj).to({tint: 0xFF0000}, 400, "Linear").to({tint: 0xFFFFFF}, 400, "Linear");
                tween.start();
            } else {
                var tweens = [];
                // this will need tweens for angle
                // also speed will be calculated based on unit base stats
                tweens.push(game.add.tween(self.obj).to({ x: path[0].x*map.delta, y: path[0].y*map.delta }, 10, "Linear"));
                
                for (var j = 1; j < path.length; j++) {
                    tweens.push(game.add.tween(self.obj).to({ x: path[j].x*map.delta, y: path[j].y*map.delta }, 10, "Linear"));
                    tweens[j-1].chain(tweens[j]);
                }
                // finally fix exact (not rounded on grid) position
                // should also find a away of not overlapping units
                j = tweens.push(game.add.tween(self.obj).to({ x: map.delta*(path[path.length-1].x + Math.random()), y: map.delta*(path[path.length-1].y + Math.random()) }, 5, "Linear"));
                tweens[j-2].chain(tweens[j-1]);
                tweens[0].start();
                self.findingPath = false;
            }
        });
     easystar.calculate();
};


Pokemon.prototype.setSelected = function (sel) {
    this.selected = !!sel;
    this.obj.tint = this.selected ? 0x0000FF : 0xFFFFFF;
    
    if (this.selected) {
        selected[this.id] = this;
    } else {
        delete selected[this.id];
    }
};


Pokemon.prototype.onClick = function () {
    // fake precise box select BEST WORKING METHOD
    selection.extremes.start = { x: this.obj.x, y: this.obj.y };
    selection.extremes.end = { x: this.obj.x, y: this.obj.y };
    ui.boxSelect();
};
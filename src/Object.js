
Obj = function () {

  // pipe arguments to init   x, y, kind
  this.init.apply(this, arguments);
}

// The following assignments happen in the BaseGame constructor
// Obj.prototype.factory = factories, pokedex, addressbook for buildings, pokemon, people
// Obj.prototype.grp = buildingsGrp, unitsGrp, etc
// Obj.prototype.global = buildings, units, etc

Obj.prototype.init = function (baseGame, x, y, kind) {
  var self = this;
  this.id = randId();
  this.baseGame = baseGame;
  this.model = this.factory[kind];
  this.name = this.model.name;
  this.events = []; // [{trigger: "south_collision", action: function () {}}]
  this.collisions = []; // [{x: 1, y: 2}] nearby coords occupied last time we checked.
  this.x = x;
  this.y = y;
  this.occupiedTiles = [] // [{x: 1, y: 2}]

  // random spawning
  var rnd = Math.random()
  if (this.model.probability) {
    if (rnd > this.model.probability) {
      throw "event didn't happen";
    }
  }
  
  // see if it fits on tile map
  var tilemap = this.baseGame.map.getCurrentTilemap();
  var w;
  var h;
  if (this.model.frames) {
    w = this.model.frames.w/this.baseGame.map.delta;
    h = this.model.frames.h/this.baseGame.map.delta;
  } else {
    w = this.baseGame.game.cache.getImage(this.model.sprite).width/this.baseGame.map.delta;
    h = this.baseGame.game.cache.getImage(this.model.sprite).height/this.baseGame.map.delta;
  }
  var itFits = true;
  for (var i = 0; i < w && itFits; i++) {
    for (var j = 0; j < h && itFits; j++) {
      var tile = {x: this.x+i, y: this.y+j};
      itFits = tilemap[tile.y][tile.x] == 0;
      this.occupiedTiles.push(tile);
      this.collisions.push(JSON.stringify(tile)); // it collides with itself
    }
  }
  if (!itFits) {
    this.occupiedTiles = [];
    throw("it does not fit!");
  }

  // now the phaser part
  this.obj = this.baseGame.game.add.sprite(this.x*this.baseGame.map.delta,
    this.y*this.baseGame.map.delta,
    this.model.sprite,
    undefined,
    this.grp);
  // this.obj.immovable = false;
  // this.obj.anchor.set(0.5);
  this.obj.inputEnabled = true;
  this.obj.events.onInputDown.add(function () { return self.onClick(); }, this);
  this.obj.logicalPtr = this;
  this.baseGame.game.physics.arcade.enable(this.obj);

  // returns
  this.global[this.id] = this;
  return this.id;
};

Obj.prototype.onClick = function () {
  // pass clicks to the model
  if (typeof this.model.onClick === 'function'){
    this.model.onClick.apply(this, arguments);
  }
}

Obj.prototype.checkEvents =  function () {
  var toRemove = [];
  for (var i = 0; i < this.events.length; i++) {
    var ev = this.events[i];
    if (typeof this[ev['trigger']] === "function") {
      var result = this[ev['trigger']](ev);
      if (result) {
        ev.action.apply(this, ev.arguments);
        toRemove.push(i);
      }
    }
  }

  // remove events in reverse order
  for (var i = toRemove.length; i-- > 0 ;) {
    this.events.splice(i, 1);
  }
};


Obj.prototype.trimEvents = function (condition) {
  var toRemove = [];
  for (var i = 0; i < this.events.length; i++) {
    var ev = this.events[i];
    if (ev.trimCondition.indexOf(condition) > -1) {
      toRemove.push(i);
    }
  }

  // remove events in reverse order
  for (var i = toRemove.length; i-- > 0 ;) {
    this.events.splice(i, 1);
  }
};

Obj.prototype.collision = function (ev) {
  /*
   *  ev.params = {direction: "south"}
   *  ev.action = function () { exec if events happen }
   */
  var tm = this.baseGame.map.getCurrentTilemap();
  this.baseGame.map.printMap();

  // loop through nearby coords, and check if busy
  // if busy check if coords present in this.collisions. if so, don't do anything
  // if not in list, add and execute action
  // just loop all occupied tiles and add +-1. will hit itself, but that was
  // already in the collision list
  for (var i = 0; i < this.occupiedTiles.length; i++) {
    var tile = this.occupiedTiles[i];
    // nearby tiles
    var nearby = [ {x: tile.x, y: tile.y-1},  // north
                   {x: tile.x, y: tile.y+1},  // south
                   {x: tile.x+1, y: tile.y},  // east
                   {x: tile.x-1, y: tile.y} ] // west
    for (var j = 0; j < 4; j++) {
      var t = JSON.stringify(nearby[j])
      if (tm[nearby[j].y][nearby[j].x] > 0) {
        if (this.collisions.indexOf(t) < 0) {
          this.collisions.push(t);
          // check params and execute collision
          var collide = false;
          switch (ev.params.direction) {
            case 'north': collide = j == 0; break;
            case 'south': collide = j == 1; break;
            case 'east': collide = j == 2; break;
            case 'west': collide = j == 3; break;
          }
          if (collide) {
            return true;
          }
        }
      }
    }
  }

  // loop through previous collisions, if any are not present, remove
  var toRemove = [];
  for (var i = 0; i < this.collisions.length; i++) {
    var col = JSON.parse(this.collisions[i]);
    if (tm[col.y][col.x] === 0) { // could check exact parseInt(string) coord without parsing
      toRemove.push(i)
    }
  }

  // remove collisions in reverse order
  for (var i = toRemove.length; i-- > 0 ;) {
    this.collisions.splice(i, 1);
  }

  return false;
};

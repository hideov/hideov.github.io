
Obj = function () {

  // pipe arguments to init   x, y, kind
  this.init.apply(this, arguments);
}

// Obj.prototype.factory = factories, pokedex, addressbook for buildings, pokemon, people
// Obj.prototype.grp = buildingsGrp, unitsGrp, etc
// Obj.prototype.global = buildings, units, etc

Obj.prototype.init = function (x, y, kind) {
  var self = this;
  this.id = randId();
  this.model = this.factory[kind];
  this.name = this.model.name;
  this.x = x - (x % map.delta);
  this.y = y - (y % map.delta);


  // see if it fits on tile map
  var tilemap = map.getCurrentTilemap();
  var x = this.x/map.delta;
  var y = this.y/map.delta;
  var w = game.cache.getImage(this.model.sprite).width/map.delta;
  var h = game.cache.getImage(this.model.sprite).height/map.delta;
  var itFits = true;
  for (var i = 0; i < w && itFits; i++) {
    for (var j = 0; j < h && itFits; j++) {
      itFits = tilemap[y+j][x+i] == 0;
    }
  }
  if (!itFits) {
    throw("it does not fit!");
  }

  // now the phaser part
  this.obj = game.add.sprite(this.x,this.y,this.model.sprite, undefined, this.grp);
  // this.obj.immovable = false;
  // this.obj.anchor.set(0.5);
  this.obj.inputEnabled = true;
  this.obj.events.onInputDown.add(function () { return self.onClick(); }, this);
  this.obj.logicalPtr = this;
  game.physics.arcade.enable(this.obj);

  // returns
  this.global[this.id] = this;
  return this.id;
};

Obj.prototype.onClick = function () {
  // pass clicks to the model
  if (typeof this.model.onClick === 'function'){
    this.model.onClick.apply(self, arguments);
  }
}


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
  this.x = x;
  this.y = y;


  // see if it fits on tile map
  var tilemap = this.baseGame.map.getCurrentTilemap();
  var w = this.baseGame.game.cache.getImage(this.model.sprite).width/this.baseGame.map.delta;
  var h = this.baseGame.game.cache.getImage(this.model.sprite).height/this.baseGame.map.delta;
  var itFits = true;
  for (var i = 0; i < w && itFits; i++) {
    for (var j = 0; j < h && itFits; j++) {
      itFits = tilemap[this.y+j][this.x+i] == 0;
    }
  }
  if (!itFits) {
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
    this.model.onClick.apply(self, arguments);
  }
}

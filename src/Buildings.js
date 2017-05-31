
Building = function () {
  // return this.init.call(this, arguments);
  return this.init(arguments[0], arguments[1]);
};

Building.prototype.init = function (x, y) {
  var self = this;
  this.id = randId();
  this.building = factories['oak_lab'];
  this.name = this.building.name;
  this.x = x - (x % map.delta);
  this.y = y - (y % map.delta);


  // see if it fits on tile map
  var tilemap = map.getCurrentTilemap();
  var x = this.x/map.delta;
  var y = this.y/map.delta;
  var w = game.cache.getImage(this.building.sprite).width/map.delta;
  var h = game.cache.getImage(this.building.sprite).height/map.delta;
  console.log(x,y,w,h)
  var itFits = true;
  for (var i = 0; i < w && itFits; i++) {
    for (var j = 0; j < h && itFits; j++) {
      itFits = tilemap[y+j][x+i] == 0;
    }
  }
  if (!itFits) {
    alert("it does not fit!");
    return;
  }

  // now the phaser part
  // load the sprite
  this.obj = game.add.sprite(this.x,this.y,this.building.sprite, undefined, buildingsGrp);
  // this.obj.immovable = false;
  // this.obj.anchor.set(0.5);
  this.obj.inputEnabled = true;
  this.obj.events.onInputDown.add(function () { return self.onClick(); }, this);
  this.obj.logicalPtr = this;
  game.physics.arcade.enable(this.obj);

  // returns
  buildings[this.id] = this;
  return this.id;
};

Building.prototype.onClick = function () {
  // new Pokemon(this.obj.body.x, this.obj.body.y+100);
  this.building.onClick(this.x, this.y);
}

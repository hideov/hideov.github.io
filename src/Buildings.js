
Building = function () {
    // return this.init.call(this, arguments);
    return this.init(arguments[0], arguments[1]);
};

Building.prototype.init = function (x, y) {
    var self = this;
    this.id = randId();
    this.building = factories['oak_lab'];
    this.name = this.building.name;
    this.x = x;
    this.y = y;
    
    // now the phaser part
    this.obj = game.add.sprite(x,y,this.building.sprite, undefined, buildingsGrp);
    // this.obj.immovable = false;
    this.obj.anchor.set(0.5);
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

/* jshint browser:true */
/* global BasicGame:true */
/* global Phaser */
// create BasicGame Class

// create Game function in BasicGame
BasicGame = function (game) {
  this.game = game;
  this.tilesprite;
  this.buildingsGrp;
  this.unitsGrp;
  this.buildings = [];
  this.units = [];
  this.hero;
  this.constructing = false;
  this.map;
  this.ui;
  this.factories = factories;
  this.pokedex = pokedex;

  // point globals to corresponding object
  Building.prototype.factory = this.factories;
  Building.prototype.grp = this.buildingsGrp;
  Building.prototype.global = this.buildings;

  // Init specific lists
  Unit.prototype.factory = this.pokedex;
  Unit.prototype.grp = this.unitsGrp;
  Unit.prototype.global = this.units;
};

// set Game function prototype
BasicGame.prototype = {

  init: function () {
    this.input.maxPointers = 1;
    this.stage.disableVisibilityChange = true;
    this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true, false);
    this.scale.setResizeCallback(this.gameResized, this);
    this.scale.updateLayout(true);
    this.scale.refresh();
  },

  preload: function () {
    preloadSprites(this);
  },

  create: function () {
    this.map = new Map(this);
    this.ui = new UI(this);

    // global click listeners
    var self = this;
    this.game.input.onDown.add(function () {
      if (this.game.input.activePointer.rightButton.isDown) {
        self.ui.emitOnClick('r');
      }
      if (this.game.input.activePointer.leftButton.isDown) {
        self.ui.emitOnClick('l');
      }
    }, this);

    // prevent browser right click on canvas
    this.game.canvas.oncontextmenu = function (e) { e.preventDefault(); };

    // start physics
    this.game.physics.startSystem(Phaser.Physics.ARCADE);


    // initialise groups for units and buildings
    this.buildingsGrp = this.game.add.group();
    this.buildingsGrp.enableBody = true;

    this.unitsGrp = this.game.add.physicsGroup();
    this.unitsGrp.enableBody = true;
    this.unitsGrp.setAll('body.collideWorldBounds', true);

    // load map elements
    new Building(this, 2,3, 'oak_lab');
    new Building(this, 8,3, 'oak_lab');
    // load hero
    this.hero = new Unit(this, 0, 0, 'hero');

    // prepare input reactions
    this.game.input.onDown.add(this.click, this);
  },

  update: function () {
    // show popup on collisions!!!
    // this.game.physics.arcade.collide(this.unitsGrp, this.unitsGrp, this.unitsCollision);
  },

  render: function () {
  },

  click: function (pointer) {
    this.hero.moveTowards(this.game.input.x, this.game.input.y);
  },
};

/* jshint browser:true */
/* global BasicGame:true */
/* global Phaser */
// create BasicGame Class

// create Game function in BasicGame
BasicGame = function (game) {
  this.game = game;
  this.tilesprite;
  window.TILESPRITE = this.tilesprite;
  this.buildingsGrp;
  this.unitsGrp;
  this.buildings = {};
  this.units = {};
  this.hero;
  this.constructing = false;
  this.map;
  this.ui;
  this.factories = factories;
  this.pokedex = pokedex;
  this.mt = new MersenneTwister(); // if no seed is defined, seeds using timestamp

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
    // this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.forceOrientation(true, false);
    this.scale.setResizeCallback(this.gameResized, this);
    this.scale.updateLayout(true);
    this.scale.refresh();
  },

  preload: function () {
    // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    var maxH = Math.floor((jQuery(window).height()-160)/this.game.delta)*this.game.delta;
    var maxW = Math.floor((jQuery(window).width()-160)/this.game.delta)*this.game.delta;
    if (maxH < maxW) {
      var minH = 120;
      var minW = Math.round(minH / this.game.ratio);
    } else {
      // need to fix his for portrait view
      var minW = 120;
      var minH = Math.round(minW * this.game.ratio);
    }
    console.log( "minH "+ minH +
                " minW "+ minW +
                " maxH "+ (maxW*this.game.ratio < maxH ? Math.round(maxW*this.game.ratio) : maxH) + 
                " maxW "+ (maxW*this.game.ratio < maxH ? maxW : Math.round(maxH / this.game.ratio))
               );
    this.scale.setMinMax(
      minW,
      minH,
      maxW*this.game.ratio < maxH ? maxW : Math.round(maxH / this.game.ratio),
      maxW*this.game.ratio < maxH ? Math.round(maxW*this.game.ratio) : maxH
    );
    preloadSprites(this);
  },

  create: function () {
    this.map = new Map(this);
    this.ui = new UI(this);

    // global click listeners
    var self = this;
    this.game.input.onDown.add(function () {
      if (this.game.input.activePointer.rightButton.isDown && !window.DIALOG) {
        self.ui.emitOnClick('r');
      }
      if (this.game.input.activePointer.leftButton.isDown && !window.DIALOG) {
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
    this.loadMapElements();

    // prepare input reactions
    this.game.input.onDown.add(this.click, this);
  },

  update: function () {
    // show popup on collisions!!! but we stop them away from collision point!
    // this.game.physics.arcade.collide(this.unitsGrp, this.unitsGrp, this.unitsCollision)
    for (var id in this.buildings) {
      this.buildings[id].checkEvents();
    }
    for (var id in this.units) {
      this.units[id].checkEvents();
    }

  },

  render: function () {
  },

  click: function (pointer) {
    if (!window.DIALOG) {
      this.hero.moveTowards(this.game.input.x, this.game.input.y);
    }
  },

  loadMapElements: function () {
    var self = this;
    var easystar = new EasyStar.js();
    easystar.setAcceptableTiles([0]);
    // easystar.enableDiagonals(); // don't! animation relies on 4 directions
    easystar.enableCornerCutting();

    var previousBuilding = undefined;
    var currentBuilding = undefined;

    // prepare recursive building adding
    var addBuilding = function (len, depth, cb) {
      if (depth === len) {
        // finish looping
        return cb();
      }

      // add new building
      previousBuilding = currentBuilding;
      var building = Object.keys(self.factories)[depth];
      currentBuilding = new Building(self, -1, -1, building);
      var tm = self.map.getCurrentTilemap();
      easystar.setGrid(tm);
      
      if (previousBuilding) {
        easystar.findPath(
          previousBuilding.x,
          previousBuilding.y + previousBuilding.h,
          currentBuilding.x,
          currentBuilding.y + currentBuilding.h,
          function( path ) {
            // if no path found, try to get close
            if (path === null || path.length === 0) {
              // ?
            } else {
              // draw path
              for (var i = 0; i < path.length; i++) {
                var x = path[i].x;
                var y = path[i].y;
                self.tilesprite = self.game.add.image(
                  x * self.map.delta, y * self.map.delta,
                  // self.map.delta, self.map.delta,
                  'gbc_cement_tile',
                );
              }
            }
            return addBuilding(len, ++depth, cb);
          });
          easystar.calculate();
      } else {
        return addBuilding(len, ++depth, cb);
      }
    }

    // now add the buildings!
    addBuilding(Object.keys(this.factories).length, 0, function () {
      // load hero
      try {
        self.hero = new Unit(self, -1, -1, 'hero');
      } catch (exception) { // ADD PROPER EXCEPTION TYPES
        self.hero = new Unit(self, -1, -1, 'heroine');
      }
    });
  }
};

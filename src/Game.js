/* jshint browser:true */
/* global BasicGame:true */
/* global Phaser */
// create BasicGame Class

var game;
var tilesprite;
var buildingsGrp;
var unitsGrp;
var that;
var buildings = [];
var units = [];
var constructing = false;
var selected = [];
var selection = {
    selecting: false,
    extremes: {
        start: {
            x: undefined,
            y: undefined
        },
        end: {
            x: undefined,
            y: undefined
        }
    },
    graphics: undefined,
};
var map;
var ui;
var factories;


// create Game function in BasicGame
BasicGame = {};
BasicGame.Game = function (game) {};

// set Game function prototype
BasicGame.Game.prototype = {

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
        
        that = this;
        game = this.game;
    },

    preload: function () {
        preloadSprites(this);
    },

    create: function () {
        
        
        map = new Map();
        ui = new UI();
        
        // global click listeners
        game.input.onDown.add(function () {
            if (game.input.activePointer.rightButton.isDown) {
                ui.emitOnClick('r');    
            }
            if (game.input.activePointer.leftButton.isDown) {
                ui.emitOnClick('l');    
            }
        }, this);
        
        // prevent browser right click on canvas
        game.canvas.oncontextmenu = function (e) { e.preventDefault(); };
        
        // start physics
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        
        // initialise groups for units and buildings
        buildingsGrp = game.add.group();
        buildingsGrp.enableBody = true;
        
        unitsGrp = game.add.physicsGroup();
        unitsGrp.enableBody = true;
        unitsGrp.setAll('body.collideWorldBounds', true);        
        
        new Building(200,200);
        
        // preparing tools for the selection box
        selection.graphics = game.add.graphics();
        
        // prepare input reactions
        game.input.onDown.add(this.click, this);
    },

    update: function () {
        game.physics.arcade.collide(unitsGrp, unitsGrp, this.unitsCollision);
        
        
        for (var id in units) {
            if (units[id].selected) {
                if (game.input.mousePointer.isDown) {
                    if (game.input.activePointer.rightButton.isDown) {
                        units[id].moveTowards(game.input.x, game.input.y);
                    }
                }
            }
        }
        
        // selection box
        if (selection.selecting) {
            if (game.input.activePointer.leftButton.isDown) {
                selection.extremes.end.x = game.input.activePointer.x;
                selection.extremes.end.y = game.input.activePointer.y; 
            } else {
                selection.selecting = false;
                ui.boxSelect();
            }
        }
    },
    
    render: function () {
        var s = selection.extremes.start;
        var e = selection.extremes.end;
        
        selection.graphics.clear();
        if (selection.selecting) {
            selection.graphics.lineStyle(1, 0xFFFF0B, 0.3);
            selection.graphics.beginFill(0xFFFF0B, 0.2);
            selection.graphics.drawRect(s.x,s.y,e.x-s.x,e.y-s.y);
        }
    },
    
    click: function (pointer) {
        selection.selecting = true;
        selection.extremes.start.x = pointer.x;
        selection.extremes.start.y = pointer.y;
    },
};

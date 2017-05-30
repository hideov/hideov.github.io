
Menu = function (ui, x, y) {
  this.init(ui, x, y);
};


Menu.prototype.init = function (ui, x, y) {
    // console.log('menu init');
    this.ui = ui;
    this.x = x;
    this.y = y;
    this.nButtons = 0;
    this.maxCols = Math.floor((800-this.x) / 32);

    // add a group for the spirtes/rectangles/buttons
    this.group = game.add.group();
    // this.graphics = game.add.graphics();
    this.buttons = []; // should add some pointer to this
};

Menu.prototype.addButton = function (action, listenerL, listenerR, sprite) {
    // console.log('addbutton');
    var self = this;
    // figure out position for new square
    // all images should be in a group so that we can show or hide the whole menu
    var x = (this.nButtons % this.maxCols) * 32 + this.x;
    var y = Math.floor(this.nButtons / this.maxCols) * 32 + this.y;
    this.nButtons++;
    // console.log('x: '+x+'\ny: '+y);

    // how do I add the graphics to the group? how do I make it clickable? Should I use a 1px white sprite?
    // this.graphics.lineStyle(1, 0xFFFFFF, 0.0);
    // this.graphics.beginFill(0xFFFFFF, 0.2);
    // this.graphics.drawRect(x,y,32,32);

    var btn = game.add.sprite(x, y,'button'); //,undefined,this.group);
    btn.inputEnabled = true;
    btn.events.onInputUp.add(function () {
        if (action) {
            action();
        }
     }, this);
     var lable = game.add.sprite(x+16, y+16,sprite); //,undefined,this.group);
     lable.anchor.set(0.5);
     this.buttons.push({btn: btn, lable: lable});

     // add the listener
     if (listenerL) {
        this.ui.onClick('l', listenerL);
     }
     if (listenerR) {
        this.ui.onClick('r', listenerR);
     }
};

Menu.prototype.show = function () {

};

Menu.prototype.hide = function () {

};

Menu.prototype.kill = function () {
    for (var i = 0; i < this.buttons.length; i++) {
        this.buttons[i].btn.kill();
        this.buttons[i].lable.kill();
    }
};

// Menu.prototype.init = function (ui, x, y) {
//     this.ui = ui;
//     var self = this;
//     this.obj = game.add.sprite(x,y,'menubar');
//     this.obj.inputEnabled = true;
//     this.obj.events.onInputUp.add(function () {
//         self.click();
//      }, this);

//      var action = function () {
//          if (constructing) {
//              constructing = false;
//             jQuery('#game canvas').css({cursor:'default'});
//             new Building(game.input.x, game.input.y);
//          }

//          // add yourself to click listeners after being executed
//          self.ui.onClick('r', action);
//      }
//      // add the listener
//      this.ui.onClick('r', action);
// };

// Menu.prototype.click = function () {
//   var x = game.input.x - this.obj.x;
//   var y = game.input.y - this.obj.y;
//   if (x < 32) {
//     constructing = true;
//     jQuery('#game canvas').css({cursor:'pointer'});
//   }
// };


UI = function () {
    this.init();
};

UI.prototype.init = function () {
    this.listeners = {
        'rclick' : [],
        'lclick' : [],
    };
    // this.menu = new Menu(this, 800-320, 0);
    var ui = this;
    var action = function () {
        constructing = true;
        jQuery('#game canvas').css({cursor:'pointer'});
    }
    var listenerR = function () {
         if (constructing) {
             constructing = false;
            jQuery('#game canvas').css({cursor:'default'});
            new Building(game.input.x, game.input.y);
         }

         // add yourself to click listeners after being executed
         ui.onClick('r', listenerR);
    }
    // this.menu.addButton(action, undefined, listenerR, 'add');
};

UI.prototype.onClick = function (button, handler) {
  this.listeners[button+'click'].push(handler);
};

UI.prototype.emitOnClick = function (button) {
    var handlers = this.listeners[button+'click'].length;
    var f;
    for (var i = 0; i < handlers; i++) {
        f = this.listeners[button+'click'].shift();
        f();
    }
};

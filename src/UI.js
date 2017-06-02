
UI = function (baseGame) {
  this.baseGame = baseGame;
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
    ui.baseGame.constructing = true;
    jQuery('#game canvas').css({cursor:'pointer'});
  }
  var listenerR = function () {
    if (ui.baseGame.constructing) {
      ui.baseGame.constructing = false;
      jQuery('#game canvas').css({cursor:'default'});
      new Building(this.baseGame.game.input.x, this.baseGame.game.input.y);
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

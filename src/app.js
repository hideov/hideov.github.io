var bootup = function () {
  /* globals Phaser:false, BasicGame:false */
  //  Create your Phaser game and inject it into the game div.
  //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  //  We're using a game size of 640 x 480 here, but you can use whatever you feel makes sense for your game of course.
  var delta = 64;
  var area = 200;
  var ratio = (Math.min(jQuery(window).height(), window.screen.height)-168)/(Math.min(jQuery(window).width(), window.screen.width)-168);
  var sar = Math.sqrt(area/ratio);
  var cols = Math.round(sar);
  var rows = Math.round(ratio*sar);
  var width = cols * delta;
  var height = rows * delta;
  ratio = height/width; // overwrite

  // console.log("orig h " + (Math.min(jQuery(window).height(), window.screen.height)-168))
  // console.log("adap h " + height)

  // var width = 1344;
  // var height = 768;

  console.log("setting with w " + width + " h " + height)
  var game = new Phaser.Game(width, height, Phaser.CANVAS, 'game', null, false, false);
  game.delta = delta;
  game.cols = cols;
  game.rows = rows;
  game.ratio = ratio;
  // game.cols = width/delta;
  // game.rows = height/delta;
  // game.ratio = width/height;

  //  Add the States your game has.
  //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
  basicGame = new BasicGame(game);
  game.state.add('Game', basicGame);
  window.BASE = basicGame;

  //  Now start the Game state.
  game.state.start('Game');

  return game;
};

var reboot = function () {
  if (window.GAME && window.GAME.destroy) {
    if (window.BASE && window.BASE.map && window.BASE.map.tilesprite) {
      window.BASE.map.tilesprite.destroy();
    }
    window.GAME.destroy();
  }
  window.GAME = bootup();
}; // CURIOSITY: this semicolon does matter.

(function () {
  reboot();
})();

// handle resize event
(function (){
  var rtime;
  var timeout = false;
  var delta = 150;
  function resizeend () {
    if (new Date() - rtime < delta) {
      setTimeout(resizeend, delta);
    } else {
      timeout = false;
      if (window.DIALOG) {
        if (typeof window.DIALOG.fill === "function") {
          window.DIALOG.fill();
        }
      }
      reboot();
    }
  }
  $(window).resize(function (ev) {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeend, delta);
    }
  });
})();

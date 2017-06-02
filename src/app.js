var bootup = function () {
  /* globals Phaser:false, BasicGame:false */
  //  Create your Phaser game and inject it into the game div.
  //  We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
  //  We're using a game size of 640 x 480 here, but you can use whatever you feel makes sense for your game of course.
  var delta = 64;
  var width = Math.floor((jQuery(window).width()-160)/delta)*delta;
  var height = Math.floor((jQuery(window).height()-160)/delta)*delta;

  var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');
  game.delta = delta;

  //  Add the States your game has.
  //  You don't have to do this in the html, it could be done in your Game state too, but for simplicity I'll keep it here.
  basicGame = new BasicGame(game);
  game.state.add('Game', basicGame);

  //  Now start the Game state.
  game.state.start('Game');

  return game;
};

var reboot = function () {
  if (window.GAME && window.GAME.destroy) {
    window.GAME.destroy();
  }
  window.GAME = bootup();
}; // CURIOSITY: this semicolon does matter.

(function () {
  reboot();
})();

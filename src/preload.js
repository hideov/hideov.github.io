var preloadSprites = function (game) {
  // hax
  game.load.image('load-nothing', '');

  // ui
  game.load.image('menubar', 'asset/ui/menubar.png');
  game.load.image('add', 'asset/ui/add.png');
  game.load.image('button', 'asset/ui/button.png');

  // tiles
  game.load.image('grass_tile', 'asset/terrain/grass_tile.png');
  game.load.image('gbc_grass_tile', 'asset/terrain/gbc_grass_tile.png');
  game.load.image('dbg_grass_tile', 'asset/terrain/dbg_grass_tile.png');

  // buildings
  game.load.image('oak_lab', 'asset/buildings/oak_lab.png');

  // pokemon
  game.load.image('bulbasaur', 'asset/units/bulbasaur.png');
  game.load.image('squirtle', 'asset/units/squirtle.png');
  game.load.image('gbc_hero', 'asset/units/gbc_hero.png');
};

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
  game.load.image('gbc_flower_tile', 'asset/terrain/gbc_flower_tile.png');
  game.load.image('gbc_cement_tile', 'asset/terrain/gbc_cement_tile.png');
  game.load.image('dbg_grass_tile', 'asset/terrain/dbg_grass_tile.png');
  game.load.image('gbc_tileset', 'asset/terrain/gbc_tileset.png');

  // buildings
  game.load.image('oak_lab', 'asset/buildings/gbc_gym.png');
  game.load.image('research', 'asset/buildings/gbc_research.png');
  game.load.image('misc', 'asset/buildings/gbc_misc.png');
  game.load.image('about', 'asset/buildings/gbc_about.png');
  game.load.image('src', 'asset/buildings/gbc_src.png');
  game.load.image('rhul', 'asset/buildings/gbc_rhul.png');

  // pokemon
  game.load.image('bulbasaur', 'asset/units/bulbasaur.png');
  game.load.image('squirtle', 'asset/units/squirtle.png');
  game.load.spritesheet('gbc_hero', 'asset/units/gbc_hero.png', 64, 64, 12);
  game.load.spritesheet('gbc_heroine', 'asset/units/gbc_heroine.png', 64, 64, 12);
};

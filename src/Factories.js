var factories = {
  oak_lab: {
    name: 'oak\'s',
    sprite: 'oak_lab',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  },
  test_place: {
    name: 'oak\'s',
    sprite: 'oak_lab',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  },
};

var pokedex = {
  bulbasaur: {
    name: 'Bulbasaur',
    sprite: 'bulbasaur'
  },
  squirtle: {
    name: 'Squirtle',
    sprite: 'squirtle'
  },
  hero: {
    name: 'Hero',
    sprite: 'gbc_hero',
    frames: {w: 64, h: 64},
    probability: 0.5,
  },
  heroine: {
    name: 'Heroine',
    sprite: 'gbc_heroine',
    frames: {w: 64, h: 64},
    probability: 1.0,
  },
};

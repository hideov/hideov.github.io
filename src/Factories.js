var factories = {
  research: {
    name: 'research',
    sprite: 'research',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  },
  about: {
    name: 'about',
    sprite: 'about',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  },
  misc: {
    name: 'misc',
    sprite: 'misc',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  },
  src: {
    name: 'src',
    sprite: 'src',
    onClick: Events.genOpenPage('/content/test.html', "test name"),
  }
  // lol_place2: {
  //   name: 'oak\'s',
  //   sprite: 'oak_lab',
  //   onClick: Events.genOpenPage('/content/test.html', "test name"),
  // },
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

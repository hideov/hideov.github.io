var factories = {
  oak_lab: {
    name: 'oak\'s',
    sprite: 'oak_lab',
    onClick: function (x, y) {
      // for (var id in units) {
      //   units[id].moveTowards(x,y+100);
      // }
        // // show menu
        // if (ui.menu2) {
        //     ui.menu2.kill();
        // }
        // ui.menu2 = new Menu(ui, 800-320, 33);
        // ui.menu2.addButton(function () {
        //     // console.log('oak action ' + 'bulbasaur');
        //     new Pokemon(x+100+map.delta*Math.random(), y+100+map.delta*Math.random(), 'bulbasaur');
        // },
        // undefined,
        // function () {
        //     // console.log('oak listener R');
        //     if (ui.menu2) {
        //         ui.menu2.kill();
        //         ui.menu2 = null;
        //     }
        // },
        // pokedex['bulbasaur'].sprite);
        // ui.menu2.addButton(function () {
        //     // console.log('oak action ' + 'squirtle');
        //     new Pokemon(x+100+map.delta*Math.random(), y+100+map.delta*Math.random(), 'squirtle');
        // },
        // undefined,
        // function () {
        //     // console.log('oak listener R');
        //     if (ui.menu2) {
        //         ui.menu2.kill();
        //         ui.menu2 = null;
        //     }
        // },
        // pokedex['squirtle'].sprite);
    }
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
    sprite: 'gbc_hero'
  },
};

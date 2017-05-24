var factories = {
    oak_lab: {
        name: 'oak\'s',
        sprite: 'oak_lab',
        pokemon: ['bulbasaur', 'squirtle'],
        onClick: function (x, y) {
            // show menu
            if (ui.menu2) {
                ui.menu2.kill();
            }
            ui.menu2 = new Menu(ui, 800-320, 33);
            var poke = factories.oak_lab.pokemon;
            // for (var p in poke) {
            //     var species = poke[p];
            //     console.log(species);
            //     ui.menu2.addButton(function () {
            //         console.log('oak action ' + species); // this is evaluated always as squirtle
            //         new Pokemon(x+100, y+100, species);
            //     }, function () {
            //         console.log('oak listener');
            //         if (ui.menu2) {
            //             ui.menu2.kill();
            //             ui.menu2 = null;
            //         }
            //     },
            //     undefined,
            //     pokedex[species].sprite);
            // }
            ui.menu2.addButton(function () {
                // console.log('oak action ' + 'bulbasaur');
                new Pokemon(x+100+map.delta*Math.random(), y+100+map.delta*Math.random(), 'bulbasaur');
            },
            undefined,
            function () {
                // console.log('oak listener R');
                if (ui.menu2) {
                    ui.menu2.kill();
                    ui.menu2 = null;
                }
            },
            pokedex['bulbasaur'].sprite);
            
            
            
            ui.menu2.addButton(function () {
                // console.log('oak action ' + 'squirtle');
                new Pokemon(x+100+map.delta*Math.random(), y+100+map.delta*Math.random(), 'squirtle');
            },
            undefined,
            function () {
                // console.log('oak listener R');
                if (ui.menu2) {
                    ui.menu2.kill();
                    ui.menu2 = null;
                }
            },
            pokedex['squirtle'].sprite);
        }
    },
};
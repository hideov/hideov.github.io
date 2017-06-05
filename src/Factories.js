var factories = {
  oak_lab: {
    name: 'oak\'s',
    sprite: 'oak_lab',
    onClick: function (x, y) {
      // dialog should show up after building reached. add event list
      //    options = 'scrollbars=yes,width=' + w + ',height=' + h + ',left=' + posX + ',top=' + posY;
      //    var options = {w: w, h: h, l: posX, t: posY, title: title};
      // new Dialog('/content/test.html', "test name");
      // on click ad a collision event TO THE HERO on this building
      this.baseGame.hero.events.push({
        trigger: "coordinate",
        arguments: {x: Math.floor(x/this.delta), y: Math.floor(y/this.delta)},
        params: undefined,
        trimCondition: ["no path"],
        action: function () {
          // should accept collision as long as the user finds a path, and reaches
          // the final point, even if south of the clicked target
          new Dialog('/content/test.html', "test name");
        }
      });
    },
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

var factories = {
  oak_lab: {
    name: 'oak\'s',
    sprite: 'oak_lab',
    onClick: function (x, y) {
      // dialog should show up after building reached. add event list
      //    options = 'scrollbars=yes,width=' + w + ',height=' + h + ',left=' + posX + ',top=' + posY;
      //    var options = {w: w, h: h, l: posX, t: posY, title: title};
      var newChildWindow = new Dialog('/content/test.html', "test name", undefined);
      // stop game from listening until closed current dialog
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

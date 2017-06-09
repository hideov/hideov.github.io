Events = {
  genOpenPage: function (url, name) {
    return function (x, y) {
      if (!this.baseGame.hero.moving) {
        this.baseGame.hero.events.push({
          trigger: "coordinate",
          arguments: {x: Math.floor(x/this.delta), y: Math.floor(y/this.delta)},
          params: undefined,
          trimCondition: ["no path"],
          action: function () {
            new Dialog(url, name);
          }
        });
      }
    }
  },
};

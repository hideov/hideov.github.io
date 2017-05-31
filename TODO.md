# Bugs
Need to fix rare bug where tiles fail to load.

Phaser.Cache.getImage: Key "__default" not found in Cache.
Phaser.Cache.getImage: Key "__missing" not found in Cache.
Uncaught TypeError: Cannot read property 'base' of null
    at new c.TileSprite (phaser.min.js:3)
    at c.GameObjectFactory.tileSprite (phaser.min.js:3)
    at Map.init (Map.js:12)
    at new Map (Map.js:3)
    at BasicGame.Game.create (Game.js:49)
    at c.StateManager.loadComplete (phaser.min.js:3)
    at c.Loader.finishedLoading (phaser.min.js:3)
    at c.Loader.processLoadQueue (phaser.min.js:3)
    at c.Loader.asyncComplete (phaser.min.js:3)
    at c.Loader.fileComplete (phaser.min.js:3)



Add responsive game boy pocket border
Make site responsive, by repositioning buildings and resizing canvas and tilemap

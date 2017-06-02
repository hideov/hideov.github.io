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




catch "it does not fit" exceptions for small screens!

Add a loading graphic while resizing

to have 5px black border inside change top/bottom height altered, and no-repeat
background


add a check for resolution on startup, and act accordingly

custom dialog scrollbar

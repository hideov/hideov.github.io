// Inherit from Obj
Building = function () {
  Obj.apply(this, arguments);
}
Building.prototype = Object.create(Obj.prototype);
Building.prototype.constructor = Building;

// Override init - so far not needed
// Building.prototype.init = function (x, y, kind) {
//   retrn Obj.prototype.init.apply(this, arguments);
// };

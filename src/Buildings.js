// Inherit from Obj
Building = function () {
  Obj.apply(this, arguments);
}
Building.prototype = Object.create(Obj.prototype);
Building.prototype.constructor = Building;

// Init specific lists
Building.prototype.factory = factories; console.log(factories);
Building.prototype.grp = buildingsGrp;
Building.prototype.global = buildings;

// Override init - so far not needed
// Building.prototype.init = function (x, y, kind) {
//   var id = Obj.prototype.init.apply(this, arguments);
//   return id;
// };

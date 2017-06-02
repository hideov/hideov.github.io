function padDigits(number, digits) {
  return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

var randId = function () {
  var r;
  var len = 32;

  // do {
    r = Math.floor(Math.random() * Math.pow(10,len));
    r = padDigits(r,len);
  // } while (r in units || r in buildings);

  return r;
};

// Check if Object.create native implementation available
if (typeof Object.create !== 'function') {
  Object.create = function (o) {
    function F() {}  // empty constructor
    F.prototype = o; // set base object as prototype
    return new F();  // return empty object with right [[Prototype]]
  };
}

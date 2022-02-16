"use strict";

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.object.to-string.js");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.some = some;
exports.test = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.flat.js");

require("core-js/modules/es.array.unscopables.flat.js");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function some(_x) {
  return _some.apply(this, arguments);
}

function _some() {
  _some = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(somePro) {
    var someStr;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return somePro.then(function (a) {
              return a + 2;
            });

          case 2:
            someStr = _context.sent;
            return _context.abrupt("return", someStr);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _some.apply(this, arguments);
}

var test = function test(name) {
  if (name.includes('a')) {
    return 123;
  }

  console.log('object :>> ', 123);
  var c = [1, 2, 3, [4, [5, 6, 7]]];
  return c.flat();
};

exports.test = test;
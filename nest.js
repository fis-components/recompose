'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var _createElement = require('./createElement');

var _createElement2 = _interopRequireDefault(_createElement);

var nest = function nest() {
  for (var _len = arguments.length, Components = Array(_len), _key = 0; _key < _len; _key++) {
    Components[_key] = arguments[_key];
  }

  var Nest = function Nest(_ref) {
    var props = _objectWithoutProperties(_ref, []);

    var children = _ref.children;
    return Components.reduceRight(function (child, Component) {
      return _createElement2['default'](Component, props, child);
    }, children);
  };

  if ("production" !== 'production') {
    var getDisplayName = require('./getDisplayName');
    var displayNames = Components.map(getDisplayName);
    Nest.displayName = 'nest(' + displayNames.join(', ') + ')';
  }

  return Nest;
};

exports['default'] = nest;
module.exports = exports['default'];
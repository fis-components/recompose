'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashCurry = require('lodash/curry');

var _lodashCurry2 = _interopRequireDefault(_lodashCurry);

var createHelper = function createHelper(func, helperName, _helperLength) {
  var setDisplayName = arguments.length <= 3 || arguments[3] === undefined ? true : arguments[3];

  var helperLength = _helperLength || func.length;

  if ("production" !== 'production') {
    var _ret = (function () {
      // In development, use custom implementation of curry that keeps track of
      // whether enough parameters have been applied. Also adds a `displayName`
      // to the base commponent.
      var wrapDisplayName = require('./wrapDisplayName');
      var apply = function apply(previousArgs, nextArgs) {
        var filteredArgs = nextArgs.filter(function (ident) {
          return typeof ident !== 'undefined';
        });
        var args = previousArgs.concat(filteredArgs);
        var argsLength = args.length;

        if (argsLength < helperLength) {
          var partialFunc = function partialFunc() {
            for (var _len = arguments.length, partialArgs = Array(_len), _key = 0; _key < _len; _key++) {
              partialArgs[_key] = arguments[_key];
            }

            return apply(args, partialArgs);
          };

          // The development version of `compose` will use these properties to
          // print warnings
          partialFunc.__missingHelperParameters = helperLength - argsLength - 1;
          partialFunc.__helperName = helperName;

          return partialFunc;
        }

        var BaseComponent = args[helperLength - 1];

        var Component = func.apply(undefined, args);

        if (BaseComponent && helperName && setDisplayName) {
          Component.displayName = wrapDisplayName(BaseComponent, helperName);
        }

        return Component;
      };

      return {
        v: function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return apply([], args);
        }
      };
    })();

    if (typeof _ret === 'object') return _ret.v;
  }

  // In production, use lodash's curry
  return _lodashCurry2['default'](func, helperLength);
};

exports['default'] = createHelper;
module.exports = exports['default'];
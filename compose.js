'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _lodashFlowRight = require('lodash/flowRight');

var _lodashFlowRight2 = _interopRequireDefault(_lodashFlowRight);

// In production, use lodash's flowRight
var compose = _lodashFlowRight2['default'];

// In development, print warnings when composing higher-order component helpers
// that have been applied with too few parameters
if ("production" !== 'production') {
  (function () {
    var getDisplayName = require('./getDisplayName');

    compose = function () {
      for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
        funcs[_key] = arguments[_key];
      }

      var needsParameters = [];
      var doesntNeedParameters = [];

      funcs.forEach(function (func) {
        var missingHelperParameters = func.__missingHelperParameters;
        if (missingHelperParameters === 0) {
          doesntNeedParameters.push(func);
        } else if (missingHelperParameters > 0) {
          needsParameters.push(func);
        }
      });

      // Warn if a helper that needs parameters is composed with another helper
      // that doesn't need parameters. Checking for the second condition allows
      // partially-applied helpers to be composed before they become
      // higher-order components.
      if (needsParameters.length && doesntNeedParameters.length) {
        return function (BaseComponent) {
          var displayName = getDisplayName(BaseComponent);

          needsParameters.forEach(function (func) {
            var helperName = func.__helperName;
            var amountMissing = func.__missingHelperParameters;
            /* eslint-disable */
            console.error(
            /* eslint-enable */
            'Attempted to compose `' + helperName + '()` with other ' + 'higher-order component helpers, but it has been applied with ' + (amountMissing + ' too few parameters. Check the implementation ') + ('of <' + displayName + '>.'));
          });

          return _lodashFlowRight2['default'].apply(undefined, funcs)(BaseComponent);
        };
      }

      return _lodashFlowRight2['default'].apply(undefined, funcs);
    };
  })();
}

exports['default'] = compose;
module.exports = exports['default'];
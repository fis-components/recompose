'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _onlyUpdateForKeys = require('./onlyUpdateForKeys');

var _onlyUpdateForKeys2 = _interopRequireDefault(_onlyUpdateForKeys);

var _createHelper = require('./createHelper');

var _createHelper2 = _interopRequireDefault(_createHelper);

var onlyUpdateForPropTypes = function onlyUpdateForPropTypes(BaseComponent) {
  var propTypes = BaseComponent.propTypes;

  if ("production" !== 'production') {
    var getDisplayName = require('./getDisplayName');
    if (!propTypes) {
      /* eslint-disable */
      console.error('A component without any `propTypes` was passed to ' + '`onlyUpdateForPropTypes()`. Check the implementation of the ' + ('component with display name "' + getDisplayName(BaseComponent) + '".'));
      /* eslint-enable */
    }
  }

  var propKeys = Object.keys(propTypes || {});
  var OnlyUpdateForPropTypes = _onlyUpdateForKeys2['default'](propKeys, BaseComponent);

  return OnlyUpdateForPropTypes;
};

exports['default'] = _createHelper2['default'](onlyUpdateForPropTypes, 'onlyUpdateForPropTypes');
module.exports = exports['default'];
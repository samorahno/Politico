'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { checkString, checkRegex } = _Helper2.default;
class Validator {
  static validateString(string) {
    if (checkString(string)) return false;
    if (checkRegex(string)) return false;
    return true;
  }

  static validateAddress(string) {
    if (checkString(string)) return false;
    return true;
  }
}
exports.default = Validator;
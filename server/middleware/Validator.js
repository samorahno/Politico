import Helper from './Helper';

const { checkString, checkRegex } = Helper;
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
export default Validator;

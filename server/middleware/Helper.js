class Helper {
  static checkString(string) {
    if (string === undefined || string.toString().trim() === '' || typeof string !== 'string'
    || string.length < 3 || string.length > 500) return false;
  }

  static checkRegex(string) {
    const stringAllowed = /^[a-zA-Z0-9'\s\d]+$/;
    if (!string.match(stringAllowed)) return false;
  }
}

export default Helper;

exports.HTTP_BAD_REQUEST = 400
exports.HTTP_OK = 200
exports.HTTP_RESET_CONTENT = 403
exports.HTTP_NOT_FOUND = 404
exports.TOKEN = "GNSABCDEFGH"

exports.ACTION_LOGIN = 'logged in';
exports.ACTION_LOGOUT = 'logged out';
exports.ACTION_INSERTED = 'inserted';
exports.ACTION_UPDATED = 'updated';
exports.ACTION_SENT = 'sent';
exports.ACTION_GET = 'details collected';
exports.ACTION_VERIFIED = 'verified';
exports.ACTION_DELETED = 'deleted';


exports.GET_OBJECT = 'object';
exports.GET_LIST = 'list';

exports.checkIsNumber = (value) => typeof value === 'number';
exports.checkIsString = (value) => typeof value === 'string';
exports.checkIsObject = (value) => typeof value === 'object';
exports.checkIsArray = (value) => Array.isArray(value);
exports.checkIsset = (value) => typeof value !== 'undefined';
exports.checkKeyExist = (object, key) => object.hasOwnProperty(key);
// exports.checkKeyInObject = (object, key) => (key in object);
exports.checkKeyInObject = (object, key) => object.hasOwnProperty(key);
exports.checkValueExistInArray = (array, value) => array.includes(value);

exports.REF_TYPE_MUTUAL_FUND = 'mutual_fund';
exports.REF_TYPE_INVESTMENT = 'investment';
exports.REF_TYPE_GENERAL = 'general';
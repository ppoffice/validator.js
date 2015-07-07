var Rules = {

  // The field under validation must be yes, on, 1, or true.
  // This is useful for validating "Terms of Service" acceptance.
  'accepted': /^(yes|on|1|true)$/,

  // after:date
  // The field under validation must be a value after a given date.
  'after': function (value, date) {
    var _date = Date.parse(date),
        _value = Date.parse(value);
    if(isNaN(_date) || isNaN(_value))
      return false
    else
      return _date < _value;
  },

  // The field under validation must be entirely alphabetic characters.
  'alpha': /^[A-Za-z]+$/,

  // The field under validation may have alpha-numeric characters, as well as dashes and underscores.
  'alpha_dash': /^[0-9A-Za-z_-]+$/,

  // The field under validation must be entirely alpha-numeric characters.
  'alpha_num': /^[0-9A-Za-z]+$/,

  // The field under validation must be of type array.
  'array': function (value) {
    return Object.prototype.toString.apply(value) === '[object Array]';
  },

  // before:date
  // The field under validation must be a value preceding the given date.
  'before': function (value, date) {
    var _date = Date.parse(date),
        _value = Date.parse(value);
    if(isNaN(_date) || isNaN(_value))
      return false
    else
      return _date > _value;
  },

  // between:min,max
  // The field under validation must have a size between the given min and max.
  // Strings and numerics are evaluated.
  'between': function (value, min, max) {
    var res = false;
    switch(typeof value) {
      case 'string':
        res = (value.localeCompare(min) >= 0) && (value.localeCompare(max) <= 0);
        break;
      case 'number':
        res = (value >= min) && (value <= max);
        break;
      default:
        break;
    }
    return res;
  },

  // The field under validation must be able to be cast as a boolean.
  // Accepted input are true, false, 1, 0, "1", "0", '1' and '-'.
  'boolean': /^(true|false|1|0|"1"|"0"|'1'|'0')$/,

  // The field under validation must be a valid date according to the Date.parse function.
  'date': function (value) {
    return !isNaN(Date.parse(value));
  },

  // date_format:format
  // The field under validation must match the format defined according to the Utils.dateFormat function.
  'date_format': function (value, format) {
    var _date = new Date(Date.parse(value)),
        _dateString = Utils.dateFormat(_date, format);
    return value === _dateString;
  },

};

var Utils = {
  // author: meizz
  // Stringify date to defined formats.
  dateFormat: function (date, fmt) {
    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  },
}

var Validator = function (obj, rules) {
  console.log(Rules);
};

var log = new Object();
Validator(log, {name:'required'});


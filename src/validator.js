/*!
 * Copyright 2015, PPOffice
 * Released under the MIT License
 * https://github.com/ppoffice/js-validator
 */

var _window,
    _define,
    _require,
    _exports,
    _module;
try { _window = window; } catch (e) { _window = null; }
try { _define = define; } catch (e) { _define = null; }
try { _require = require; } catch (e) { _require = null; }
try { _exports = exports; } catch (e) { _exports = null; }
try { _module = module; } catch (e) { _module = null; }

;(function(window, define, require, exports, module){
  'use strict';

  // Singleton
  var Validator = function () {
    if(!this.instance)
      this.instance = this;
    return this.instance;
  };

  Validator.prototype.requires = {

    // The field under validation must be present in the input data.
    'required': function (field) {
      return !!this.object[field];
    },

    // required_if:field,value,...
    // The field under validation must be present if the field is equal to any value.
    // The relationship between each field is AND.
    'required_if': function () {
      if(arguments.length < 3 || arguments.length % 2 != 1)
        return false;
      var field = arguments[0];
      for (var i = 1; i < arguments.length; i = i + 2) {
        var _field = arguments[i],
            _value = arguments[i + 1];
        if(!this.object[_field] || this.object[_field] != _value)
          return true;
      }
      return this.requires.required.call(this, field);
    },

    // required_with:foo,bar,...
    // The field under validation must be present only if any of the other specified fields are present.
    'required_with': function () {
      if(arguments.length < 2)
        return false;
      var field = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        if(arguments[i] in this.object)
          return this.requires.required.call(this, field);
      }
      return true;
    },

    // required_with_all:foo,bar,...
    // The field under validation must be present only if all of the other specified fields are present.
    'required_with_all': function () {
      if(arguments.length < 2)
        return false;
      var field = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        if(!(arguments[i] in this.object))
          return true;
      }
      return this.requires.required.call(this, field);
    },

    // required_without:foo,bar,...
    // The field under validation must be present only when any of the other specified fields are not present.
    'required_without': function () {
      if(arguments.length < 2)
        return false;
      var field = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        if(!(arguments[i] in this.object))
          return this.requires.required.call(this, field);
      }
      return true;
    },

    // required_without_all:foo,bar,...
    // The field under validation must be present only when all of the other specified fields are not present.
    'required_without_all': function () {
      if(arguments.length < 2)
        return false;
      var field = arguments[0];
      for (var i = 1; i < arguments.length; i++) {
        if(arguments[i] in this.object)
          return true;
      }
      return this.requires.required.call(this, field);
    },

  };

  Validator.prototype.validators = {

    // The field under validation must be yes, on, 1, or true.
    // This is useful for validating "Terms of Service" acceptance.
    'accepted': /^(yes|on|1|true)$/i,

    // after:date
    // The field under validation must be a value after a given date.
    'after': function (value, date) {
      var _date = Date.parse(date),
          _value = Date.parse(value);
      if(isNaN(_date) || isNaN(_value))
        return false;
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
        return false;
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
    // Accepted input are true, false, 1, 0, "1", "0", '1' and '0'.
    'boolean': /^(true|false|1|0|"1"|"0"|'1'|'0')$/i,

    // The field under validation must be a valid date according to the Date.parse function.
    'date': function (value) {
      return !isNaN(Date.parse(value));
    },

    // date_format:format
    // The field under validation must match the format defined according to the Validator.utils.dateFormat function.
    'date_format': function (value, format) {
      var date = new Date(Date.parse(value)),
          dateString = this.utils.dateFormat(date, format);
      return value === dateString;
    },

    // different:field
    // The given field must be different than the field under validation.
    'different': function (value, field) {
      return value != this.object[field];
    },

    // digits:value
    // The field under validation must be numeric and must have an exact length of value.
    'digits': function (value, digits) {
      var pattern = new RegExp('^[0-9]{' + digits + '}$');
      return pattern.test(value);
    },

    // digits_between:min,max
    // The field under validation must have a length between the given min and max.
    'digits_between': function (value, min, max) {
      var pattern = new RegExp('^[0-9]{' + min + ',' + max + '}$');
      return pattern.test(value);
    },

    // The field under validation must be formatted as an e-mail address.
    'email': /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,

    // in:foo,bar,...
    // The field under validation must be included in the given list of values.
    'in': function () {
      if(arguments.length <= 1)
        return false;
      return this.utils.inArray(Array.prototype.slice.call(arguments, 1), arguments[0]);
    },

    // The field under validation must have an integer value.
    'integer': function (value) {
      return (typeof value === 'number' && isFinite(value) && (value | 0) === value);
    },

    // The field under validation must be formatted as an IP address.
    'ip': function (value) {
      var ipv4 = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/,
          ipv6 = /^((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?$/;
      return ipv4.test(value) || ipv6.test(value);
    },

    // max:value
    // The field under validation must be less than or equal to a maximum value.
    // Strings and numerics are evaluated.
    'max': function (value, max) {
      var res = false;
      switch(typeof value) {
        case 'string':
          res = value.localeCompare(max) <= 0;
          break;
        case 'number':
          res = value <= max;
          break;
        default:
          break;
      }
      return res;
    },

    // mimes:foo,bar,...
    // The string under validation must have a MIME type corresponding to one of the listed extensions.
    'mimes': function () {
      if(arguments.length <= 1)
        return false;
      var ret,
          extension,
          value = arguments[0],
          pattern = /\.([^\.]*)?$/;
      if((ret = pattern.exec(value)) === null || ret.length < 2)
        return false;
      extension = ret[1];
      return this.validators.inArray(Array.prototype.slice.call(arguments, 1), extension);
    },

    // min:value
    // The field under validation must have a minimum value.
    // Strings and numerics are evaluated.
    'min': function (value, min) {
      var res = false;
      switch(typeof value) {
        case 'string':
          res = value.localeCompare(min) >= 0;
          break;
        case 'number':
          res = value >= min;
          break;
        default:
          break;
      }
      return res;
    },

    // not_in:foo,bar,...
    // The field under validation must not be included in the given list of values.
    'not_in': function () {
      if(arguments.length <= 1)
        return false;
      return !this.validators.inArray(Array.prototype.slice.call(arguments, 1), arguments[0]);
    },

    // The field under validation must have a numeric value.
    'numeric': function (value) {
      return typeof value === 'number' && isFinite(value);
    },

    // regex:pattern
    // The field under validation must match the given regular expression.
    'regex': function (value, pattern) {
      var _pattern = new RegExp(pattern);
      return _pattern.test(value);
    },

    // same:field
    // The given field must match the field under validation.
    'same': function (value, field) {
      return value === this.object[field];
    },

    // size:value
    // The field under validation must have a size matching the given value.
    // For string data, value corresponds to the number of characters.
    // For numeric data, value corresponds to a given integer value.
    'size': function (value, size) {
      var res = false;
      size = Number(size);
      switch(typeof value) {
        case 'string':
          res = size === value.length;
          break;
        case 'number':
          res = value === size;
          break;
        default:
          break;
      }
      return res;
    },

    // The field under validation must be a string type.
    'string': function (value) {
      return typeof value === 'string';
    },

    // The field under validation must be formatted as an URL.
    // It does not support non-English urls.
    'url': /^((https|http|ftp|rtsp|mms)?:\/\/)?(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*\'().;?:@&=+$,%#-]+)+\/?)$/,

  };

  Validator.prototype.utils = {

    // Trim string
    trim: function (str) {
      return str.replace(/(^\s*)|(\s*$)/g, '');
    },

    // Parse rule string to object.
    parser: function (value) {
      var fields = value.split('|'),
          res = [];
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i].split(':'),
            key = field[0],
            values = [];
        if(field.length === 2)
          values = field[1].split(',');

        key = this.trim(key);
        for (var j = 0; j < values.length; j++) {
          values[j] = this.trim(values[j]);
        }
        res.push({key: key, value: values});
      }
      return res;
    },

    inArray: function (array, value) {
      for (var i = 0; i < array.length; i++) {
        if(array[i] === value)
          return true;
      }
      return false;
    },

    // author: meizz
    // Stringify date to defined formats.
    dateFormat: function (date, fmt) {
      var o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds(),
        'q+': Math.floor((date.getMonth() + 3) / 3),
        'S': date.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      return fmt;
    },

  };

  // Validation failed at @field on @rule.
  Validator.prototype.fail = function (field, rule) {
    return {
      status: 'failed',
      field: field,
      rule: rule,
    };
  };

  // Add a validator.
  // @fn must be a Function or an RegExp object.
  // if @fn is a Function, it must receive value as its first argument, and return true if validation succeeds.
  Validator.prototype.add = function (name, fn) {
    this.validators[name] = fn;
  };

  Validator.prototype.validate = function(object, _rules) {
    this.object = object;
    for(var field in _rules) {
      var ruleString = _rules[field],
          rules = this.utils.parser(ruleString);
      for (var i = 0; i < rules.length; i++) {
        var key = rules[i].key,
            value = rules[i].value;
        // Match require rules.
        if(key in this.requires) {
          value.unshift(field);
          if(!this.requires[key].apply(this, value))
            return this.fail(field, key);
        } else if (field in this.object) {
          // Match other rules.
          if(key in this.validators) {
            // Validator is a Function.
            if(typeof this.validators[key] === 'function') {
              value.unshift(this.object[field]);
              if(!this.validators[key].apply(this, value))
                return this.fail(field, key);
            } else {
              // Validator is an RegExp.
              if(!this.validators[key].test(this.object[field]))
                return this.fail(field, key);
            }
          }
        }
      }
    }
    return true;
  };

  if (require && exports && module) {
    // Node.js
    module.exports = new Validator;
  } else if (define && require) {
    // RequireJS
    define(function () {
      return new Validator;
    });
  } else if(define) {
    // Sea.JS
    define(function (require, exports, module) {
      module.exports = new Validator;
    });
  } else if (window) {
    // naive JavaScript
    window['Validator'] = new Validator;
  }

})(_window, _define, _require, _exports, _module);



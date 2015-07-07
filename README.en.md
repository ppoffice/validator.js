# js-validator
A Laravel styled JavaScript Object validation library.
[Laravel Validation](http://laravel.com/docs/5.0/validation)

js-validator is easy to use in form or JSON validation, and it is extensible.

## Example
```javascript
var example = {
      text: 'Hello world!',
      date: '2015-07-07',
      comments: null,
    },
    rules = {
      text: 'required|string',
      date: 'date|date_format:yyyy-MM-dd',
      comments: 'integer',
    };

console.log(new Validator(example).validate(rules));
// => Object {status: "failed", field: "comments", rule: "integer"}
```

## Basic Usage

### Import js-validator library
```html
<script type="text/javascript" src="./validator.js"></script>
```

### Init with a new Validator object
```javascript
var object_to_be_tested = {
  text: 'Hello world!',
  date: '2015-07-07',
  comments: null,
};
var validator = new Validator(object_to_be_tested);
```

### Make rules
You can have different rules for a single field, using `|` as the separator.
```javascript
var rules = {
  text: 'required|string',
  date: 'date|date_format:yyyy-MM-dd',
  comments: 'integer',
};
```

### Validate the rules
```javascript
val.validate(rules);
```
If the validation succeeded, validate function will return 'true'. Otherwise it will return error message object containing validation status, the specified field and rule that made the validation failed.

## Available Validation Rules
|RULES       |DESCRIPTION                      |
|:-----------|:--------------------------------|
|accepted    |The field under validation must be yes, on, 1, or true. This is useful for validating "Terms of Service" acceptance.|
|after:date  |The field under validation must be a value after a given date.|
|alpha       |The field under validation must be entirely alphabetic characters.|
|alpha_dash  |The field under validation must be entirely alphabetic characters.|
|alpha_num   |The field under validation must be entirely alpha-numeric characters.|
|array       |The field under validation must be of type array.|
|before:date |The field under validation must be a value preceding the given date.|
|between:min,max|The field under validation must have a size between the given min and max.Strings and numerics are evaluated.|
|boolean     |The field under validation must be able to be cast as a boolean. Accepted input are true, false, 1, 0, "1", "0", '1' and '-'.|
|date        |The field under validation must be a valid date according to the Date.parse function.|
|date_format:format|The field under validation must match the format defined according to the !!*!*!* Validator.utils.dateFormat function.|
|different:field|The given field must be different than the field under validation.|
|digits:value|The field under validation must be numeric and must have an exact length of value.\
|digits_between:min,max|The field under validation must have a length between the given min and max.|
|email       |The field under validation must be formatted as an e-mail address.|
|in:foo,bar,...|The field under validation must be included in the given list of values.|
|integer     |The field under validation must have an integer value.|
|ip          |The field under validation must be formatted as an IP address.|
|max:value   |The field under validation must be less than or equal to a maximum value. Strings and numerics are evaluated.|
|mimes:foo,bar,...|The string under validation must have a MIME type corresponding to one of the listed extensions.|
|min:value   |The field under validation must have a minimum value. Strings and numerics are evaluated.|
|not_in:foo,bar,...|The field under validation must not be included in the given list of values.|
|numeric     |The field under validation must have a numeric value.|
|regex       |The field under validation must match the given regular expression.|
|required    |The field under validation must be present in the input data.|
|required_if:field,value,...|The field under validation must be present if the field is equal to any value. The relationship between each field is AND.|
|required_with:foo,bar,...|The field under validation must be present only if any of the other specified fields are present.|
|required_with_all:foo,bar,...|The field under validation must be present only if all of the other specified fields are present.|
|required_without:foo,bar,...|The field under validation must be present only when any of the other specified fields are not present.|
|required_without_all:foo,bar,...|The field under validation must be present only when all of the other specified fields are not present.|
|same        |The given field must match the field under validation.|
|size:value  |The field under validation must have a size matching the given value. For string data, value corresponds to the number of characters. For numeric data, value corresponds to a given integer value.|
|string      |The field under validation must be a string type.|
|url         |The field under validation must be formatted as an URL. It does not support non-English urls!!!**.|

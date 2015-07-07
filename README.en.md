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
If the validation succeeded, validate function will return 'true'. Otherwise it will return error message object containing validation status, the specific field and rule that made the validation failed.

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

define(function (require, exports, module) {
  var validator = require('validator'),
      person = {
        name: 'Peter',
        phone: '12345678900',
        email: 'peter@example.com',
        age: 24,
        gendar: 'male',
        hobbies: ['coding', 'singing', 'movies'],
        studentId: 'X2345678',
        contact: '',
        smilie: '{doge}',
      },
      rules = {
        name:'required|string',
        phone: 'string|size:11',
        email: 'required_without:phone|email',
        gendar: 'in:male,female',
        age: 'integer|between:0,120|older_than:17',
        hobbies: 'array',
        studentId: 'alpha_num|size:8',
        contact: 'required_without:phone,email',
        smilie: 'regex:^{([a-z]*)}$',
      };

  validator.add('older_than', function (object, value, age) {
    return value > age;
  });

  document.write('Object to be tested:<br>');
  document.write(JSON.stringify(person) + '<br>');
  document.write('Validation rules:<br>');
  document.write(JSON.stringify(rules) + '<br>');
  document.write('Result:<br>');
  document.write(JSON.stringify(validator.validate(person, rules)));
});
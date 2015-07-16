var validator = require('../src/validator');

var person = {
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

console.log('Object to be tested:');
console.log(JSON.stringify(person) + '');
console.log('Validation rules:');
console.log(JSON.stringify(rules) + '');
console.log('Result:');
console.log(JSON.stringify(validator.validate(person, rules)));
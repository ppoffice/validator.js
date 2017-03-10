# validator.js
### 非常抱歉，此库已停止维护，请参考[其他类似项目](https://www.npmjs.com/search?q=laravel%20validation&page=1&ranking=popularity)

[![npm version](https://badge.fury.io/js/js-validator.svg)](http://badge.fury.io/js/js-validator)
[![GitHub version](https://badge.fury.io/gh/ppoffice%2Fvalidator.js.svg)](http://badge.fury.io/gh/ppoffice%2Fvalidator.js)

Laravel风格的**JavaScript对象/表单/JSON**验证库。| [English Version](README.en.md) | [Laravel Validation](http://laravel.com/docs/5.0/validation)
* 支持不同验证规则组合
* 支持复杂对象的递归验证
* 支持添加自定义验证器

## 举个例子
```javascript
var example = {
      text: 'Hello world!',
      date: '2015-07-07',
      attachment: {
        name: 'note1',
        count: 1,
      },
      comments: null,
    },
    rules = {
      text: 'required|string',
      date: 'date|date_format:yyyy-MM-dd',
      attachment: {
        name: 'required|string',
        content: 'integer',
      },
      comments: 'array',
    };

console.log(Validator.validate(example, rules));
// => {status: 'failed', [{object: [Object], field: "comments", rule: "array"}]}
```

## 基本用法

### 引入validator.js（原生JavaScript）
```html
<script type="text/javascript" src="./src/validator.js"></script>
```
或
```html
<script type="text/javascript" src="./dist/validator.min.js"></script>
```

### 初始化（非原生JavaScript）

#### Node.js
```bash
npm install js-validator --save
```
```javascript
var validator = require('js-validator');
```

#### RequireJS
```javascript
requirejs(["../src/validator"], function(validator) {
  ...
});
```

#### Sea.js
```javascript
define(function (require, exports, module) {
  var validator = require('./validator');
  ...
});
```

### 制定验证规则
对于同一个对象属性，你可以并列制定几个不同的规则进行限定，使用`|`作为不同规则间的分割符。
```javascript
var rules = {
  text: 'required|string',
  date: 'date|date_format:yyyy-MM-dd',
  comments: 'integer',
};
```
**关于转义**

当验证规则中必须出现'|', ':' 或者 ','时，请对在它们之前添加'\\\\'，如：
```javascript
var person = {
      nickname: 'Harry|Poter'
    },
    rules = {
      nickname: 'in:Harry\\|Potter,Hermione\\:Granger,Ron\\,Weasley'
    }
```

### 验证
```javascript
// Validator.validate if you are using native JavaScript code
validator.validate(object_to_be_tested, rules);
```
**验证结果**

返回一个包含status和rejects属性的对象。

如果所有验证规则都满足，则status为'success'，rejects为空数组；否则status为'failed'，rejects为验证失败规则的详细信息。

### 添加验证器
使用add方法为Validator添加验证器，第一个参数为验证器名称，第二个参数为验证方法，可以为正则表达式对象或者函数。当验证方法为函数时，其第一个参数为待验证的对象，第二个参数为当前验证域的值，后面的参数根据需求而定，验证成功时结果返回true。
```javascript
// Validator.add if you are using native JavaScript code
validator.add('older_than', function (object, value, age) {
  return value > age;
});

var rules = {
  age: 'integer|older_than:17',
};
```

### 配置
```javascript
// Validator.setConfig if you are using native JavaScript code
validator.setConfig({...});
```
### 可用配置

#### resumeOnFailed
**默认值** false

当某条验证失败时是否继续其他规则的验证。为true时继续验证。

## 可用的验证规则

#### accepted
验证域必须为yes、on、1、或者true。 这个规则常用语验证“同意使用条款”表单。


#### after:date
验证的日期域的日期必须在指定日期之后。


#### alpha
验证域必须由纯英文字符组成。


#### alpha_dash
验证域必须由英文字符、数字、中划线或者下划线组成。


#### alpha_num
验证域必须由英文字符或者数字组成。


#### array
验证域必须为数组对象。


#### before:date
验证的日期域的日期必须在给定日期之前。


#### between:min,max
验证域的值必须在min和max之间，验证域可以是字符串、数字或者文件对象(FileList/File)。文件大小单位为KB。


#### boolean
验证域的值可以看作是布尔值，可以是true，false，1，0，"1"，"0"，'1' and '0'。


#### date
验证域必须为日期字符串形式，可以被Date.parse方法解析。


#### date_format:format
验证域必须符合制定的日期格式，允许的日期格式参照源代码中的dateFormat方法。


#### different:field
验证域的值必须域指定域的值不同。


#### digits:value
验证域必须为数字，且其位数为给定的位数。


#### digits_between:min,max
验证域必须为数字，且其位数在min和max之间。


#### email
验证域必须为电子邮件地址格式。


#### in:foo,bar,...
验证域的值必须在给定的允许值列表中。


#### integer
验证值必须为整数。


#### ip
验证值必须为IP地址形式（支持IPv4与IPv6）。


#### max:value
验证域的值必须小于等于max，验证域可以是字符串、数字或者文件对象(FileList/File)。文件大小单位为KB。


#### mimes:foo,bar,...
验证值的扩展名必须在给定的扩展名列表中。


#### min:value
验证域的值必须大于等于min，验证域可以是字符串、数字或者文件对象(FileList/File)。文件大小单位为KB。


#### not_in:foo,bar,...
验证域的值必须不在给定的值列表中。


#### numeric
验证域必须为数字。


#### regex
验证域必须符合指定的正则表达式（JavaScript风格）。


#### required
验证域必须存在。


#### required_if:field,value,...
如果给定的域的值等于给定的值，验证域必须存在。这里的条件可以是多个域和值，它们之间的关系为“与”。


#### required_with:foo,bar,...
如果给定的域之中任何一个存在的话，验证域必须存在。


#### required_with_all:foo,bar,...
仅当所有给定的域存在时，验证域必须存在。


#### required_without:foo,bar,...
如果给定的域之中任何一个不存在的话，验证域必须存在。


#### required_without_all:foo,bar,...
仅当所有给定的所有域都不存在时，验证域必须存在。


#### same
验证域的值必须域指定域的值相同。


#### size:value
验证域的大小必须等于指定大小。对于字符串来说，验证域的字符串长度必须等于给定长度。对于数字来说，验证域的值必须等于给定值。对于文件(FileList/File)来说，文件的大小必须等于给定值（单位为KB）。


#### string
验证域必须为字符串。


#### url
验证域必须为URL地址。当前不支持含有非英文（中文等）字符的地址。


## 测试文件入口
`./test/index.html`     原生JavaScript支持测试

`./test/node.js`        Node.js支持测试

`./test/requirejs.html` RequireJS支持测试

`./test/seajs.html` Sea.js支持测试


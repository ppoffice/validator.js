# js-validator
Laravel风格的JavaScript对象验证库。
[Laravel Validation](http://laravel.com/docs/5.0/validation)

使用js-validator来验证对象或者JSON是否符合规则非常方便，而且具有很好的可扩展性。

## 举个例子
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

## 基本用法

### 引入validator.js
```html
<script type="text/javascript" src="./validator.js"></script>
```

### 初始化一个Validator对象
```javascript
var object_to_be_tested = {
  text: 'Hello world!',
  date: '2015-07-07',
  comments: null,
};
var validator = new Validator(object_to_be_tested);
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

### 验证
```javascript
val.validate(rules);
```
如果待验证对象符合规则，validate函数返回true；否则返回带有验证状态、失败的属性和对应失败的规则信息的对象。

## 可用的验证规则
|验证规则     |规则含义                          |
|:-----------|:--------------------------------|
|accepted    |验证域必须为yes、on、1、或者true。 这个规则常用语验证“同意使用条款”表单。|
|after:date  |验证的日期域的日期必须在指定日期之后。|
|alpha       |验证域必须由纯英文字符组成。|
|alpha_dash  |验证域必须由英文字符、数字、中划线或者下划线组成。|
|alpha_num   |验证域必须由英文字符或者数字组成。|
|array       |验证域必须为数组对象。|
|before:date |验证的日期域的日期必须在给定日期之前。|
|between:min,max|验证域的值必须在min和max之间，验证域可以是数字或者字符串。|
|boolean     |验证域的值可以看作是布尔值，可以是true，false，1，0，"1"，"0"，'1' and '0'。|
|date        |验证域必须为日期字符串形式，可以被Date.parse方法解析。|
|date_format:format|验证域必须符合制定的日期格式，允许的日期格式参照源代码中的Validator.utils.dateFormat方法。|
|different:field|验证域的值必须域指定域的值不同。|
|digits:value|验证域必须为数字，且其位数为给定的位数。|
|digits_between:min,max|验证域必须为数字，且其位数在min和max之间。|
|email       |验证域必须为电子邮件地址格式。|
|in:foo,bar,...|验证域的值必须在给定的允许值列表中。|
|integer     |验证值必须为整数。|
|ip          |验证值必须为IP地址形式（支持IPv4与IPv6）。|
|max:value   |验证域的值必须小于等于max，验证域可以是数字或者字符串。|
|mimes:foo,bar,...|验证值的扩展名必须在给定的扩展名列表中。|
|min:value   |验证域的值必须大于等于min，验证域可以是数字或者字符串。|
|not_in:foo,bar,...|验证域的值必须不在给定的值列表中。|
|numeric     |验证域必须为数字。|
|regex       |验证域必须符合指定的正则表达式（JavaScript风格）。|
|required    |验证域必须存在。|
|required_if:field,value,...|如果给定的域的值等于给定的值，验证域必须存在。这里的条件可以是多个域和值，它们之间的关系为“与”。|
|required_with:foo,bar,...|如果给定的域之中任何一个存在的话，验证域必须存在。|
|required_with_all:foo,bar,...|仅当所有给定的域存在时，验证域必须存在。|
|required_without:foo,bar,...|如果给定的域之中任何一个不存在的话，验证域必须存在。|
|required_without_all:foo,bar,...|仅当所有给定的所有域都不存在时，验证域必须存在。|
|same        |验证域的值必须域指定域的值相同。|
|size:value  |验证域的大小必须等于指定大小。对于字符串来说，验证域的字符串长度必须等于给定长度。对于数字来说，验证域的值必须等于给定值。|
|string      |验证域必须为字符串。|
|url         |验证域必须为URL地址。当前不支持含有非英文（中文等）字符的地址。|

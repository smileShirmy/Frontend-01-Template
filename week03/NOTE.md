# Week 03

## 作业部分

Function Object

[[call]] 视为函数 Function

[[Construct]] 可以被 new 操作符调用，根据 new 的规则返回对象

Array Object

Property == length 设置对象的 length 属性，根据 length 的变化对对象进行操作
newLength > length 用空扩充数组

ewLength < length 截取数组

String Object

string 的 length 是不可写不可配的。

Arguments Object
[[callee]] 视为函数参数对对象，伪数组 caller

Object
[[Get]] property 被访问时调用 get

[[Set]] property 被赋值时调用 set

[[GetPrototypeOf]] 对应 getPrototypeOf 方法 获取对象原型

[[SetPrototypeOf]] 对应 setPrototypeOf 方法 设置对象原型

[[GetOwnProperty]] getOwnPropertyDescriptor 获取对象私有属性的描述列表

[[HasProperty]] hasOwnProperty 私有属性判断

[[IsExtensible]] isExtensible 对象是否可扩展

[[PreventExtensions]] preventExtension 控制对象是否可以添加属性

[[DefineOwnProperty]] defineProperty 定义对象属性

[[Delete]] delete 操作符

[[OwnPropertyKeys]] Object.keys() Object.entries() Object.values()

[[Call]] 能够调用 call

Module Namespace

[[Module]] 视为一个引入的模块 [[Exports]] 视为一个导出的模块

## 重学 JavaScript | 表达式，类型转换

### Expressions

- Member
  - a.b
  - a[b]
  - foo`string`
  - super.b 调父类的方法或属性
  - super['b']
  - new.target
  - new Foo()
- New
  - new Foo

```javascript
function foo() {
  console.log(arguments)
}

foo`Hello World`
```

### Reference

- Object
- Key
- delete
- assign

### Expressions

- Call
  - foo()
  - super()
  - foo()['b']
  - foo().b
  - foo()`abc`

left-hand side & right-hand side

表示等号左边和等号右边

- Update
  - a ++
  - a --
  - -- a
  - ++ a

- Unary
  - delete a.b
  - void foo()
  - typeof a
  - `+ a`
  - `- a`
  - ~ a
  - ! a
  - await a

```javascript
// 直接使用 void 0 表示 undefined 是更好的方式
void 0
// 替代
undefined
```

IIFE

```javascript
void function(i) {

}(i)
// 比直接使用括号好，避免忘记写分号的情况
```

- Exponetal
  - **


- Multiplicative
  - `* / %`
- Additive
  - `+ -`
- Shift
  - << >> >>>
- Relationship
  - < > <= >= instanceof in


- Logical
  - &&
  - ||
- Conditional
  - ? :


- Equality
  - ==
  - !=
  - ===
  - !==
- Bitwise
  - & ^ |


```javascript
1 + {
  [Symbol.toPrimitive]() {
    return 6
  },
  valueOf() {
    return 1
  },
  toString() {
    return "2"
  }
}
```

## 重学 JavaScript | 语句，对象

### Atom

- Grammar
  - 简单语句
  - 组合语句
  - 声明
- Runtime
  - Completion Record
  - Lexical Environment

#### Completion Record

- `[[type]]`: normal, break, continue, return, or throw
- `[[value]]`: Types
- `[[target]]`: label

#### 简单语句

- ExpressionStatement `a = 1 + 2;`
- EmptyStatement  `;`
- DebuggerStatement `debugger;`
- ThrowStatement  `throw a;`
- ContinueStatement `continue label1;`
- BreakStatement  `break label2;`
- ReturnStatement `return 1 + 2;`

#### 复合语句

- BlockStatement
- IfStatement
- SwitchStatement
- IterationStatement
- WithStatement
- LabelledStatement
- TryStatement

##### block

```javascript
{
  // ...
  a: 1
}
```

```javascript
function *g() {
  yield 0;
  yield 1;
  yield 4;
}

for (let p of g()) {
  console.log(p)
}

// for of => Iterator => Generator/Array
```

```javascript
```

- 作用域指的是源代码的范围
- 上下文指的是内存里存变量的地方

#### 声明

- FunctionDeclaration
- GeneratorDeclaration
- AsyncFunctionDeclaration
- AsyncGeneratorDeclaration
- VariableStatement
- ClassDeclaration
- LexicalDeclaration

```javascript
function foo() {
  yield 1;
  yield 2;

  var i = 3;
  while (true)
    yield i++;
}
```

```javascript
function sleep(d) {
  return new Promise(resolve => setTimeout(resolve, d));
}

async function* foo() {
  var i = 0;
  while (true) {
    yield i++;
    await sleep(1000);
  }
}

void async function() {
  var g = foo();
  for await (let e of g) {
    console.log(e);
  }
}();
```

```javascript
var x = 0;
function g() {
  var o = {x: 1};
  x = 2;
  with(o) {
    var x = 3;
  }
  console.log(x);
}

foo()
console.log(x);
```

```javascript
var x = 0;
function g() {
  var o = {x: 1};
  x = 2;
  with(o) {
    // 作用域设计错误
    x = 3;
  }
  console.log(x);
}

foo()
console.log(x);
```

1. 有 `var` 不应该写在任何子结构里面，应该只写在函数最前面
2. 不应该在任何 block 里面写 var

#### Object

任何一个对象都是唯一的，这与它本身的状态无关。

所以，即使状态完全一致的两个对象，也并不相等。

我们用状态来描述对象。

我们状态的改变即是行为。

对象的三要素：唯一性、状态、行为。

#### Object-Class

类是一种常见的描述对象的方式。

而“归类”和“分类”则是两个主要的流派。

对于“归类”方法而言，多继承是非常自然的事情，如 C++。

而采用分类思想的计算机语言，则是单继承结构。并且会有一个基类 Object。

#### Object-Prototype

原型是一种更接近人类原始认知的描述对象的方法。

我们并不试图做严谨的分类，而是采用“相似”这样的方式去描述对象。

任何对象仅仅需要描述它自己与原型的区别即可。

#### Object Exercise

我们不应该受语言描述的干扰。

在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则。

面向对象里的方法应该是改变自身的状态，行为改变对象。

#### Object in JavaScript

在 JavaScript 运行时，原生对象的描述非常简单，我们只需要关心原型和属性两个部分。

JavaScript 用属性来统一抽象对象状态和行为。

一般来说，数据属性用于描述状态，访问器属性则用于描述行为。

数据属性中如果存储函数，也可以用于描述行为。

当我们访问属性时，如果当前对象没有，则会沿着原型找原型对象是否有此名称的属性，而原型对象还可能有原型，因此，会有“原型链”这一说法。

这以算法保证了，每个对象只需要描述自己和原型的区别即可。

#### Object API/Grammar

四组：

- {} . [] Object.defineProperty
- Object.create / Object.setPrototypeOf / Object.getPrototypeOof
- new / class / extends
- new / function / prototype

前三套是比较好的模式，第四套没有任何可取之处

#### Function Object

前面讲述了 JavaScript 中的一般对象。

但 JavaScript 中还有一些特殊的对象，比如函数对象。

除了一般对象的属性和原型，函数对象还有一个行为`[[call]]`。

我们用 JavaScript 中的 function 关键字、箭头运算符或者 Function 构造器创建对象，会有 `[[call]]` 这个行为

我们用类似 `f()` 这样的语法把对象当作函数调用时，会访问到 `[[call]]`这个行为。

如果对应的对象没有 `[[call]]` 行为，则会报错。

#### Special Object

- `Array [[length]]`
- `Object.prototype [[setPrototypeOf]]`

```javascript
// 作业
'美'.codePointAt(0).toString(2)

[0b1110111, 0b10111110, 0b10001110].map(e => e.toString(16))
```


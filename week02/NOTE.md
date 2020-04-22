# 每周总结可以写在这里

这是第二周的内容

## 编程语言通识与 JavaScript 语言设计

### 语言按语法分类

- 非形式语言
  - 中文，英文
- 形式语言（乔姆斯基谱系）
  - 0 型 无限制文法
  - 1 型 上下文相关文法
  - 2 型 上下文无关文法
  - 3 型 正则文法

### 产生式（BNF）

- 用尖括号括起来的名称来表示语法结构名
  - 语法结构分成基础结构和需要用其他语法结构定义的符合结构
    - 基础结构称终结符
    - 复合结构称非终结符
  - 引号和中间的字符表示终结符
  - 可以有括号
  - `*` 表示重复多次
  - `|` 表示或
  - `+` 表示至少一次

```bash
# BNF 定义
# 一门语言只能由 "a" 和 "b" 组成
<Program>::= <Program> "a"+ | <Program> "b"+

# 定义 0 到 9
<Number> ::= "0" | "1" | "2" | ... | "9"

# 01 不是合法的十进制谢飞
<DecimalNumber> "0" | (("1" | "2" | ... | "9")+ <Number>* )

# 括号优先级最高
<PrimaryExpression> ::= <DecimalNUmber> | "(" <LogicalExpression> ")"

# 定义加法
<Expression> ::= <DecimalNumber> "+" <DecimalNumber>

# 支持连加，做个递归
<Expression> ::= <Expression> "+" <DecimalNumber>

# 乘法/除法表达式
<MultiplicativeExpression> ::= <DecimalNumber> |      
  <MultiplicationExpression> "*" <DecimalNumber> |
  <MultiplicationExpression> "/" <DecimalNumber>

<AdditiveExpression> ::= <MultiplicationExpression> | 
  <AdditiveExpression> "+" <MultiplicationExpression>
  <AdditiveExpression> "-" <MultiplicationExpression>

# 逻辑表达式
<LogicalExpression> ::= <AdditiveExpression> |
  <LogicalExpression> "||" <AdditiveExpression> |
  <LogicalExpression> "&&" <AdditiveExpression>
```

学会 BNF 后面无论看什么语言都很明白

```bash
四则运算：1 + 2 * 3
终结符：Number；+ - * /
非终结符：MultiplicationExpression；AdditiveExpression

<MultiplicativeExpression> ::= <Number> |
  <MultiplicativeExpression> * <Number> |
  <MultiplicativeExpression> / <Number> |
<AdditiveExpression> ::= <MultiplicativeExpression> |
  <AdditiveExpression> "+" <MultiplicativeExpression>
  <AdditiveExpression> "-" <MultiplicativeExpression>
```

### 通弄过产生式理解乔姆斯基谱系

- 0 型 无限制文法
  - `? ::= ?`
- 1 型 上下文相关文法
  - `?<A>?::=?<B>?`，`"a" <b> "c" ::= "a" "x" "c"`，`b` 被解释为 `x`
- 2 型 上下文无关文法
  - `<A>::=?`，无论如何最终都产生一个 `A`
- 3 型 正则文法
  - `<A>::<A>?`：`<DecimalNumber> = /0|[1-9][0-9]*/`

```javascript
// 下面是 1 型 上下文相关文法
// get 可以是关键字，也可以是属性
{
  get a { return 1},
  get: 1
}

// JavaScript 大部分都是符合 2 型
2 ** 1 ** 2
```

### 现代语言的特例

- C++ 中，* 可能表示乘号或者和指针，具体时间哪个，取决于星号前面的标识符是否被声明为类型
- VB 中，< 可能是小于号，也可能是 XML 直接量的开始，取决于当前位置是否可以接受 XML 直接量
- Python 中，行首的 tab 符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符 indent 或者 dedent
- JavaScript 中，/ 可能是除号，也可能是正则表达式开头，处理方式类似于 VB，字符串模板中也需要特殊处理 }，还有自动插入分号规则

### 图灵完备性

- 图灵完备性
  - 命令式 —— 图灵机
    - goto
    - if 和 while
  - 声明式 —— lambda
    - 递归

### 动态与静态

- 动态：
  - 在用户的设备/在线服务器上
  - 产品实际运行时
  - Runtime
- 静态：
  - 在程序员的设备上
  - 产品开发时
  - Compiletime

### 类型系统

- 动态类型系统与静态类型系统
- 强类型与弱类型
  - String + Number
  - String == Boolean
- 复合类型
  - 结构体
  - 函数签名
- 子类型
  - 逆变/协变

有**隐式转换**的类型系统是弱类型

### 一般命令式编程语言

由五层组成

- Atom
  - Identifer
  - Literal
- Expression
  - Atom
  - Operator
  - Punctuator
- Statement
  - Expression
  - Keyword
  - Punctuator
- Structure
  - Function
  - Class
  - Process
  - Namespace
  - ...
- Program
  - Program
  - Module
  - Package
  - Library

## 词法、类型

- [Unicode](https://www.fileformat.info/info/unicode/)
- [中文字符](https://www.fileformat.info/info/unicode/block/cjk_unified_ideographs/index.htm)

```javascript
for (let i = 0; i < 128; i++) {
  document.write(i + " <span style='background-color: red'>" + String.fromCharCode(i) + "</span></br>")
}

var \u5389\u5bb3 = 1;

console.log(厉害) // 1
```

- InputElement
  - WhiteSpace
    - [space 列表](https://www.fileformat.info/info/unicode/category/Zs/list.htm)
      - Tab：制表符（打字机时代：制表时隔开数字很方便）
    - VT：纵向制表符
    - FF: FormFeed
    - SP: Space
    - NBSP: NO-BREAK SPACE（和 SP 的区别在于不会断开、不会合并）
    - ...
  - LineTerminator
    - LF: Line Feed `\n`
    - CR: Carriage Return `\r`
    - ...
  - Comment 注释
  - Token 记号：一切有效的东西
    - Punctuator：符号 比如 `> = < }`
    - IdentifierName: 标识符，可以以字母、_ 或者 $ 开头，代码中用来标识**[变量](https://developer.mozilla.org/en-US/docs/Glossary/variable)、[函数](https://developer.mozilla.org/en-US/docs/Glossary/function)、或[属性](https://developer.mozilla.org/en-US/docs/Glossary/property)**的字符序列
      - Keywords: 比如 `await`、`break`... 不能用作变量名，但像 getter 里的 `get`就是个例外
        - 变量名：不能用 Keywords
        - 属性：可以用 Keywords
      - Identifier
      - Future reversed KeyWords: enum
    - Literal：直接量
      - Number
      - 存储 Unit8Array、Float64Array
      - 进制
        - 二进制 0b
        - 八进制 0o
        - 十进制 0x
      - 实践
        - 比较浮点是否相等：Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
        - 如何快捷查看一个数字的二进制：(97).toString(2)
      - String
        - Character
        - Code Point
        - Encoding
          - unicode编码 - utf
            - utf-8 可变长度 （控制位的用处）
        - Grammar
          - `''`、`""`、``` `
      - Boolean
      - Null
      - Undefined

### WhiteSpace

```html
<!-- Java Script 会断开 -->
I learned Java Script today.
<!-- Java Script 不会断开  no break space -->
I learned Java&nbsp;Script today.
```

### LineTerminator

正常的情况下使用 LF U+000A LINE FEED(LF) `<LF>`

### Number

- DecimalLiteral
  - 0
  - 0.
  - .2
  - 1e3
- BinaryIntegerLiteral
  - 0b111
- OctalIntegerLiteral
    - 0o10
  - HexIntegerLiteral
    - 0xFF

```javascript
Number.MAX_SAFE_INTEGER.toString(16)

// 用下面这种方式替代 0.1 + 0.2 - 0.3 === 0
Math.abs(0.1 + 0.2 - 0.3) <=  Number.EPSILON
```

### String

- ASCII
- Unicode
- UCS U+0000 - U+FFFF
- GB
  - GB2312
  - GBK(GB13000)
  - GB18030
- ISO-8859
- BIG5

### 答疑

- 比较有价值的三门课：操作系统、计算机网络、数据结构
- 如果不是写编译器，编译原理价值已经不高了

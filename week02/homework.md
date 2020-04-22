# 写一个正则表达式 匹配所有 Number 直接量

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
/^(.\d+|(0|[1-9]\d*).?\d*?)([eE][-+]?\d+)?$|^0[bB][01]+$|^0[oO][0-7]+$|^0[xX][0-9a-fA-F]+$/
```

# 写一个 UTF-8 Encoding 的函数

实属不会，网上找了下面的参考答案

```javascript
function encode(string) {
  string = string.replace(/\r\n/g, '\n');
  let text = '';
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n);
    if (c < 128) {
      text += String.fromCharCode(c);
    } else if ((c > 127) && (c < 2048)) {
      text += String.fromCharCode((c >> 6) | 192);
      text += String.fromCharCode((c & 63) | 128);
    } else {
      text += String.fromCharCode((c >> 12) | 224);
      text += String.fromCharCode(((c >> 6) & 63) | 128);
      text += String.fromCharCode((c & 63) | 128);
    }
  }
  return text;
},
```

# 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号

```javascript
/^['"\\bfnrtv/dxu]$|^u[0-9a-fA-F]{4}$|^u(10|0?[0-9a-fA-F])[0-9a-fA-F]{0,4}$/
```

# 总结

看 NOTE.md
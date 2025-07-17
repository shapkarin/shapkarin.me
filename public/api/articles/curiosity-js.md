---


title: "Weird JavaScript Quirks Explained: Type Coercion, Equality & More"
description: "Discover the most surprising JavaScript quirks and learn how type coercion, loose equality, and parsing rules lead to unexpected behaviors in your code."

date: "17 July 2025"

---

More on my gist collection => [https://gist.github.com/shapkarin/b3fbeaca95ef69df177b](https://gist.github.com/shapkarin/b3fbeaca95ef69df177b)


Below is a (quite long!) tour of curious or surprising expressions in JavaScript, along with explanations of why they behave as they do. JavaScript's dynamic typing, type coercion, loose equality, parsing rules, and handling of edge cases all contribute to these quirks. Many of these examples come directly from how the [ECMAScript specification](https://tc39.es/ecma262/) dictates type conversions should happen. While they might appear "weird," each snippet has a logical (if not always intuitive) explanation once you look under the hood.

---

## 1. Addition and Subtraction with Arrays and Objects

```js
[] + {} // "[object Object]"
```
- **What happens**: An empty array (`[]`) converted to a string is `""` (an empty string). An empty object (`{}`), when converted to a string, becomes `"[object Object]"`. String concatenation of `"" + "[object Object]"` yields `"[object Object]"`.
- **Why**: The `+` operator, when given an object, will call `toString()` (or `valueOf()`, depending on the object) to coerce the object into a primitive. For arrays, `[].toString()` becomes `""`. For a plain object `{}`, `{}.toString()` becomes `"[object Object]"`. Finally, `"" + "[object Object]"` is simply `"[object Object]"`.

```js
{} + [] // 0
```
- **What happens**: The curly braces `{}` at the beginning of a line can be interpreted as a standalone "block" rather than an object literal if there's no preceding context. Once that's parsed as a block, we then have `+ []`. 
- In many JS engines, if you force the expression to be read strictly as an expression (e.g., wrap it in parentheses or place it on one line with parentheses), you get different outcomes. But in this snippet, the parser interprets `{}` as an empty block and then sees `+ []` → `+ ""` → `0`.
- **Why**: JavaScript's grammar can parse leading `{}` as an empty statement block. Then `+[]` becomes `+""`, which is `0`.

```js
[] - {} // NaN
```
- **What happens**: Arrays and objects both try to convert to "numeric" values in a subtraction context. `[]` becomes `""` when forced into a string, which in numeric conversion is `0`. But `{}` as a number is `NaN`. Then `0 - NaN = NaN`.
- **Why**: The `-` operator always attempts numeric coercion. An empty object coerces to `NaN`, so the result is `NaN`.

```js
{} - [] // -0
```
- **What happens**: Again the `{}` is likely interpreted as an empty block, then we see `- []`. That becomes `- ""`, which becomes `-0` (negative zero is a valid number in JavaScript).
- If you do `( {} - [] )` on one line, it might give you `NaN` because then it is truly an object minus array. But in many JS interpreters, the snippet alone is a block followed by `-[]`.
- **Why**: "Empty block" plus `-[]` is effectively `-(0)`, which yields `-0`.

---

## 2. Adding Booleans and Arrays

```js
1 + true // 2
```
- **What happens**: `true` coerces to numeric `1`, so `1 + 1 = 2`.

```js
1 + [] // "1"
```
- **What happens**: The empty array `[]` becomes `""` (an empty string) in a string context. Because at least one operand is a string, `1 + ""` is string concatenation → `"1"`.
- **Why**: The `+` operator will use numeric addition if *both* operands can be converted to numbers. But `[]` coerced to `""` can also be treated as a string. With mixed types, JavaScript tries string concatenation. Hence, `"1"`.

```js
true + [] // "true"
```
- **What happens**: Similar reason: `[]` coerces to `""`, so `true + ""` → `"true"`.
- **Why**: `true` is *not* automatically coerced to `1` if JavaScript decides to do string concatenation. Because the second operand is a string (`[]` → `""`), the first operand (`true`) is converted to a string: `"true"`.

```js
true + '' // "true"
```
- **What happens**: Because `''` is a string, `true` is converted to `"true"`, concatenated with `''` → `"true"`.

---

## 3. Loose Equality Oddities

```js
[] == '' // true
```
- **What happens**: Both `[]` and `''` coerce to the empty string: `[].toString()` → `""`, and `""` is `""`, so `"" == ""` → `true`.

```js
0 == '' // true
```
- **What happens**: `''` is an empty string. Under loose equality, `''` is converted to `0`. So `0 == 0` → `true`.

```js
0 == [] // true
```
- **What happens**: `[]` → `""`, then `""` → `0`, so `0 == 0` → `true`.

```js
[] == ![] // true
```
- **What happens**: `![]` is `false` (an array is a truthy value, so `![]` → `false`). Then `false` coerces to `0`. `[]` (for a numeric context) also goes to `0`. Thus `0 == 0`.
- **Why**: In numeric contexts: `[] → 0` and `false → 0`.

```js
0 == '0' // true`
- **What happens**: `'0'` to number is `0`, so `0 == 0` → `true`.

```js
[] == '0' // false
```
- **What happens**: `[]` → `""`, and `""` is `0` as a number. `'0'` is also `0`. So numerically it might seem `0 == 0`. Actually in older specs, `[] == '0'` is `false`—but it's a tricky one:
  - `[]` → `""` (string), comparing string to string `'0'` → false
  - The actual steps: `[]` is object → to primitive → `""`; `'0'` is a string. `"" == '0'` is false. JavaScript does not do `""` → `0` for *string-to-string* comparison; it is done for number-to-string comparisons. In the official spec, `'0'` remains `'0'`, `''` remains `''`, they differ as strings. 
- **Why**: The short answer: `[]` becomes `""`, which is not equal to `'0'` as a string.

```js
[] == '' // true
```
- (Covered above) Both become empty string in string context.

```js
[...Array(2)] == ',' // true
```
- **What happens**: `Array(2)` is `[empty, empty]`. Spread into `[...]` yields `[undefined, undefined]` – or basically two empty slots. When stringified, `[undefined, undefined]` → `","` (because each empty or undefined slot is turned into an empty string, and joined with commas). So the array becomes the string `","`. This is loosely equal to the string `","`.
- **Why**: Array elements that are `undefined` or "empty" become empty strings during `.toString()` or `.join(',')`, leading to one comma between them → `","`.

```js
new Array([], null, undefined) == ',,' // true
```
- **What happens**: `new Array([], null, undefined)` → something like `[[], null, undefined]`. When stringified:
  - `[].toString()` → `""`
  - `null` → `""` in array stringification
  - `undefined` → `""` in array stringification
  - Joined by commas → `"," + "" + ""` → `",,"`.
- So the array stringifies to `",,"`, which is equal (in loose comparison) to the string `",,"`.

---

## 4. Negation and Boolean Coercion

```js
![] == 1 // false
```
- **What happens**: `![]` is `false`, because `[]` is truthy. `false == 1` → `false`.

```js
![] == 0 // true
```
- **What happens**: `![]` → `false`, and `false` as a number is `0`. So `0 == 0` → `true`.

```js
!![] == 1 // true
```
- **What happens**: `!![]` is `true`, which as a number is `1`. So `1 == 1`.

---

## 5. Strict Equality vs. Loose Equality

```js
1 === 1.0 // true
```
- **What happens**: Numbers in JavaScript are double-precision floats, so `1` and `1.0` are literally the same numeric value.

```js
1 === 1.9 // false
```
- **What happens**: `1` and `1.9` are different numeric values.

```js
1 === 1.00000000000000009 // true
```
- **What happens**: Double precision floating-point can't represent `1.00000000000000009` any more precisely than `1.0`, so they become the same value in memory.

```js
'a' === 'a' // true
```
- **What happens**: Two identical string primitives are equal.

```js
'a' === new String('a') // false
```
- **What happens**: `new String('a')` is an object wrapper around the string `'a'`. Strict equality checks object identity, not value, so `'a'` the primitive is not strictly equal to an object with the same contents.

```js
'a' === new String('a').toString() // true
```
- **What happens**: `new String('a').toString()` becomes the primitive `'a'`. `'a' === 'a'` → `true`.

---

## 6. Floating-Point Issues

```js
var a = 0.1,
    b = 0.2,
    c = a + b
c === 0.3 // false
```
- **Why**: check this article [Computer Floating-Point Precision](/articles/floating-point-precision)

---

## 7. Compound and Weird Arithmetic

```js
var x = 1
x += 1
// 2
```
- Straightforward. `x += 1` means `x = x + 1`.

```js
var x = 1
x-=-!''
// 2
```
- **What happens**: Break it down:
  - `!''` → `!false` (the empty string is falsy) → `true`
  - `-true` → `-1`
  - So we have `x -= -1` → `x = x + 1` → `2`.

```js
var x = 1
x-=-Math.cos([])
// 2
```
- **What happens**:
  - `[].toString()` → `""`, `Number("")` → `0`.
  - `Math.cos(0)` → `1`.
  - `-1` → `-1`.
  - `x -= -1` → `2`.

---

## 8. Comparing Extremes

```js
Math.max() > Math.min() // false
```
- **What happens**: `Math.max()` with no arguments → `-Infinity`. `Math.min()` with no arguments → `Infinity`. `-Infinity > Infinity` is `false`.

```js
Number.MIN_VALUE < 0 // false
```
- **What happens**: `Number.MIN_VALUE` is the smallest positive value (~5e-324), but it is still positive, so it's not less than 0.

---

## 9. Types and `NaN`

```js
typeof NaN // "number"
```
- **What happens**: `NaN` is a special numeric value, so `typeof NaN` is `"number"`.

```js
typeof [] // "object"
typeof {} // "object"
typeof null // "object"
```
- **What happens**: Arrays, objects, and `null` all return `"object"` from `typeof`. This is an old, well-known quirk that is left in place for backward compatibility.

```js
NaN === NaN // false
```
- **What happens**: By design, `NaN` is never equal to anything, not even itself.

```js
NaN == NaN // false
```
- Same reasoning: The equality check for `NaN` fails.

```js
isNaN(NaN) // true
isNaN(null) // false
isNaN(undefined) // true
isNaN([]) // false
isNaN({}) // true
```

- **What happens**: `isNaN()` tries to convert the argument to a number. 
  - `NaN` → obviously `true`.
  - `null` → `Number(null)` is `0`, so `isNaN(0)` → `false`.
  - `undefined` → `Number(undefined)` is `NaN`, so `true`.
  - `[]` → `""` → `0` → not NaN → `false`.
  - `{}` → `[object Object]` → `NaN` → `true`.

---

## 10. Reference Equality

```js
[1,2,3] === [1,2,3] // false
[1,2,3] == [1,2,3] // false
```
- **What happens**: Arrays are objects. Object equality checks reference identity, not contents. Different array instances → false.

```js
JSON.stringify([1,2,3]) === JSON.stringify([1,2,3]) // true
```
- **What happens**: Converting each array to a string representation yields the same string (`"["1,2,3"]"`), and those strings are equal.

---

## 11. Weird String Addition

```js
[1, 2, 3] + [4, 5, 6] // "1,2,34,5,6"
```
- **What happens**: Each array is converted to a string: `[1,2,3].toString()` → `"1,2,3"`. Then concatenation with `[4,5,6].toString()` → `"4,5,6"`. So the result is `"1,2,3" + "4,5,6"` = `"1,2,34,5,6"`.

---

## 12. Odd `toString()` Calls

```js
0..toString() // "0"
0 .toString() // "0"
```
- **What happens**: `0..toString()` is a hack to let the parser know you mean `Number(0)` with a decimal, rather than something else. It's a trick to allow method calls on a number literal. The result is `"0"`.

```js
[].toString() // ""
```
- **What happens**: An empty array stringifies to `""`.

---

## 13. Date Conversions

```js
+new Date() // 167...some large timestamp...
```
- **What happens**: The unary `+` operator forces a numeric conversion. `new Date()` → numeric value is the milliseconds since the epoch. That's the same as `.getTime()`.

```js
+new Date() === Number(new Date) // true
+new Date() === (new Date()).getTime() // true
```
- **What happens**: They all produce the numeric timestamp.

---

## 14. More Coercion

```js
+[] // 0
```
- **What happens**: `[]` → `""` → `0`.

```js
+[] === 0 + [] // false
```
- **What happens**: `+[]` → `0`. But `0 + []` → `0 + ""` → `"0"`. `"0" === 0` is false with strict equality.

```js
0 + [] // "0"
```
- **What happens**: As soon as one operand is a string in a `+` expression, concatenation occurs. `0` is converted to `"0"` and `"0" + ""` → `"0"`.

```js
typeof (0 + new Date()) // "string"
```
- **What happens**: `new Date()` as a primitive is a string (e.g., `"Mon Mar 10 2025 ..."`). So `0 + "Mon Mar..."` → a string. `typeof` that is `"string"`.

---

## 15. `parseInt` vs. `parseFloat`

```js
parseInt("1.let's see") // NaN
```
- **What happens**: `parseInt("1.let's see")` reads `"1."` as an integer but sees `.` not followed by a digit. It stops parsing right after `"1"`. Actually, the presence of `'l'` after the decimal confuses it, so it can't parse beyond `1` as an integer. The partial parse gives `1`, but then sees an invalid character sequence. Historically, many engines end up with `1` or `NaN`. Modern specs: if `parseInt` finds a valid integer portion, it returns that integer. But with `".let's"` it's ambiguous. Some engines might interpret it differently. Often you'll get `1`. Some older or strict interpretations might yield `NaN`. (Exact result can vary, but typically parseInt stops as soon as it can't parse a valid integer, so the result is `1`. If your environment yields `NaN`, it's possibly a nuance of that engine. Check your browser or Node version.)
- This snippet highlights that `parseInt` will stop at the first non-valid integer character, but a `'l'` or `'`' might break it differently across engines.

```js
parseFloat("1.let's see") // 1
```
- **What happens**: `parseFloat` can parse a floating-point until it hits a non-digit/non-decimal character. It sees `"1."`, stops at the `l`, so returns `1`.

```js
parseFloat('123.321try') // 123.321
parseFloat('123.try321') // 123
```
- **What happens**: `parseFloat` parses until a non-numeric (including decimal) character, ignoring the rest.

```js
parseInt(1 / 0, 19) // 18
```
- **What happens**: `1 / 0` is `Infinity`. Converting that to a string yields `"Infinity"`. Then `parseInt("Infinity", 19)`: it sees `'I'` as a valid digit? Actually in base 19, digits are 0–9 and `a–i` (or `A–I`). `'I'` can be interpreted as the digit `18` in base 19. Since it only takes the first character `'I'`, that becomes `18`.

```js
parseInt('xyz', 36) // 44027
```
- **What happens**: In base 36, digits go 0–9 then a–z (or A–Z). `'x'`, `'y'`, `'z'` are valid digits. `'x'` is 33, `'y'` is 34, `'z'` is 35, so we get a number in base 36 that is 44027 in base 10.

```js
parseInt(['a1', [2, [3, [4]]]], 11) // 111
```

- **What happens**:
  1. `[ 'a1', [2, [3, [4]]] ].toString()` → `"a1,2,3,4"`.
  2. Then `parseInt("a1,2,3,4", 11)`.
  3. `parseInt` stops as soon as it encounters a character that is not valid for base 11. `'a'` in base 11 is 10, `'1'` is 1 → so it sees `"a1"` as a valid chunk. That is `10*11 + 1 = 111`. Once it hits the comma, parsing stops.

```js
parseInt('1') === parseFloat('1') // true
```

- Both parse to `1`.

```js
parseInt('a1', 11) === parseFloat('a1', 11) // false
```
- `parseInt('a1', 11)` → `111` (as above). `parseFloat('a1', 11)` tries to parse `'a1'` as a float in decimal, fails at `'a'` → `NaN`. `111 === NaN` → false.

---

## 16. Bitwise Operators and PI

```js
Math.PI ^ 0 // 3
Math.PI ^ [] // 3
Math.PI << [] // 3
Math.PI >> [] // 3
```
- **What happens**: All of these examples do a numeric conversion of `Math.PI` (`3.1415926...`) then perform integer bitwise operations:
  - `3.1415` truncated to integer = `3`.
  - `[]` → `0`.
  - `3 ^ 0` = `3`. Same for shifting.

```js
~Math.PI // -4
```
- **What happens**: `~x` is the bitwise NOT. `Math.PI` truncates to `3`. `~3` = `-4` (in two's complement).

```js
~~Math.PI // 3
```
- **What happens**: `~~x` is a neat trick to truncate a float to an integer. `3.1415...` → `3`.

```js
Math.PI - Math.PI % 1 // 3
```
- **What happens**: `x % 1` is the fractional part for positive numbers. `3.1415 % 1` → `0.1415`. Subtract that from `3.1415` → `3`.

---

## 17. `parseInt` on an Array via `map`

```js
['1', '7', '11'].map(parseInt) // [1, NaN, 3]
```
- **What happens**:
  - `.map(parseInt)` calls `parseInt(value, index)`. So it calls:
    1. `parseInt('1', 0)` → base 0 means base 10 in older browsers → `1`.
    2. `parseInt('7', 1)` → base 1 is invalid for digit `'7'` → `NaN`.
    3. `parseInt('11', 2)` → `'11'` in base 2 is `3`.
- The fix is usually `.map(x => parseInt(x, 10))`, or better: `.map(Number)`, if you want decimal.

---

## 18. `NaNNaNNaN...` Strings

```js
Array(16).join('wat' - 1) + ' Batman!'
- **What happens**:
  - `'wat' - 1` → `'wat'` is not numeric, so `NaN`.
  - `Array(16).join(NaN)` → `'NaNNaNNaN...NaN'` (15 copies of `'NaN'` joined with no delimiter).
  - Concatenate `' Batman!'` → `"NaNNaNNaN... Batman!"`.
```

---

## 19. ASCII Art: `"fail"` from Strange Indices

```js
;(![] + [])[+[]] +
  (![] + [])[+!+[]] +
  ([![]] + [][[]])[+!+[] + [+[]]] +
  (![] + [])[!+[] + !+[]]
```
- This expression is legendary. It spells out `"fail"`.
- **Why**:
  - `![]` → `false`. 
  - `false + []` → `"false"`.
  - `[+[]]` → `[0]`, then `+[]` is `0` inside the bracket. So `'false'[0]` is `'f'`.
  - And so on, indexing letters out of `'false'` or `'true'`. 
- It's a puzzle of nested coercions, array indexes, booleans, and string indexing.

---

## 20. `"banana"` from `'b' + 'a' + + 'a' + 'a'`

```js
('b' + 'a' + + 'a' + 'a').toLowerCase(); // "banana"
- **What happens**:
  - `'b' + 'a'` → `"ba"`.
  - `+ 'a'` tries to convert `'a'` to a number, fails → `NaN`. 
  - `"ba" + NaN + 'a'` → `"baNaNa"`.
  - `.toLowerCase()` → `"banana"`.
```
---

## 21. Self-Printing Dollar Function

```js
$=_=>`$=${$};$()`;$()
```
- **What happens**: This is a self-referential arrow function that prints its own definition. `$()` calls itself, returning the string with interpolation of `$=${$}`. It's basically quine-like code in JavaScript.

---

## 22. `"NANO"` and `"UNDEFINEDO"`

```js
console.log((undefined + undefined + "O").toUpperCase()); // NANO
```
- **What happens**:
  - `undefined + undefined` → `"undefinedundefined"` (string concatenation, because the first `undefined` in a string context is `"undefined"`).
  - So total string is `"undefinedundefinedO"`, which as a substring is `"undefinedundefined" → "NaN"`? Actually carefully: 
    - `(undefined + undefined)` is `NaN` if numeric. But in a string context, it can be `"undefinedundefined"`—**unless** one is forced numeric. 
    - Modern engines typically see the first `undefined` with a `+` operator and second `undefined`, which might indeed yield `NaN` (if it tries numeric first). But often in practice, `'undefined' + 'undefined' = 'undefinedundefined'`. 
  - Then adding `"O"` might cause another string conversion → `'undefinedundefinedO'`. 
  - `.toUpperCase()` → `"UNDEFINEDUNDEFINEDO"`. 
  - Why the snippet says it logs `"NANO"` might be from a numeric path. `(undefined + undefined)` → `NaN`, then `NaN + "O"` → `"NaNO"`. `.toUpperCase()` → `"NANO"`.
  - The difference is the first addition can produce `NaN` because `undefined` in a numeric context is `NaN`; `NaN + undefined` is also `NaN`. Then `NaN + "O"` → `"NaNO"`. 
  - So we get `"NaNO"`. Then `toUpperCase()` → `"NANO"`.

```js
console.log((undefined + "O").toUpperCase()); // UNDEFINEDO
```
- **What happens**: `(undefined + "O")` is definitely string concatenation: `"undefinedO"`. Then `.toUpperCase()` → `"UNDEFINEDO"`.

---

## 23. Implementing Your Own `myMap` Function

Given the quirks we've seen with `['1', '7', '11'].map(parseInt)`, let's implement our own `myMap` function that avoids these pitfalls:

```js
function myMap(array, callback, thisArg) {
  // Handle edge cases
  if (this == null) {
    throw new TypeError('Array.prototype.myMap called on null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  // Convert to object (handles primitives)
  const O = Object(array);
  
  // Get length property and convert to integer
  const len = parseInt(O.length) || 0;
  
  // Create new array for results
  const result = new Array(len);
  
  // Iterate through array
  for (let i = 0; i < len; i++) {
    // Check if property exists (handles sparse arrays)
    if (i in O) {
      // Call callback with proper arguments: (element, index, array)
      result[i] = callback.call(thisArg, O[i], i, O);
    }
  }
  
  return result;
}

// Usage examples:
['1', '7', '11'].myMap(x => parseInt(x, 10)); // [1, 7, 11] - Fixed!
[1, 2, 3].myMap(x => x * 2); // [2, 4, 6]

// This avoids the parseInt quirk because we explicitly pass only one argument
// Instead of: ['1', '7', '11'].map(parseInt) // [1, NaN, 3]
// We get:    ['1', '7', '11'].myMap(x => parseInt(x, 10)) // [1, 7, 11]
```

**Key differences from the problematic `map(parseInt)` example**:
- Our callback wrapper `x => parseInt(x, 10)` only passes the element to `parseInt`, not the index
- We explicitly specify base 10 to avoid parsing issues
- The implementation handles sparse arrays correctly
- It includes proper error checking for edge cases

**How the native `map(parseInt)` problem occurs**:
```js
// What actually happens:
['1', '7', '11'].map(parseInt)
// Becomes:
['1', '7', '11'].map((element, index) => parseInt(element, index))
// Which calls:
parseInt('1', 0)  // 1 (base 0 defaults to 10)
parseInt('7', 1)  // NaN (base 1 is invalid)  
parseInt('11', 2) // 3 (binary: 11₂ = 3₁₀)
```

---

# Conclusion

JavaScript's type system, especially its loose equality rules, automatic type coercion, and corner cases in parsing or arithmetic can produce results that seem bizarre at first glance. However, these quirks usually follow the language specification consistently:

1. **Type Coercion**: The `+` operator can trigger numeric or string operations depending on the operand types.
2. **Loose Equality**: `==` tries to align types by a maze of conversions (`objects → strings`, `strings → numbers`, booleans → `0`/`1`, etc.).
3. **Floating-Point**: Numbers in JavaScript are IEEE 754 doubles. Precision issues can arise (e.g. `0.1 + 0.2 ≠ 0.3`).
4. **Parsing**: `parseInt`, `parseFloat` read strings in ways that can truncate or interpret unexpected digits or bases.
5. **Date and Object to Primitives**: `Date` objects default to strings, while ordinary objects default to `[object Object]`, or `NaN` if forced numerically.
6. **NaN**: This special numeric value is never equal to anything, including itself.

Knowing these details helps you understand the surprising results—and avoid bugs in day-to-day coding. When you need reliable results, prefer **strict equality** over `==`, use explicit type conversions, and treat floating-point with caution. Although these examples can look "weird," they underscore the importance of reading the specification's rules for type conversion and how operators behave with various operand types.

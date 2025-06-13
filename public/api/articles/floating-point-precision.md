---
title: "A Deep Dive into computer Floating-Point Precision: Why 0.1 + 0.2 Isn't 0.3"
description: "Explore the surprising result of 0.1 + 0.2 in programming and understand why it happens due to floating-point representation and the IEEE 754 standard."
order: 2
---

# Computer Floating-Point Precision

## Table of Contents
- [Why 0.1 + 0.2 Isn't Exactly 0.3 in Most Programming Languages](#why-01--02-isnt-exactly-03-in-most-programming-languages)
- [The Root Cause: Binary Representation](#the-root-cause-binary-representation)
- [Adding the Inexact Values](#adding-the-inexact-values)
- [The Role of IEEE 754](#the-role-of-ieee-754)
- [Demonstrations in Code](#demonstrations-in-code)
- [Why it Matters and How to Handle It](#why-it-matters-and-how-to-handle-it)

# Why 0.1 + 0.2 Isn't Exactly 0.3 in Most Programming Languages

As a software engineer with over a decade of experience, one of the fundamental concepts that often surprises newcomers (and sometimes even catches seasoned developers off guard) is the behavior of floating-point arithmetic. You might expect a simple addition like `0.1 + 0.2` to result in `0.3`. However, in many programming languages and environments, the result is slightly different: `0.30000000000000004`.

## The Root Cause: Binary Representation

Computers store numbers using binary (base 2). Integers are straightforward, but representing fractional numbers in binary can be tricky. While some decimal fractions, like 0.5 (which is `0.1` in binary), can be represented exactly, many others cannot.

Decimal fractions like 0.1, 0.2, and 0.3 do not have a finite binary representation, similar to how 1/3 does not have a finite decimal representation (it's 0.333...). When these numbers are stored in a computer's memory using a fixed number of bits (like 64-bit floating-point numbers, the standard), they must be rounded to the nearest representable binary fraction.

This means that the numbers `0.1` and `0.2` as stored in memory are *not* precisely the decimal values 0.1 and 0.2. They are the closest binary floating-point numbers to those values.

According to the web article from jvns.ca, the exact 64-bit floating-point representations of 0.1 and 0.2 are:
- `0.1` is actually `0.1000000000000000055511151231257827021181583404541015625`
- `0.2` is actually `0.200000000000000011102230246251565404236316680908203125`

## Adding the Inexact Values

When you add these two inexact binary representations, you get a sum that is also inexact:
`0.1000000000000000055511151231257827021181583404541015625 + 0.200000000000000011102230246251565404236316680908203125 = 0.3000000000000000166533453693773481063544750213623046875`

This sum is then rounded to the nearest representable 64-bit floating-point number. The IEEE 754 standard, which defines floating-point arithmetic for most systems, specifies how this rounding should occur. The standard typically uses "round to nearest, ties to even".

In the case of `0.1 + 0.2`, the exact sum `0.3000000000000000166533453693773481063544750213623046875` lies exactly between two representable floating-point numbers:
- `0.299999999999999988897769753748434595763683319091796875` (often displayed as 0.3)
- `0.3000000000000000444089209850062616169452667236328125` (often displayed as 0.30000000000000004)

Since the sum is exactly in the middle, the "ties to even" rule is applied. This rule dictates that the number is rounded to the floating-point number whose last bit of the significand is 0 (i.e., is even). In this case, `0.3000000000000000444089209850062616169452667236328125` is the one with the even significand, so it is chosen as the result.

## The Role of IEEE 754

This behavior is governed by the IEEE 754 standard for floating-point arithmetic, which is implemented in the hardware of most modern computers and used by the vast majority of programming languages. The standard defines the formats for representing floating-point numbers (like single-precision 32-bit and double-precision 64-bit) and the rules for performing arithmetic operations, including addition, subtraction, multiplication, division, and rounding. Adhering to IEEE 754 ensures consistency in floating-point computations across different platforms.

## Demonstrations in Code

Let's see this in action in various programming languages.

**JavaScript / TypeScript:**

```javascript
console.log(0.1 + 0.2);
// Expected output: 0.30000000000000004
```

**Python:**

```python
print(0.1 + 0.2)
// Expected output: 0.30000000000000004
```

**C++:**

```cpp
#include <iostream>
#include <iomanip>

int main() {
    double result = 0.1 + 0.2;
    std::cout << std::fixed << std::setprecision(17) << result << std::endl;
    return 0;
}
// Expected output: 0.30000000000000004
```
*Note: You need `<iomanip>` to control precision for printing.*

**Rust:**

```rust
fn main() {
    let result: f64 = 0.1 + 0.2;
    println!("{:.17}", result);
}
// Expected output: 0.30000000000000004
```
*Note: `f64` is the standard 64-bit floating-point type.*

## Why it Matters and How to Handle It

Understanding this behavior is crucial, especially when dealing with financial calculations or any situation where exact decimal precision is required. Relying on direct floating-point equality checks (`if (a + b == c)`) can lead to bugs because `0.1 + 0.2` will not be strictly equal to `0.3`.

For scenarios requiring exact decimal arithmetic, consider using dedicated decimal data types or libraries if your language provides them (e.g., Python's `decimal` module, Java's `BigDecimal`). Alternatively, work with integers by scaling your numbers (e.g., deal with cents instead of dollars).

While this floating-point imprecision might seem inconvenient, it's a trade-off made for performance and the ability to represent a wide range of numbers efficiently within a fixed amount of memory.

Knowing that `0.1 + 0.2` isn't exactly `0.3` is a rite of passage for many developers and highlights the importance of understanding the underlying representation of data types in computing. 
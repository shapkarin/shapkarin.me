---
title: 'Floating-Point Precision: Why 0.1 + 0.2 Isn''t 0.3'
description: >-
  Explore the surprising result of 0.1 + 0.2 in programming and understand why
  it happens due to floating-point representation and the IEEE 754 standard.
order: 2
---

# Computer Floating-Point Precision

## Table of Contents
- [Why 0.1 + 0.2 Isn't Exactly 0.3 in Most Programming Languages](#why-0-1-0-2-isn-t-exactly-0-3-in-most-programming-languages)
- [The Root Cause: Binary Representation](#the-root-cause-binary-representation)
- [Adding the Inexact Values](#adding-the-inexact-values)
- [The Role of IEEE 754](#the-role-of-ieee-754)
- [Demonstrations in Code](#demonstrations-in-code)
- [Why it Matters and How to Handle It](#why-it-matters-and-how-to-handle-it)

# Why 0.1 + 0.2 Isn't Exactly 0.3 in Most Programming Languages

As a software engineer with over a decade of experience, one of the fundamental concepts that often surprises newcomers (and sometimes even catches seasoned developers off guard) is the behavior of floating-point arithmetic. You might expect a simple addition like `0.1 + 0.2` to result in `0.3`. However, in many programming languages and environments, the result is slightly different: `0.30000000000000004`.

## The Root Cause: Binary Representation

Computers store numbers using binary (base 2). Integers are straightforward, but representing fractional numbers in binary can be tricky. While some decimal fractions, like 0.5 (which is `0.1` in binary), can be represented exactly, many others cannot.

![Graph diagram](/api/articles/dark/floating-point-precision-0.svg)

```mermaidgraph TD
    A[Decimal Number 0.1] --> B[Convert to Binary]
    B --> C[0.0001100110011...]
    C --> D[Infinite Binary Representation]
    D --> E[Must Round to Fit 64-bit]
    E --> F[0.1000000000000000055...]
    
    G[Decimal Number 0.2] --> H[Convert to Binary]
    H --> I[0.0011001100110011...]
    I --> J[Infinite Binary Representation]
    J --> K[Must Round to Fit 64-bit]
    K --> L[0.2000000000000000111...]
    
    F --> M[Add Binary Representations]
    L --> M
    M --> N[0.3000000000000000444...]
    N --> O[Display as 0.30000000000000004]</code></pre>
```

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

### JavaScript/TypeScript: Using `BigInt` for Integer Arithmetic

In JavaScript and TypeScript, when working with scaled integers to avoid floating-point inaccuracies, `BigInt` is an invaluable tool, especially for numbers outside the safe integer range of the standard `Number` type. `BigInt` provides a way to represent whole numbers with arbitrary precision.

Here's how you can use `BigInt` to perform calculations that might otherwise be unsafe with standard numbers:

```javascript
// A safe integer limit
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991

// BigInt math (Correct)
const safe = maxSafeInteger + BigInt(2); // or 2n
console.log(safe.toString()); // "9007199254740993" (Correct)

// Out of max safe integer without BigInt usage (Incorrect)
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 (Incorrect)
```

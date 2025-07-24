---
title: 'Deep Cloning in JavaScript: Mastering `structuredClone()`'
description: >-
  Learn how to properly create deep copies of complex objects in JavaScript
  using the modern structuredClone() method, understand its advantages over
  traditional techniques, and discover when and how to use it effectively.
order: 5
---

## Table of Contents

*   [Shallow vs. Deep Cloning: The Core Difference](#shallow-vs-deep-cloning-the-core-difference)
*   [Traditional Deep Cloning Methods (and Their Issues)](#traditional-deep-cloning-methods-and-their-issues)
    *   [`JSON.parse(JSON.stringify(object))`](#1-jsonparsejsonstringifyobject)
    *   [Recursive Manual Cloning / Third-Party Libraries](#2-recursive-manual-cloning--third-party-libraries)
*   [Introducing `structuredClone()`: The Modern Solution](#introducing-structuredclone-the-modern-solution)
    *   [Key Benefits of `structuredClone()`](#key-benefits-of-structuredclone)
*   [Limitations of `structuredClone()`](#limitations-of-structuredclone)
*   [When to Use `structuredClone()`](#when-to-use-structuredclone)
*   [Conclusion](#conclusion)

# Deep Cloning in JavaScript: Mastering `structuredClone()`

In JavaScript, copying objects is a common task, but it's not always straightforward. Understanding the difference between shallow and deep cloning is crucial to avoid unintended side effects and bugs in your applications. This article dives into deep cloning, explores traditional methods, and highlights the modern, built-in `structuredClone()` method.

## Shallow vs. Deep Cloning: The Core Difference

When you copy an object in JavaScript, you might be creating either a shallow copy or a deep copy.

![Graph diagram](/api/articles/dark/structuredClone-0.svg)

```mermaidgraph TD
    A[Original Object] --> B[name: 'Alice']
    A --> C[details: Object Reference]
    C --> D[age: 30]
    
    E[Shallow Copy] --> F[name: 'Alice']
    E --> G[details: Same Reference]
    G --> D
    
    H[Deep Copy] --> I[name: 'Alice']
    H --> J[details: New Object]
    J --> K[age: 30]
    
    L[Modify Shallow Copy] --> M[details.age = 31]
    M --> D
    M --> N[Original Also Changed!]
    
    O[Modify Deep Copy] --> P[details.age = 31]
    P --> K
    Q[Original Unchanged] --> D</code></pre>
```

*   **Shallow Copy:** Only the top-level properties of an object are copied. If a property holds a reference to another object (like an array or another object), the copy will point to the *same* referenced object. Modifying the nested object in the copy will also affect the original, and vice-versa.

    ```javascript
    const original = {
      name: "Alice",
      details: { age: 30 }
    };

    // Shallow copy using spread syntax
    const shallowCopy = { ...original };

    shallowCopy.details.age = 31;
    console.log(original.details.age); // Output: 31 (original is affected!)
    ```

*   **Deep Copy:** All properties of the object are copied recursively. This means that if a property is an object, that object is also deeply copied. The new copy is completely independent of the original.

    ```javascript
    // (Conceptual example, actual deep clone method will be shown later)
    const original = {
      name: "Bob",
      details: { age: 25 }
    };

    const deepCopy = someDeepCloneFunction(original);

    deepCopy.details.age = 26;
    console.log(original.details.age); // Output: 25 (original remains unchanged)
    ```

Deep cloning is essential when you need to manipulate a copy of an object without affecting the source, especially in state management, data manipulation, or when working with history (undo/redo functionalities).

## Traditional Deep Cloning Methods (and Their Issues)

Before `structuredClone()`, developers relied on various techniques for deep cloning, each with its own set of limitations.

### 1. `JSON.parse(JSON.stringify(object))`

This is a common and quick way to deep clone objects that are "JSON-safe" (i.e., can be serialized to a JSON string and then parsed back).

```javascript
const original = {
  name: "Charlie",
  hobbies: ["reading", "hiking"],
  joined: new Date("2023-01-15")
};

const cloned = JSON.parse(JSON.stringify(original));

console.log(cloned.name);       // "Charlie"
console.log(cloned.hobbies);    // ["reading", "hiking"]
console.log(typeof cloned.joined); // "string" (Date object became a string!)

cloned.hobbies.push("cycling");
console.log(original.hobbies);  // ["reading", "hiking"] (hobbies array is deeply cloned)
```

**Pros:**
*   Simple and concise.

**Cons:**
*   **Loses data types:** Functions, `undefined` values, `Symbol`s, `RegExp` objects, `Map`s, `Set`s are either lost or incorrectly converted. For example, `Date` objects are converted to ISO date strings.
*   Cannot handle circular references (throws an error).
*   Not very performant for large objects.

### 2. Recursive Manual Cloning / Third-Party Libraries

Developers often wrote custom recursive functions to traverse and clone objects property by property. Libraries like Lodash (`_.cloneDeep()`) also provide robust deep cloning solutions.

**Pros:**
*   Can be tailored to handle specific complex types and scenarios.
*   Libraries are often well-tested and handle many edge cases.

**Cons:**
*   Writing a correct and comprehensive manual deep clone function is complex and error-prone.
*   Adds a dependency if using a third-party library.
*   Can have performance implications.

## Introducing `structuredClone()`: The Modern Solution

JavaScript now has a built-in global function, `structuredClone()`, designed for high-fidelity deep cloning. It uses the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm), which was originally developed for copying JavaScript values between Web Workers and the main thread.

```javascript
const original = {
  name: "David",
  birthDate: new Date("1990-05-20"),
  regex: /pattern/gi,
  data: new Map([["key1", "value1"], ["key2", "value2"]]),
  set: new Set([1, 2, 3]),
  typedArr: new Uint8Array([10, 20]),
  nested: { value: 42 }
};

// Add a circular reference
original.self = original;

try {
  const cloned = structuredClone(original);

  console.log(cloned.name);                // "David"
  console.log(cloned.birthDate);           // Date object (not a string!)
  console.log(cloned.birthDate instanceof Date); // true
  console.log(cloned.regex);               // /pattern/gi
  console.log(cloned.data.get("key1"));    // "value1"
  console.log(cloned.set.has(2));          // true
  console.log(cloned.typedArr[0]);         // 10

  // Modify the clone
  cloned.name = "David Clone";
  cloned.birthDate.setFullYear(1991);
  cloned.data.set("key1", "newValue");
  cloned.nested.value = 100;

  console.log(original.name);              // "David" (original is unchanged)
  console.log(original.birthDate.getFullYear()); // 1990 (original is unchanged)
  console.log(original.data.get("key1"));  // "value1" (original is unchanged)
  console.log(original.nested.value);      // 42 (original is unchanged)

  // Check the circular reference
  console.log(cloned.self === cloned);    // true (circular reference is preserved)
  console.log(cloned.self === original);  // false (it's a new circular reference within the clone)

} catch (error) {
  console.error("Cloning failed:", error);
}
```

### Key Benefits of `structuredClone()`:

![Flowchart diagram](/api/articles/dark/structuredClone-1.svg)

```mermaidflowchart LR
    A[structuredClone] --> B[Handles Complex Types]
    A --> C[Preserves Circular References]
    A --> D[Better Performance]
    A --> E[Native Browser Support]
    
    B --> F[Date Objects]
    B --> G[RegExp]
    B --> H[Map & Set]
    B --> I[TypedArrays]
    B --> J[ArrayBuffer]
    
    C --> K[No Stack Overflow]
    C --> L[Maintains Relationships]
    
    D --> M[Optimized Algorithm]
    D --> N[No JSON Conversion]</code></pre>
```

*   **Handles Complex Types:** It can clone a wide variety of JavaScript types beyond what `JSON.parse(JSON.stringify())` supports, including:
    *   `ArrayBuffer`
    *   `BigInt64Array`, `BigUint64Array`
    *   `Blob`
    *   `Boolean`
    *   `CryptoKey`
    *   `DataView`
    *   `Date`
    *   `Error` types (some properties might be lost, like `fileName`, `lineNumber`, `columnNumber`)
    *   `File`, `FileList`
    *   `Float32Array`, `Float64Array`
    *   `ImageBitmap`
    *   `ImageData`
    *   `Int8Array`, `Int16Array`, `Int32Array`
    *   `Map`
    *   `Number`
    *   `Object` (plain objects)
    *   `RegExp` (though the `lastIndex` property is not preserved)
    *   `Set`
    *   `String`
    *   `Uint8Array`, `Uint8ClampedArray`, `Uint16Array`, `Uint32Array`
    *   And more, including WebAssembly modules in supporting environments.
*   **Transfers "Transferable Objects":** For objects like `ArrayBuffer`, `MessagePort`, or `ImageBitmap`, `structuredClone()` can transfer ownership of the underlying data to the new object if specified via an options argument (e.g., `structuredClone(value, { transfer: [arrayBuffer] })`). This can be very efficient as it avoids copying large data.
*   **Handles Circular References:** Unlike `JSON.stringify()`, `structuredClone()` can correctly duplicate objects with circular references.
*   **Performance:** Generally more performant and reliable for supported types compared to `JSON.parse(JSON.stringify())` and often competitive with library solutions for common use cases.

## Limitations of `structuredClone()`

While powerful, `structuredClone()` is not a silver bullet and has limitations. According to MDN's documentation on the [structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm#things_that_dont_work_with_structured_clone) and the [`structuredClone()` page](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone#exceptions), here are key things it **cannot** clone:

1.  **Functions:** Attempting to clone an object containing functions will result in a `DataCloneError`. Functions are not serializable by this algorithm.

    ```javascript
    const objWithFunc = {
      name: "Test",
      greet: function() { console.log("Hello!"); }
    };

    try {
      const cloned = structuredClone(objWithFunc);
    } catch (e) {
      console.error(e.name, e.message); // "DataCloneError", "() => { console.log("Hello!"); } could not be cloned."
    }
    ```

2.  **DOM Nodes:** DOM elements cannot be cloned using `structuredClone()`. This will also throw a `DataCloneError`. If you need to clone DOM nodes, use methods like `node.cloneNode(true)`.

    ```javascript
    const myDiv = document.createElement("div");
    myDiv.textContent = "Hello";

    try {
      const clonedDiv = structuredClone(myDiv);
    } catch (e) {
      console.error(e.name, e.message); // "DataCloneError", "#<HTMLDivElement> could not be cloned." (Exact message may vary by browser)
    }
    ```

3.  **Property Descriptors, Setters, and Getters:** The algorithm clones the *values* of properties. It does not preserve property descriptors (e.g., `writable`, `configurable`, `enumerable`), nor does it duplicate getters and setters. The cloned object will have plain properties with the values obtained from the original's getters.

    ```javascript
    const originalWithAccessor = {
      _privateValue: 1,
      get value() { return this._privateValue * 2; },
      set value(val) { this._privateValue = val; }
    };
    Object.defineProperty(originalWithAccessor, 'readOnlyProp', {
        value: "constant",
        writable: false
    });


    console.log(originalWithAccessor.value); // 2

    const clonedAccessor = structuredClone(originalWithAccessor);

    console.log(clonedAccessor.value); // 2 (the result of the getter is cloned as a data property)
    console.log(Object.getOwnPropertyDescriptor(clonedAccessor, 'value'));
    // { value: 2, writable: true, enumerable: true, configurable: true }
    // The getter/setter is gone, 'value' is now a simple data property.

    clonedAccessor.value = 10; // This changes clonedAccessor._privateValue (if it were cloned) or clonedAccessor.value directly
    console.log(clonedAccessor.value); // 10
    console.log(originalWithAccessor.value); // 2 (original is unaffected, which is good)

    const desc = Object.getOwnPropertyDescriptor(clonedAccessor, 'readOnlyProp');
    console.log(desc.writable); // true - was false on original
    ```

4.  **Object Prototypes:** The prototype chain is not traversed or duplicated. The cloned object will always be a plain object or an instance of a built-in type (like `Date`, `Map`, etc.). If you clone an instance of a custom class, the clone will be a plain object, and it will not be an `instanceof` your custom class, nor will it inherit methods from the class prototype.

    ```javascript
    class MyClass {
      constructor(name) {
        this.name = name;
      }
      greet() {
        return `Hello, ${this.name}`;
      }
    }

    const myInstance = new MyClass("Eve");
    console.log(myInstance.greet());      // "Hello, Eve"
    console.log(myInstance instanceof MyClass); // true

    const clonedInstance = structuredClone(myInstance);

    console.log(clonedInstance.name);     // "Eve"
    console.log(clonedInstance instanceof MyClass); // false
    // console.log(clonedInstance.greet()); // TypeError: clonedInstance.greet is not a function
    ```

5.  **Other Non-Serializable Objects:** Certain built-in types like `WeakMap`, `WeakSet`, and some platform-specific objects might not be cloneable. The exact list can be nuanced and environment-dependent. Always refer to the latest MDN documentation.

## When to Use `structuredClone()`

`structuredClone()` is an excellent choice for many deep cloning scenarios:

*   **State Management:** Safely duplicating state objects in frameworks like Redux, Vuex, or when managing component state.
*   **Caching or Memoization:** Storing copies of complex data structures.
*   **History (Undo/Redo):** Creating snapshots of application data.
*   **Web Workers:** Passing complex data to and from workers without accidentally sharing memory (unless using `Transferable` objects explicitly).
*   When you need to clone common JavaScript objects and data structures like Dates, RegExps, Maps, Sets, TypedArrays, and even those with circular references, without the data loss issues of `JSON.parse(JSON.stringify())`.

However, if you need to:

*   Clone functions.
*   Clone DOM nodes.
*   Preserve the full prototype chain of custom class instances (including methods).
*   Preserve property descriptors, getters, or setters.
*   Handle specific object types not supported by the structured clone algorithm.

...then you'll still need to resort to custom cloning functions or established libraries like Lodash's `_.cloneDeep()`.

## Conclusion

The `structuredClone()` method is a significant addition to JavaScript, providing a robust, built-in mechanism for deep cloning a wide array of data types. It addresses many of the shortcomings of older techniques like `JSON.parse(JSON.stringify())`, especially regarding type fidelity and handling circular references.

While it has limitations, particularly with functions and DOM nodes, `structuredClone()` simplifies many common deep cloning tasks, leading to cleaner, more reliable code. Understanding its capabilities and limitations, as outlined on MDN ([Window.structuredClone()](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) and [Structured clone algorithm](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)), is key to leveraging it effectively in your JavaScript projects.

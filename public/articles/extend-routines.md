Below is a comprehensive and detailed article about the **extend-routines** package. This article synthesizes all of the core information from the provided README while adding additional context, clarifications, and guidance for a broad range of Redux workflows.

---

# Introducing `extend-routines`: Taking Redux Action Routines to the Next Level

Managing asynchronous actions in Redux can become tedious if you find yourself repeatedly writing out the same set of action types for every network request or async process. Typically, a single asynchronous flow might require multiple actions to represent its different states:

- `prefix/TRIGGER`: The initial signal to start a request or process.
- `prefix/REQUEST`: Indicates that the async operation (e.g., API call) has started.
- `prefix/SUCCESS`: The operation completed successfully, and the result data is ready.
- `prefix/FAILURE`: The operation failed, and the error is available.
- `prefix/FULFILL`: A final action indicating that the entire process (success or failure) has completed, often used for cleanup or resetting loading states.

The [redux-saga-routines](https://www.npmjs.com/package/redux-saga-routines) library introduced the concept of a *routine*, which automatically provides these common action types from a single prefix—making asynchronous flows more consistent and easier to maintain.

**extend-routines** builds on top of this idea, enabling you to easily add custom stages, create custom routines without the default stages, and even define specialized routines (like for sockets) or multiple routines at once. In short, it unlocks a higher level of flexibility and scalability in managing Redux action types for complex or varied async operations.

**Important Update:** From version **3.3.0**, **extend-routines** no longer depends on `redux-saga`. This means you can use `extend-routines` in any Redux setup, including the popular [Redux Toolkit](https://redux-toolkit.js.org/) or other middleware solutions. If you do still use `redux-saga-routines`, ensure you have at least `redux-saga-routines@3.2.0` installed for compatibility.

---

## What Are Routines?

A routine is essentially a structured set of related action types generated from a single prefix. For example, if your routine prefix is `projects`, you’ll automatically get:

- `projects/TRIGGER`
- `projects/REQUEST`
- `projects/SUCCESS`
- `projects/FAILURE`
- `projects/FULFILL`

This grouping lets you write cleaner code. Instead of manually defining and maintaining multiple action types for each async flow, you define them once and access them through a routine object.

---

## Why `extend-routines`?

While `redux-saga-routines` gives you the five standard async stages, sometimes you need more granularity. Maybe there’s a custom step in your data-loading process, or you need a `TOGGLE_INFO` action to show or hide details. Perhaps you’re dealing with WebSockets and need to handle `CONNECTED` and `DISCONNECTED` events elegantly.

`extend-routines` allows you to:

1. **Extend existing routines:** Add new custom stages to any routine you already have.
2. **Create extended routines:** Start with the default five stages and add your own custom stages right from the get-go.
3. **Create fully custom routines:** If you don’t need the default TRIGGER/REQUEST/SUCCESS/FAILURE/FULFILL pattern, you can create routines with *only* your custom stages.
4. **Create socket routines:** Predefined stages like `CONNECTED`, `DISCONNECTED`, `JOIN_CHANNEL`, `CHANNEL_JOINED`, `LEAVE_CHANNEL`, and `CHANNEL_LEAVED` come ready to use, and you can still add on top of them.
5. **Batch-create multiple routines:** Use `createRoutines` to generate many routines at once, including extended or custom routines. This is perfect for large applications with many different features and API endpoints.

With `extend-routines`, you have a single, powerful toolkit for all your asynchronous action needs—no matter how simple or complex.

---

## Installation

Install with npm:

```bash
npm install --save extend-routines
```

*(Originally named `extend-saga-routines`, now `extend-routines`.)*

If you’re using `redux-saga-routines`, ensure it’s at least version `3.2.0` for full compatibility.

---

## Core APIs and Their Usage

`extend-routines` provides several functions to cover different scenarios:

1. **extendRoutine(routine, stages, payloadCreator, metaCreator)**  
   - **routine (required):** The base routine you want to extend.
   - **stages (required):** One or more new stages to add. Can be a single string or an array of strings.
   - **payloadCreator (optional):** A function (or an object of functions keyed by stage name) to process the payload for each new stage.
   - **metaCreator (optional):** A function (or an object of functions) to create meta data for each new stage.
   
   This is your go-to method when you already have a routine and need to add custom actions to it.

2. **createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator)**  
   - **typePrefix (required):** The prefix for your routine’s action types.
   - **stages (required):** Additional custom stages on top of TRIGGER, REQUEST, SUCCESS, FAILURE, and FULFILL.
   - **payloadCreator and metaCreator (optional):** Define custom payload and meta logic.
   
   Ideal for when you want the standard five stages plus some custom ones right out of the box.

3. **createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator)**  
   - **typePrefix (required):** The prefix for your custom routine.
   - **stages (required):** Only your custom stages, no defaults.
   
   Use this if you want full control and don’t need the default async lifecycle.

4. **createSocketRoutine(typePrefix, stages, payloadCreator, metaCreator)**  
   - **typePrefix (required):** The prefix for socket-related actions.
   - **stages (optional):** Extend the default socket stages (`CONNECTED`, `DISCONNECTED`, `JOIN_CHANNEL`, `CHANNEL_JOINED`, `LEAVE_CHANNEL`, `CHANNEL_LEAVED`) with your own.
   
   Perfect for WebSocket or event-based operations where you have a known set of recurring events.

5. **createRoutines(scheme, defaultRoutines)**  
   - **scheme:** An object describing multiple routines at once.
   - **defaultRoutines (optional):** An array or object if you just need default routines without custom logic.
   
   This function helps you handle many routines in a single, declarative step. You can define each routine’s stages, methods, and even payload/meta creators all at once.

---

## Detailed Examples

### Extending an Existing Routine

If you already have a routine made by `redux-saga-routines`, you can add custom stages to it:

```js
import extendRoutine from 'extend-routines';
import { createRoutine } from 'redux-saga-routines';

const baseProjects = createRoutine('projects');
const projects = extendRoutine(baseProjects, 'TOGGLE_INFO');

console.log(projects._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE_INFO"]

console.log(projects.toggleInfo({ id: 42 }));
// { type: "projects/TOGGLE_INFO", payload: { id: 42 } }
```

You can also add multiple stages at once:

```js
const tab = extendRoutine(
  createRoutine('tab'),
  ['SOME_OTHER', 'CUSTOM']
);
```

### Custom Payload and Meta Creators

You’re not limited to just adding stages. You can define how payloads and metadata for those stages are created:

```js
const withCustomPayload = extendRoutine(
  createRoutine('custom/payload'),
  'SOME',
  { some: payload => payload * 2 }
);

console.log(withCustomPayload.some(2));
// { type: "custom/payload/SOME", payload: 4 }
```

And similarly for meta:

```js
const withCustomMeta = extendRoutine(
  createRoutine('custom/meta'),
  'SOME_OTHER',
  payload => payload,
  { someOther: () => ({ my: 'meta' }) }
);

console.log(withCustomMeta.someOther(42));
// { type: 'custom/meta/SOME_OTHER', payload: 42, meta: { my: 'meta' } }
```

### Creating Extended Routines from Scratch

If you know upfront that you want the default stages plus additional custom stages, skip extending after creation and go directly to `createExtendedRoutine`:

```js
import { createExtendedRoutine } from 'extend-routines';

const projects = createExtendedRoutine('projects', 'TOGGLE');
console.log(projects._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE"]
```

You can even pass an array of custom stages:

```js
const other = createExtendedRoutine('other', ['OPEN', 'CLOSE']);
console.log(other._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "OPEN", "CLOSE"]
```

### Fully Custom Routines Without Default Stages

If the default TRIGGER/REQUEST/SUCCESS/FAILURE/FULFILL pattern doesn’t match your use case, use `createCustomRoutine`:

```js
import { createCustomRoutine } from 'extend-routines';

const steps = createCustomRoutine('steps', ['NEXT', 'PREVIOUS', 'GO_TO']);
console.log(steps._STAGES);
// ["NEXT", "PREVIOUS", "GO_TO"]
```

This gives you maximum freedom over your action structure.

### Socket Routines

For socket-driven apps, `createSocketRoutine` provides a specialized routine:

```js
import { createSocketRoutine } from 'extend-routines';

const chat = createSocketRoutine('chat');
console.log(chat._STAGES);
// ["CONNECTED", "DISCONNECTED", "JOIN_CHANNEL", "CHANNEL_JOINED", "LEAVE_CHANNEL", "CHANNEL_LEAVED"]
const chat = createSocketRoutine('chat-extended', ['WHY', 'NOT']);
console.log(chatExtended._STAGES);
// ["CONNECTED", "DISCONNECTED", "JOIN_CHANNEL", "CHANNEL_JOINED", "LEAVE_CHANNEL", "CHANNEL_LEAVED", "WHY", "NOT"]
```

### Creating Multiple Routines at Once

As your codebase grows, you might have many routines to define. `createRoutines` helps you define multiple routines in a single, structured way:

```js
import { createRoutines } from 'extend-routines';

const routines = createRoutines({
  firstRoutine: null,
  secondRoutine: null,
  thirdRoutine: 'default'
});

console.log(routines.firstRoutine._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL"]
```

You can also define extended or custom routines, apply payload/meta creators, and handle complex configurations all from one place.

---

## Advanced Techniques and Patterns

- **Overriding Default Stages:** You can redefine the payload creators for the default `TRIGGER`, `REQUEST`, etc., to suit your needs.
- **Payload and Meta via `createRoutines`**: With `createRoutines`, you can pass arrays containing payload and meta creators, mimicking the approach used by `redux-actions/createActions`. This makes complex setup more declarative and compact.
- **Destructuring for Simplicity:** When routines are generated, they expose their stages as properties. You can destructure them in your code for cleaner usage.

---

## When to Use `extend-routines`

- **Complex Async Flows:** If your application has multiple asynchronous steps per action, or you need additional actions beyond the standard five stages.
- **Socket or Event-Driven Logic:** When working with WebSockets or event streams, predefined socket routines save time and keep your action structure consistent.
- **Large Codebases:** `createRoutines` helps maintain consistency and reduce boilerplate when defining many routines at once.
- **Non-Saga Environments:** No need to rely on `redux-saga`. You can integrate `extend-routines` with any Redux middleware, or use it alongside [Redux Toolkit](https://redux-toolkit.js.org/) for a simpler development experience.

---

## Conclusion

`extend-routines` enhances the concept of routines introduced by `redux-saga-routines`. It not only streamlines the creation and management of async action sequences but also offers the flexibility to fit a wide range of use cases—from traditional HTTP requests to complex, multi-step flows and event-driven socket operations.

By reducing repetitive boilerplate and providing a highly flexible, composable API, `extend-routines` empowers developers to keep their Redux action logic clean, scalable, and easy to maintain. Whether you’re building a small feature or architecting a large-scale application, `extend-routines` can help ensure that your Redux async flows are both elegant and robust.

**Get started today:**

```bash
npm install --save extend-routines
```

Check your existing routines, customize them, and create new ones that perfectly match your application’s unique requirements—all without tying your hands to `redux-saga` or any specific middleware. With `extend-routines`, you define the rules of your action handling.
---
title: "Extend Redux Saga Routines: Simplify Async Actions in Redux Applications"
description: "Learn how to streamline Redux async actions with extend-routines. Add custom stages to redux-saga-routines, create socket-based routines, and reduce boilerplate code in your Redux applications—no redux-saga required."
---

# extend-saga-routines (aka extend-routines)

If you’ve been working with Redux and handling asynchronous actions—like fetching data from an API—you’ve probably noticed a recurring pattern in your code. Every async operation typically involves the same sequence of action types:

- **`prefix/TRIGGER`**: Kick off the process.
- **`prefix/REQUEST`**: The actual async work (e.g., API call) has started.
- **`prefix/SUCCESS`**: The work finished successfully, and you’ve got your data.
- **`prefix/FAILURE`**: Something went wrong, handle the error.
- **`prefix/FULFILL`**: Wrap things up, whether successful or not.

This pattern is tried and true, but can feel repetitive to write out by hand. Tools like [`redux-saga-routines`](https://www.npmjs.com/package/redux-saga-routines) let you define routines that automatically include these standard stages. But what happens when you need something a little different?

That’s where **extend-routines** comes in. It lets you go beyond the default stages and add your own custom actions to the mix. With extend-routines, you can:

- Extend any existing routine with custom stages—no fuss.
- Create new routines that combine the default stages with your own custom actions.
- Build purely custom routines if you don’t need the standard lifecycle stages at all.
- Easily define socket-based routines that come preloaded with connection-related stages.
- Spin up a bunch of routines at once from a single configuration object, saving you time and boilerplate.

**No redux-saga required.** As of version 3.3.0, extend-routines works great without any direct dependency on redux-saga. Feel free to plug it into your Redux setup of choice, including [Redux Toolkit](https://redux-toolkit.js.org/).

---

## Installation

```bash
npm install --save extend-routines
```

If you’re still using `redux-saga-routines`, make sure it’s at least `3.2.0` for full compatibility.

---

## Key Functions and Their Purpose

- **`extendRoutine(routine, stages, payloadCreator, metaCreator)`**  
  Take an existing routine and add more stages to it.
  
- **`createExtendedRoutine(typePrefix, stages, payloadCreator, metaCreator)`**  
  Start with the default stages (TRIGGER, REQUEST, SUCCESS, FAILURE, FULFILL) and tack on custom ones.
  
- **`createCustomRoutine(typePrefix, stages, payloadCreator, metaCreator)`**  
  Build a routine from scratch with only the stages you define—no defaults.
  
- **`createSocketRoutine(typePrefix, stages, payloadCreator, metaCreator)`**  
  Quickly set up routines for socket events with predefined stages:
  - CONNECTED
  - DISCONNECTED
  - JOIN_CHANNEL
  - CHANNEL_JOINED
  - LEAVE_CHANNEL
  - CHANNEL_LEAVED
  
  Then add more if you need to.
  
- **`createRoutines(scheme, defaultRoutines)`**  
  Generate multiple routines at once from a simple configuration object. Perfect for large apps or when you want a clean, declarative approach.

---

## Examples

### Extend Any Routine

Let’s say we have a `projects` routine created with `redux-saga-routines`:

```js
import { createRoutine } from 'redux-saga-routines';
import extendRoutine from 'extend-routines';

const projects = extendRoutine(createRoutine('projects'), 'TOGGLE_INFO');

console.log(projects._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE_INFO"]

console.log(projects.toggleInfo({ id: 42 }));
// { type: "projects/TOGGLE_INFO", payload: { id: 42 } }
```

Adding multiple custom stages:

```js
const tab = extendRoutine(
  createRoutine('tab'),
  ['SOME_OTHER', 'CUSTOM']
);
```

You now have extra stages like `tab/SOME_OTHER` and `tab/CUSTOM`.

### Custom Payload and Meta Creators

You can define how payloads and meta fields are created per stage:

```js
const withCustomPayload = extendRoutine(
  createRoutine('custom/payload'),
  'SOME',
  { some: payload => payload * 2 }
);

console.log(withCustomPayload.some(2));
// { type: 'custom/payload/SOME', payload: 4 }
```

Same goes for meta creators:

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

### Creating Extended Routines

This gives you the default stages plus your own:

```js
import { createExtendedRoutine } from 'extend-routines';

const projects = createExtendedRoutine('projects', 'TOGGLE');

console.log(projects._STAGES);
// ["TRIGGER", "REQUEST", "SUCCESS", "FAILURE", "FULFILL", "TOGGLE"]

console.log(projects.toggle({ id: 42 }));
// { type: "projects/TOGGLE", payload: { id: 42 } }
```

### Creating Custom Routines

If you don’t need the default stages at all:

```js
import { createCustomRoutine } from 'extend-routines';

const steps = createCustomRoutine('steps', ['NEXT', 'PREVIOUS', 'GO_TO']);
console.log(steps._STAGES);
// ["NEXT", "PREVIOUS", "GO_TO"]

console.log(steps.goTo(42));
// { type: "steps/GO_TO", payload: 42 }
```

### Socket Routines

For socket-heavy apps:

```js
import { createSocketRoutine } from 'extend-routines';

const chat = createSocketRoutine('chat', ['WHY', 'NOT']);
console.log(chat._STAGES);
// ["CONNECTED", "DISCONNECTED", "JOIN_CHANNEL", "CHANNEL_JOINED", "LEAVE_CHANNEL", "CHANNEL_LEAVED", "WHY", "NOT"]
```

### Creating Multiple Routines at Once

`createRoutines` lets you define multiple routines in a single pass:

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

You can also specify custom payload and meta creators right in the `createRoutines` config.

---

## Final Thoughts

`extend-routines` keeps your Redux code DRY, flexible, and easier to maintain. It’s a natural extension of the routines concept, giving you full freedom to shape your async logic the way your app demands—no more bending over backward to fit a fixed pattern.

It’s light, middleware-agnostic, and designed with real-world complexity in mind. Give it a spin and streamline how you define and handle your async actions.